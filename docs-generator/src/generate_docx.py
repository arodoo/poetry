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
from docx.shared import Pt, Cm, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
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
    """Configure all heading styles: Arial 14pt bold, no underline."""
    all_headings = {
        'Title':     (14, Pt(12), Pt(4), WD_ALIGN_PARAGRAPH.LEFT),
        'Heading 1': (14, Pt(12), Pt(4), WD_ALIGN_PARAGRAPH.LEFT),
        'Heading 2': (14, Pt(10), Pt(3), WD_ALIGN_PARAGRAPH.LEFT),
        'Heading 3': (12, Pt(8),  Pt(2), WD_ALIGN_PARAGRAPH.LEFT),
    }
    for name, (size, before, after, align) in all_headings.items():
        style = doc.styles[name]
        font = style.font
        font.name = 'Arial'
        font.size = Pt(size)
        font.bold = True
        font.underline = False
        font.color.rgb = RGBColor(0, 0, 0)
        fmt = style.paragraph_format
        fmt.alignment = align
        fmt.space_before = before
        fmt.space_after = after
        fmt.line_spacing = 1.5


def _clean(text):
    """Strip Markdown bold/italic markers and inline code backticks."""
    text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
    text = re.sub(r'\*(.+?)\*', r'\1', text)
    text = re.sub(r'`(.+?)`', r'\1', text)
    return text


def _add_body(doc, text):
    """Body paragraph: 1.5 spacing, justified, 0.7cm first-line indent."""
    p = doc.add_paragraph(_clean(text))
    fmt = p.paragraph_format
    fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    fmt.first_line_indent = Cm(0.7)
    fmt.line_spacing = 1.5
    fmt.space_after = Pt(6)
    for run in p.runs:
        run.font.name = 'Arial'
        run.font.size = Pt(12)
    return p


def _add_bullet(doc, text):
    """Bullet item: no first-line indent, Arial 12, 1.5."""
    p = doc.add_paragraph(_clean(text), style='List Bullet')
    fmt = p.paragraph_format
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.5
    for run in p.runs:
        run.font.name = 'Arial'
        run.font.size = Pt(12)
    return p


def _add_numbered(doc, text):
    """Numbered item: no first-line indent, Arial 12, 1.5."""
    p = doc.add_paragraph(_clean(text), style='List Number')
    fmt = p.paragraph_format
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.5
    for run in p.runs:
        run.font.name = 'Arial'
        run.font.size = Pt(12)
    return p


_ASSETS_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'content', 'assets')
)

_FIGURE_MAP = {
    'fig_arch':     'fig_arch.png',
    'fig_erd':      'fig_erd.png',
    'fig_sequence': 'fig_sequence.png',
    'fig_stack':    'fig_stack.png',
    'fig_pyramid':  'fig_pyramid.png',
}


def _add_image(doc, fig_key):
    """Embed a diagram PNG centered at full text width."""
    filename = _FIGURE_MAP.get(fig_key)
    if not filename:
        return
    path = os.path.join(_ASSETS_DIR, filename)
    if not os.path.exists(path):
        print(f'[WARN] Image not found: {path}')
        return
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run()
    run.add_picture(path, width=Inches(5.8))


def _parse_blocks(doc, content):
    """Parse Markdown content using blank-line blocks for correct flow."""
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)

    # FIX: Ensure blank line after headers to prevent body merging into bold header style
    # Matches: ^(Hashes Text)\n(Non-Newline) -> Insert extra \n
    content = re.sub(r'^(#+ .+)(\n)(?=[^\n])', r'\1\n\n', content, flags=re.MULTILINE)

    blocks = [b.strip() for b in content.strip().split('\n\n') if b.strip()]
    for block in blocks:
        # Skip fenced code blocks (mermaid etc.) entirely
        if block.startswith('```'):
            continue
        # Inline image marker: !!fig_key!!
        img_match = re.match(r'^!!(fig_\w+)!!$', block.strip())
        if img_match:
            _add_image(doc, img_match.group(1))
        elif block.startswith('# '):
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
    # Format: (Chapter Number, Title, Directory Name)
    chapters_meta = [
        ('1', 'CAPÍTULO 1. INTRODUCCIÓN Y GENERALIDADES', 'capitulo_1'),
        ('2', 'CAPÍTULO 2. MARCO TEÓRICO Y TECNOLÓGICO', 'capitulo_2'),
        ('3', 'CAPÍTULO 3. DESARROLLO E IMPLEMENTACIÓN', 'capitulo_3'),
        ('4', 'CAPÍTULO 4. RESULTADOS Y CONCLUSIONES', 'capitulo_4'),
        ('R', 'REFERENCIAS', 'referencias')
    ]

    for num, title_text, subdir in chapters_meta:
        # Chapter title: use Heading 1 style (already configured: 14pt, no underline)
        title = doc.add_heading(title_text, level=1)
        title.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        for run in title.runs:
            run.font.name = 'Arial'
            run.font.underline = False
            run.font.color.rgb = RGBColor(0, 0, 0)

        chapter_dir = os.path.join(content_base, subdir)
        if not os.path.exists(chapter_dir):
            print(f'Skipping missing directory: {chapter_dir}')
            continue

        # Dynamic file loading: sorted by filename
        files = sorted([f for f in os.listdir(chapter_dir) if f.endswith('.md')])
        
        for filename in files:
            path = os.path.join(chapter_dir, filename)
            print(f'Processing: {path}')
            with open(path, 'r', encoding='utf-8') as fh:
                content = fh.read()
            _parse_blocks(doc, content)
            doc.add_paragraph()  # visual breathing room between sections
        
        doc.add_page_break()

    # --- Índice de Figuras (List of Figures) — after References ---
    h = doc.add_heading('ÍNDICE DE FIGURAS', level=1)
    h.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    for run in h.runs:
        run.font.underline = False

    figures = [
        ('Figura 3.2', 'Arquitectura de Contenedores del Sistema Poetry (C4 L2)'),
        ('Figura 3.3', 'Esquema Entidad-Relación normalizado (3NF)'),
        ('Figura 3.4', 'Secuencia de Autenticación y Control de Acceso Biométrico'),
        ('Figura 3.5', 'Capas Tecnológicas del Sistema (generado con matplotlib)'),
        ('Figura 4.1', 'Pirámide de Pruebas — Cohn, 2009'),
    ]
    for fig_num, fig_caption in figures:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.line_spacing = 1.5
        r1 = p.add_run(f'{fig_num}: ')
        r1.bold = True
        r1.font.name = 'Arial'
        r1.font.size = Pt(12)
        r2 = p.add_run(fig_caption)
        r2.font.name = 'Arial'
        r2.font.size = Pt(12)

    # Save to the root of the docs-generator module
    # Save to the root of the docs-generator module
    output_path = os.path.abspath(os.path.join(content_base, '..', 'Tesis_Poetry_v24.docx'))
    doc.save(output_path)
    print(f'Saved: {output_path}')


if __name__ == '__main__':
    create_thesis_docx()
