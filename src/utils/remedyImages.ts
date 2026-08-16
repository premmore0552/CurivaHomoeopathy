/**
 * Remedy Image mapping utility
 * Provides high-resolution, matching Unsplash images for all Homoeopathic remedies,
 * ensuring No broken or blank images under the encyclopedia and remedy pages.
 */

const REMEDY_IMAGES: Record<string, string> = {
  aconite: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=800',
  arnica: 'https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800',
  'arsenicum-album': 'https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800',
  arsenicum: 'https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800',
  belladonna: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=800',
  bryonia: 'https://images.unsplash.com/photo-1596708051759-994df558d94e?auto=format&fit=crop&q=80&w=800',
  'calc-carb': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
  pulsatilla: 'https://images.unsplash.com/photo-1558231038-724804106579?auto=format&fit=crop&q=80&w=800',
  lycopodium: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=800',
  'nux-vomica': 'https://images.unsplash.com/photo-1563201515-adbe43ec34aa?auto=format&fit=crop&q=80&w=800',
  sulphur: 'https://images.unsplash.com/photo-1618235427181-705b63013ba0?auto=format&fit=crop&q=80&w=800',
  apis: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800',
  gelsemium: 'https://images.unsplash.com/photo-1533220556209-6a3f55462cf8?auto=format&fit=crop&q=80&w=800',
  lachesis: 'https://images.unsplash.com/photo-1601633535941-86f376f9ef0c?auto=format&fit=crop&q=80&w=800',
  mercurius: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=800',
  'merc-sol': 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=800',
  'nat-mur': 'https://images.unsplash.com/photo-1518113171953-209914344e3c?auto=format&fit=crop&q=80&w=800',
  phosphorus: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=800',
  'rhus-tox': 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800',
  sepia: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
  silicea: 'https://images.unsplash.com/photo-1549419139-44ba58444458?auto=format&fit=crop&q=80&w=800',
  thuja: 'https://images.unsplash.com/photo-1596708051493-99d91f24e930?auto=format&fit=crop&q=80&w=800',
  'allium-cepa': 'https://images.unsplash.com/photo-1518977822534-7049a6feec58?auto=format&fit=crop&q=80&w=800',
  aloe: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800',
  'aloe-socotrina': 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800',
  'ant-crud': 'https://images.unsplash.com/photo-1544070078-a212eda27b49?auto=format&fit=crop&q=80&w=800',
  'ant-tart': 'https://images.unsplash.com/photo-1518113171953-209914344e3c?auto=format&fit=crop&q=80&w=800',
  baptisia: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  'baryta-carb': 'https://images.unsplash.com/photo-1518113171953-209914344e3c?auto=format&fit=crop&q=80&w=800',
  borax: 'https://images.unsplash.com/photo-1518113171953-209914344e3c?auto=format&fit=crop&q=80&w=800',
  cactus: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
  cantharis: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800',
  'carbo-veg': 'https://images.unsplash.com/photo-1504221507732-5246c045949b?auto=format&fit=crop&q=80&w=800',
  causticum: 'https://images.unsplash.com/photo-1518113171953-209914344e3c?auto=format&fit=crop&q=80&w=800',
  chamomilla: 'https://images.unsplash.com/photo-1546850830-98440049206b?auto=format&fit=crop&q=80&w=800',
  digitalis: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800',
  drosera: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  eupatorium: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  'ferrum-phos': 'https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800',
  graphites: 'https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800',
  'hepar-sulph': 'https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800',
  hyoscyamus: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  hypericum: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  ignatia: 'https://images.unsplash.com/photo-1621460241617-695393586cd1?auto=format&fit=crop&q=80&w=800',
  ipecac: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  'kali-bich': 'https://images.unsplash.com/photo-1532187863486-abf2ad294cc8?auto=format&fit=crop&q=80&w=800',
  'kali-carb': 'https://images.unsplash.com/photo-1532187863486-abf2ad294cc8?auto=format&fit=crop&q=80&w=800',
  kreosotum: 'https://images.unsplash.com/photo-1504221507732-5246c045949b?auto=format&fit=crop&q=80&w=800',
  ledum: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  'mag-phos': 'https://images.unsplash.com/photo-1518113171953-209914344e3c?auto=format&fit=crop&q=80&w=800',
  medorrhinum: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  'phos-acid': 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=800',
  phytolacca: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  psorinum: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  staphysagria: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  spigelia: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  spongia: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
  stannum: 'https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800',
  stramonium: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  symphytum: 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  tabacum: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?auto=format&fit=crop&q=80&w=800',
  tarentula: 'https://images.unsplash.com/photo-1533220556209-6a3f55462cf8?auto=format&fit=crop&q=80&w=800',
  theridion: 'https://images.unsplash.com/photo-1533220556209-6a3f55462cf8?auto=format&fit=crop&q=80&w=800',
  'veratrum-alb': 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  euphrasia: 'https://images.unsplash.com/photo-1549419139-44ba58444458?auto=format&fit=crop&q=80&w=800',
  glonoinum: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800',
  'chelidonium-majus': 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  'conium-maculatum': 'https://images.unsplash.com/photo-1512429234300-1c1c3e387087?auto=format&fit=crop&q=80&w=800',
  'secale-cornutum': 'https://images.unsplash.com/photo-1504221507732-5246c045949b?auto=format&fit=crop&q=80&w=800',
  'calendula-officinalis': 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800',
};

const FAMILY_FALLBACKS: Record<string, string> = {
  Plant: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?auto=format&fit=crop&q=80&w=800',
  Mineral: 'https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800',
  Animal: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800',
  Sarcode: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  Nosode: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  Imponderabilia: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800',
};

export function getRemedyImage(id: string, name: string = '', family: string = ''): string {
  const cleanId = id.toLowerCase().trim();
  
  // 1. Direct ID match
  if (REMEDY_IMAGES[cleanId]) {
    return REMEDY_IMAGES[cleanId];
  }

  // 2. Search key match (e.g. "arnica-montana" matching "arnica")
  for (const [key, url] of Object.entries(REMEDY_IMAGES)) {
    if (cleanId.includes(key) || key.includes(cleanId)) {
      return url;
    }
  }

  // 3. Fallback based on family (try to guess if family is specified, or check name)
  const cleanFamily = (family || '').trim();
  if (cleanFamily && FAMILY_FALLBACKS[cleanFamily]) {
    return FAMILY_FALLBACKS[cleanFamily];
  }

  // 4. Default global fallback (beautiful botanical study shelf/desk)
  return 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800';
}
