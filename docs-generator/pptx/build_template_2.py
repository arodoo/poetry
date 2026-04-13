"""
File: docs-generator/pptx/build_template_2.py
Purpose: Populates template slides 4-8 and 9-12 with
         problema, objetivos, justificacion, PSP,
         desarrollo, resultados, futuros and refs.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import img, add_img, AUTHOR


def _rect(slide, text):
    for sh in slide.shapes:
        if 'Rectangle' in sh.name:
            sh.text_frame.paragraphs[0].text = text
            return


def problema(s):
    _rect(s,
          'Control manual de asistencia: '
          'registros en papel o Excel, '
          'suplantación de identidad y pérdida '
          'de ingresos por membresías vencidas '
          'no detectadas a tiempo.')
    add_img(s, img('fig_problem_triad.png'),
            7.0, 2.0, 5.5)


def objetivos(s):
    _rect(s,
          'General: Desarrollar un software de '
          'acceso biométrico para la academia '
          'Chely Boops.\n\n'
          '1. Registro de socios con huella\n'
          '2. Validación de membresía < 200ms\n'
          '3. Métricas de asistencia en vivo\n'
          '4. Reportes financieros automáticos')


def justificacion(s):
    for sh in s.shapes:
        if sh.has_text_frame and 'argumentos' in (
                sh.text_frame.text):
            sh.text_frame.paragraphs[0].text = (
                '70% de academias pequeñas usa '
                'registro manual. Errores generan '
                'pérdidas de hasta 15% de ingresos.'
                ' La biometría elimina suplantación'
                ' y automatiza la verificación.')


def metodologia(s):
    _rect(s,
          'Personal Software Process '
          '(Humphrey, 2005)\n'
          'PSP0: Git + DDD\n'
          'PSP1: Blueprints JSON\n'
          'PSP2: 13 Gates CI/CD\n'
          'PSP2.1: OpenAPI + Catálogo UI')
    add_img(s, img('fig_psp_levels.png'),
            6.5, 1.8, 6.0)
