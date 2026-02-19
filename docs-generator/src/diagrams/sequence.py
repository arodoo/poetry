"""
File: docs-generator/src/diagrams/sequence.py
Purpose: Authentication sequence diagram using a fixed-column timeline layout.
         Participants at fixed x; events at fixed y intervals.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
from . import save_fig, DARK, BLUE, TEAL, GREEN, ORANGE, GRAY, WHITE

COLS = [1.5, 4.0, 7.0, 10.0, 12.5]
NAMES = ['Socio', 'Sensor USB', 'API (Spring)', 'PostgreSQL', 'Frontend']
COLORS = [ORANGE, GRAY, BLUE, TEAL, GREEN]
TOP = 8.8
BOT = 0.5


def _participant(ax, x, name, color):
    ax.add_patch(mp.FancyBboxPatch(
        (x - 0.8, TOP - 0.3), 1.6, 0.55,
        boxstyle='round,pad=0.04', lw=1.5,
        facecolor=color, edgecolor=color))
    ax.text(x, TOP, name, ha='center', va='center',
            fontsize=7.5, fontweight='bold', color=WHITE)
    ax.plot([x, x], [TOP - 0.3, BOT],
            color='#CFD8DC', lw=1, linestyle='--')


def _msg(ax, y, x1, x2, label, color=DARK, ret=False):
    st = '--' if ret else '-'
    ax.annotate('', xy=(x2, y), xytext=(x1, y),
                arrowprops=dict(arrowstyle='<-' if ret else '->',
                                color=color, lw=1.3, linestyle=st))
    ax.text((x1 + x2) / 2, y + 0.13,
            label, ha='center', fontsize=6.8, color=color)


def _alt_block(ax, ya, yb, label, fc, ec):
    ax.add_patch(mp.FancyBboxPatch(
        (2.8, yb), 9.5, ya - yb,
        boxstyle='round,pad=0.04', lw=1,
        facecolor=fc, edgecolor=ec, zorder=0))
    ax.text(2.9, ya - 0.18, label,
            fontsize=7, color=ec, fontweight='bold')


def generate():
    """Render the biometric authentication sequence diagram."""
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 14), ax.set_ylim(0, 10)
    ax.axis('off')
    ax.text(7, 9.7, 'Figura 3.4  Secuencia: Autenticación y Control de Acceso',
            ha='center', fontsize=11, fontweight='bold', color=DARK)

    for x, name, color in zip(COLS, NAMES, COLORS):
        _participant(ax, x, name, color)

    _msg(ax, 8.3, COLS[0], COLS[1], 'Coloca huella')
    _msg(ax, 7.7, COLS[1], COLS[2], 'POST /api/v1/access (template)')
    _msg(ax, 7.1, COLS[2], COLS[3], 'SELECT biometric_templates WHERE member_id')
    _msg(ax, 6.6, COLS[3], COLS[2], 'Templates candidatos', BLUE, ret=True)
    _msg(ax, 5.9, COLS[2], COLS[3], 'Matching Score > 0.8 ?')
    _msg(ax, 5.4, COLS[3], COLS[2], 'Match encontrado', BLUE, ret=True)
    _msg(ax, 4.7, COLS[2], COLS[3], 'SELECT subscriptions WHERE is_active')
    _msg(ax, 4.2, COLS[3], COLS[2], 'ACTIVO / VENCIDO', BLUE, ret=True)

    # Alt: success
    _alt_block(ax, 3.8, 2.9, '[OK] Membresía Activa', '#E8F5E9', GREEN)
    _msg(ax, 3.5, COLS[2], COLS[3], 'INSERT access_logs (SUCCESS)', GREEN)
    _msg(ax, 3.1, COLS[2], COLS[1], '200 OK — Abrir torniquete', GREEN)

    # Alt: denied
    _alt_block(ax, 2.6, 1.5, '[ERR] Membresía Vencida', '#FFF3E0', ORANGE)
    _msg(ax, 2.3, COLS[2], COLS[3], 'INSERT access_logs (DENIED)', ORANGE)
    _msg(ax, 1.8, COLS[2], COLS[1], '403 Forbidden — Acceso negado', ORANGE)

    save_fig(fig, 'fig_sequence.png')
