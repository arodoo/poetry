"""
File: docs-generator/src/diagrams/sdk_flow.py
Purpose: Generates the SDK generation flow diagram
         showing the contract-first artifact pipeline
         from OpenAPI spec to TypeScript client.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from . import save_fig, DARK, BLUE, TEAL, GREEN
from . import ORANGE, GRAY, LIGHT_BLUE, WHITE

STEPS = [
    ('Backend\n/api-docs', TEAL, '#E0F2F1'),
    ('OpenAPI\nYAML', ORANGE, '#FFF3E0'),
    ('npm run\nsdk:generate', BLUE, LIGHT_BLUE),
    ('SDK\nTypeScript', GREEN, '#E8F5E9'),
    ('Frontend\nImport', '#6A1B9A', '#F3E5F5'),
]
BW, BH = 1.8, 1.0


def generate():
    """Render the SDK generation flow diagram."""
    fig, ax = plt.subplots(figsize=(12, 3))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 3)
    ax.axis('off')
    ax.text(
        6, 2.7, 'Flujo de Generación SDK',
        ha='center', fontsize=11,
        fontweight='bold', color=DARK)

    for i, (label, ec, fc) in enumerate(STEPS):
        x = 0.3 + i * 2.3
        ax.add_patch(FancyBboxPatch(
            (x, 0.7), BW, BH,
            boxstyle='round,pad=0.04',
            lw=1.5, facecolor=fc, edgecolor=ec))
        ax.text(
            x + BW / 2, 0.7 + BH / 2, label,
            ha='center', va='center',
            fontsize=8, fontweight='bold',
            color=DARK)
        if i < len(STEPS) - 1:
            ax.annotate(
                '',
                xy=(x + BW + 0.15, 1.2),
                xytext=(x + BW, 1.2),
                arrowprops=dict(
                    arrowstyle='->',
                    color=GRAY, lw=2))

    save_fig(fig, 'fig_sdk_flow.png')
