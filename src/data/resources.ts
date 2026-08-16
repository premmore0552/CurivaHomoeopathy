export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'PDF' | 'Guide' | 'Research' | 'Notes';
  pageCount: number;
  price: number; // in INR
  thumbnail: string;
  fileUrl: string;
  isPro?: boolean;
}

export const resources: Resource[] = [
  {
    id: 'Homoeopathy-modalities-cheat-sheet',
    title: 'Homoeopathy Modalities Cheat Sheet',
    description: 'The ultimate rapid revision guide for Materia Medica. Master Thermal, Motion, Time, and Food & Drink modalities of 50+ key remedies in one high-yield visual sheet. Perfect for BHMS students and clinical practitioners.',
    category: 'PDF',
    pageCount: 1,
    price: 120,
    thumbnail: 'https://ais-dev-46ug6iwx2xitoihxp5k4ma-349546359089.asia-southeast1.run.app/assets/cheat_sheet_cover.png', // I'll assume this asset will be handled or use a generic one
    fileUrl: 'https://drive.google.com/file/d/1o_hf7hoxzvbVb7sR4MOLCfodkZfglice/view?usp=drivesdk',
    isPro: false
  }
];
