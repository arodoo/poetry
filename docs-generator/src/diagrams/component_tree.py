"""
File: docs-generator/src/diagrams/component_tree.py
Purpose: Generates the React component tree diagram
         showing UI architecture organized by three
         domain branches with child components.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from . import save_fig, DARK, BLUE, TEAL
from . import GREEN, ORANGE, LIGHT_BLUE

BW, BH = 1.5, 0.55
NODES = [
    (5, 4.2, 'App', BLUE, LIGHT_BLUE),
    (1.5, 2.6, 'Dashboard', GREEN, '#E8F5E9'),
    (5, 2.6, 'AccessView', ORANGE, '#FFF3E0'),
    (8.5, 2.6, 'Subscriptions', TEAL, '#E0F2F1'),
    (0.7, 1.0, 'MemberList', GREEN, '#E8F5E9'),
    (2.3, 1.0, 'Charts', GREEN, '#E8F5E9'),
    (4.2, 1.0, 'Fingerprint', ORANGE, '#FFF3E0'),
    (5.8, 1.0, 'Status', ORANGE, '#FFF3E0'),
    (7.7, 1.0, 'SaleForm', TEAL, '#E0F2F1'),
    (9.3, 1.0, 'History', TEAL, '#E0F2F1'),
]
EDGES = [
    (0, 1), (0, 2), (0, 3), (1, 4), (1, 5),
    (2, 6), (2, 7), (3, 8), (3, 9),
]


def generate():
    """Render the React component tree diagram."""
    fig, ax = plt.subplots(figsize=(11, 5.5))
    ax.set_xlim(-0.2, 10.5)
    ax.set_ylim(0, 5.5)
    ax.axis('off')
    ax.text(
        5, 5.1, 'Árbol de Componentes React',
        ha='center', fontsize=11,
        fontweight='bold', color=DARK)
    for x, y, lbl, ec, fc in NODES:
        ax.add_patch(FancyBboxPatch(
            (x - BW / 2, y), BW, BH,
            boxstyle='round,pad=0.03',
            lw=1.5, facecolor=fc, edgecolor=ec))
        ax.text(
            x, y + BH / 2, lbl, ha='center',
            va='center', fontsize=7,
            fontweight='bold', color=DARK)
    for pi, ci in EDGES:
        px, py = NODES[pi][0], NODES[pi][1]
        cx, cy = NODES[ci][0], NODES[ci][1] + BH
        ax.plot(
            [px, cx], [py, cy],
            color='#90A4AE', lw=1.5)
    save_fig(fig, 'fig_component_tree.png')
