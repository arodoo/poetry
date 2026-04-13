"""
File: docs-generator/pptx/build_template.py
Purpose: Populates all 12 existing template slides
         with thesis data: portada, agenda, intro,
         problema, objetivos, justificacion, PSP,
         desarrollo, resultados, futuros, refs, fin.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import img, add_img, AUTHOR


def _rect(slide, text):
    for sh in slide.shapes:
        if 'Rectangle' in sh.name:
            sh.text_frame.paragraphs[0].text = text
            return
    for sh in slide.shapes:
        if sh.has_text_frame and len(
                sh.text_frame.text) > 40:
            sh.text_frame.paragraphs[0].text = text
            return


def portada(s):
    for sh in s.shapes:
        if not sh.has_text_frame:
            continue
        t = sh.text_frame.text
        if 'Titulo' in t or 'Título' in t:
            sh.text_frame.paragraphs[0].text = (
                'Poetry: Acceso Biométrico '
                'para Academia de Danza')
        if 'presentado' in t.lower():
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = (
                '\n presentado por:\n'
                f'{AUTHOR}\n\n'
                'Empresa:\nAcademia Chely Boops'
                '\n\nOrizaba, Veracruz · 2026')


def agenda(s):
    _rect(s,
          'I. Introducción\n'
          'II. Problemática\n'
          'III. Objetivos\n'
          'IV. Justificación\n'
          'V. Metodología PSP\n'
          'VI. Desarrollo y Evidencia\n'
          'VII. Resultados\n'
          'VIII. Trabajos Futuros')


def intro(s):
    for sh in s.shapes:
        if sh.has_text_frame and 'finalidad' in (
                sh.text_frame.text):
            sh.text_frame.paragraphs[0].text = (
                'El control de acceso en academias'
                ' de danza opera de forma manual, '
                'generando errores e ingresos '
                'perdidos. Poetry automatiza el '
                'registro y la validación de '
                'membresías mediante huella.')
