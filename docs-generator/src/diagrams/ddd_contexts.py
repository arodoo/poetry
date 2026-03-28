"""
File: docs-generator/src/diagrams/ddd_contexts.py
Purpose: Bounded Context map for the Poetry platform showing three
         isolated contexts communicating through explicit contracts.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
from . import box, arrow, save_fig, DARK, BLUE, TEAL
from . import GREEN, ORANGE, GRAY, WHITE, LIGHT_BLUE

CTX = [
    (1.0, 2.5, BLUE, '#E3F2FD', 'Contexto:\nAcceso',
     'Huella, validación,\nlogs de entrada'),
    (5.0, 2.5, TEAL, '#E0F2F1', 'Contexto:\nMembresías',
     'Planes, pagos,\nestado activo'),
    (9.0, 2.5, ORANGE, '#FFF3E0', 'Contexto:\nEstadísticas',
     'Métricas, reportes,\ndashboard'),
]

BW, BH = 2.8, 2.0


def generate():
    """Render bounded context map for Poetry."""
    fig, ax = plt.subplots(figsize=(13, 6.5))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 6.5)
    ax.axis('off')

    ax.text(6.5, 6.0,
            'Figura 2.1  Mapa de Contextos Delimitados (DDD)',
            ha='center', fontsize=11,
            fontweight='bold', color=DARK)

    for x, y, ec, fc, title, sub in CTX:
        ax.add_patch(mp.FancyBboxPatch(
            (x, y), BW, BH,
            boxstyle='round,pad=0.06', lw=2,
            facecolor=fc, edgecolor=ec,
            linestyle='--'))
        ax.text(x + BW / 2, y + BH / 2 + 0.25,
                title, ha='center', va='center',
                fontsize=9, fontweight='bold', color=ec)
        ax.text(x + BW / 2, y + BH / 2 - 0.45,
                sub, ha='center', va='center',
                fontsize=7, color=GRAY)

    # Contract arrows between contexts
    arrow(ax, 1.0 + BW, 3.5, 5.0, 3.5,
          'Contrato: MemberStatus', TEAL)
    arrow(ax, 5.0 + BW, 3.5, 9.0, 3.5,
          'Contrato: AccessEvent', ORANGE)

    save_fig(fig, 'fig_ddd_layers.png')
