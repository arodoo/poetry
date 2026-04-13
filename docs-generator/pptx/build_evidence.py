"""
File: docs-generator/pptx/build_evidence.py
Purpose: Creates extra blank-layout slides with
         visual evidence: pipeline, SDK, ERD, React
         tree, stack, tests, carousel and admin.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import img, add_img
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

DARK = RGBColor(0x1A, 0x23, 0x7E)


def _titled(prs, title, img_name, w=9.0):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    txBox = s.shapes.add_textbox(
        Inches(0.5), Inches(0.3),
        Inches(12), Inches(0.8))
    p = txBox.text_frame.paragraphs[0]
    p.text = title
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = DARK
    add_img(s, img(img_name),
            (13.3 - w) / 2, 1.3, w)
    return s


def add_evidence(prs):
    """Add all visual evidence slides."""
    _titled(prs, 'Pipeline CI/CD — 13 Gates',
            'fig_ci_pipeline.png', 10.0)
    _titled(prs, 'Flujo SDK (Contract-First)',
            'fig_sdk_flow.png', 10.0)
    _titled(prs, 'Modelo ER — PostgreSQL 3NF',
            'fig_erd.png', 8.0)
    _titled(prs, 'Componentes React (DDD)',
            'fig_component_tree.png', 8.0)
    _titled(prs, 'Capas Tecnológicas',
            'fig_stack.png', 7.0)
    _titled(prs, 'Pruebas (JUnit + Playwright)',
            'fig_pyramid.png', 7.0)
    _titled(prs, 'Carrusel Configurable',
            'fig_carrousel.png', 12.0)
    _add_admin(prs)


def _add_admin(prs):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    txBox = s.shapes.add_textbox(
        Inches(0.5), Inches(0.2),
        Inches(12), Inches(0.6))
    p = txBox.text_frame.paragraphs[0]
    p.text = 'Admin: Temas, Usuarios, Hardware'
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = DARK
    add_img(s, img(
        'fig_cambio_de_tema(otro_tema_ha_sido_'
        'seleccionado_y_la_interfaz_ha_'
        'cambiado).png'), 0.3, 1.0, 6.2)
    add_img(s, img(
        'fig_gesti\u00f3n_usuarios.png'),
        6.8, 1.0, 6.2)
