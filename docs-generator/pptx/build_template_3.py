"""
File: docs-generator/pptx/build_template_3.py
Purpose: Populates template slides 7-12: methodology,
         desarrollo, resultados, trabajos futuros,
         referencias and closing with fit_img.
All Rights Reserved Arodi Emmanuel
"""

from generate_pptx import (
    img, set_body, fit_img,
    Inches, AUTHOR, SAFE_BOTTOM,
)
from build_template import _footer


def metodologia(s):
    set_body(s,
             'Personal Software Process '
             '(Humphrey, 2005)\n\n'
             'PSP0: Git + DDD\n'
             'PSP1: Blueprints JSON\n'
             'PSP2: 13 Gates CI/CD\n'
             'PSP2.1: OpenAPI + Catálogo UI',
             height=2.5)
    fit_img(s, img('fig_psp_levels.png'),
            6.5, 2.8, 6.0, SAFE_BOTTOM - 2.8)
    _footer(s)


def desarrollo(s):
    set_body(s,
             'Stack: Spring Boot + React + '
             'PostgreSQL\n'
             'ORM: JPA/Hibernate\n'
             'Testing: JUnit + Playwright E2E\n'
             'Infraestructura: Docker Compose\n'
             'SDK generado desde OpenAPI',
             height=2.2)
    top = 4.5
    fit_img(s, img('fig_arch.png'),
            2.5, top, 8.0, SAFE_BOTTOM - top)
    _footer(s)


def resultados(s):
    set_body(s,
             'Latencia de validación < 200ms\n'
             'Cobertura: JUnit + Playwright E2E\n'
             'Docker Compose: despliegue '
             'reproducible\n'
             'ORM JPA: migraciones automáticas',
             height=1.8)
    top = 4.3
    fit_img(s, img('fig_pyramid.png'),
            3.5, top, 5.5, SAFE_BOTTOM - top)
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
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = (
                'Humphrey (2005). PSP.\n'
                'Martin (2017). Clean Arch.\n'
                'Pressman (2014). Ing. Soft.\n'
                'Fowler (2010). Contracts.\n'
                'Nielsen (1993). Usability.')
            sh.height = Inches(2.5)
    _footer(s)


def gracias(s):
    for sh in s.shapes:
        if not sh.has_text_frame:
            continue
        t = sh.text_frame.text.strip()
        if t == 'Nombre Completo del Alumno':
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = AUTHOR
        if t == 'Proyecto':
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = 'Poetry'
