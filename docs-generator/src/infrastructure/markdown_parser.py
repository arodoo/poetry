"""
File: infrastructure/markdown_parser.py
Purpose: Parses markdown files and injects content into docx preserving formats.
All Rights Reserved Arodi Emmanuel
"""
import os
import re
from docx.shared import Pt, Cm, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from src.domain.constants import FONT_NAME
from src.infrastructure.docx_styles_adapter import _ensure_style

_ASSETS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'content', 'assets'))

_FIGURE_MAP = {
    'fig_arch':     'fig_arch.png',
    'fig_erd':      'fig_erd.png',
    'fig_sequence': 'fig_sequence.png',
    'fig_stack':    'fig_stack.png',
    'fig_pyramid':  'fig_pyramid.png',
    'fig_access':   'fig_access.png',
    'fig_dashboard':'fig_dashboard.png',
    'fig_metrics':  'fig_metrics.png',
}

def _add_formatted_runs(p, text):
    """
    Parses a string for **bold** and *italic* markdown and appends
    corresponding runs to the paragraph `p`.
    """
    # Simple regex to tokenize text into formats.
    # It looks for **text**, *text*, or regular text.
    tokens = re.split(r'(\*\*.*?\*\*|\*.*?\*)', text)
    
    for token in tokens:
        if not token:
            continue
        run = p.add_run()
        run.font.name = FONT_NAME
        run.font.size = Pt(12)
        
        if token.startswith('**') and token.endswith('**'):
            run.text = token[2:-2]
            run.bold = True
        elif token.startswith('*') and token.endswith('*'):
            run.text = token[1:-1]
            run.italic = True
        else:
            run.text = token

def _add_body(doc, text):
    p = doc.add_paragraph()
    _add_formatted_runs(p, text)
    fmt = p.paragraph_format
    fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.5
    fmt.space_after = Pt(0)
    return p

def _add_bullet(doc, text):
    _ensure_style(doc, 'List Bullet')
    p = doc.add_paragraph(style='List Bullet')
    _add_formatted_runs(p, text)
    fmt = p.paragraph_format
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.5
    return p

def _add_numbered(doc, text):
    _ensure_style(doc, 'List Number')
    p = doc.add_paragraph(style='List Number')
    _add_formatted_runs(p, text)
    fmt = p.paragraph_format
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.5
    return p

def _add_image(doc, fig_key):
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

def _add_code_block(doc, text):
    text = re.sub(r'^```\w*\n', '', text)
    text = re.sub(r'\n```$', '', text)
    p = doc.add_paragraph(text)
    fmt = p.paragraph_format
    fmt.alignment = WD_ALIGN_PARAGRAPH.LEFT
    fmt.left_indent = Cm(1)
    fmt.line_spacing = 1.0
    for run in p.runs:
        run.font.name = 'Courier New'
        run.font.size = Pt(9)
        run.font.color.rgb = RGBColor(40, 40, 40)
    return p

def _collapse_list_items(block, marker_re):
    """
    Rejoin multi-line list items into single logical items.

    Markdown files are line-wrapped at ~60 chars. A bullet like:
        - **Diseñar** un núcleo de dominio desacoplado utilizando
        Domain-Driven Design para aislar las reglas de negocio de
        la infraestructura tecnológica.

    must become ONE item, not three. A continuation line is any
    line that does NOT start with a new list marker.
    """
    items = []
    current = None
    for line in block.splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        if re.match(marker_re, stripped):
            if current is not None:
                items.append(current)
            current = re.sub(marker_re, '', stripped, count=1).strip()
        elif current is not None:
            current += ' ' + stripped
        else:
            current = stripped
    if current is not None:
        items.append(current)
    return items


def parse_markdown_blocks(doc, content):
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    content = re.sub(
        r'^(#+ .+)(\n)(?=[^\n])',
        r'\1\n\n', content, flags=re.MULTILINE
    )

    blocks = [
        b.strip()
        for b in content.strip().split('\n\n')
        if b.strip()
    ]
    for block in blocks:
        if block.startswith('```'):
            _add_code_block(doc, block)
            continue
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
            for item in _collapse_list_items(block, r'^[-*]\s+'):
                _add_bullet(doc, item)
        elif re.match(r'^\d+\.', block):
            for item in _collapse_list_items(block, r'^\d+\.\s*'):
                _add_numbered(doc, item)
        else:
            text = ' '.join(block.splitlines()).strip()
            _add_body(doc, text)
