"""
File: docs-generator/generate_docx.py
Purpose: Main entrypoint for generating the poetry thesis using proper DDD architecture.
All Rights Reserved Arodi Emmanuel
"""
import sys
import os

# Ensure the root of docs-generator is in the sys path so absolute imports work
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.application.document_builder import build_thesis_document

if __name__ == '__main__':
    build_thesis_document()
