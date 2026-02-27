"""
File: application/document_builder.py
Purpose: Orchestrates the generation of the DDD DOCX document.
All Rights Reserved Arodi Emmanuel
"""
import os
import docx
from docx.shared import RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from src.infrastructure.docx_styles_adapter import setup_document_styles
from src.infrastructure.docx_components_adapter import (
    render_cover_page, render_acknowledgments, render_table_of_contents, render_list_of_figures
)
from src.infrastructure.markdown_parser import parse_markdown_blocks
from src.domain.constants import FONT_NAME, COLOR_BLACK

def build_thesis_document():
    doc = docx.Document()
    setup_document_styles(doc)

    render_cover_page(doc)
    render_acknowledgments(doc)

    script_dir = os.path.dirname(os.path.abspath(__file__))
    content_base = os.path.abspath(os.path.join(script_dir, '..', '..', 'content'))
    
    # Render Resumen/Abstract first (from preliminares directory)
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
        title = doc.add_heading(title_text, level=1)
        title.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        for run in title.runs:
            run.font.name = FONT_NAME
            run.font.underline = False
            run.font.color.rgb = RGBColor(*COLOR_BLACK)

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

    output_path = os.path.abspath(os.path.join(content_base, '..', 'Tesis_Poetry_v32.docx'))
    doc.save(output_path)
    print(f'Saved: {output_path}')
