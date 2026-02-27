"""
File: infrastructure/docx_components_adapter.py
Purpose: Renders specific components like the cover, acknowledgments, and figures lists.
All Rights Reserved Arodi Emmanuel
"""
import os
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from src.domain.constants import COVER_SIZES, COLOR_BLACK, FONT_NAME

def _cover_line(doc, text, size, bold=False, space_before=0, space_after=6):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    run.font.name = FONT_NAME
    run.font.size = Pt(size)
    run.bold = bold
    run.font.color.rgb = RGBColor(*COLOR_BLACK)
    return p

def render_cover_page(doc):
    _cover_line(doc, 'UNIVERSIDAD TECNOLÓGICA DEL CENTRO DE VERACRUZ', COVER_SIZES['university'], space_before=0, space_after=0)
    _cover_line(doc, 'Ingeniería en Gestión y Desarrollo de Software', COVER_SIZES['degree'], space_before=0, space_after=36)

    _cover_line(doc, 'Sistema de Control de Acceso Biométrico con Arquitectura de Software Orientada a Dominio:', COVER_SIZES['title'], space_before=0, space_after=0)
    _cover_line(doc, 'el Caso Poetry', COVER_SIZES['title'], space_before=0, space_after=36)

    _cover_line(doc, 'T E S I S', COVER_SIZES['type'], bold=True, space_before=0, space_after=8)
    _cover_line(doc, 'QUE PARA OBTENER EL GRADO ACADÉMICO DE:', COVER_SIZES['legends'], space_before=0, space_after=0)
    _cover_line(doc, 'INGENIERO', COVER_SIZES['legends'], space_before=0, space_after=36)

    _cover_line(doc, 'P R E S E N T A:', COVER_SIZES['legends'], space_before=0, space_after=0)
    _cover_line(doc, 'Arodi Emmanuel Haro Palacios', COVER_SIZES['legends'], space_before=0, space_after=18)

    _cover_line(doc, 'ASESOR FORMATIVO: LUIS ROLANDO GUARNEROS NOLASCO', COVER_SIZES['advisors'], space_before=0, space_after=36)

    _cover_line(doc, 'CUITLÁHUAC, VER.                 ABRIL, 2026', COVER_SIZES['advisors'], space_before=0, space_after=0)

    doc.add_page_break()

def render_acknowledgments(doc):
    h = doc.add_heading('AGRADECIMIENTOS', level=1)
    h.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    for run in h.runs:
        run.font.underline = False
        run.font.color.rgb = RGBColor(*COLOR_BLACK)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(12)

    text = (
        "Expreso mi más profundo agradecimiento a mi asesor de tesis, "
        "el Mtro. Luis Rolando Guarneros Nolasco, por su guía técnica, "
        "su paciencia y sus valiosas contribuciones que permitieron elevar "
        "el estándar de esta investigación. Su visión sobre la ingeniería "
        "de software ha sido fundamental para el desarrollo del Sistema Poetry."
    )
    run = p.add_run(text)
    run.font.name = FONT_NAME
    run.font.size = Pt(12)

    doc.add_page_break()

def render_list_of_figures(doc):
    h = doc.add_heading('ÍNDICE DE FIGURAS', level=1)
    h.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    for run in h.runs:
        run.font.underline = False
        run.font.color.rgb = RGBColor(*COLOR_BLACK)

    figures = [
        ('Figura 3.2', 'Arquitectura de Contenedores del Sistema Poetry (C4 L2)'),
        ('Figura 3.3', 'Esquema Entidad-Relación normalizado (3NF)'),
        ('Figura 3.4', 'Secuencia de Autenticación y Control de Acceso Biométrico'),
        ('Figura 3.5', 'Capas Tecnológicas del Sistema (generado con matplotlib)'),
        ('Figura 4.1', 'Pirámide de Pruebas — Cohn, 2009'),
        ('Figura 4.2', 'Interfaz de acceso biométrico (Chely Boops)'),
        ('Figura 4.3', 'Dashboard principal de administración'),
        ('Figura 4.4', 'Panel estadístico y métricas del sistema'),
    ]
    for fig_num, fig_caption in figures:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.line_spacing = 1.5
        r1 = p.add_run(f'{fig_num}: ')
        r1.bold = True
        r1.font.name = FONT_NAME
        r1.font.size = Pt(12)
        r2 = p.add_run(fig_caption)
        r2.font.name = FONT_NAME
        r2.font.size = Pt(12)
