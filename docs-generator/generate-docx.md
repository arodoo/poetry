# Docs Generator Maintenance Guide

## Incident Report: Formatting Loss on Rollback (v39 to v40)

During an attempt to batch-refactor markdown content, a sequence of commands including `git checkout .` and `git clean -nfd` was executed to discard failed AI-generated changes. 

However, this aggressive rollback also discarded uncommitted improvements to `src/infrastructure/docx_components_adapter.py` (specifically, the advanced formatting of the Acknowledgments / Agradecimientos page). When `v40` was generated in a clean state, it used the old, simple rendering logic.

### Root Cause
1. Code improvements to the Python generator scripts were left uncommitted while content edits were being made.
2. A global `git checkout .` reset both content and generator scripts, silently destroying the formatting improvements.

## Best Practices for Future Modifications

To prevent this from happening again, observe the following rules when maintaining the `docs-generator`:

1. **Commit Generator Changes Immediately:** Any structural or formatting changes made to `src/application`, `src/domain`, or `src/infrastructure` must be committed immediately once verified, *before* starting any batch content modifications.
2. **Isolate Content Rollbacks:** If content modifications (in `content/`) need to be discarded, use targeted checkout commands (e.g., `git checkout docs-generator/content/`) rather than a global `git checkout .`.
3. **Verify Generator State Before Generation:** Always review `git status` to ensure you aren't about to overwrite or discard critical script logic.

## Current Setup Notes
- The generated output is now configured to save directly into the project root (`poetry/Tesis_Poetry_vXX.docx`), not inside the `docs-generator` folder.
- Page numbering is configured to iterate over all `doc.sections`, hiding the page number *only* on the first page of the cover section.

---

## Incident Report: Loss of Background Images and Footer Styles (v39 to v41)

During an attempt to add page numbers to all sections of the document, the generated output completely lost the template's background images (large hexagons) and its stylized institution footers (SEV, UTP, VERACRUZ logos).

### Root Cause
1. **Word's Anchoring Mechanism:** In Microsoft Word, background images and specific footers are often anchored to the "First Page Header" or "First Page Footer" of a specific section (in our case, Section 1).
2. **Destructive Override:** The Python script explicitly set `section.different_first_page_header_footer = False` for all content sections. This instructed Word to disable and delete the First Page Header/Footer, instantly destroying the anchored images and logos.
3. **Destructive Clear:** The script also used `paragraph.clear()` on existing footers before appending the page number, which wiped out the template's existing stylized footer content.

### The Fix
To correctly inject page numbers into a pre-styled template:
- **Never touch `different_first_page_header_footer` for content sections.** Let it inherit the template's default (which is `True` for section 1).
- **Append, don't clear.** When injecting the `PAGE` field for numbering, fetch the existing footer paragraph and safely append the XML elements (`w:fldChar` and `w:instrText`) using `paragraph.add_run()` without calling `paragraph.clear()`.
- **Handle Both Footers:** Since `different_first_page_header_footer` is enabled in the template, you must inject the `PAGE` field into both `section.footer` AND `section.first_page_footer` for the number to appear on every single page of that section.
