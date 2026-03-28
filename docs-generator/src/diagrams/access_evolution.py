"""
File: docs-generator/src/diagrams/access_evolution.py
Purpose: Timeline diagram showing the three historical eras of access
         control: manual logs, RFID tokens, and biometric verification.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
from . import save_fig, DARK, BLUE, TEAL, GREEN
from . import ORANGE, GRAY, WHITE, LIGHT_BLUE

ERAS = [
    (1.5, ORANGE, 'Era 1: Manual',
     'Libro de visitas', 'Falible, lento'),
    (5.5, BLUE, 'Era 2: Tokens',
     'RFID / Banda magnética', 'Transferible'),
    (9.5, GREEN, 'Era 3: Biométrica',
     'Huella dactilar', 'Intransferible'),
]


def generate():
    """Render access control evolution timeline."""
    fig, ax = plt.subplots(figsize=(13, 5))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 5)
    ax.axis('off')

    ax.text(6.5, 4.6,
            'Figura 1.1  Línea Temporal del Control de Acceso',
            ha='center', fontsize=11,
            fontweight='bold', color=DARK)

    # Horizontal timeline bar
    ax.plot([1, 12], [2.5, 2.5],
            color=GRAY, lw=2, zorder=0)

    for x, color, title, tech, weakness in ERAS:
        # Circle node
        ax.add_patch(mp.Circle(
            (x, 2.5), 0.35, facecolor=color,
            edgecolor=WHITE, lw=2, zorder=2))

        # Title above
        ax.text(x, 3.3, title, ha='center',
                fontsize=9, fontweight='bold', color=color)
        ax.text(x, 3.0, tech, ha='center',
                fontsize=7.5, color=DARK)

        # Weakness below
        ax.text(x, 1.8, weakness, ha='center',
                fontsize=7.5, color=GRAY,
                fontstyle='italic')

    # Direction arrow at the end
    ax.annotate('', xy=(12, 2.5), xytext=(11, 2.5),
                arrowprops=dict(arrowstyle='->',
                                color=TEAL, lw=2))

    save_fig(fig, 'fig_access_evolution.png')
