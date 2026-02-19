"""
File: docs-generator/src/generate_diagrams.py
Purpose: Generates professional PNG diagrams for the doctoral thesis using
         matplotlib. Produces Architecture, ERD, and Sequence diagram images
         saved to the content/assets directory for DOCX embedding.
All Rights Reserved Arodi Emmanuel
"""

import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch


ASSETS_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'content', 'assets')
)

DARK = '#1A1A2E'
ACCENT = '#16213E'
BLUE = '#0F3460'
TEAL = '#1A7A8A'
LIGHT = '#E8F4F8'
WHITE = '#FFFFFF'
GRAY = '#B0BEC5'
GREEN = '#2E7D32'
ORANGE = '#E65100'


def _save(fig, name):
    os.makedirs(ASSETS_DIR, exist_ok=True)
    path = os.path.join(ASSETS_DIR, name)
    fig.savefig(path, dpi=150, bbox_inches='tight', facecolor=WHITE)
    plt.close(fig)
    print(f'Diagram saved: {path}')
    return path


def _box(ax, x, y, w, h, label, sublabel='', color=BLUE, text_color=WHITE):
    rect = FancyBboxPatch(
        (x, y), w, h,
        boxstyle='round,pad=0.02',
        linewidth=1.5, edgecolor=color,
        facecolor=color
    )
    ax.add_patch(rect)
    ax.text(x + w / 2, y + h / 2 + (0.08 if sublabel else 0),
            label, ha='center', va='center',
            fontsize=9, fontweight='bold', color=text_color)
    if sublabel:
        ax.text(x + w / 2, y + h / 2 - 0.13,
                sublabel, ha='center', va='center',
                fontsize=7, color=GRAY)


def _arrow(ax, x1, y1, x2, y2, label='', color=TEAL, dashed=False):
    style = '--' if dashed else '-'
    ax.annotate(
        '', xy=(x2, y2), xytext=(x1, y1),
        arrowprops=dict(
            arrowstyle='->', color=color,
            lw=1.5, linestyle=style
        )
    )
    if label:
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        ax.text(mx + 0.02, my + 0.05, label,
                fontsize=6.5, color=color, ha='center')


def generate_architecture():
    fig, ax = plt.subplots(figsize=(11, 7))
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 7)
    ax.axis('off')
    fig.patch.set_facecolor(WHITE)

    ax.text(5.5, 6.6, 'Figura 3.2 — Arquitectura de Contenedores del Sistema Poetry',
            ha='center', va='center', fontsize=11,
            fontweight='bold', color=DARK)
    ax.text(5.5, 6.3, 'Modelo C4 Nivel 2: Contenedores',
            ha='center', va='center', fontsize=8, color=GRAY)

    # Boundary box
    boundary = FancyBboxPatch(
        (0.3, 0.3), 10.4, 5.7,
        boxstyle='round,pad=0.05',
        linewidth=2, edgecolor=BLUE,
        facecolor='#F0F8FF', linestyle='--'
    )
    ax.add_patch(boundary)
    ax.text(5.5, 5.8, 'Sistema Poetry', ha='center', va='center',
            fontsize=9, color=BLUE, fontstyle='italic')

    # External actor
    _box(ax, 0.5, 4.2, 1.6, 0.8,
         'Administrador', 'Rol: ADMIN', GREEN)
    _box(ax, 0.5, 1.5, 1.6, 0.8,
         'Socio', 'Rol: MEMBER', ORANGE)

    # Frontend
    _box(ax, 2.8, 4.1, 2.2, 1.0,
         'Frontend Web', 'React + Vite', BLUE)
    # Backend
    _box(ax, 5.4, 3.3, 2.2, 1.0,
         'Backend API', 'Spring Boot 3', BLUE)
    # DB
    _box(ax, 8.0, 4.1, 2.2, 1.0,
         'Base de Datos', 'PostgreSQL 15', TEAL)
    # Reader bridge
    _box(ax, 5.4, 1.4, 2.2, 1.0,
         'Servicio Biométrico', 'Java SDK Bridge', TEAL)
    # Hardware
    _box(ax, 2.8, 1.4, 1.8, 1.0,
         'Lector Biométrico', 'Sensor USB', GRAY, DARK)

    # Arrows
    _arrow(ax, 2.1, 4.7, 2.8, 4.6, 'HTTPS')
    _arrow(ax, 5.0, 4.6, 5.4, 4.0, 'JSON/HTTPS', TEAL)
    _arrow(ax, 7.6, 4.0, 8.0, 4.5, 'JDBC')
    _arrow(ax, 2.3, 1.8, 2.8, 1.8, 'USB/HID')
    _arrow(ax, 4.6, 1.9, 5.4, 1.9, 'Socket')
    _arrow(ax, 6.5, 2.4, 6.5, 3.3, 'HTTP', TEAL)
    _arrow(ax, 2.1, 1.8, 2.3, 1.8)

    _save(fig, 'fig_arch.png')


def generate_erd():
    fig, ax = plt.subplots(figsize=(12, 7))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 7)
    ax.axis('off')
    fig.patch.set_facecolor(WHITE)

    ax.text(6, 6.65, 'Figura 3.3 — Esquema Entidad-Relación (3NF)',
            ha='center', fontsize=11, fontweight='bold', color=DARK)

    def table(ax, x, y, title, fields, pk=None, width=2.4, row_h=0.32):
        header_h = 0.42
        total_h = header_h + len(fields) * row_h
        hdr = FancyBboxPatch(
            (x, y + total_h - header_h), width, header_h,
            boxstyle='round,pad=0.01',
            linewidth=1.5, edgecolor=BLUE, facecolor=BLUE
        )
        ax.add_patch(hdr)
        ax.text(x + width / 2, y + total_h - header_h / 2,
                title, ha='center', va='center',
                fontsize=9, fontweight='bold', color=WHITE)
        for i, (col, dtype) in enumerate(fields):
            ry = y + total_h - header_h - (i + 1) * row_h
            bg = '#E3F2FD' if col == pk else WHITE
            row_rect = mpatches.FancyBboxPatch(
                (x, ry), width, row_h,
                boxstyle='square,pad=0',
                linewidth=0.7, edgecolor='#B0BEC5',
                facecolor=bg
            )
            ax.add_patch(row_rect)
            prefix = '[PK] ' if col == pk else '   '
            ax.text(x + 0.1, ry + row_h / 2, f'{prefix}{col}',
                    va='center', fontsize=7, color=DARK)
            ax.text(x + width - 0.08, ry + row_h / 2, dtype,
                    va='center', ha='right', fontsize=6.5, color=TEAL,
                    fontstyle='italic')
        return x + width / 2, y + total_h - header_h

    members_fields = [
        ('id', 'UUID PK'),
        ('first_name', 'VARCHAR'),
        ('last_name', 'VARCHAR'),
        ('email', 'VARCHAR UNIQUE'),
        ('status', 'ENUM'),
        ('created_at', 'TIMESTAMP'),
    ]
    bio_fields = [
        ('member_id', 'UUID FK'),
        ('fingerprint_data', 'BYTEA'),
        ('algorithm_version', 'VARCHAR'),
    ]
    sub_fields = [
        ('id', 'UUID PK'),
        ('member_id', 'UUID FK'),
        ('start_date', 'DATE'),
        ('end_date', 'DATE'),
        ('plan_type', 'ENUM'),
        ('is_active', 'BOOLEAN'),
    ]
    log_fields = [
        ('id', 'UUID PK'),
        ('member_id', 'UUID FK'),
        ('access_time', 'TIMESTAMP'),
        ('result', 'ENUM'),
        ('device_id', 'VARCHAR'),
    ]

    table(ax, 4.3, 1.5, 'MEMBERS', members_fields, pk='id')
    table(ax, 0.5, 3.2, 'BIOMETRIC_TEMPLATES', bio_fields, pk='member_id')
    table(ax, 4.3, 4.5, 'SUBSCRIPTIONS', sub_fields, pk='id')
    table(ax, 8.0, 1.5, 'ACCESS_LOGS', log_fields, pk='id')

    # Relationships
    ax.annotate('', xy=(2.9, 3.7), xytext=(4.3, 3.5),
                arrowprops=dict(arrowstyle='<->', color=ORANGE, lw=1.5))
    ax.text(3.5, 3.9, '1:1', fontsize=8, color=ORANGE, fontweight='bold')

    ax.annotate('', xy=(5.5, 4.5), xytext=(5.5, 3.5),
                arrowprops=dict(arrowstyle='<->', color=ORANGE, lw=1.5))
    ax.text(5.7, 4.0, '1:N', fontsize=8, color=ORANGE, fontweight='bold')

    ax.annotate('', xy=(8.0, 2.5), xytext=(6.7, 2.5),
                arrowprops=dict(arrowstyle='<->', color=ORANGE, lw=1.5))
    ax.text(7.3, 2.7, '1:N', fontsize=8, color=ORANGE, fontweight='bold')

    _save(fig, 'fig_erd.png')


def generate_sequence():
    fig, ax = plt.subplots(figsize=(12, 8))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 8)
    ax.axis('off')
    fig.patch.set_facecolor(WHITE)

    ax.text(6, 7.7, 'Figura 3.4 — Secuencia de Autenticación y Control de Acceso',
            ha='center', fontsize=11, fontweight='bold', color=DARK)

    participants = [
        (1.5, 'Socio', ORANGE),
        (3.5, 'Sensor USB', GRAY),
        (6.0, 'API (Spring)', BLUE),
        (8.5, 'Servicio Bio.', TEAL),
        (11.0, 'PostgreSQL', GREEN),
    ]

    TOP = 7.2
    BOT = 0.4

    for x, label, color in participants:
        box = FancyBboxPatch(
            (x - 0.7, TOP - 0.15), 1.4, 0.45,
            boxstyle='round,pad=0.05',
            linewidth=1.5, edgecolor=color, facecolor=color
        )
        ax.add_patch(box)
        ax.text(x, TOP + 0.08, label, ha='center', va='center',
                fontsize=8, fontweight='bold', color=WHITE)
        ax.plot([x, x], [TOP - 0.15, BOT],
                color='#CFD8DC', linewidth=1, linestyle='--')

    def msg(y, x1, x2, text, color=DARK, returns=False, alt=False):
        style = '->' if not returns else '<-'
        ax.annotate(
            '', xy=(x2, y), xytext=(x1, y),
            arrowprops=dict(
                arrowstyle=style, color=TEAL if not returns else BLUE,
                lw=1.5, linestyle=('--' if returns else '-')
            )
        )
        offset = 0.07
        ax.text((x1 + x2) / 2, y + offset, text,
                ha='center', fontsize=7.5, color=color, fontweight='bold' if alt else 'normal')

    def note(y, x, text, color='#FFF9C4', border='#F57F17'):
        box = FancyBboxPatch(
            (x - 1.2, y - 0.15), 2.4, 0.32,
            boxstyle='round,pad=0.03',
            linewidth=1, edgecolor=border, facecolor=color
        )
        ax.add_patch(box)
        ax.text(x, y, text, ha='center', va='center', fontsize=7, color=DARK)

    msg(6.7, 1.5, 3.5, 'Coloca huella', DARK)
    msg(6.2, 3.5, 6.0, 'POST /access (template)', DARK)
    note(5.8, 6.0, '♻ Valida checksum del template')
    msg(5.3, 6.0, 11.0, 'SELECT biometric_templates', DARK)
    msg(4.9, 11.0, 6.0, 'Retorna candidatos', BLUE, returns=True)
    note(4.5, 8.5, '⚙ Matching Score > 0.8 ?')
    msg(4.0, 6.0, 11.0, 'SELECT subscriptions WHERE active', DARK)
    msg(3.6, 11.0, 6.0, 'ACTIVO / VENCIDO', BLUE, returns=True)

    # Alt block
    alt_box = FancyBboxPatch(
        (3.0, 2.7), 8.5, 0.7,
        boxstyle='round,pad=0.02',
        linewidth=1, edgecolor='#4CAF50', facecolor='#E8F5E9', zorder=0
    )
    ax.add_patch(alt_box)
    ax.text(3.1, 3.25, '[alt] Membresía Activa', fontsize=7.5,
            color=GREEN, fontweight='bold')
    msg(3.1, 6.0, 11.0, 'INSERT access_logs (SUCCESS)')
    msg(2.7, 6.0, 3.5, '200 OK — Verde (Abrir)', GREEN)

    den_box = FancyBboxPatch(
        (3.0, 1.7), 8.5, 0.7,
        boxstyle='round,pad=0.02',
        linewidth=1, edgecolor=ORANGE, facecolor='#FFF3E0', zorder=0
    )
    ax.add_patch(den_box)
    ax.text(3.1, 2.25, '[alt] Membresía Vencida', fontsize=7.5,
            color=ORANGE, fontweight='bold')
    msg(2.1, 6.0, 11.0, 'INSERT access_logs (DENIED)')
    msg(1.7, 6.0, 3.5, '403 Forbidden — Naranja', ORANGE)

    _save(fig, 'fig_sequence.png')


if __name__ == '__main__':
    generate_architecture()
    generate_erd()
    generate_sequence()
    print('All diagrams generated successfully.')
