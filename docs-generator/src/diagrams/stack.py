"""
File: docs-generator/src/diagrams/stack.py
Purpose: Technology stack visualization using horizontal band layers.
         Demonstrates the full tech stack from hardware to UI.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
from . import save_fig, DARK, BLUE, TEAL, GREEN, ORANGE, GRAY, WHITE

LAYERS = [
    ('#FF8F00', '#FFF8E1', 'Capa de Presentación',
     ['React 18', 'Vite 5', 'TypeScript', 'React Query']),
    (BLUE,     '#E3F2FD', 'Capa de API / Seguridad',
     ['Spring Boot 3', 'JWT / RBAC', 'OpenAPI 3', 'Spring Security']),
    (TEAL,     '#E0F2F1', 'Capa de Dominio / Aplicación',
     ['Clean Architecture', 'DDD', 'Use Cases', 'Ports & Adapters']),
    ('#5E35B1', '#EDE7F6', 'Capa de Datos',
     ['PostgreSQL 15', 'Hibernate ORM', 'Flyway', 'JDBC']),
    (GRAY,     '#ECEFF1', 'Capa de Hardware / Integración',
     ['Sensor USB HID', 'Java SDK Bridge', 'Socket', 'Spring Events']),
]

LH = 1.1   # layer height
GAP = 0.12  # gap between layers
W = 12      # total canvas width
PW = 2.8    # label column width
TW = W - PW - 0.4  # tech column width


def generate():
    """Render the horizontal tech stack layer diagram."""
    total_h = len(LAYERS) * (LH + GAP) + 1.2
    fig, ax = plt.subplots(figsize=(13, total_h))
    ax.set_xlim(0, W), ax.set_ylim(0, total_h)
    ax.axis('off')

    ax.text(W / 2, total_h - 0.4,
            'Figura 3.5  Capas Tecnológicas del Sistema Poetry',
            ha='center', fontsize=11, fontweight='bold', color=DARK)
    ax.text(W / 2, total_h - 0.75,
            'Generado programáticamente con Python + matplotlib',
            ha='center', fontsize=7.5, color=GRAY, fontstyle='italic')

    for i, (ec, fc, label, techs) in enumerate(LAYERS):
        y = (len(LAYERS) - 1 - i) * (LH + GAP) + 0.2

        # Label band (left)
        ax.add_patch(mp.FancyBboxPatch(
            (0.2, y), PW, LH,
            boxstyle='round,pad=0.04', lw=1.5,
            facecolor=ec, edgecolor=ec))
        ax.text(0.2 + PW / 2, y + LH / 2, label,
                ha='center', va='center', fontsize=8,
                fontweight='bold', color=WHITE)

        # Tech band (right)
        ax.add_patch(mp.FancyBboxPatch(
            (PW + 0.4, y), TW, LH,
            boxstyle='round,pad=0.04', lw=1.5,
            facecolor=fc, edgecolor=ec))

        chip_w = TW / len(techs) - 0.2
        for j, tech in enumerate(techs):
            cx = PW + 0.4 + j * (chip_w + 0.2) + 0.1
            ax.add_patch(mp.FancyBboxPatch(
                (cx, y + 0.2), chip_w, LH - 0.4,
                boxstyle='round,pad=0.04', lw=1,
                facecolor=WHITE, edgecolor=ec))
            ax.text(cx + chip_w / 2, y + LH / 2, tech,
                    ha='center', va='center', fontsize=7.5,
                    fontweight='bold', color=DARK)

    save_fig(fig, 'fig_stack.png')
