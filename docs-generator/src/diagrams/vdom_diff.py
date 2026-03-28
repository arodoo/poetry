"""
File: docs-generator/src/diagrams/vdom_diff.py
Purpose: Side-by-side comparison of Virtual DOM tree vs Real DOM tree
         with diff/patch arrows showing the reconciliation process.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
from . import save_fig, DARK, BLUE, TEAL, GREEN
from . import ORANGE, GRAY, WHITE

NODE_R = 0.3


def _tree(ax, cx, top_y, color, label, changed_idx=None):
    """Draw a simple 3-level tree centered at cx."""
    nodes = [
        (cx, top_y),
        (cx - 1.2, top_y - 1.3),
        (cx + 1.2, top_y - 1.3),
        (cx - 1.8, top_y - 2.6),
        (cx - 0.6, top_y - 2.6),
        (cx + 0.6, top_y - 2.6),
        (cx + 1.8, top_y - 2.6),
    ]
    edges = [(0, 1), (0, 2), (1, 3), (1, 4), (2, 5), (2, 6)]
    for p, c in edges:
        ax.plot([nodes[p][0], nodes[c][0]],
                [nodes[p][1], nodes[c][1]],
                color=GRAY, lw=1.2, zorder=0)
    changed = changed_idx or []
    for i, (nx, ny) in enumerate(nodes):
        fc = ORANGE if i in changed else color
        ax.add_patch(mp.Circle(
            (nx, ny), NODE_R, facecolor=fc,
            edgecolor=WHITE, lw=1.5, zorder=2))
    ax.text(cx, top_y + 0.65, label,
            ha='center', fontsize=9,
            fontweight='bold', color=color)


def generate():
    """Render Virtual DOM vs Real DOM diff diagram."""
    fig, ax = plt.subplots(figsize=(13, 7))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 7)
    ax.axis('off')

    ax.text(6.5, 6.6,
            'Figura 2.4  Reconciliación del Virtual DOM',
            ha='center', fontsize=11,
            fontweight='bold', color=DARK)

    _tree(ax, 3.5, 5.2, BLUE, 'Virtual DOM (t-1)')
    _tree(ax, 9.5, 5.2, TEAL, 'Virtual DOM (t)',
          changed_idx=[2, 5])

    # Diff arrow
    ax.annotate('diff', xy=(7.8, 4.0), xytext=(5.2, 4.0),
                fontsize=9, fontweight='bold', color=ORANGE,
                ha='center', va='center',
                arrowprops=dict(arrowstyle='->',
                                color=ORANGE, lw=2))

    # Patch arrow down to Real DOM
    ax.annotate('patch', xy=(6.5, 1.0), xytext=(6.5, 2.5),
                fontsize=9, fontweight='bold', color=GREEN,
                ha='center',
                arrowprops=dict(arrowstyle='->',
                                color=GREEN, lw=2))

    ax.text(6.5, 0.6, 'Real DOM (mínimas mutaciones)',
            ha='center', fontsize=8, color=GRAY,
            fontstyle='italic')

    save_fig(fig, 'fig_vdom_diff.png')
