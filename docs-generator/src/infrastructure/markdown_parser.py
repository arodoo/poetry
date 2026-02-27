"""
File: infrastructure/markdown_parser.py
Purpose: Parses markdown files and injects content into docx preserving formats.
All Rights Reserved Arodi Emmanuel
"""
import os
import re
from docx.shared import Pt, Cm, Inches
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

def _clean(text):
    text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
    text = re.sub(r'\*(.+?)\*', r'\1', text)
    text = re.sub(r'`(.+?)`', r'\1', text)
    return text

def _add_body(doc, text):
    p = doc.add_paragraph(_clean(text))
    fmt = p.paragraph_format
    fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.5
    fmt.space_after = Pt(0)
    for run in p.runs:
        run.font.name = FONT_NAME
        run.font.size = Pt(12)
    return p

def _add_bullet(doc, text):
    _ensure_style(doc, 'List Bullet')
    p = doc.add_paragraph(_clean(text), style='List Bullet')
    fmt = p.paragraph_format
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.5
    for run in p.runs:
        run.font.name = FONT_NAME
        run.font.size = Pt(12)
    return p

def _add_numbered(doc, text):
    _ensure_style(doc, 'List Number')
    p = doc.add_paragraph(_clean(text), style='List Number')
    fmt = p.paragraph_format
    fmt.first_line_indent = Cm(0)
    fmt.line_spacing = 1.5
    for run in p.runs:
        run.font.name = FONT_NAME
        run.font.size = Pt(12)
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

def parse_markdown_blocks(doc, content):
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    content = re.sub(r'^(#+ .+)(\n)(?=[^\n])', r'\1\n\n', content, flags=re.MULTILINE)

    blocks = [b.strip() for b in content.strip().split('\n\n') if b.strip()]
    for block in blocks:
        if block.startswith('```'):
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
