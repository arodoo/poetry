"""
File: domain/constants.py
Purpose: Global configuration constants matching the specific thesis template formatting exactly.
All Rights Reserved Arodi Emmanuel
"""
from docx.shared import Cm, Pt

MARGIN_LEFT = Cm(3.0)
MARGIN_RIGHT = Cm(3.0)
MARGIN_TOP = Cm(2.5)
MARGIN_BOTTOM = Cm(2.5)

FONT_NAME = 'Arial'
COLOR_BLACK = (0, 0, 0)

COVER_SIZES = {
    'university': 24, # "UNIVERSIDAD TECNOLÓGICA DEL CENTRO DE VERACRUZ"
    'degree': 24,     # "Ingeniería en Gestión y Desarrollo de Software"
    'title': 18,      # "Sistema de Control de Acceso..."
    'type': 25,       # "T E S I S" / "REPORTE"
    'legends': 14,    # "QUE PARA OBTENER EL GRADO ACADÉMICO DE", "PRESENTA"
    'advisors': 12,   # "ASESOR..."
}
