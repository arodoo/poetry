"""
File: infrastructure/docx_components_adapter.py
Purpose: Renders specific components like the cover, acknowledgments, and figures lists.
All Rights Reserved Arodi Emmanuel
"""
import os
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
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
        "A todo aquel a quien corresponda."
    )
    run = p.add_run(text)
    run.font.name = FONT_NAME
    run.font.size = Pt(12)

    doc.add_page_break()

def _enable_auto_update_fields(doc):
    """Set updateFields=true so Word recalculates TOC on open."""
    settings = doc.settings.element
    existing = settings.find(qn('w:updateFields'))
    if existing is None:
        uf = OxmlElement('w:updateFields')
        uf.set(qn('w:val'), 'true')
        settings.append(uf)

def render_table_of_contents(doc):
    """
    Injects an automatic Table of Contents field into the document.
    Also enables auto-update so Word recalculates on open.
    """
    _enable_auto_update_fields(doc)
    h = doc.add_heading('ÍNDICE DE CONTENIDOS', level=1)
    h.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    for run in h.runs:
        run.font.underline = False
        run.font.color.rgb = RGBColor(*COLOR_BLACK)

    instructions = doc.add_paragraph("⚠️ El índice es automático. Haz clic en el texto de abajo y presiona F9 (o Clic derecho -> Actualizar campos).")
    instructions.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if instructions.runs:
        instructions.runs[0].font.color.rgb = RGBColor(120, 120, 120)
        instructions.runs[0].font.size = Pt(10)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run()
    
    # 1. Begin field
    fldChar1 = OxmlElement('w:fldChar')
    fldChar1.set(qn('w:fldCharType'), 'begin')
    
    # 2. Instruction Text: TOC \o "1-3" \h \z \u
    instrText = OxmlElement('w:instrText')
    instrText.set(qn('xml:space'), 'preserve')
    instrText.text = 'TOC \\o "1-3" \\h \\z \\u'
    
    # 3. Separate
    fldChar2 = OxmlElement('w:fldChar')
    fldChar2.set(qn('w:fldCharType'), 'separate')
    
    # 4. End field
    fldChar3 = OxmlElement('w:fldChar')
    fldChar3.set(qn('w:fldCharType'), 'end')
    
    run._r.append(fldChar1)
    run._r.append(instrText)
    run._r.append(fldChar2)
    
    # Add visible placeholder text so the user can actually click it
    update_text = OxmlElement('w:t')
    update_text.text = "[ Clic derecho aquí -> Actualizar campos ]"
    run._r.append(update_text)
    
    run._r.append(fldChar3)
    
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
        ('Figura 1.1', 'Línea Temporal del Control de Acceso'),
        ('Figura 1.2', 'Tríada de Problemas Operativos'),
        ('Figura 2.1', 'Mapa de Contextos Delimitados (DDD)'),
        ('Figura 2.2', 'Arquitectura Limpia — Martin, 2017'),
        ('Figura 2.3', 'Principios SOLID — Martin, 2002'),
        ('Figura 2.4', 'Reconciliación del Virtual DOM'),
        ('Figura 3.2', 'Arquitectura de Contenedores (C4 L2)'),
        ('Figura 3.3', 'Esquema Entidad-Relación (3NF)'),
        ('Figura 3.4', 'Secuencia de Autenticación Biométrica'),
        ('Figura 3.5', 'Capas Tecnológicas del Sistema'),
        ('Figura 4.1', 'Pirámide de Pruebas — Cohn, 2009'),
        ('Figura 4.2', 'Interfaz de acceso biométrico'),
        ('Figura 4.3', 'Dashboard principal de administración'),
        ('Figura 4.4', 'Panel estadístico y métricas'),
        ('Figura 4.5', 'Gestión de usuarios'),
        ('Figura 4.6', 'Venta de membresía'),
        ('Figura 4.7', 'Panel de hardware biométrico (ADMIN)'),
        ('Figura 4.8', 'Controles de personalización'),
        ('Figura 4.9', 'Cambio de tema en tiempo real'),
        ('Figura 4.10', 'Carrusel de imágenes'),
        ('Figura 4.11', 'Configuración del carrusel'),
        ('Figura 4.12', 'Respaldo de BD y exportación'),
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
