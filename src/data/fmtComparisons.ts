export interface FMTComparison {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  headers: string[];
  rows: string[][];
  medicolegalSignificance?: string;
}

export const FMT_COMPARISONS: FMTComparison[] = [
  {
    id: 'comp-001',
    title: 'Algor Mortis vs Rigor Mortis',
    slug: 'algor-mortis-vs-rigor-mortis',
    category: 'Postmortem Changes',
    summary: 'A comparison of postmortem cooling vs postmortem stiffening.',
    headers: ['Feature', 'Algor Mortis', 'Rigor Mortis'],
    rows: [
      ['Definition', 'Cooling of the body', 'Stiffening of muscles'],
      ['Mechanism', 'Heat loss to environment', 'Depletion of ATP'],
      ['Onset', 'Immediate after death', '1-2 hours after death'],
      ['Key Value', '0.5-0.7°C drop per hour', 'Fully developed at 12 hours'],
      ['Effect of Environment', 'Highly dependent', 'Less dependent']
    ]
  },
  {
    id: 'comp-002',
    title: 'Rigor Mortis vs Cadaveric Spasm',
    slug: 'rigor-mortis-vs-cadaveric-spasm',
    category: 'Postmortem Changes',
    summary: 'Distinguishing between general postmortem stiffening and instantaneous stiffening at death.',
    headers: ['Feature', 'Rigor Mortis', 'Cadaveric Spasm'],
    rows: [
      ['Onset', 'Gradual (1-2 hours)', 'Instantaneous'],
      ['Primary Flaccidity', 'Present', 'Absent'],
      ['Muscles Involved', 'All muscles', 'Specific muscle groups'],
      ['Mechanism', 'ATP depletion', 'Intense nervous tension'],
      ['Importance', 'Time since death', 'Nature of death (Suicide/Combat)']
    ]
  },
  {
    id: 'comp-003',
    title: 'Postmortem Lividity vs Bruise (Contusion)',
    slug: 'lividity-vs-bruise',
    category: 'Injuries',
    summary: 'Critical distinction for determining if an injury was antemortem or postmortem.',
    headers: ['Feature', 'Postmortem Lividity', 'Bruise'],
    rows: [
      ['Cause', 'Gravity settling of blood', 'Rupture of vessels (Trauma)'],
      ['Position', 'Dependent parts only', 'Anywhere on the body'],
      ['Edges', 'Sharply defined', 'Blurred/Ill-defined'],
      ['Incision Test', 'Blood flows out (liquid)', 'Blood is clotted'],
      ['Wash Test', 'Can be washed away', 'Cannot be washed away']
    ]
  },
  {
    id: 'comp-004',
    title: 'Adipocere vs Mummification',
    slug: 'adipocere-vs-mummification',
    category: 'Late Postmortem Changes',
    summary: 'Comparison of two different paths of natural body preservation.',
    headers: ['Feature', 'Adipocere', 'Mummification'],
    rows: [
      ['Process', 'Saponification (Soap formation)', 'Desiccation (Drying)'],
      ['Environment', 'Moist, damp, anaerobic', 'Dry, hot, windy'],
      ['Mechanism', 'Fat conversion to fatty acids', 'Rapid evaporation of water'],
      ['Appearance', 'Waxy, yellowish-white', 'Leathery, brown, hard'],
      ['Odor', 'Ammoniacal/Rancid', 'Odourless']
    ]
  }
];
