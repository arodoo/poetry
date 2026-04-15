"""
File: docs-generator/pptx/build_template.py
Purpose: Populates all 12 template slides in-place:
         sets text in existing shapes, resizes content
         boxes, and adds images below content areas.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import (
    img, set_body, fit_img,
    AUTHOR, PROJECT, SAFE_BOTTOM,
    Inches, Pt, DARK,
)


def _footer(slide):
    """Update footer labels on one slide."""
    for sh in slide.shapes:
        if not sh.has_text_frame:
            continue
        t = sh.text_frame.text.strip()
        if t == 'Proyecto':
            sh.text_frame.paragraphs[0].text = PROJECT
        if t == 'Nombre Completo del Alumno':
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = AUTHOR
            sh.width = Inches(4.5)
            for r in sh.text_frame.paragraphs[0].runs:
                r.font.size = Pt(9)


def portada(s):
    for sh in s.shapes:
        if not sh.has_text_frame:
            continue
        t = sh.text_frame.text
        if 'Título' in t or 'Titulo' in t:
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = (
                'Poetry: Acceso Biométrico')
        if 'presentado' in t.lower():
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = (
                f'\npresentado por:\n{AUTHOR}'
                '\n\nEmpresa:\nAcademia Chely Boops'
                '\n\nOrizaba, Veracruz · 2026')


def agenda(s):
    set_body(s,
             'I. Introducción\n'
             'II. Problemática\n'
             'III. Objetivos\n'
             'IV. Justificación\n'
             'V. Metodología PSP\n'
             'VI. Desarrollo y Evidencia\n'
             'VII. Resultados\n'
             'VIII. Trabajos Futuros', height=3.0)
    _footer(s)
