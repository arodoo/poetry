import docx
import sys

def extract_headers(file_path):
    try:
        doc = docx.Document(file_path)
        headers = []
        for paragraph in doc.paragraphs:
            if paragraph.style.name.startswith('Heading'):
                headers.append(f"{paragraph.style.name}: {paragraph.text}")
        return headers
    except Exception as e:
        return [f"Error: {str(e)}"]

if __name__ == "__main__":
    path = "01tesis/docs/Tesis-final-ejemplo.docx"
    result = extract_headers(path)
    for h in result:
        print(h)
