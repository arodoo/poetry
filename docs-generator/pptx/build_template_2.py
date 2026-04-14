"""
File: docs-generator/pptx/build_template_2.py
Purpose: Populates template slides 3-8 with intro,
         problem, objectives, justification, PSP
         methodology and development with diagrams.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import img, set_body, Inches
from build_template import _footer


def intro(s):
    for sh in s.shapes:
        if sh.has_text_frame and 'finalidad' in (
                sh.text_frame.text):
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = (
                'El control de acceso en academias '
                'de danza opera de forma manual, '
                'generando errores e ingresos '
                'perdidos. Poetry automatiza el '
                'registro y la validación mediante '
                'huella dactilar, con métricas '
                'y reportes en tiempo real.')
            sh.height = Inches(2.5)
    _footer(s)


def problema(s):
    b = set_body(s,
                 'Control manual de asistencia: '
                 'registros en papel, suplantación '
                 'de identidad y pérdida de ingresos'
                 ' por membresías vencidas no '
                 'detectadas a tiempo.',
                 height=1.5)
    s.shapes.add_picture(
        img('fig_problem_triad.png'),
        Inches(2.5), Inches(4.0), Inches(8.0))
    _footer(s)


def objetivos(s):
    set_body(s,
             'General: Desarrollar un software de '
             'acceso biométrico.\n\n'
             '1. Registro de socios con huella\n'
             '2. Validación de membresía < 200ms\n'
             '3. Métricas de asistencia en vivo\n'
             '4. Reportes financieros automáticos',
             height=3.0)
    _footer(s)


def justificacion(s):
    for sh in s.shapes:
        if sh.has_text_frame and 'argumentos' in (
                sh.text_frame.text):
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = (
                '70% de academias pequeñas usa '
                'registro manual. Errores generan '
                'pérdidas de hasta 15% de ingresos.'
                ' La biometría elimina suplantación'
                ' y automatiza la verificación.')
            sh.height = Inches(2.5)
    _footer(s)
