"""
File: docs-generator/src/diagrams/arch.py
Purpose: Architecture diagram using a clean left-to-right pipeline metaphor.
         All positions are constants to prevent overlap.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from . import box, arrow, save_fig, DARK, BLUE, TEAL, GREEN
from . import ORANGE, GRAY, LIGHT_BLUE, LIGHT_TEAL, LIGHT_GRAY, WHITE

# Grid constants
BW, BH = 2.2, 0.85   # box width, height
R1 = 4.0              # row 1 top-edge y
R2 = 1.8              # row 2 top-edge y
X = [0.2, 3.0, 5.8, 8.6]  # column x anchors


def _band(ax, y, label, color):
    ax.axhspan(y, y + 0.02, color=color, alpha=0)
    ax.text(12.4, y + BH / 2, label,
            ha='right', va='center', fontsize=6.5,
            color=color, fontstyle='italic')


def generate():
    """Render the C4 Container Architecture diagram."""
    fig, ax = plt.subplots(figsize=(13, 6.5))
    ax.set_xlim(0, 13), ax.set_ylim(0, 6.5)
    ax.axis('off')

    ax.text(6.5, 6.1, 'Figura 3.2  Arquitectura de Contenedores (C4 Level 2)',
            ha='center', fontsize=11, fontweight='bold', color=DARK)

    # System boundary
    ax.add_patch(FancyBboxPatch(
        (2.6, 1.1), 9.7, 3.8,
        boxstyle='round,pad=0.05', linewidth=1.5,
        facecolor='#F5F9FF', edgecolor=BLUE, linestyle='--'
    ))
    ax.text(7.5, 4.75, 'Sistema Poetry', ha='center',
            fontsize=8, color=BLUE, fontstyle='italic')

    # Row 1: User flows
    box(ax, X[0], R1, 1.8, BH, 'Administrador', 'Rol: ADMIN',
        '#E8F5E9', GREEN)
    box(ax, X[1], R1, BW, BH, 'Frontend Web', 'React + Vite',
        LIGHT_BLUE, BLUE)
    box(ax, X[2], R1, BW, BH, 'Backend API', 'Spring Boot 3',
        LIGHT_TEAL, TEAL)
    box(ax, X[3], R1, BW, BH, 'Base de Datos', 'PostgreSQL 15',
        '#F3E5F5', '#6A1B9A')

    # Row 2: Biometric flows
    box(ax, X[0], R2, 1.8, BH, 'Socio', 'Rol: MEMBER',
        '#FFF3E0', ORANGE)
    box(ax, X[1], R2, BW, BH, 'Lector Biométrico', 'Sensor USB',
        LIGHT_GRAY, GRAY)
    box(ax, X[2], R2, BW, BH, 'Servicio Bio.', 'Java SDK Bridge',
        LIGHT_TEAL, TEAL)

    # Row 1 arrows (exact edge-to-edge)
    arrow(ax, 2.0, R1 + BH/2, X[1], R1 + BH/2, 'HTTPS')
    arrow(ax, X[1]+BW, R1+BH/2, X[2], R1+BH/2, 'JSON/HTTPS')
    arrow(ax, X[2]+BW, R1+BH/2, X[3], R1+BH/2, 'JDBC')

    # Row 2 arrows
    arrow(ax, 2.0, R2+BH/2, X[1], R2+BH/2, 'USB/HID')
    arrow(ax, X[1]+BW, R2+BH/2, X[2], R2+BH/2, 'Socket')

    # Bio Service up to API
    arrow(ax, X[2]+BW/2, R2+BH, X[2]+BW/2, R1, 'HTTP', TEAL)

    save_fig(fig, 'fig_arch.png')
