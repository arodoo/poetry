"""
File: application/document_builder.py
Purpose: Orchestrates the generation of thesis docx using the official
         cover template as base and appending all thesis content after it.
All Rights Reserved Arodi Emmanuel
"""
import os
import copy
import docx
from docx.shared import RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from src.infrastructure.docx_styles_adapter import setup_document_styles
from src.infrastructure.docx_components_adapter import (
    render_acknowledgments, render_table_of_contents, render_list_of_figures
)
from src.infrastructure.markdown_parser import parse_markdown_blocks
from src.domain.constants import FONT_NAME, COLOR_BLACK


def _get_cover_end_index(body):
    """
    Find the index of the first paragraph that contains the cover's
    inline sectPr (section break), which ends Section 0.
    """
    children = list(body)
    for i, child in enumerate(children):
        if child.find('.//' + qn('w:sectPr')) is not None:
            return i
    return len(children) - 1


def _trim_template_after_cover(doc):
    """
    Remove all body elements AFTER the cover section break from the template,
    leaving only the cover/back-cover pages and the section 1 headers intact.
    The last child of body is always the final sectPr; we keep that too.
    """
    body = doc.element.body
    cover_end = _get_cover_end_index(body)
    children = list(body)

    # children[0..cover_end] = cover pages (keep)
    # children[cover_end+1..-2] = old content (remove)
    # children[-1] = final <w:sectPr> (keep — it holds the content header)
    final_sectPr = children[-1]

    for child in children[cover_end + 1: -1]:
        body.remove(child)

    return doc


def _inject_outline_level(paragraph, level):
    """Inject <w:outlineLvl> into a paragraph's pPr directly.

    Word's TOC field reads outlineLvl from the paragraph element,
    not from the style definition — so each heading paragraph
    needs this property set individually.
    """
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    pPr = paragraph._element.get_or_add_pPr()
    outlineLvl = pPr.find(qn('w:outlineLvl'))
    if outlineLvl is None:
        outlineLvl = OxmlElement('w:outlineLvl')
        pPr.append(outlineLvl)
    outlineLvl.set(qn('w:val'), str(level))


def _fix_all_heading_outline_levels(doc):
    """Post-processing pass: set outlineLvl on every heading paragraph."""
    level_map = {'Heading 1': 0, 'Heading 2': 1, 'Heading 3': 2}
    for p in doc.paragraphs:
        level = level_map.get(p.style.name)
        if level is not None:
            _inject_outline_level(p, level)


def _add_chapter_heading(doc, title_text):
    title = doc.add_heading(title_text, level=1)
    title.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    _inject_outline_level(title, 0)
    for run in title.runs:
        run.font.name = FONT_NAME
        run.font.underline = False
        run.font.color.rgb = RGBColor(*COLOR_BLACK)


def build_thesis_document():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.abspath(os.path.join(script_dir, '..', '..', 'assets'))
    content_base = os.path.abspath(os.path.join(script_dir, '..', '..', 'content'))

    template_path = os.path.join(assets_dir, 'PORTADA DE ESTADÍA EDITABLE 2026.docx')
    doc = docx.Document(template_path)

    # Trim all old content from the template after the cover pages
    _trim_template_after_cover(doc)

    setup_document_styles(doc)
    render_acknowledgments(doc)

    prelim_dir = os.path.join(content_base, 'preliminares')
    if os.path.exists(prelim_dir):
        files = sorted([f for f in os.listdir(prelim_dir) if f.endswith('.md')])
        for filename in files:
            path = os.path.join(prelim_dir, filename)
            with open(path, 'r', encoding='utf-8') as fh:
                parse_markdown_blocks(doc, fh.read())
        doc.add_page_break()

    render_table_of_contents(doc)

    chapters_meta = [
        ('1', 'CAPÍTULO 1. INTRODUCCIÓN Y GENERALIDADES', 'capitulo_1'),
        ('2', 'CAPÍTULO 2. MARCO TEÓRICO Y TECNOLÓGICO', 'capitulo_2'),
        ('3', 'CAPÍTULO 3. DESARROLLO E IMPLEMENTACIÓN', 'capitulo_3'),
        ('4', 'CAPÍTULO 4. RESULTADOS Y CONCLUSIONES', 'capitulo_4'),
        ('R', 'REFERENCIAS', 'referencias'),
        ('A', 'ANEXOS', 'anexos')
    ]

    for num, title_text, subdir in chapters_meta:
        _add_chapter_heading(doc, title_text)
        chapter_dir = os.path.join(content_base, subdir)
        if not os.path.exists(chapter_dir):
            print(f'Skipping missing directory: {chapter_dir}')
            continue

        files = sorted([f for f in os.listdir(chapter_dir) if f.endswith('.md')])
        for filename in files:
            path = os.path.join(chapter_dir, filename)
            print(f'Processing: {path}')
            with open(path, 'r', encoding='utf-8') as fh:
                content = fh.read()
            parse_markdown_blocks(doc, content)
            doc.add_paragraph()

        doc.add_page_break()

    render_list_of_figures(doc)

    # Post-processing: inject outlineLvl into every heading paragraph
    # so Word's TOC field can detect them (paragraph-level, not style-level).
    _fix_all_heading_outline_levels(doc)

    output_path = os.path.abspath(os.path.join(content_base, '..', '..', 'Tesis_Poetry_v43.docx'))
    doc.save(output_path)
    print(f'Saved: {output_path}')
