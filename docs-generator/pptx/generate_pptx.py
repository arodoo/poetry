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
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.abspath(
    os.path.join(HERE, '..', 'content', 'assets'))
AUTHOR = 'Arodi Emmanuel Haro Palacios'
PROJECT = 'Poetry'
DARK = RGBColor(0x1A, 0x23, 0x7E)
SAFE_BOTTOM = 5.5


def tpl_path():
    return glob.glob(os.path.join(HERE, '*.pptx'))[0]


def img(name):
    return os.path.join(ASSETS, name)


def fit_img(slide, path, left, top, max_w, max_h):
    """Add image scaled to fit within max bounds."""
    im = Image.open(path)
    w_px, h_px = im.size
    ratio = h_px / w_px
    w = max_w
    h = w * ratio
    if h > max_h:
        h = max_h
        w = h / ratio
    slide.shapes.add_picture(
        path, Inches(left), Inches(top),
        Inches(w), Inches(h))


def set_body(slide, text, height=2.5):
    """Clear and set text on content box."""
    for sh in slide.shapes:
        if 'Rectangle' in sh.name or (
                sh.has_text_frame and len(
                    sh.text_frame.text) > 30
                and sh.top / 914400 > 2.0):
            sh.text_frame.clear()
            sh.text_frame.paragraphs[0].text = text
            sh.height = Inches(height)
            return sh
    return None


def move_slide(prs, old_idx, new_idx):
    sldIdLst = prs.slides._sldIdLst
    items = list(sldIdLst)
    el = items[old_idx]
    sldIdLst.remove(el)
    sldIdLst.insert(new_idx, el)
