
import { enhancedRemedies } from './src/data/enhancedRemedies.js';

const requiredKeys = [
  'keyCharacteristics',
  'modalities',
  'clinicalApplications'
];

let errors = 0;

enhancedRemedies.forEach(r => {
  requiredKeys.forEach(k => {
    if (!r[k]) {
      console.error(`Remedy ${r.id} is missing key: ${k}`);
      errors++;
    }
  });
  if (r.modalities) {
    if (!r.modalities.better || !r.modalities.worse) {
      console.error(`Remedy ${r.id} is missing modalities sub-keys`);
      errors++;
    }
  }
});

if (errors === 0) {
  console.log("All remedies validated successfully.");
} else {
  console.log(`Found ${errors} errors.`);
  process.exit(1);
}
