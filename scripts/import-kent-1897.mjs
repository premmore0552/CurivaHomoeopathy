#!/usr/bin/env node
/**
 * Import the OCR text extracted from the 1897 Kent repertory PDF.
 * Default input: scripts/kent-source/kent-1897-raw.txt
 * Optional: npm run import:kent:1897 -- /absolute/path/to/kent-raw.txt
 *
 * This preserves extracted page text. It does not infer rubric grades,
 * remedy hierarchy, or clinical recommendations from OCR typography.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inputPath = path.resolve(
  root,
  process.argv[2] ?? process.env.KENT_1897_TEXT ?? 'scripts/kent-source/kent-1897-raw.txt',
);
const outputDir = path.join(root, 'public', 'data', 'kent-1897');

function findPrintedPage(text) {
  const candidates = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^\d{1,4}$/.test(line))
    .map(Number)
    .filter((number) => number > 0 && number <= 2000);
  return candidates.length ? candidates[candidates.length - 1] : null;
}

async function main() {
  let raw;
  try {
    raw = await readFile(inputPath, 'utf8');
  } catch (error) {
    throw new Error(
      'Could not read OCR text at ' + inputPath +
      '. Copy your pdftotext output there, or pass its full path as the command argument. ' +
      'Original error: ' + error.message,
    );
  }

  if (raw.length < 100_000) {
    throw new Error(
      'Input is only ' + raw.length.toLocaleString() +
      ' characters. This does not look like the complete Kent OCR transcription; no output was written.',
    );
  }

  // pdftotext inserts a form-feed between PDF pages. Keep interior blank pages.
  const pageBlocks = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\f');
  while (pageBlocks.length > 1 && !pageBlocks[pageBlocks.length - 1].trim()) {
    pageBlocks.pop();
  }

  const pages = pageBlocks.map((block, index) => {
    const text = block.replace(/[\t ]+$/gm, '').trim();
    return {
      textPage: index + 1,
      printedPage: text ? findPrintedPage(text) : null,
      text,
    };
  });

  const pagesWithText = pages.filter((page) => page.text.length > 0).length;
  if (pages.length < 300 || pagesWithText < 250) {
    throw new Error(
      'Only ' + pages.length + ' text pages (' + pagesWithText +
      ' non-empty) were detected. Expected a much larger extraction. No output was written.',
    );
  }

  const sourceHash = createHash('sha256').update(raw, 'utf8').digest('hex');
  const payload = {
    schemaVersion: 1,
    edition: '1897',
    title: 'Repertory of the Homoeopathic Materia Medica',
    author: 'J. T. Kent, M.D.',
    publisher: 'Examiner Printing House, Lancaster, Pennsylvania',
    source: {
      archiveIdentifier: 'b20416234_001',
      archiveUrl: 'https://archive.org/details/b20416234_001',
      attribution: 'Wellcome Collection',
      originalPublicationYear: 1897,
      extractionMethod: 'pdftotext -layout -enc UTF-8',
      sha256: sourceHash,
    },
    editorialStatus: 'OCR transcription; not fully proofread against every scanned page.',
    gradePolicy: 'No remedy grades are inferred or reconstructed from OCR typography.',
    pages,
  };

  const manifest = {
    schemaVersion: 1,
    edition: payload.edition,
    title: payload.title,
    author: payload.author,
    source: payload.source,
    editorialStatus: payload.editorialStatus,
    gradePolicy: payload.gradePolicy,
    textPageCount: pages.length,
    pagesWithText,
    characterCount: raw.length,
    dataFile: 'pages.json',
  };

  await mkdir(outputDir, { recursive: true });
  const serialized = JSON.stringify(payload);
  await writeFile(path.join(outputDir, 'pages.json'), serialized, 'utf8');
  await writeFile(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8',
  );

  console.log('Kent 1897 OCR import completed.');
  console.log('Text pages: ' + pages.length);
  console.log('Pages containing text: ' + pagesWithText);
  console.log('Characters: ' + raw.length.toLocaleString());
  console.log(
    'Generated data: public/data/kent-1897/pages.json (' +
    (Buffer.byteLength(serialized) / 1024 / 1024).toFixed(2) + ' MB)',
  );
  console.log('Verify important wording against the scan. No remedy grades were generated.');
}

main().catch((error) => {
  console.error('Kent 1897 import failed:', error.message);
  process.exitCode = 1;
});
