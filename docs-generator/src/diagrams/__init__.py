"""
File: docs-generator/src/diagrams/__init__.py
Purpose: Shared color palette, save utility, and drawing primitives used
         by all diagram generators. Provides a consistent visual contract.
All Rights Reserved Arodi Emmanuel
"""

import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

ASSETS_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', '..', 'content', 'assets')
)

DARK = '#1A237E'
BLUE = '#1565C0'
TEAL = '#00695C'
GREEN = '#2E7D32'
ORANGE = '#BF360C'
GRAY = '#546E7A'
WHITE = '#FFFFFF'
LIGHT_BLUE = '#E3F2FD'
LIGHT_TEAL = '#E0F2F1'
LIGHT_GRAY = '#ECEFF1'


def save_fig(fig, name):
    """Persist figure to assets directory at 150 dpi."""
    os.makedirs(ASSETS_DIR, exist_ok=True)
    path = os.path.join(ASSETS_DIR, name)
    fig.savefig(path, dpi=150, bbox_inches='tight',
                facecolor=WHITE, edgecolor='none')
    plt.close(fig)
    print(f'[OK] {name}')


def box(ax, x, y, w, h, title, sub='', fc=LIGHT_BLUE, ec=BLUE):
    """Draw a rounded box with title and optional subtitle."""
    ax.add_patch(FancyBboxPatch(
        (x, y), w, h, boxstyle='round,pad=0.03',
        linewidth=1.5, facecolor=fc, edgecolor=ec
    ))
    ty = y + h / 2 + (0.10 if sub else 0)
    ax.text(x + w / 2, ty, title, ha='center', va='center',
            fontsize=8.5, fontweight='bold', color=DARK)
    if sub:
        ax.text(x + w / 2, y + h / 2 - 0.12, sub,
                ha='center', va='center', fontsize=6.5, color=GRAY)


def arrow(ax, x1, y1, x2, y2, label='', color=TEAL, dashed=False):
    """Draw a directional arrow anchored to exact (x,y) coordinates."""
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='->', color=color, lw=1.5,
                                linestyle='--' if dashed else '-'))
    if label:
        ax.text((x1 + x2) / 2, (y1 + y2) / 2 + 0.12,
                label, ha='center', fontsize=6.5, color=color)
