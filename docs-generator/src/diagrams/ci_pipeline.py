"""
File: docs-generator/src/diagrams/ci_pipeline.py
Purpose: Generates the CI/CD pipeline diagram showing
         the automated quality gates executed on every
         pre-commit hook invocation by Husky.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from . import save_fig, DARK, BLUE, TEAL, GREEN
from . import ORANGE, GRAY, LIGHT_BLUE, WHITE

STAGES = [
    ('Git\nCommit', ORANGE, '#FFF3E0'),
    ('Headers\nLimits\ni18n', BLUE, LIGHT_BLUE),
    ('OpenAPI\nSDK Sync\nModules', TEAL, '#E0F2F1'),
    ('Lint\nFormat\nCheckstyle', GREEN, '#E8F5E9'),
    ('Typecheck\nTests\nBuild', '#6A1B9A', '#F3E5F5'),
]
BW, BH = 1.8, 1.2


def generate():
    """Render the CI/CD pipeline diagram."""
    fig, ax = plt.subplots(figsize=(12, 3.5))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 3.5)
    ax.axis('off')
    ax.text(
        6, 3.2, 'Pipeline CI/CD Local',
        ha='center', fontsize=11,
        fontweight='bold', color=DARK)

    for i, (label, ec, fc) in enumerate(STAGES):
        x = 0.3 + i * 2.3
        ax.add_patch(FancyBboxPatch(
            (x, 0.8), BW, BH,
            boxstyle='round,pad=0.04',
            lw=1.5, facecolor=fc, edgecolor=ec))
        ax.text(
            x + BW / 2, 0.8 + BH / 2, label,
            ha='center', va='center',
            fontsize=7.5, fontweight='bold',
            color=DARK)
        if i < len(STAGES) - 1:
            ax.annotate(
                '',
                xy=(x + BW + 0.15, 1.4),
                xytext=(x + BW, 1.4),
                arrowprops=dict(
                    arrowstyle='->',
                    color=GRAY, lw=2))

    save_fig(fig, 'fig_ci_pipeline.png')
