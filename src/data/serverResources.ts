import { resources as publicResources, type Resource } from './resources';

export type ServerResource = Resource & { fileUrl: string };

// Delivery URLs belong in the server bundle, not the public website bundle.
// For production-grade access control, replace public Drive sharing with private object
// storage and short-lived signed download URLs.
const deliveryUrls: Record<string, string> = {
  'Homoeopathy-modalities-cheat-sheet':
    'https://drive.google.com/file/d/1o_hf7hoxzvbVb7sR4MOLCfodkZfglice/view?usp=drivesdk',
};

export const serverResources: ServerResource[] = publicResources.map((resource) => ({
  ...resource,
  fileUrl: deliveryUrls[resource.id] || '',
}));
