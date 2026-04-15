"""
File: docs-generator/pptx/build_evidence.py
Purpose: Creates extra blank-layout slides with
         visual evidence: pipeline, SDK, ERD, tree
         carousel, admin, and demo screenshots.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import (
    img, fit_img, Inches, Pt, DARK,
)

EVIDENCE_TOP = 1.3
EVIDENCE_MAX_H = 5.8


def _new(prs, title, img_name, w=9.0):
    """New blank slide with title and one image."""
    s = prs.slides.add_slide(prs.slide_layouts[6])
    tx = s.shapes.add_textbox(
        Inches(0.5), Inches(0.3),
        Inches(12), Inches(0.7))
    p = tx.text_frame.paragraphs[0]
    p.text = title
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = DARK
    left = (13.3 - w) / 2
    fit_img(s, img(img_name),
            left, EVIDENCE_TOP, w, EVIDENCE_MAX_H)
    return s


def add_evidence(prs):
    _new(prs, 'Pipeline CI/CD — 13 Gates',
         'fig_ci_pipeline.png', 10.0)
    _new(prs, 'Flujo SDK (Contract-First)',
         'fig_sdk_flow.png', 10.0)
    _new(prs, 'Modelo ER — PostgreSQL (3NF)',
         'fig_erd.png', 7.0)
    _new(prs, 'Componentes React por Dominio',
         'fig_component_tree.png', 8.0)
    _new(prs, 'Capas Tecnológicas',
         'fig_stack.png', 7.0)
    _new(prs, 'Carrusel Configurable',
         'fig_carrousel.png', 11.0)
    _admin(prs)


def _admin(prs):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    tx = s.shapes.add_textbox(
        Inches(0.5), Inches(0.2),
        Inches(12), Inches(0.5))
    p = tx.text_frame.paragraphs[0]
    p.text = 'Admin: Temas y Usuarios'
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = DARK
    fit_img(s, img(
        'fig_cambio_de_tema(otro_tema_ha_sido_'
        'seleccionado_y_la_interfaz_ha_'
        'cambiado).png'),
        0.3, 0.9, 6.2, 5.5)
    fit_img(s, img(
        'fig_gesti\u00f3n_usuarios.png'),
        6.8, 0.9, 6.2, 5.5)
