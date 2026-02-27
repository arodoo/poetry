import docx
import sys
import os

def extract_formatting(docx_path):
    print(f"Reading: {docx_path}")
    doc = docx.Document(docx_path)
    
    print("--- Sections / Margins ---")
    for i, section in enumerate(doc.sections):
        print(f"Section {i}: Left={section.left_margin.cm if section.left_margin else None}cm, "
              f"Right={section.right_margin.cm if section.right_margin else None}cm, "
              f"Top={section.top_margin.cm if section.top_margin else None}cm, "
              f"Bottom={section.bottom_margin.cm if section.bottom_margin else None}cm")

    print("\n--- Titles / Cover Text Formats ---")
    for i, para in enumerate(doc.paragraphs):
        if not para.text.strip():
            continue
        try:
            print(f"\n[Text] {para.text[:50].encode('ascii', errors='ignore').decode('ascii')}...")
        except:
            print("\n[Text] <Encoding Error>...")
            
        fmt = para.paragraph_format
        print(f"  Alignment: {fmt.alignment}")
        print(f"  Space Before: {fmt.space_before.pt if fmt.space_before else None}pt")
        print(f"  Space After: {fmt.space_after.pt if fmt.space_after else None}pt")
        print(f"  Line Spacing: {fmt.line_spacing}")
        
        for j, run in enumerate(para.runs):
            if not run.text.strip():
                continue
            font = run.font
            print(f"    - Font: {font.name}, Size: {font.size.pt if font.size else None}pt, Bold: {font.bold}")
        
        # Stop after extracting the cover format details
        if i > 50:
            break

if __name__ == '__main__':
    template_path = os.path.abspath(r"d:\zProyectos\01Java\poetry\docs-generator\Tesis_Poetry_v27.docx")
    extract_formatting(template_path)
