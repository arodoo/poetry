"""
File: docs-generator/src/diagrams/solid_pillars.py
Purpose: Five vertical pillars representing each SOLID principle
         with abbreviation, name, and brief description per pillar.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
from . import save_fig, DARK, BLUE, TEAL, GREEN
from . import ORANGE, GRAY, WHITE

PILLARS = [
    ('S', 'SRP', 'Una razón\npara cambiar', BLUE),
    ('O', 'OCP', 'Abierto a\nextensión', TEAL),
    ('L', 'LSP', 'Subtipos\nsustituibles', GREEN),
    ('I', 'ISP', 'Interfaces\nespecíficas', ORANGE),
    ('D', 'DIP', 'Depender de\nabstracciones', '#5E35B1'),
]

PW, PH = 1.8, 3.5
GAP = 0.4
START_X = 1.0


def generate():
    """Render the five SOLID pillars diagram."""
    fig, ax = plt.subplots(figsize=(13, 6.5))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 6.5)
    ax.axis('off')

    ax.text(6.5, 6.0,
            'Figura 2.3  Principios SOLID (Martin, 2002)',
            ha='center', fontsize=11,
            fontweight='bold', color=DARK)

    for i, (letter, name, desc, color) in enumerate(PILLARS):
        x = START_X + i * (PW + GAP)
        y = 1.2

        # Pillar body
        ax.add_patch(mp.FancyBboxPatch(
            (x, y), PW, PH,
            boxstyle='round,pad=0.06', lw=2,
            facecolor=WHITE, edgecolor=color))

        # Letter badge at top
        ax.add_patch(mp.Circle(
            (x + PW / 2, y + PH - 0.5), 0.35,
            facecolor=color, edgecolor=WHITE,
            lw=2, zorder=3))
        ax.text(x + PW / 2, y + PH - 0.5, letter,
                ha='center', va='center', fontsize=14,
                fontweight='bold', color=WHITE, zorder=4)

        # Name and description
        ax.text(x + PW / 2, y + PH / 2, name,
                ha='center', va='center', fontsize=10,
                fontweight='bold', color=color)
        ax.text(x + PW / 2, y + PH / 2 - 0.7, desc,
                ha='center', va='center', fontsize=7,
                color=GRAY)

    save_fig(fig, 'fig_solid_pillars.png')
