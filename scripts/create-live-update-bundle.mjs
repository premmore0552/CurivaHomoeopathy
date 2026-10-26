import { createHash, createPrivateKey, sign as signBytes } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { deflateRawSync } from 'node:zlib';

const DIST_DIR = path.resolve('dist');
const UPDATE_DIR = path.join(DIST_DIR, 'live-updates');
const BUNDLE_DIR = path.join(UPDATE_DIR, 'bundles');
const UPDATE_BASE_URL = (process.env.CURIVA_LIVE_UPDATE_BASE_URL || 'https://curivahomoeopathy.netlify.app').replace(/\/+$/, '');
const rawVersion = process.env.VITE_APP_VERSION || process.env.COMMIT_REF || process.env.GITHUB_SHA || 'local';
const bundleId = rawVersion.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 12) || 'local';

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let value = n;
  for (let k = 0; k < 8; k += 1) {
    value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
  }
  crcTable[n] = value >>> 0;
}

function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

async function listFiles(directory, relative = '') {
  const results = [];
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (relative === '' && (entry.name === 'server.cjs' || entry.name === 'server.cjs.map' || entry.name === 'live-updates')) {
      continue;
    }
    const absolute = path.join(directory, entry.name);
    const childRelative = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) {
      results.push(...await listFiles(absolute, childRelative));
    } else if (entry.isFile()) {
      results.push({ absolute, name: childRelative });
    }
  }
  return results;
}

async function createZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const filename = Buffer.from(file.name.replace(/\\/g, '/'), 'utf8');
    const data = await fs.readFile(file.absolute);
    const compressed = deflateRawSync(data, { level: 9 });
    const checksum = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 filenames
    local.writeUInt16LE(8, 8); // DEFLATE
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0x0021, 12); // 1980-01-01
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(filename.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, filename, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(0x0314, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0x0021, 14);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(filename.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, filename);

    offset += local.length + filename.length + compressed.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

const files = await listFiles(DIST_DIR);
if (!files.some((file) => file.name === 'index.html')) {
  throw new Error('Could not create OTA bundle: dist/index.html is missing. Run vite build first.');
}

const zip = await createZip(files);
const checksum = createHash('sha256').update(zip).digest('hex');
const bundlePath = path.join(BUNDLE_DIR, `${bundleId}.zip`);
await fs.mkdir(BUNDLE_DIR, { recursive: true });
await fs.writeFile(bundlePath, zip);

const manifest = {
  bundleId,
  artifactType: 'zip',
  url: `${UPDATE_BASE_URL}/live-updates/bundles/${bundleId}.zip`,
  checksum,
  builtAt: new Date().toISOString(),
};

const encodedPrivateKey = process.env.CURIVA_LIVE_UPDATE_PRIVATE_KEY_BASE64;
if (encodedPrivateKey) {
  const privateKey = createPrivateKey(Buffer.from(encodedPrivateKey, 'base64'));
  manifest.signature = signBytes('sha256', zip, privateKey).toString('base64');
}

await fs.mkdir(UPDATE_DIR, { recursive: true });
await fs.writeFile(path.join(UPDATE_DIR, 'latest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Created self-hosted OTA bundle ${bundleId} (${(zip.length / 1024 / 1024).toFixed(2)} MB, ${files.length} files).`);
