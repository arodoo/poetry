"""
File: docs-generator/generate_docx.py
Purpose: Generates a thesis-formatted DOCX from Markdown source files. Applies
         proper academic standards: Arial font, 1.25 line spacing, justified
         paragraphs, 3cm left binding margin, and numbered page footer.
All Rights Reserved Arodi Emmanuel
"""

import os
import re
import docx
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml.ns import qn
from docx.oxml import OxmlElement


def _set_page_numbers(doc):
    """Add page number in the footer, right-aligned."""
    section = doc.sections[0]
    footer = section.footer
    paragraph = footer.paragraphs[0]
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
    run.font.name = 'Arial'
    run.font.size = Pt(10)


def _configure_normal(doc):
    """Configure Normal style: Arial 12, 1.25 spacing, justified."""
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Arial'
    font.size = Pt(12)
    font.color.rgb = RGBColor(0, 0, 0)
    fmt = style.paragraph_format
    fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    fmt.line_spacing = 1.25
    fmt.space_before = Pt(0)
    fmt.space_after = Pt(10)


def _configure_headings(doc):
    """Configure Heading 1/2/3: Arial bold, black, no color accent."""
    configs = {
        'Heading 1': (14, Pt(18), Pt(6), WD_ALIGN_PARAGRAPH.CENTER),
        'Heading 2': (13, Pt(12), Pt(4), WD_ALIGN_PARAGRAPH.LEFT),
        'Heading 3': (12, Pt(10), Pt(4), WD_ALIGN_PARAGRAPH.LEFT),
    }
    for name, (size, before, after, align) in configs.items():
        style = doc.styles[name]
        font = style.font
        font.name = 'Arial'
        font.size = Pt(size)
        font.bold = True
        font.color.rgb = RGBColor(0, 0, 0)
        fmt = style.paragraph_format
        fmt.alignment = align
        fmt.space_before = before
        fmt.space_after = after
        fmt.line_spacing = 1.0


def _add_body(doc, text):
    """Body paragraph: 1.25 spacing, justified, 0.7cm first-line indent."""
    p = doc.add_paragraph(text)
    fmt = p.paragraph_format
    fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    fmt.first_line_indent = Cm(0.7)
    fmt.line_spacing = 1.25
    fmt.space_after = Pt(10)
    for run in p.runs:
        run.font.name = 'Arial'
        run.font.size = Pt(12)
    return p


def _add_bullet(doc, text):
    """Bullet item: no first-line indent, Arial 12, 1.25."""
    p = doc.add_paragraph(text, style='List Bullet')
    fmt = p.paragraph_format
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.25
    for run in p.runs:
        run.font.name = 'Arial'
        run.font.size = Pt(12)
    return p


def _add_numbered(doc, text):
    """Numbered item: no first-line indent, Arial 12, 1.25."""
    p = doc.add_paragraph(text, style='List Number')
    fmt = p.paragraph_format
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.25
    for run in p.runs:
        run.font.name = 'Arial'
        run.font.size = Pt(12)
    return p


def _parse_blocks(doc, content):
    """Parse Markdown content using blank-line blocks for correct flow."""
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    blocks = [b.strip() for b in content.strip().split('\n\n') if b.strip()]
    for block in blocks:
        if block.startswith('# '):
            doc.add_heading(block[2:].strip(), level=1)
        elif block.startswith('## '):
            doc.add_heading(block[3:].strip(), level=2)
        elif block.startswith('### '):
            doc.add_heading(block[4:].strip(), level=3)
        elif re.match(r'^[-*] ', block):
            for line in block.splitlines():
                item = re.sub(r'^[-*]\s+', '', line.strip())
                if item:
                    _add_bullet(doc, item)
        elif re.match(r'^\d+\.', block):
            for line in block.splitlines():
                m = re.match(r'^\d+\.\s*(.+)', line.strip())
                if m:
                    _add_numbered(doc, m.group(1))
        else:
            text = ' '.join(block.splitlines()).strip()
            _add_body(doc, text)


def create_thesis_docx():
    """Build and save the thesis-formatted document."""
    doc = docx.Document()

    # Margins: 3cm left (binding), 2.5cm others
    for section in doc.sections:
        section.left_margin = Cm(3)
        section.right_margin = Cm(2.5)
        section.top_margin = Cm(2.5)
        section.bottom_margin = Cm(2.5)

    _configure_normal(doc)
    _configure_headings(doc)
    _set_page_numbers(doc)

    # Determine base content directory relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    content_base = os.path.abspath(os.path.join(script_dir, '..', 'content'))

    # Chapters to process
    chapters = [
        ('1', 'CAPÍTULO 1. INTRODUCCIÓN Y GENERALIDADES', 'capitulo_1', [
            '1.1_introduccion.md', '1.2_antecedentes.md', 
            '1.3_planteamiento_problema.md', '1.4_objetivos.md', 
            '1.5_justificación.md', '1.6_alcances_limitaciones.md'
        ]),
        ('2', 'CAPÍTULO 2. MARCO TEÓRICO Y TECNOLÓGICO', 'capitulo_2', [
            '2.1_ddd.md', '2.2_clean_architecture.md', '2.3_solid.md',
            '2.4_tecnologias_backend.md', '2.5_tecnologias_frontend.md',
            '2.6_base_de_datos.md', '2.7_herramientas_desarrollo.md'
        ])
    ]

    for num, title_text, subdir, files in chapters:
        # Chapter title
        title = doc.add_heading(title_text, 0)
        title.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for run in title.runs:
            run.font.name = 'Arial'
            run.font.color.rgb = RGBColor(0, 0, 0)

        chapter_dir = os.path.join(content_base, subdir)
        for filename in files:
            path = os.path.join(chapter_dir, filename)
            if not os.path.exists(path):
                print(f'Missing: {path}')
                continue
            with open(path, 'r', encoding='utf-8') as fh:
                content = fh.read()
            _parse_blocks(doc, content)
            doc.add_paragraph()  # visual breathing room between sections
        
        doc.add_page_break()

    # Save to the root of the docs-generator module
    output_path = os.path.abspath(os.path.join(content_base, '..', 'Tesis_Poetry_v11.docx'))
    doc.save(output_path)
    print(f'Saved: {output_path}')


if __name__ == '__main__':
    create_thesis_docx()
