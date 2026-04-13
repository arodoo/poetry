"""
File: docs-generator/pptx/build_template_3.py
Purpose: Populates template slides 8-12: desarrollo,
         resultados, trabajos futuros, referencias
         bibliograficas and closing thank-you slide.
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


def desarrollo(s):
    _rect(s,
          'Stack: Spring Boot + React + PostgreSQL\n'
          'ORM: JPA/Hibernate con Flyway\n'
          'Testing: JUnit + Playwright E2E\n'
          'Infraestructura: Docker Compose\n'
          'SDK generado desde OpenAPI')
    add_img(s, img('fig_arch.png'), 6.5, 1.8, 6.0)


def resultados(s):
    _rect(s,
          'Latencia de validación < 200ms\n'
          'Cobertura: unitarias (JUnit) + '
          'E2E (Playwright)\n'
          'Docker Compose: despliegue '
          'reproducible\n'
          'ORM JPA: 0 SQL manual, migraciones '
          'automáticas')
    add_img(s, img('fig_pyramid.png'),
            7.0, 1.8, 5.5)


def futuros(s):
    _rect(s,
          'Reconocimiento facial como '
          'segundo factor\n'
          'App Mobile (React Native)\n'
          'Pasarela de pagos integrada\n'
          'Dashboard de analítica avanzada')


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


def gracias(s):
    for sh in s.shapes:
        if not sh.has_text_frame:
            continue
        t = sh.text_frame.text
        if 'Nombre' in t:
            sh.text_frame.paragraphs[0].text = AUTHOR
        if 'Proyecto' in t:
            sh.text_frame.paragraphs[0].text = (
                'Poetry')
