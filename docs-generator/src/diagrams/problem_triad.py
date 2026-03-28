"""
File: docs-generator/src/diagrams/problem_triad.py
Purpose: Triangular diagram showing the three structural causes of the
         access-control problem in analog settings, referencing theory
         instead of specific product names. Arrows stop at box edges.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
from . import save_fig, DARK, BLUE, TEAL, GREEN
from . import ORANGE, GRAY, WHITE

# Box geometry
BW, BH = 3.0, 0.90
# Node centers: top-left, top-right, bottom-center
NODES = [
    (2.5,  5.8, ORANGE, 'Fraude de\nIdentidad',
     'Suplantación, pass-back'),
    (9.0,  5.8, BLUE,   'Latencia\nOperativa',
     'Cuellos de botella en pico'),
    (5.75, 2.8, '#5E35B1', 'Opacidad\nde Datos',
     'Silos analógicos, sin métrica'),
]
# Center "solution concept" node
CX, CY = 5.75, 4.55
CBW, CBH = 2.8, 0.75


def _box_edge(nx, ny, target_x, target_y):
    """Return the point on the box border (nx±BW/2, ny±BH/2)
    that lies on the line from (nx,ny) toward (target_x,target_y)."""
    dx = target_x - nx
    dy = target_y - ny
    half_w = BW / 2
    half_h = BH / 2
    if abs(dx) < 1e-9:
        ty = ny + (half_h if dy > 0 else -half_h)
        return nx, ty
    t_x = half_w / abs(dx)
    t_y = half_h / abs(dy) if abs(dy) > 1e-9 else float('inf')
    t = min(t_x, t_y)
    return nx + dx * t, ny + dy * t


def generate():
    """Render the three-causes-one-response diagram (theory)."""
    fig, ax = plt.subplots(figsize=(13, 8))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 8)
    ax.axis('off')

    ax.text(6.5, 7.55,
            'Figura 1.2  Tríada Causal del Control de Acceso Análogo',
            ha='center', fontsize=11,
            fontweight='bold', color=DARK)
    ax.text(6.5, 7.15,
            'Tres vectores de falla que confluyen en la necesidad '
            'de digitalización',
            ha='center', fontsize=8,
            color=GRAY, fontstyle='italic')

    # Central concept box
    ax.add_patch(mp.FancyBboxPatch(
        (CX - CBW / 2, CY - CBH / 2), CBW, CBH,
        boxstyle='round,pad=0.06', lw=2,
        facecolor='#E8F5E9', edgecolor=GREEN))
    ax.text(CX, CY, 'Digitalización\nIntegral', ha='center',
            va='center', fontsize=9,
            fontweight='bold', color=GREEN)

    for nx, ny, color, label, sub in NODES:
        # Problem box
        ax.add_patch(mp.FancyBboxPatch(
            (nx - BW / 2, ny - BH / 2), BW, BH,
            boxstyle='round,pad=0.05', lw=1.5,
            facecolor=color, edgecolor=color))
        ax.text(nx, ny + 0.12, label,
                ha='center', va='center',
                fontsize=8.5, fontweight='bold', color=WHITE)
        ax.text(nx, ny - 0.30, sub,
                ha='center', va='center',
                fontsize=6.5, color='#EEEEEE')

        # Arrow from box edge → center box edge
        src_x, src_y = _box_edge(nx, ny, CX, CY)
        dst_x, dst_y = _box_edge(CX, CY, nx, ny)
        ax.annotate('', xy=(dst_x, dst_y),
                    xytext=(src_x, src_y),
                    arrowprops=dict(arrowstyle='->',
                                    color=color, lw=1.8,
                                    linestyle='--'))

    save_fig(fig, 'fig_problem_triad.png')
