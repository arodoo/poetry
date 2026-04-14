"""
File: docs-generator/pptx/generate_pptx.py
Purpose: Core utilities for populating the PPTX
         institutional template without destroying
         its original formatting and watermarks.
All Rights Reserved Arodi Emmanuel
"""

import glob
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.abspath(
    os.path.join(HERE, '..', 'content', 'assets'))
AUTHOR = 'Arodi Emmanuel Haro Palacios'
PROJECT = 'Poetry'
DARK = RGBColor(0x1A, 0x23, 0x7E)


def tpl_path():
    """Find the template pptx in this directory."""
    return glob.glob(os.path.join(HERE, '*.pptx'))[0]


def img(name):
    """Return absolute path to an asset image."""
    return os.path.join(ASSETS, name)


def set_body(slide, text, height=2.5):
    """Clear and set text on content box."""
    for sh in slide.shapes:
        nm = sh.name
        if 'Rectangle' in nm or (
                sh.has_text_frame and len(
                    sh.text_frame.text) > 30
                and sh.top / 914400 > 2.0):
            sh.text_frame.clear()
            p = sh.text_frame.paragraphs[0]
            p.text = text
            sh.height = Inches(height)
            return sh
    return None


def move_slide(prs, old_idx, new_idx):
    """Move slide from old_idx to new_idx."""
    sldIdLst = prs.slides._sldIdLst
    items = list(sldIdLst)
    el = items[old_idx]
    sldIdLst.remove(el)
    sldIdLst.insert(new_idx, el)
