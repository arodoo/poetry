"""
File: docs-generator/src/diagrams/pyramid.py
Purpose: Testing pyramid visualization based on Cohn (2009).
         Illustrates the proportional relationship between test layers.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
import numpy as np
from . import save_fig, DARK, BLUE, TEAL, GREEN, ORANGE, GRAY, WHITE

LEVELS = [
    (GREEN,   0.72, 1.0,  'E2E — Playwright',
     'Alto costo, poca cantidad'),
    ('#FF8F00', 0.48, 0.65, 'Integración — Spring Boot Test',
     'Verifican flujos entre capas'),
    (BLUE,    0.0,  0.46, 'Unitarias — JUnit 5 + Mockito',
     'Rápidas, aisladas, abundantes'),
]


def _trapezoid(ax, base_ratio, top_ratio, y_bot, y_top, color, ec, alpha=0.92):
    """Draw a trapezoid slice of the pyramid using precise math."""
    cx = 7.0  # horizontal center of the pyramid
    half_base = base_ratio * 6.0
    half_top = top_ratio * 6.0
    poly = mp.Polygon([
        (cx - half_base, y_bot),
        (cx + half_base, y_bot),
        (cx + half_top,  y_top),
        (cx - half_top,  y_top),
    ], closed=True, facecolor=color, edgecolor=ec, lw=1.5, alpha=alpha)
    ax.add_patch(poly)


def generate():
    """Render the testing pyramid diagram."""
    fig, ax = plt.subplots(figsize=(12, 8))
    ax.set_xlim(0, 14), ax.set_ylim(0, 8)
    ax.axis('off')

    ax.text(7, 7.7, 'Figura 4.1  Pirámide de Pruebas (Cohn, 2009)',
            ha='center', fontsize=11, fontweight='bold', color=DARK)
    ax.text(7, 7.35,
            'Estrategia de validación del Sistema Poetry',
            ha='center', fontsize=8, color=GRAY)

    # Pyramid slices (bottom to top)
    _trapezoid(ax, 1.0, 0.65, 0.4, 2.6, BLUE, '#0D47A1')
    _trapezoid(ax, 0.65, 0.3, 2.6, 4.8, '#FF8F00', '#E65100')
    _trapezoid(ax, 0.3, 0.0, 4.8, 7.0, GREEN, '#1B5E20')

    # Labels inside each slice
    ax.text(7, 1.5, 'UNITARIAS', ha='center', va='center',
            fontsize=11, fontweight='bold', color=WHITE)
    ax.text(7, 0.9, 'JUnit 5 + Mockito  |  >80% cobertura',
            ha='center', va='center', fontsize=7.5, color='#E3F2FD')

    ax.text(7, 3.7, 'INTEGRACIÓN', ha='center', va='center',
            fontsize=10, fontweight='bold', color=WHITE)
    ax.text(7, 3.1, 'Spring Boot Test  |  Contratos OpenAPI',
            ha='center', va='center', fontsize=7.5, color='#FFF8E1')

    ax.text(7, 5.9, 'E2E', ha='center', va='center',
            fontsize=10, fontweight='bold', color=WHITE)
    ax.text(7, 5.35, 'Playwright  |  Flujo crítico de registro',
            ha='center', va='center', fontsize=7.5, color='#E8F5E9')

    # Side annotations
    ax.text(0.5, 1.5, 'Muchas\nRápidas\nBaratas', ha='center',
            fontsize=7.5, color=BLUE, va='center')
    ax.text(0.5, 5.9, 'Pocas\nLentas\nCostosas', ha='center',
            fontsize=7.5, color=GREEN, va='center')
    ax.annotate('', xy=(0.5, 4.8), xytext=(0.5, 2.6),
                arrowprops=dict(arrowstyle='<->', color=GRAY, lw=1.5))

    save_fig(fig, 'fig_pyramid.png')
