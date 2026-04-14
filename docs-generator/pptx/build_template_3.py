"""
File: docs-generator/pptx/build_template_3.py
Purpose: Populates template slides 7-12: methodology,
         desarrollo, resultados, trabajos futuros,
         referencias and closing with diagrams.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import img, set_body, Inches, AUTHOR
from build_template import _footer


def metodologia(s):
    set_body(s,
             'Personal Software Process '
             '(Humphrey, 2005)\n\n'
             'PSP0: Git + DDD\n'
             'PSP1: Blueprints JSON\n'
             'PSP2: 13 Gates CI/CD\n'
             'PSP2.1: OpenAPI + Catálogo UI',
             height=2.8)
    s.shapes.add_picture(
        img('fig_psp_levels.png'),
        Inches(6.0), Inches(3.2), Inches(6.5))
    _footer(s)


def desarrollo(s):
    set_body(s,
             'Stack: Spring Boot + React + '
             'PostgreSQL\n'
             'ORM: JPA/Hibernate\n'
             'Testing: JUnit + Playwright E2E\n'
             'Infraestructura: Docker Compose\n'
             'SDK generado desde OpenAPI',
             height=2.5)
    s.shapes.add_picture(
        img('fig_arch.png'),
        Inches(3.0), Inches(4.5), Inches(7.0))
    _footer(s)


def resultados(s):
    set_body(s,
             'Latencia de validación < 200ms\n'
             'Cobertura: JUnit + Playwright E2E\n'
             'Docker Compose: despliegue '
             'reproducible\n'
             'ORM JPA: migraciones automáticas',
             height=2.0)
    s.shapes.add_picture(
        img('fig_pyramid.png'),
        Inches(3.0), Inches(4.2), Inches(7.0))
    _footer(s)


def futuros(s):
    set_body(s,
             'Reconocimiento facial (2do factor)\n'
             'App Mobile (React Native)\n'
             'Pasarela de pagos\n'
             'Analítica avanzada',
             height=2.5)
    _footer(s)


def referencias(s):
    for sh in s.shapes:
        if sh.has_text_frame and 'APA' in (
                sh.text_frame.text):
            sh.text_frame.paragraphs[0].text = (
                'Humphrey (2005). PSP.\n'
                'Martin (2017). Clean Architecture.\n'
                'Pressman (2014). Ing. Software.\n'
                'Fowler (2010). Contracts.\n'
                'Nielsen (1993). Usability Eng.')
            sh.height = Inches(3.0)
    _footer(s)


def gracias(s):
    for sh in s.shapes:
        if not sh.has_text_frame:
            continue
        t = sh.text_frame.text.strip()
        if t == 'Nombre Completo del Alumno':
            sh.text_frame.paragraphs[0].text = AUTHOR
        if t == 'Proyecto':
            sh.text_frame.paragraphs[0].text = (
                'Poetry')
