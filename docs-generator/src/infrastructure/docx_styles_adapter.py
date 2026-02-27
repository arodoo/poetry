"""
File: infrastructure/docx_styles_adapter.py
Purpose: Configures native MS Word styles and margins for the document.
All Rights Reserved Arodi Emmanuel
"""
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from src.domain.constants import MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP, MARGIN_BOTTOM, FONT_NAME

def configure_margins(doc):
    for section in doc.sections:
        section.left_margin = MARGIN_LEFT
        section.right_margin = MARGIN_RIGHT
        section.top_margin = MARGIN_TOP
        section.bottom_margin = MARGIN_BOTTOM

def _ensure_style(doc, name, style_type=1): # 1 is WD_STYLE_TYPE.PARAGRAPH
    try:
        return doc.styles[name]
    except KeyError:
        return doc.styles.add_style(name, style_type)

def configure_normal_style(doc):
    style = _ensure_style(doc, 'Normal')
    font = style.font
    font.name = FONT_NAME
    font.size = Pt(12)
    font.color.rgb = RGBColor(0, 0, 0)
    fmt = style.paragraph_format
    fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    fmt.line_spacing = 1.5
    fmt.space_before = Pt(0)
    fmt.space_after = Pt(0)

def configure_heading_styles(doc):
    all_headings = {
        'Title':     (16, Pt(0), Pt(0), WD_ALIGN_PARAGRAPH.CENTER, True),
        'Heading 1': (16, Pt(0), Pt(0), WD_ALIGN_PARAGRAPH.CENTER, True),
        'Heading 2': (14, Pt(0), Pt(0), WD_ALIGN_PARAGRAPH.LEFT, False),
        'Heading 3': (12, Pt(0), Pt(0), WD_ALIGN_PARAGRAPH.LEFT, False),
    }
    for name, (size, before, after, align, bold) in all_headings.items():
        style = _ensure_style(doc, name)
        font = style.font
        font.name = FONT_NAME
        font.size = Pt(size)
        font.bold = bold
        font.underline = False
        font.color.rgb = RGBColor(0, 0, 0)
        fmt = style.paragraph_format
        fmt.alignment = align
        fmt.space_before = before
        fmt.space_after = after
        fmt.line_spacing = 1.5

def set_page_numbers(doc):
    section = doc.sections[0]
    section.different_first_page_header_footer = True
    footer = section.footer
    paragraph = footer.paragraphs[0] if footer.paragraphs else footer.add_paragraph()
    paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = paragraph.add_run()
    fldChar1 = OxmlElement('w:fldChar')
    fldChar1.set(qn('w:fldCharType'), 'begin')
    instrText = OxmlElement('w:instrText')
    instrText.text = 'PAGE'
    fldChar2 = OxmlElement('w:fldChar')
    fldChar2.set(qn('w:fldCharType'), 'end')
    run._r.append(fldChar1)
    run._r.append(instrText)
    run._r.append(fldChar2)
    run.font.name = FONT_NAME
    run.font.size = Pt(10)

def setup_document_styles(doc):
    configure_margins(doc)
    configure_normal_style(doc)
    configure_heading_styles(doc)
    set_page_numbers(doc)
