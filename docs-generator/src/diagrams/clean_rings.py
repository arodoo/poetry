"""
File: docs-generator/src/diagrams/clean_rings.py
Purpose: Concentric circles diagram illustrating Clean Architecture
         with the Dependency Rule pointing inward (Martin, 2017).
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
import numpy as np
from . import save_fig, DARK, BLUE, TEAL, GREEN
from . import ORANGE, GRAY, WHITE

RINGS = [
    (3.0, '#E8F5E9', GREEN, 'Infraestructura',
     'DB, Frameworks, UI'),
    (2.2, '#E3F2FD', BLUE, 'Adaptadores',
     'Controllers, Repos'),
    (1.4, '#FFF3E0', ORANGE, 'Casos de Uso',
     'Lógica de aplicación'),
    (0.7, '#F3E5F5', '#5E35B1', 'Entidades',
     'Reglas de negocio'),
]

CX, CY = 6.5, 4.0


def generate():
    """Render Clean Architecture concentric rings."""
    fig, ax = plt.subplots(figsize=(13, 8))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 8)
    ax.axis('off')

    ax.text(CX, 7.5,
            'Figura 2.2  Arquitectura Limpia (Martin, 2017)',
            ha='center', fontsize=11,
            fontweight='bold', color=DARK)

    for radius, fc, ec, label, sub in RINGS:
        circle = mp.Circle(
            (CX, CY), radius,
            facecolor=fc, edgecolor=ec,
            lw=2, alpha=0.85, zorder=10 - int(radius))
        ax.add_patch(circle)
        ax.text(CX, CY + radius - 0.3, label,
                ha='center', fontsize=8,
                fontweight='bold', color=ec, zorder=11)
        ax.text(CX, CY + radius - 0.55, sub,
                ha='center', fontsize=6.5,
                color=GRAY, zorder=11)

    # Dependency arrow on the right side
    ax.annotate('', xy=(CX + 1.0, CY),
                xytext=(CX + 2.8, CY),
                arrowprops=dict(arrowstyle='->', lw=2,
                                color=TEAL))
    ax.text(CX + 3.5, CY,
            'Regla de\nDependencia',
            ha='center', fontsize=8,
            fontweight='bold', color=TEAL)

    save_fig(fig, 'fig_clean_rings.png')
