"""
File: docs-generator/pptx/build_evidence.py
Purpose: Creates extra blank-layout slides with
         visual evidence: pipeline, SDK, ERD, tree
         carousel, admin, and demo screenshots.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import img, Inches, Pt, DARK


def _new(prs, title, img_name, w=9.0, t=1.5):
    """New blank slide with title and one image."""
    s = prs.slides.add_slide(prs.slide_layouts[6])
    tx = s.shapes.add_textbox(
        Inches(0.5), Inches(0.3),
        Inches(12), Inches(0.8))
    p = tx.text_frame.paragraphs[0]
    p.text = title
    p.font.size = Pt(26)
    p.font.bold = True
    p.font.color.rgb = DARK
    left = Inches((13.3 - w) / 2)
    s.shapes.add_picture(
        img(img_name), left, Inches(t), Inches(w))
    return s


def add_evidence(prs):
    """Add all visual evidence slides."""
    _new(prs, 'Pipeline CI/CD — 13 Gates',
         'fig_ci_pipeline.png', 10.0)
    _new(prs, 'Flujo SDK (Contract-First)',
         'fig_sdk_flow.png', 10.0)
    _new(prs, 'Modelo ER — PostgreSQL (3NF)',
         'fig_erd.png', 8.0, 1.3)
    _new(prs, 'Componentes React por Dominio',
         'fig_component_tree.png', 8.0)
    _new(prs, 'Capas Tecnológicas',
         'fig_stack.png', 7.0, 1.3)
    _new(prs, 'Carrusel Configurable',
         'fig_carrousel.png', 12.0, 1.2)
    _admin(prs)


def _admin(prs):
    """Admin panel with two screenshots."""
    s = prs.slides.add_slide(prs.slide_layouts[6])
    tx = s.shapes.add_textbox(
        Inches(0.5), Inches(0.2),
        Inches(12), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = 'Admin: Temas y Usuarios'
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = DARK
    s.shapes.add_picture(img(
        'fig_cambio_de_tema(otro_tema_ha_sido_'
        'seleccionado_y_la_interfaz_ha_'
        'cambiado).png'),
        Inches(0.3), Inches(1.0), Inches(6.2))
    s.shapes.add_picture(img(
        'fig_gesti\u00f3n_usuarios.png'),
        Inches(6.8), Inches(1.0), Inches(6.2))
