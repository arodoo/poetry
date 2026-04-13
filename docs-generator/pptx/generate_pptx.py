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
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.abspath(
    os.path.join(HERE, '..', 'content', 'assets'))
AUTHOR = 'Arodi Emmanuel Hernández Pérez'
PROJECT = 'Poetry'


def tpl_path():
    """Find the template pptx in this directory."""
    files = glob.glob(os.path.join(HERE, '*.pptx'))
    return files[0]


def img(name):
    """Return absolute path to an asset image."""
    return os.path.join(ASSETS, name)


def set_shape_text(slide, name_part, text):
    """Set text on a shape found by partial name."""
    for sh in slide.shapes:
        if name_part in sh.name and sh.has_text_frame:
            sh.text_frame.paragraphs[0].text = text
            return sh
    return None


def add_img(slide, path, left, top, width):
    """Add an image to a slide at given position."""
    slide.shapes.add_picture(
        path, Inches(left), Inches(top),
        Inches(width))
