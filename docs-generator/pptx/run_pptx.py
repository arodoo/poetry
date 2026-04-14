"""
File: docs-generator/pptx/run_pptx.py
Purpose: Main orchestrator that loads the PPTX
         template, populates all 12 template slides,
         inserts evidence slides after Desarrollo
         and reorders them before the closing slides.
All Rights Reserved Arodi Emmanuel
"""

import os
import sys

sys.path.insert(0, os.path.dirname(
    os.path.abspath(__file__)))
sys.stdout.reconfigure(encoding='utf-8')

from pptx import Presentation
from generate_pptx import tpl_path, move_slide
from build_template import portada, agenda
from build_template_2 import (
    intro, problema, objetivos, justificacion,
)
from build_template_3 import (
    metodologia, desarrollo, resultados,
    futuros, referencias, gracias,
)
from build_evidence import add_evidence


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

    n_before = len(prs.slides)
    add_evidence(prs)
    n_added = len(prs.slides) - n_before

    for i in range(n_added):
        src = n_before + i
        dst = 8 + i
        move_slide(prs, src, dst)

    out = os.path.join(
        os.path.dirname(tpl_path()),
        '..', '..', 'Presentacion_Poetry_v3.pptx')
    prs.save(os.path.abspath(out))
    print(f'Saved: {os.path.abspath(out)}')
    print(f'Slides: {len(prs.slides)}')


if __name__ == '__main__':
    main()
