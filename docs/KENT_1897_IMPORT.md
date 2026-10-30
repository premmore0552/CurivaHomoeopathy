# Kent 1897 source-text import

Curiva's existing curated repertory in src/data/repertoryDatabase.ts remains in place.
This import adds a searchable source-text reader for the 1897 Kent edition; it does not
turn OCR text into verified rubric/remedy-grade data.

## Source and attribution

- J. T. Kent, Repertory of the Homoeopathic Materia Medica.
- Examiner Printing House, Lancaster, Pennsylvania, 1897.
- Digitized source record: Wellcome Collection / Internet Archive, identifier
  https://archive.org/details/b20416234_001
- Wellcome identifies the digitized copy as Public Domain Mark and provides the credit:
  Repertory of the homoeopathic materia medica / by J.T. Kent. Source: Wellcome Collection.
- This import is for the supplied Volume 1 scan (686 digitized pages). Wellcome describes
  the complete work as a two-volume set; do not label this single-volume import complete.

## Prepare the OCR transcription

Extract text from the supplied 1897 PDF with Poppler pdftotext:

~~~sh
mkdir -p scripts/kent-source
pdftotext -layout -enc UTF-8 kents-repertory-original.pdf scripts/kent-source/kent-1897-raw.txt
~~~

Alternatively, use the already-created OCR text file and pass its path:

~~~sh
npm run import:kent:1897 -- /absolute/path/to/kent-raw.txt
~~~

Expected default input: scripts/kent-source/kent-1897-raw.txt.

The importer expects page breaks from pdftotext form-feed characters. It rejects
unexpectedly small inputs, keeps page order and records extracted text-page numbers
and a best-effort printed page label. Printed page labels may be missing or misread.

## Generate and validate

~~~sh
npm run import:kent:1897
npm run build
npm run lint
~~~

The importer creates:

- public/data/kent-1897/manifest.json
- public/data/kent-1897/pages.json

Commit the generated files with this change so that the deployed website and offline
app receive the same source text. Do not commit the original PDF unless its size and
repository-storage policy have been reviewed.

## Editorial limits

The reader is a search/browse interface for extracted source text. OCR can confuse
letters, punctuation, remedy abbreviations, page numbers and layout. The importer does
not assign remedy grades, infer a rubric hierarchy, calculate clinical scores, or make
treatment recommendations. Any structured rubric/grade database must be checked
against the page image and reviewed separately before being called complete.

## Rebuilt chapter browser and repertorization workspace

The page at `/repertory/kent-1897` includes a 37-chapter directory for the full edition,
grouped into study sections. Its printed-page ranges are a navigation aid; the imported
text remains limited to the supplied Volume 1 scan. Chapter-scoped OCR filtering uses
best-effort printed page labels extracted from the text and must be checked against the
scan.

The browser can show structured rubric records only where the existing Curiva curated
database provides them. That database currently contains eight curated sections; it is
not a complete 37-chapter transcription of Kent. Chapters without structured records
remain accessible through OCR source search.

The repertorization engine in `src/lib/kentRepertorizationEngine.ts` computes weighted
overlap from selected curated rubrics. Users assign a symptom priority of 1 (supporting),
2 (characteristic), or 3 (keynote). The resulting weighted-coverage percentage is the
remedy's accumulated user-priority points divided by total priority points in the case.
The engine reports the exact matched rubrics and does not fabricate remedy grades,
infer missing rubric entries, or claim diagnostic/prescribing authority. It runs locally
and requires no external AI API key.
