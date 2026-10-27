import { resources as publicResources, type Resource } from './resources';

export type ServerResource = Resource & { storageObject: string };

// Upload the PDF to a private Cloud Storage bucket at this object path.
// A signed URL is generated only after Razorpay confirms a captured payment.
const privateObjectPaths: Record<string, string> = {
  'Homoeopathy-modalities-cheat-sheet':
    'resources/homoeopathy-modalities-cheat-sheet.pdf',
};

export const serverResources: ServerResource[] = publicResources.map((resource) => ({
  ...resource,
  storageObject: privateObjectPaths[resource.id] || '',
}));
