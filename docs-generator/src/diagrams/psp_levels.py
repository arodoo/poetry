"""
File: docs-generator/src/diagrams/psp_levels.py
Purpose: Generates the PSP methodology levels diagram
         mapping each maturity level to concrete
         project artifacts and quality practices.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from . import save_fig, DARK, BLUE, TEAL
from . import GREEN, ORANGE, GRAY

LEVELS = [
    ('PSP0 — Proceso base',
     'Git · Convenciones commit · DDD',
     ORANGE, '#FFF3E0'),
    ('PSP1 — Planificación',
     'Blueprints JSON · Módulos',
     BLUE, '#E3F2FD'),
    ('PSP2 — Revisión de calidad',
     '13 Gates CI/CD · ESLint · Checkstyle',
     TEAL, '#E0F2F1'),
    ('PSP2.1 — Especificación de diseño',
     'OpenAPI · Catálogo UI · Contratos',
     GREEN, '#E8F5E9'),
]
BW, BH = 8.0, 0.9


def generate():
    """Render PSP levels mapped to project."""
    fig, ax = plt.subplots(figsize=(10, 5.5))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5.5)
    ax.axis('off')
    ax.text(5, 5.1,
            'Niveles PSP — Mapeo al Proyecto',
            ha='center', fontsize=11,
            fontweight='bold', color=DARK)
    for i, (title, sub, ec, fc) in enumerate(LEVELS):
        y = 0.4 + i * 1.1
        x = (10 - BW) / 2
        ax.add_patch(FancyBboxPatch(
            (x, y), BW, BH,
            boxstyle='round,pad=0.04',
            lw=1.5, facecolor=fc, edgecolor=ec))
        ax.text(x + 0.3, y + BH / 2 + 0.1,
                title, va='center', fontsize=9,
                fontweight='bold', color=DARK)
        ax.text(x + 0.3, y + BH / 2 - 0.15,
                sub, va='center',
                fontsize=7.5, color=GRAY)
        if i < len(LEVELS) - 1:
            ax.annotate('',
                xy=(5, y + BH + 0.08),
                xytext=(5, y + BH),
                arrowprops=dict(
                    arrowstyle='->',
                    color=ec, lw=1.5))
    save_fig(fig, 'fig_psp_levels.png')
