export interface FMTSubTopic {
  id: string;
  title: string;
  items: string[];
}

export interface FMTChapter {
  chapterNumber: number;
  title: string;
  subtopics: string[];
}

export interface FMTSection {
  id: string;
  sectionTitle: string;
  subtitle: string;
  chapters: FMTChapter[];
}

export const FMT_SYLLABUS_DATA: FMTSection[] = [
  {
    id: 'section-a',
    sectionTitle: 'Section A: Forensic Medicine',
    subtitle: 'Legal procedures, medical jurisprudence, identification, osteology, DNA profiling, autopsy, thanatology, trauma, asphyxia, sexual offences, and forensic psychiatry.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Legal Procedure',
        subtopics: [
          'Courts: Supreme Court, High Court, Sessions Court, Magistrate Courts in India',
          'Summons or Subpoena & Conduct Money',
          'Medical Evidence: Documentary (Death certificate, Medical certificate, Medico-legal report, Dying Declaration) & Oral Evidence',
          'Witnesses: Common / Fact Witness, Expert Witness, Hostile Witness',
          'Procedure in Court: Oath, Examination-in-chief, Cross-examination, Re-examination, Court Questions',
          'Conduct of Doctor in the Court & Professional Secrecy'
        ]
      },
      {
        chapterNumber: 2,
        title: 'Medical Jurisprudence & Ethics',
        subtopics: [
          'National Medical Commission (NMC) & State Medical Councils',
          'Ethical Aspects: Hippocratic Oath, Geneva Declaration, Nuremberg Code',
          'Legal Aspects & Professional Misconduct (Infamous Conduct in Professional Respect)',
          'Doctors and Medical Records Maintenance Protocols',
          'Consent in Medical Practice: Informed, Implied, Express (Oral/Written), Proxy, Involuntary Consent',
          'Medical Negligence: Civil & Criminal Negligence, Contributory Negligence, Res Ipsa Loquitur, Novus Actus Interveniens',
          'Consumer Protection Act (CPA / COPRA) in Medical Practice',
          'Biomedical Waste Management Regulations',
          'Ethics and Medical Research: ICMR Guidelines for Human Experimentation',
          'Indian Medical Council Regulations (Professional Conduct, Etiquette and Ethics)'
        ]
      },
      {
        chapterNumber: 3,
        title: 'Identification',
        subtopics: [
          'Race and Ancestry Markers',
          'Sex Determination from Soft Tissues & Skeletal Elements',
          'Age Estimation Criteria in Living & Dead',
          'Age Estimation in Infants, Children, and Adults (<25 years) via Dentition & Ossification Centers',
          'Stature Estimation from Long Bones (Karl Pearson & Trotter-Gleser formulae)',
          'Dactyloscopy (Fingerprints), Poroscopy & Cheiloscopy',
          'Tattoo Marks, Scars, Occupational Marks, and Personal Belongings'
        ]
      },
      {
        chapterNumber: 4,
        title: 'Forensic Osteology',
        subtopics: [
          'Skull: Sutural Closure Rates & Sexual Dimorphism',
          'Mandible: Angle, Chin Morphometry & Dentition',
          'Femur: Head Diameter, Neck-Shaft Angle, Bicondylar Width',
          'Tibia and Fibula Measurements',
          'Humerus, Radius, and Ulna Parameters',
          'Sternum: Subcostal Angle & Manubrium-Corpus Ratio',
          'Scapula and Clavicle Identification Features',
          'Pelvis and Hipbone: Greater Sciotic Notch, Pubic Arch, Subpubic Angle',
          'Sacrum: Sacral Index Calculation'
        ]
      },
      {
        chapterNumber: 5,
        title: 'DNA Profiling',
        subtopics: [
          'Basic Considerations & Structure of Human Genome',
          'DNA Typing Methods: STR, RFLP, Mitochondrial DNA, Y-STR',
          'Applications of DNA Profiling: Paternity, Crime Scene Analysis, Mass Disaster Identification',
          'DNA Evidence Admissibility under Indian Evidence Act / Bharatiya Sakshya Adhiniyam',
          'Collection, Preservation, Chain of Custody & Forwarding of Samples'
        ]
      },
      {
        chapterNumber: 6,
        title: 'Medicolegal Autopsy',
        subtopics: [
          'Autopsy Procedure, Objectives & Legal Authorization',
          'Laboratory Investigations: Viscera Preservation, Histopathology, Toxicological Analysis',
          'Fetal Autopsy: Maceration, Putrefaction & Hydrostatic Test for Live Birth',
          'Exhumation Protocols & Legal Sanction',
          'Postmortem Artefacts: Agonal, Resuscitative, Thermal, Entomological, Animal Damage'
        ]
      },
      {
        chapterNumber: 7,
        title: 'Death and Changes After Death (Thanatology)',
        subtopics: [
          'Types of Death: Somatic / Clinical Death vs Molecular / Cellular Death',
          'Brain Death & Brainstem Death Criteria (Transplant Regulations)',
          'Death Certificate Standards & Cause of Death Coding (ICD-11)',
          'Apparent Death (Suspended Animation)',
          'Modes of Death: Syncope, Asphyxia, Coma',
          'Manner of Death: Natural, Accidental, Suicidal, Homicidal',
          'Immediate Changes: Loss of Sensibility, Cessation of Circulation & Respiration',
          'Early Changes: Eye Changes, Skin Changes',
          'Cooling of Body (Algor Mortis) & Postmortem Interval (PMI)',
          'Postmortem Lividity (Livor Mortis / Hypostasis)',
          'Changes in Muscle: Primary Flaccidity, Rigor Mortis, Secondary Flaccidity',
          'Decomposition & Putrefaction: Casper\'s Dictum, Greenish Discoloration, Marbling',
          'Skeletonization & Environmental Decay',
          'Adipocere Formation (Saponification)',
          'Mummification Factors',
          'Forensic Entomology: Insect Succession in PMI Estimation',
          'Sudden & Unexpected Natural Deaths'
        ]
      },
      {
        chapterNumber: 8,
        title: 'Mechanical Injuries & Wound Ballistics',
        subtopics: [
          'Classification of Mechanical Injuries: Blunt Force vs Sharp Force',
          'Abrasions: Imprint, Graze, Scratch, Pressure Abrasions',
          'Contusions (Bruises): Colors & Age Determination',
          'Lacerations: Split, Tear, Stretch, Avulsion Lacerations',
          'Incised Wounds: Hesitation Cuts, Defense Wounds, Beheading',
          'Stab Wounds: Entry, Exit, Track & Blade Morphology',
          'Firearm Injuries: Rifling, Entry Wound (Chorring, Tattooing, Smudging), Exit Wound',
          'Blast Injuries: Primary, Secondary, Tertiary, Quaternary Blast FX'
        ]
      },
      {
        chapterNumber: 9,
        title: 'Regional Injuries',
        subtopics: [
          'Head Injuries: Scalp Wounds, Skull Fractures (Ring fracture, Depressed fracture)',
          'Intracranial Hemorrhages: Epidural (EDH), Subdural (SDH), Subarachnoid (SAH), Intracerebral',
          'Spine & Spinal Cord Injuries (Whiplash Injury)',
          'Chest & Abdominal Trauma: Flail Chest, Organ Ruptures (Spleen, Liver, Bladder)'
        ]
      },
      {
        chapterNumber: 10,
        title: 'Medicolegal Aspects of Wounds',
        subtopics: [
          'Grievous Hurt Definition under IPC / Bharatiya Nyaya Sanhita (BNS)',
          'Simple vs Grievous Hurt Distinctions',
          'Age Determination of Wounds',
          'Antemortem vs Postmortem Injuries',
          'Cause, Manner, and Weapon Identification from Wound Patterns'
        ]
      },
      {
        chapterNumber: 11,
        title: 'Thermal Injuries & Thermal Trauma',
        subtopics: [
          'Classification of Burns: First, Second, Third, Fourth Degree Burns',
          'Rule of Nines & Rule of Palms for Surface Area Calculation',
          'Antemortem vs Postmortem Burns (Soot in trachea, Heat hematoma, Pugilistic attitude)',
          'Scalds: Steam vs Boiling Water Effects',
          'Chemical Burns & Radiation Injuries'
        ]
      },
      {
        chapterNumber: 12,
        title: 'Electrical & Lightning Injuries',
        subtopics: [
          'Electrocution: Joule Burn, Entry & Exit Marks, Ventricular Fibrillation',
          'Lightning Strikes: Lichtenberg Figures (Arborescent / Feathering marks), Magnetization'
        ]
      },
      {
        chapterNumber: 13,
        title: 'Mechanical Asphyxia',
        subtopics: [
          'General Signs of Asphyxia: Tardieu Spots, Cyanosis, Congestion, Dark Fluid Blood',
          'Hanging: Judicial vs Suicidal, Ante-mortem vs Post-mortem Hanging, Hyoid Bone Fracture',
          'Strangulation: Ligature Strangulation, Throttling (Manual Strangulation), Bansdola',
          'Suffocation: Smothering, Gagging, Choking, Entrapment',
          'Traumatic / Traumatic-Compressive Asphyxia (Burking)',
          'Drowning: Fresh Water vs Salt Water, Gettler\'s Test, Diatom Analysis, Cadaveric Spasm'
        ]
      },
      {
        chapterNumber: 14,
        title: 'Starvation & Environmental Neglect',
        subtopics: [
          'Acute vs Chronic Starvation Findings',
          'Post-mortem Findings in Starvation & Neglect',
          'Medicolegal Aspects of Starvation (Homicidal neglect, Fasting)'
        ]
      },
      {
        chapterNumber: 15,
        title: 'Sexual Offences & Forensic Sexology',
        subtopics: [
          'Classification of Sexual Offences: Natural vs Unnatural',
          'Rape: Medicolegal Examination of Victim & Accused, Evidence Collection (Semen, DNA, Clothing)',
          'Protection of Children from Sexual Offences (POCSO) Act',
          'Unnatural Offences: Sodomy, Bestiality, Buccal Coitus',
          'Sexual Perversions (Paraphilias): Sadism, Masochism, Transvestism, Exhibitionism, Voyeurism'
        ]
      },
      {
        chapterNumber: 16,
        title: 'Infanticide & Pediatric Forensic Medicine',
        subtopics: [
          'Infanticide Definition & Medicolegal Aspects',
          'Signs of Live Birth: Hydrostatic (Docimasia Hydrostatica) Test, Stomach-Bowel Test',
          'Maceration vs Putrefaction in Fetus',
          'Causes of Fetal & Infantile Death (Precipitate labor, Strangulation, Smothering)',
          'Battered Baby Syndrome (Child Abuse / Non-Accidental Trauma)'
        ]
      },
      {
        chapterNumber: 17,
        title: 'Forensic Psychiatry',
        subtopics: [
          'Classification of Mental Illnesses & Delusions, Hallucinations, Illusions',
          'Legal Insanity vs Medical Insanity',
          'McNaghten Rules, Durham Rule, Irresistible Impulse',
          'Civil Responsibility of Mentally Ill (Validity of Consent, Will/Testamentary Capacity, Marriage)',
          'Criminal Responsibility & Mental Healthcare Act Regulations'
        ]
      }
    ]
  },
  {
    id: 'section-b',
    sectionTitle: 'Section B: Toxicology',
    subtitle: 'General toxicology, medicolegal protocols, corrosive acids, inorganic/organic irritants, neurotoxins, asphyxiants, agricultural chemicals, and emergency therapeutics.',
    chapters: [
      {
        chapterNumber: 18,
        title: 'Toxicology: General Considerations',
        subtopics: [
          'Definition & Scope of Clinical & Forensic Toxicology',
          'Classification of Poisons: Action-based, Chemical, Legal',
          'Diagnosis of Poisoning in Living: Clinical Features, Toxidromes (Cholinergic, Anticholinergic, Opioid, Sympathomimetic)',
          'Management Principles: Resuscitation, Decontamination (Emesis, Gastric Lavage, Activated Charcoal), Elimination Enhancement',
          'Antidotes: Physical, Chemical, Physiological, Pharmacological, Universal Antidote',
          'Diagnosis in Dead: Autopsy Findings (External & Internal Features)'
        ]
      },
      {
        chapterNumber: 19,
        title: 'Toxicology: Medicolegal Considerations',
        subtopics: [
          'Duties of Medical Officer in Suspected Poisoning Cases',
          'Preservation & Forwarding of Viscera (Preservatives: Saturated NaCl vs Rectified Spirit)',
          'Chain of Custody & Chemical Examiner Report Handling',
          'Medicolegal Aspects: Homicidal, Suicidal, Accidental, Stupefying Poisoning'
        ]
      },
      {
        chapterNumber: 20,
        title: 'Corrosive Poisons',
        subtopics: [
          'Inorganic Mineral Acids: Sulfuric Acid (H₂SO₄), Nitric Acid (HNO₃), Hydrochloric Acid (HCl)',
          'Vitriolage (Acid Throwing): Clinical Features, Treatment, Legal Penalties',
          'Organic Corrosive Acids: Carbolic Acid (Phenol), Oxalic Acid, Acetic Acid',
          'Carboluria, Ochronosis, Oxaluria & Hypocalcemia Mechanisms',
          'Corrosive Alkalis: Caustic Soda (NaOH), Caustic Potash (KOH), Ammonia'
        ]
      },
      {
        chapterNumber: 21,
        title: 'Inorganic Irritants: Non-Metallic Poisons',
        subtopics: [
          'Iodine Poisoning & Starch-Iodine Test',
          'Phosphorus: Yellow vs Red Phosphorus, Phossy Jaw (Phosphonecrosis), Phossy Liver'
        ]
      },
      {
        chapterNumber: 22,
        title: 'Inorganic Irritants: Metallic Poisons',
        subtopics: [
          'Arsenic: Acute vs Chronic Poisoning, Raindrop Pigmentation, Aldrich-Mee\'s Lines, Marsh Test',
          'Mercury: Acute Toxicity, Chronic Hydrargyrum, Pink Disease (Acrodynia), Erethism, Minamata Disease',
          'Lead (Plumbism / Sisha): Burtonian Line, Basophilic Stippling, Wrist Drop, Lead Encephalopathy',
          'Copper: Copper Sulfate (Blue Vitriol), Hemolysis, Jaundice, Metal Fume Fever',
          'Iron Poisoning: Gastrointestinal Necrosis, Metabolic Acidosis, Deferoxamine Therapy',
          'Zinc: Brass Founders\' Ague / Metal Fume Fever',
          'Thallium: Alopecia, Peripheral Neuropathy',
          'Antimony Poisoning Features'
        ]
      },
      {
        chapterNumber: 23,
        title: 'Organic Irritants: Plant Poisons',
        subtopics: [
          'Toxic Principles in Plants: Alkaloids, Glycosides, Toxalbumins',
          'Abrus precatorius (Ratti / Jequirity Bean, Toxalbumin - Abrin)',
          'Castor (Ricinus communis, Toxalbumin - Ricin)',
          'Croton tiglium (Jamalgota, Croton Oil)',
          'Calotropis (Madar / Akdo, Gigantea & Procera, Uscharin, Calotropin)',
          'Marking Nut (Semecarpus anacardium / Bhilawa, Anacardic Acid)',
          'Plumbago (Zeylanica & Rosea, Plumbagin)',
          'Colocynth (Citrullus colocynthis, Bitter Apple)',
          'Capsicum (Capsaicin)',
          'Ergot (Claviceps purpurea, Ergotism / St. Anthony\'s Fire)'
        ]
      },
      {
        chapterNumber: 24,
        title: 'Organic Irritants: Animal Bites & Stings',
        subtopics: [
          'Poisonous vs Non-Poisonous Snakes in India',
          'Common Poisonous Snakes: Cobra, Krait (Elapidae), Russell\'s Viper, Saw-Scaled Viper (Viperidae)',
          'Venom Action: Neurotoxic, Vasculotoxic / Hemotoxic, Myotoxic',
          'Clinical Envenomation Features: Ptosis, Bulbar Palsy, Coagulopathy, Local Necrosis',
          'Polyvalent Anti-Snake Venom (ASV) Protocol & Anaphylaxis Management',
          'Scorpion Envenomation: Myocardial Myocarditis & Prazosin Therapy',
          'Bees and Wasp Stings: Histamine Reaction & Anaphylactic Shock'
        ]
      },
      {
        chapterNumber: 25,
        title: 'Neurotoxic Somniferous Poisons (Opioids)',
        subtopics: [
          'Opium, Morphine, Heroin, Codeine',
          'Clinical Triad: Pinpoint Pupils, Respiratory Depression, Coma',
          'Naloxone Antidote Therapy & Withdrawal Syndrome'
        ]
      },
      {
        chapterNumber: 26,
        title: 'Neurotoxic Inebriants & Alcohol Toxicity',
        subtopics: [
          'Ethyl Alcohol: Acute Intoxication, Drunkenness Tests, Widmark\'s Formula, Chronic Alcoholism, Delirium Tremens',
          'Methyl Alcohol (Wood Alcohol): Toxic Metabolites (Formic acid), Blindness, Fomepizole / Ethanol Therapy'
        ]
      },
      {
        chapterNumber: 27,
        title: 'Neurotoxic Deliriant Poisons',
        subtopics: [
          'Dhatura (Datura stramonium / fastuosa): Roadside Poison, Dhatura Triad, Atropine Toxicity',
          'Cannabis sativa: Bhang, Ganja, Charas, Hashish, Hashish Oil',
          'Atropine & Hyoscyamus Toxicity Features'
        ]
      },
      {
        chapterNumber: 28,
        title: 'Neurotoxic Stimulants & Hallucinogens',
        subtopics: [
          'Cocaine: Erythroxylum coca, Cocaine Bugs (Magnan\'s Symptom)',
          'Amphetamines & Ecstasy (MDMA)',
          'LSD (Lysergic Acid Diethylamide) & Hallucinogenic Effects'
        ]
      },
      {
        chapterNumber: 29,
        title: 'Spinal & Peripheral Nerve Poisons',
        subtopics: [
          'Strychnine (Nux vomica / Kuchila): Opisthotonos, Risus Sardonicus, Antidote (Diazepam)',
          'Curare & Hemlock (Conium maculatum) Toxicity'
        ]
      },
      {
        chapterNumber: 30,
        title: 'Cardiac Poisons',
        subtopics: [
          'Digitalis purpurea (Foxglove): Arrhythmias, Xanthopsia',
          'Oleander: Pink Oleander (Nerium odorum) & Yellow Oleander (Cerbera thevetia)',
          'Aconite (Aconitum napellus / Sweet Poison / Mitha Zahar): Tingling & Numbness',
          'Tobacco & Nicotine Toxicity'
        ]
      },
      {
        chapterNumber: 31,
        title: 'Asphyxiants & Poisonous Gases',
        subtopics: [
          'Carbon Monoxide (CO): Cherry-Red Lividity, Carboxyhemoglobin, Hyperbaric Oxygen Therapy',
          'Carbon Dioxide (CO2) & Hydrogen Sulfide (H2S - Sewer Gas)',
          'Cyanide (Hydrocyanic Acid): Bitter Almond Odor, Histotoxic Hypoxia, Cyanide Antidote Kit (Sodium Nitrite, Sodium Thiosulfate)'
        ]
      },
      {
        chapterNumber: 32,
        title: 'Agricultural & Domestic Pesticides',
        subtopics: [
          'Organophosphates (OP Compounds): Muscarinic & Nicotinic Signs (DUMBELS), Atropine & Pralidoxime (PAM)',
          'Carbamates & Organochlorines (DDT, Endosulfan)',
          'Aluminium Phosphide (Celphos): Garlicky Odor, Phosphine Gas, Shock & Cardiotoxicity',
          'Zinc Phosphide (Rat Poison)'
        ]
      },
      {
        chapterNumber: 33,
        title: 'Therapeutic Overdosage & Environmental Toxins',
        subtopics: [
          'Barbiturates & Benzodiazepines Toxicity',
          'Paracetamol Toxicity: N-acetylcysteine (NAC) Antidote Protocol',
          'Salicylate Toxicity (Aspirin): Tinnitus, Hyperventilation, Metabolic Acidosis',
          'Emergency Homoeopathic First-Aid Therapeutics: Arsenicum album, Nux vomica, Phosphorus, Camphora, Belladonna, Lachesis, Hydrocyanic acid'
        ]
      }
    ]
  }
];
