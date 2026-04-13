"""
File: docs-generator/pptx/run_pptx.py
Purpose: Main orchestrator that loads the PPTX
         template, populates all 12 template slides,
         adds visual evidence slides and saves output.
All Rights Reserved Arodi Emmanuel
"""

import os
import sys

sys.path.insert(0, os.path.dirname(
    os.path.abspath(__file__)))
sys.stdout.reconfigure(encoding='utf-8')

from pptx import Presentation
from generate_pptx import tpl_path, AUTHOR, PROJECT
from build_template import portada, agenda, intro
from build_template_2 import (
    problema, objetivos, justificacion, metodologia,
)
from build_template_3 import (
    desarrollo, resultados, futuros,
    referencias, gracias,
)
from build_evidence import add_evidence


def _fix_footers(prs):
    for slide in prs.slides:
        for sh in slide.shapes:
            if not sh.has_text_frame:
                continue
            t = sh.text_frame.text.strip()
            if t == 'Proyecto':
                sh.text_frame.paragraphs[0].text = (
                    PROJECT)
            if t == 'Nombre Completo del Alumno':
                sh.text_frame.paragraphs[0].text = (
                    AUTHOR)


def main():
    prs = Presentation(tpl_path())
    s = prs.slides

    portada(s[0])
    agenda(s[1])
    intro(s[2])
    problema(s[3])
    objetivos(s[4])
    justificacion(s[5])
    metodologia(s[6])
    desarrollo(s[7])
    resultados(s[8])
    futuros(s[9])
    referencias(s[10])
    gracias(s[11])
    add_evidence(prs)
    _fix_footers(prs)

    out = os.path.join(
        os.path.dirname(tpl_path()),
        '..', '..', 'Presentacion_Poetry_v2.pptx')
    prs.save(os.path.abspath(out))
    print(f'Saved: {os.path.abspath(out)}')
    print(f'Slides: {len(prs.slides)}')


if __name__ == '__main__':
    main()
