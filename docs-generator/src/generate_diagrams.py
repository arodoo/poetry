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
from diagrams.access_evolution import generate as gen_evo
from diagrams.problem_triad import generate as gen_triad
from diagrams.ddd_contexts import generate as gen_ddd
from diagrams.clean_rings import generate as gen_clean
from diagrams.solid_pillars import generate as gen_solid
from diagrams.vdom_diff import generate as gen_vdom
from diagrams.ci_pipeline import generate as gen_ci
from diagrams.sdk_flow import generate as gen_sdk
from diagrams.component_tree import generate as gen_tree
from diagrams.psp_levels import generate as gen_psp


def main():
    """Run all diagram generators in order."""
    print('Generating thesis diagrams...')
    gen_evo()
    gen_triad()
    gen_ddd()
    gen_clean()
    gen_solid()
    gen_vdom()
    gen_arch()
    gen_erd()
    gen_sequence()
    gen_stack()
    gen_pyramid()
    gen_ci()
    gen_sdk()
    gen_tree()
    gen_psp()
    print('All diagrams generated.')


if __name__ == '__main__':
    main()
