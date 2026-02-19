"""
File: docs-generator/src/generate_diagrams.py
Purpose: Orchestrates all diagram generators. Run this script to refresh PNG
         figures in content/assets. Each generator is isolated in its module.
All Rights Reserved Arodi Emmanuel
"""

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from diagrams.arch import generate as gen_arch
from diagrams.erd import generate as gen_erd
from diagrams.sequence import generate as gen_sequence
from diagrams.stack import generate as gen_stack
from diagrams.pyramid import generate as gen_pyramid


def main():
    """Run all diagram generators in order."""
    print('Generating thesis diagrams...')
    gen_arch()
    gen_erd()
    gen_sequence()
    gen_stack()
    gen_pyramid()
    print('All diagrams generated.')


if __name__ == '__main__':
    main()
