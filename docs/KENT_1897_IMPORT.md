# Kent 1897 source-text import

Curiva's existing curated repertory in src/data/repertoryDatabase.ts remains in place.
This import adds a searchable source-text reader for the 1897 Kent edition; it does not
turn OCR text into verified rubric/remedy-grade data.

## Source and attribution

- J. T. Kent, Repertory of the Homoeopathic Materia Medica.
- Examiner Printing House, Lancaster, Pennsylvania, 1897.
- Digitized source record: Wellcome Collection / Internet Archive, identifier
  https://archive.org/details/b20416234_001
- The digitized copy is catalogued with a Public Domain Mark. Preserve attribution
  and check source-record notes for reuse in the relevant jurisdiction.

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
