export interface Stalwart {
  id: string;
  name: string;
  title: string;
  years: string;
  description: string;
  contributions: string[];
  imageUrl: string;
  quote?: string;
  biography: string;
  clinicalPhilosophy: string;
  keyWorks: string[];
}

export const stalwartsData: Stalwart[] = [
  {
    id: "hahnemann",
    name: "Samuel Hahnemann",
    title: "Founder of Homoeopathy",
    years: "1755 - 1843",
    description: "Christian Friedrich Samuel Hahnemann was a German physician, linguist, and chemist, best known for creating the system of alternative medicine called Homoeopathy. He discovered the Law of Similars and authored the Organon of Medicine.",
    contributions: [
      "Discovery of the Law of Similars (Like Cures Like)",
      "Authored the Organon of Medicine (6 Editions)",
      "Developed the process of Potentization (Succussion & Trituration)",
      "Conducted the first rigorous drug provings on healthy subjects"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Samuel_Hahnemann_portrait.jpg/800px-Samuel_Hahnemann_portrait.jpg",
    quote: "Aude Sapere (Dare to be wise).",
    biography: "Born in Meissen, Saxony, Hahnemann was a brilliant scholar who mastered multiple languages, including English, French, Greek, Latin, Hebrew, and Arabic. After graduating as an MD in 1779, he became deeply disillusioned by the harsh and dangerous medical practices of his era—such as bloodletting, purging, and toxic doses of mercury. In 1790, while translating William Cullen's 'Materia Medica', he experimented with Cinchona bark (quinine) and discovered that it produced malaria-like symptoms in his healthy body, leading to the formulation of the therapeutic Law of Similars.",
    clinicalPhilosophy: "Hahnemann advocated for the 'Minimum Dose' to prevent aggravation, single-remedy prescribing, and a deep appreciation for the spiritual 'Vital Force' that maintains systemic equilibrium. In his later years, he introduced the Theory of Miasms (Psora, Sycosis, and Syphilis) to explain chronic, recurrent disease states.",
    keyWorks: [
      "Organon of Medicine",
      "Materia Medica Pura",
      "The Chronic Diseases, Their Peculiar Nature and Their Homoeopathic Cure",
      "Friend of Health"
    ]
  },
  {
    id: "boenninghausen",
    name: "Clemens von Bönninghausen",
    title: "The Pioneer of Repertory",
    years: "1785 - 1864",
    description: "A close friend and confidant of Hahnemann, Clemens Maria Franz von Bönninghausen was a Prussian jurist, botanist, and physician who developed the first reliable Homoeopathic repertory.",
    contributions: [
      "Created the Therapeutic Pocketbook (First structured repertory)",
      "Developed the Doctrine of Analogies for generalized symptoms",
      "Standardized the evaluation of Modalities and Concomitants"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Clemens_Maria_Franz_von_B%C3%B6nninghausen.jpg",
    quote: "The totality of symptoms is the only guide to the remedy.",
    biography: "Baron von Bönninghausen received a doctor's degree in civil and criminal law in 1806 and held several high judicial posts. In 1827, he was diagnosed with life-threatening pulmonary tuberculosis. Having lost hope in orthodox medical options, he wrote a farewell letter to his botanist friend Dr. A. Weihe, who was a Homoeopath. Weihe prescribed Pulsatilla, which cured Bönninghausen completely. Impressed by this gentle restoration of health, Bönninghausen dedicated the rest of his life to studying and practicing Homoeopathy, eventually becoming a close advisor to Samuel Hahnemann.",
    clinicalPhilosophy: "He introduced the concept of 'Grand Generalization,' arguing that what is true of a part is true of the whole. He structured case analysis into seven core coordinates: Quis (Personality/Constitution), Quid (Nature of disease), Ubi (Seat of disease), Quibus Auxiliis (Concomitants), Cur (Causes), Quomodo (Modalities), and Quando (Time of occurrence).",
    keyWorks: [
      "The Therapeutic Pocket Book",
      "The Systematic Alphabetic Repertory of Homoeopathic Remedies",
      "The Homoeopathic Treatment of Intermittent Fevers"
    ]
  },
  {
    id: "hering",
    name: "Constantine Hering",
    title: "The Father of American Homoeopathy",
    years: "1800 - 1880",
    description: "Originally tasked with writing a book to disprove Homoeopathy, he became its greatest advocate instead after a personal cure. He is famous for formulating Hering's Law of Direction of Cure.",
    contributions: [
      "Formulated Hering's Law of Direction of Cure",
      "Proved Lachesis Mutus, Apis Mellifica, and Glonoinum",
      "Founded the first Homoeopathic medical college in the US (Allentown)"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Constantine_Hering.jpg/800px-Constantine_Hering.jpg",
    quote: "If I find the truth, I must follow it.",
    biography: "Constantine Hering was born in Oschatz, Germany. While studying medicine at the University of Leipzig, he was employed by a prominent publisher to write a book exposing Homoeopathy as a fraudulent system. Hering undertook the work with scientific zeal. However, when a dissecting wound on his hand became severely gangrenous and orthodox surgeons recommended amputation, a Homoeopathic student treated him with Arsenicum Album. His hand was saved, and he abandoned his anti-Homoeopathic book to become Hahnemann's student. He emigrated to Philadelphia in 1833.",
    clinicalPhilosophy: "Hering established the absolute directional progression of true healing: cure occurs from within outward, from above downward, from more vital to less vital organs, and in the reverse order of the appearance of symptoms.",
    keyWorks: [
      "The Guiding Symptoms of our Materia Medica (10 Volumes)",
      "Analytical Repertory of the Mind",
      "Condensed Materia Medica"
    ]
  },
  {
    id: "kent",
    name: "James Tyler Kent",
    title: "The Master of Philosophy",
    years: "1849 - 1916",
    description: "A legendary American physician known for his high-potency practice and deep philosophical insights. His repertory remains a primary foundation for classical practice today.",
    contributions: [
      "Authorship of 'Lectures on Homoeopathic Philosophy'",
      "Created the comprehensive Kent's Repertory of Materia Medica",
      "Standardized the use of high potencies (up to MM) and series in prescribing"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/James_Tyler_Kent.jpg/800px-James_Tyler_Kent.jpg",
    quote: "Treat the patient, not the disease.",
    biography: "Born in Woodhull, New York, Kent graduated with an MA and studied Eclectic medicine. His conversion to Homoeopathy occurred when his second wife became gravely ill with persistent insomnia and nervous exhaustion that defied conventional treatment. A Homoeopathic physician, Dr. Richard Phelan, was called and administered a single dose of Lachesis, which brought about a profound cure. Kent immediately began studying the Organon and dedicated himself to the classical Hahnemannian system.",
    clinicalPhilosophy: "Kent championed a strongly spiritual, Swedenborgian view of the Vital Force and disease. He argued that the mind and will are the innermost core of the human being; hence, mental and emotional symptoms are of the highest hierarchical importance in selecting a matching remedy (constitutional prescribing).",
    keyWorks: [
      "Repertory of the Homoeopathic Materia Medica",
      "Lectures on Homoeopathic Philosophy",
      "Lectures on Homoeopathic Materia Medica"
    ]
  },
  {
    id: "sircar",
    name: "Dr. Mahendra Lal Sircar",
    title: "Pioneer of Indian Homoeopathy",
    years: "1833 - 1904",
    description: "The second MD graduate of the Calcutta Medical College, Dr. Sircar was an exceptional intellectual who transitioned to Homoeopathy and founded the first scientific research association in India.",
    contributions: [
      "First orthodox MD physician in India to embrace and scientifically validate Homoeopathy",
      "Founded the Calcutta Journal of Medicine in 1868",
      "Established the Indian Association for the Cultivation of Science (IACS) in 1876",
      "Treated high-profile spiritual and political stalwarts, including Sri Ramakrishna Paramahamsa"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mahendralal_Sarkar.jpg/640px-Mahendralal_Sarkar.jpg",
    quote: "Homoeopathy is not a mere system of therapeutics, but a law of nature.",
    biography: "Mahendra Lal Sircar was born in Paikpara, Bengal. He received his MD with top honors from Calcutta Medical College in 1863. He was initially a staunch opponent of Homoeopathy. However, when asked to review Morgan's 'Philosophy of Homoeopathy' for a journal, he realized that a fair trial was necessary. He observed the outstanding clinical results achieved by Babu Rajendra Lal Dutt. Confessing his conversion at a meeting of the British Medical Association, he was promptly ostracized and stripped of his university posts. Undeterred, he went on to build India's premier Homoeopathic and scientific organizations.",
    clinicalPhilosophy: "Dr. Sircar advocated for a highly scientific approach to Homoeopathy, insisting on the thorough study of modern physiology and clinical diagnosis alongside symptomatology. He rejected dogmatism and pushed for rigorous proving standards.",
    keyWorks: [
      "The Calcutta Journal of Medicine (Editor)",
      "On the Desirability of a National Institution for the Cultivation of the Physical Sciences"
    ]
  },
  {
    id: "dutt",
    name: "Babu Rajendra Lal Dutt",
    title: "Father of Indian Homoeopathy",
    years: "1818 - 1889",
    description: "A wealthy, compassionate philanthropist and lay-practitioner who established Homoeopathy's repute in India through legendary clinical successes.",
    contributions: [
      "Introduced classical Homoeopathy to high-society and common households in Bengal",
      "Directly converted Dr. Mahendra Lal Sircar through verifiable cures",
      "Opened the first free Homoeopathic dispensary in Calcutta with Dr. Tonnerre"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rajendralal_Dutta.jpg/400px-Rajendralal_Dutta.jpg",
    quote: "Charity is the highest virtue of a healer.",
    biography: "Babu Rajendra Lal Dutt was born into an affluent family in Wellington Square, Calcutta. Deeply touched by the suffering of the poor, he studied medicine extensively on his own and imported Homoeopathic literature and medicines from Europe. He partnered with the French physician Dr. Tonnerre to establish a clinic. His clinical cures of severe chronic conditions—such as gangrene, paralysis, and asthma—attracted the attention of the orthodox medical community and initiated the golden age of Homoeopathy in Bengal.",
    clinicalPhilosophy: "Believed that clinical outcomes are the ultimate test of medical theory. He practiced selfless service, prescribing classical remedies in moderate potencies with a deep focus on patient comfort.",
    keyWorks: [
      "Clinical Reports of Wellington Square Free Dispensary",
      "Essays on the Superiority of Homoeopathy in Cholera Treatment"
    ]
  },
  {
    id: "chand",
    name: "Dr. Diwan Harish Chand",
    title: "Global Envoy of Indian Homoeopathy",
    years: "1924 - 2011",
    description: "A highly distinguished 20th-century physician who integrated academic medicine with Homoeopathy and represented India on international Homoeopathic councils.",
    contributions: [
      "President of the Liga Medicorum Homoeopathica Internationalis (LMHI)",
      "Awarded the Padma Shri in 1984 for outstanding services to medicine",
      "Chaired the Government of India's Homoeopathic Pharmacopoeia Committee"
    ],
    imageUrl: "https://ui-avatars.com/api/?name=Diwan+Harish+Chand&background=1e40af&color=fff&size=512",
    quote: "Homoeopathy provides the ultimate gentle restoration of health in chronic diseases.",
    biography: "Born in Lahore, Dr. Harish Chand graduated from the King Edward Medical College and later completed post-graduate studies in Homoeopathy at the Royal London Homoeopathic Hospital. He dedicated his life to achieving national and international recognition for Indian Homoeopathy, ensuring it became an officially recognized stream of medicine. He served as the personal physician to several Presidents of India.",
    clinicalPhilosophy: "Emphasized the necessity of clinical research and academic excellence. He bridged the gap between modern diagnostics and classical repertorisation, ensuring safe and reproducible therapeutic outcomes.",
    keyWorks: [
      "A Compendium of Lectures on Homoeopathy",
      "Micro-Immunology and Homoeopathy",
      "The Healing Art of Homoeopathy (Editor)"
    ]
  },
  {
    id: "boger",
    name: "C.M. Boger",
    title: "Creator of BBCR",
    years: "1861 - 1935",
    description: "Cyrus Maxwell Boger was a prominent American physician who synthesized the methods of Bönninghausen and Kent into a unique, highly clinical approach.",
    contributions: [
      "Authored Boger Boenninghausen's Characteristics and Repertory (BBCR)",
      "Created the Synoptic Key to the Materia Medica",
      "Developed the concepts of Pathological Generals and Time Modalities"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cyrus_Maxwell_Boger.jpg/640px-Cyrus_Maxwell_Boger.jpg",
    quote: "Individualize each case.",
    biography: "Boger graduated from the Philadelphia College of Pharmacy and later obtained his medical degree from Cleveland Homoeopathic College. His German heritage allowed him to read Bönninghausen's original writings in German, which inspired him to reformulate and expand the repertorial methods to better match modern clinical pathology.",
    clinicalPhilosophy: "Boger developed a methodology based on the chronological onset of symptoms (cause-effect timeline). He introduced 'Pathological Generals' (how the patient's tissues react as a whole) and emphasized the diagnostic value of fever patterns and thermal states.",
    keyWorks: [
      "Boger Boenninghausen's Characteristics and Repertory",
      "Synoptic Key of the Materia Medica",
      "Studies in Character of Remedies"
    ]
  },
  {
    id: "boericke",
    name: "William Boericke",
    title: "The Pocket Manual Author",
    years: "1849 - 1929",
    description: "An Austrian-born American Homoeopath, compiler, and professor of Materia Medica whose pocket manual remains a universal clinical guide worldwide.",
    contributions: [
      "Pocket Manual of Homoeopathic Materia Medica (A standard clinical desk-reference)",
      "First Professor of Materia Medica at the University of California, San Francisco",
      "Translated the final 6th edition of Hahnemann's Organon into English"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/William_Boericke.jpg",
    quote: "The remedy must be known in its clinical context.",
    biography: "Emigrating from Austria, Boericke settled in San Francisco. He graduated from the Hahnemann Medical College of Philadelphia in 1880. He founded the Boericke & Runyon pharmacy and co-edited several journals. His 'Pocket Manual' condensed the vast volumes of the Materia Medica into highly usable keynotes and clinical indications.",
    clinicalPhilosophy: "Boericke was a pragmatist. He advocated for lower and medium potencies for structural pathologically advanced diseases while reserving high potencies for functional, sensory disorders.",
    keyWorks: [
      "Pocket Manual of Homoeopathic Materia Medica",
      "The Twelve Tissue Remedies of Schüssler (Co-author)",
      "Translation of Organon of Medicine (6th Edition)"
    ]
  },
  {
    id: "clarke",
    name: "John Henry Clarke",
    title: "The Dictionary Compiler",
    years: "1853 - 1931",
    description: "A prolific English physician, editor, and author who compiled one of the most comprehensive Materia Medicas in history.",
    contributions: [
      "Compiled the 'Dictionary of Practical Materia Medica'",
      "Edited 'The Homoeopathic World' journal for a quarter century",
      "Pioneered constitutional treatment in the British medical aristocracy"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/John_Henry_Clarke.jpg",
    quote: "Homoeopathy is a system of precision.",
    biography: "Clarke studied at the University of Edinburgh and received his MD in 1877. He became a consulting physician to the London Homoeopathic Hospital. A radical intellectual, he was deeply committed to making Homoeopathy easy to comprehend for busy clinicians, leading to his monumental dictionary project.",
    clinicalPhilosophy: "Clarke integrated clinical experiences of many different practitioners. He championed the use of 'clinical' symptoms (symptoms resolved in patients but not necessarily produced in provings), expanding the therapeutic scope of remedies.",
    keyWorks: [
      "A Dictionary of Practical Materia Medica (3 Volumes)",
      "The Prescriber: A Dictionary of the New Therapeutics",
      "Clinical Repertory to the Dictionary"
    ]
  },
  {
    id: "vithoulkas",
    name: "George Vithoulkas",
    title: "The Modern Stalwart",
    years: "1932 - Present",
    description: "A Greek Homoeopath who revitalized classical Homoeopathy internationally in the late 20th century and received the Right Livelihood Award (Alternative Nobel Prize).",
    contributions: [
      "Authored 'The Science of Homoeopathy'",
      "Established the International Academy of Classical Homoeopathy (Alonissos)",
      "Developed the revolutionary Level of Health theory for prognosis"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/George_Vithoulkas.jpg/400px-George_Vithoulkas.jpg",
    quote: "Homoeopathy is the medicine of the future.",
    biography: "Vithoulkas was born in Athens. Originally an engineer, he discovered Homoeopathy while working in South Africa. He studied in India and returned to Greece to establish a global training center. He has trained thousands of doctors and practitioners, playing a pivotal role in the scientific revival of classical practice.",
    clinicalPhilosophy: "Vithoulkas established that a patient's defense mechanism operates on different 'Levels of Health.' The level of health dictates whether a cure is possible, what potency is safe, and the nature of the expected reaction.",
    keyWorks: [
      "The Science of Homoeopathy",
      "Levels of Health",
      "Materia Medica Viva"
    ]
  },
  {
    id: "majumdar",
    name: "Dr. Jnanendra Nath Majumdar",
    title: "Pioneer of Academic Homoeopathy",
    years: "1907 - 1978",
    description: "A visionary academician, administrator, and physician who played an indispensable role in institutionalizing and organizing Homoeopathic education in India, culminating in the establishment of the National Institute of Homoeopathy (NIH).",
    contributions: [
      "Crucial force in the central recognition of homoeopathy in India",
      "Pioneered structured, college-level homoeopathic curricula in West Bengal",
      "Served as a founding member and advisor to the National Institute of Homoeopathy",
      "Organized free public clinics across rural and urban Bengal"
    ],
    imageUrl: "https://ui-avatars.com/api/?name=Jnanendra+Nath+Majumdar&background=059669&color=fff&size=512",
    quote: "True homoeopathy requires academic rigor equal to any modern medical science.",
    biography: "Dr. J. N. Majumdar was born in Bengal into a family deeply aligned with social reform and medical education. Graduating in medicine, he quickly realized the enormous potential of homoeopathy in providing a gentle, highly affordable therapeutic solution for India's masses. He dedicated his life to replacing unorganized apprenticeships with rigorous medical college degrees. He worked tirelessly on legislative committees to achieve official recognition of homoeopathic medical colleges, establishing West Bengal as the academic heart of Indian homoeopathy.",
    clinicalPhilosophy: "Majumdar advocated for a thorough grounding in anatomy, physiology, and pathology alongside classical repertorisation. He believed that a practitioner must first be a competent diagnostician before applying the Law of Similars.",
    keyWorks: [
      "The Structure of Homoeopathic Education in India",
      "Clinical Lectures on Materia Medica",
      "The Pathological Basis of Homoeopathic Therapeutics"
    ]
  },
  {
    id: "kishore",
    name: "Dr. Jugal Kishore",
    title: "The Pioneer of Repertorial Innovation",
    years: "1915 - 2005",
    description: "A globally renowned researcher and clinical genius who revolutionized case-taking by developing the first punched-card repertory system (The Kishore Card Repertory) in India.",
    contributions: [
      "Developed the Kishore Card Repertory, the first mechanical retrieval system for remedies",
      "Honorary Physician to three Presidents of India",
      "President of the Central Council of Homoeopathy (CCH)",
      "Advocated for Homoeopathic scientific research on international medical forums"
    ],
    imageUrl: "https://ui-avatars.com/api/?name=Jugal+Kishore&background=047857&color=fff&size=512",
    quote: "The search for the matching remedy is a science of indexing and precision.",
    biography: "Born in India, Dr. Jugal Kishore graduated with high honors and committed himself to the logical evolution of homoeopathy. Recognizing that searching through thousands of symptoms in standard repertories was slow and prone to human error, he designed a physical 'punched-card' indexing system. This system allowed doctors to align cards representing different symptoms and instantly view overlapping remedies. This was a direct precursor to modern computerized repertorisation, earning him global acclaim.",
    clinicalPhilosophy: "Dr. Kishore was a staunch classicist but fully embraced technical innovation. He urged doctors to focus on the 'striking, singular, uncommon, and peculiar' symptoms of a case, using logical tools to find the mathematical center of the patient's state.",
    keyWorks: [
      "Kishore Card Repertory",
      "Evolution of Homoeopathic Repertory",
      "Homoeopathy in the Light of Modern Science"
    ]
  },
  {
    id: "jaichand",
    name: "Dr. Diwan Jai Chand",
    title: "Pioneer of Public Health Integration",
    years: "1887 - 1961",
    description: "An exceptionally qualified orthodox physician who, after witnessing a miraculous cure of a terminal patient, converted to homoeopathy and laid the foundation for its professional recognition in Northern India.",
    contributions: [
      "Founded the Delhi Homoeopathic Medical Association (DHMA) in 1937",
      "Established the National Journal of Homoeopathy to encourage scientific publishing",
      "Introduced public health and hygienic sanitation guidelines into homoeopathic practices",
      "Bridges orthodox diagnostic systems with classical Homoeopathic therapeutics"
    ],
    imageUrl: "https://ui-avatars.com/api/?name=Diwan+Jai+Chand&background=0d9488&color=fff&size=512",
    quote: "Let science be our guide and the welfare of the patient our only goal.",
    biography: "Dr. Diwan Jai Chand was born in Punjab and graduated in conventional medicine, obtaining his highly prestigious L.R.C.P. and L.R.C.S. from Edinburgh, Scotland. While practicing orthodox medicine, he encountered cases that baffled standard therapies but were subsequently cured by homoeopathic physicians. He threw himself into the study of the Organon of Medicine and converted his practice. He moved to Delhi and established a leading clinic that served both the royal families of India and underprivileged communities without charge.",
    clinicalPhilosophy: "Dr. Jai Chand insisted on combining rigorous epidemiological and sanitary principles with constitutional prescribing. He believed homoeopathy is an invaluable pillar of national public health and preventive medicine.",
    keyWorks: [
      "The Scientific Basis of Homoeopathy",
      "Delhi Homoeopathic Journal (Founding Editor)",
      "Hygiene and Public Health in Classical Prescribing"
    ]
  },
  {
    id: "stuart-close",
    name: "Dr. Stuart Close",
    title: "Philosopher & Author of 'The Genius of Homoeopathy'",
    years: "1860 - 1929",
    description: "A master philosopher and educator whose landmark treatise 'The Genius of Homoeopathy' systematically elucidated Hahnemannian principles in the light of modern scientific logic.",
    contributions: [
      "Authored 'The Genius of Homoeopathy: Lectures and Essays on Homoeopathic Philosophy'",
      "Elucidated the Psychological Point of View and Schools of Philosophy in Medicine",
      "Provided scientific exposition of Susceptibility, Reaction, and Posology"
    ],
    imageUrl: "https://ui-avatars.com/api/?name=Stuart+Close&background=7c2d12&color=fff&size=512",
    quote: "Homoeopathy is a general system of therapeutics based upon a law of nature.",
    biography: "Dr. Stuart Close was born in Solon, New York. He graduated from the Medical College of the Pacific and later completed his medical education at the New York Homoeopathic Medical College in 1885. He practiced in Brooklyn and served as Professor of Homoeopathic Philosophy at the New York Homoeopathic Medical College for many years. His profound lectures formed the bedrock of philosophical education for generations of homoeopaths across North America and India.",
    clinicalPhilosophy: "Stuart Close emphasized the 'Psychological Point of View', demonstrating that health and disease are dynamic, functional states governed by kinetic energy and vital susceptibility. He bridged Hahnemannian vitalism with physical and biological science, showing that disease is not an entity but a altered state of vital motion.",
    keyWorks: [
      "The Genius of Homoeopathy: Lectures and Essays on Homoeopathic Philosophy",
      "The Medical World and Homoeopathy"
    ]
  },
  {
    id: "ha-roberts",
    name: "Dr. Herbert A. Roberts",
    title: "Author of 'The Principles and Art of Cure by Homoeopathy'",
    years: "1868 - 1950",
    description: "A prominent American physician, educator, and author who connected modern atomic physics and biology with Hahnemannian vitalism and posology.",
    contributions: [
      "Authored 'The Principles and Art of Cure by Homoeopathy'",
      "Authored 'Sensations As If...'",
      "President of the International Hahnemannian Association (IHA)",
      "Editor of 'The Homoeopathic Recorder'"
    ],
    imageUrl: "https://ui-avatars.com/api/?name=Herbert+A+Roberts&background=1e3a8a&color=fff&size=512",
    quote: "Homoeopathy is the application of natural law to the cure of human suffering.",
    biography: "Herbert A. Roberts graduated from the New York Homoeopathic Medical College. He practiced extensively in Derby, Connecticut, and served as a medical officer during World War I. Roberts was a profound scholar of both ancient philosophy and contemporary 20th-century physics, enabling him to explain potentization and dynamic medicine in terms of quantum energy and cellular resonance.",
    clinicalPhilosophy: "Roberts stressed the importance of understanding the 'Vital Force' as energy in motion. He analyzed the three miasms (Psora, Sycosis, Syphilis) in terms of deficiency, excess/coordination, and destruction/degeneration, giving clinicians a clear diagnostic framework for chronic disease.",
    keyWorks: [
      "The Principles and Art of Cure by Homoeopathy",
      "Sensations As If...",
      "The Rheumatic Remedies",
      "Studies in Homoeopathic Philosophy"
    ]
  },
  {
    id: "carroll-dunham",
    name: "Dr. Carroll Dunham",
    title: "Author of 'Homoeopathy: The Science of Therapeutics'",
    years: "1828 - 1877",
    description: "A brilliant American scholar, linguist, and physician known as the 'Melanchthon of Homoeopathy' for his irenic wisdom and scientific rigor.",
    contributions: [
      "Authored 'Homoeopathy: The Science of Therapeutics'",
      "Authored 'Lectures on Materia Medica'",
      "President of the American Institute of Homoeopathy (World Centennial Congress, 1876)",
      "Defended the scientific necessity of single remedy and minimum dose"
    ],
    imageUrl: "https://ui-avatars.com/api/?name=Carroll+Dunham&background=312e81&color=fff&size=512",
    quote: "Freedom of medical opinion and action is the right of every physician.",
    biography: "Carroll Dunham was born in New York City and graduated with high honors from Columbia University and the College of Physicians and Surgeons (MD, 1850). He traveled extensively in Europe, studying under Boenninghausen in Münster and observing Hahnemannian practice in Paris and Dublin. His scholarly essays clarified the exact relationship between Pathology and Therapeutics in homoeopathy.",
    clinicalPhilosophy: "Dunham established that homoeopathy is a science of observation based on phenomena. He demonstrated that while pathology informs diagnosis and prognosis, the therapeutic choice depends on the totality of characteristic symptoms.",
    keyWorks: [
      "Homoeopathy: The Science of Therapeutics",
      "Lectures on Materia Medica",
      "Versatility of Similia"
    ]
  },
  {
    id: "dudgeon",
    name: "Dr. Robert Ellis Dudgeon",
    title: "Translator of the Organon & Author of 'Lectures on Homoeopathy'",
    years: "1820 - 1904",
    description: "A monumental British physician, translator, and historian whose English translation of Hahnemann's Organon (5th/6th Edition) remains the gold standard in academic institutions.",
    contributions: [
      "Translated Hahnemann's Organon of Medicine (5th Edition) and Materia Medica Pura into English",
      "Authored 'Lectures on the Theory and Practice of Homoeopathy'",
      "Invented Dudgeon's Sphygmograph for cardiovascular diagnostics",
      "Editor of the 'British Journal of Homoeopathy' for over 40 years"
    ],
    imageUrl: "https://ui-avatars.com/api/?name=Robert+Ellis+Dudgeon&background=065f46&color=fff&size=512",
    quote: "The truth of homoeopathy rests on the immovable rock of nature's law.",
    biography: "Born in Edinburgh, Dudgeon graduated MD from the University of Edinburgh in 1841. After studying in Vienna and Berlin, he embraced homoeopathy in London. His unmatched knowledge of German enabled him to translate Hahnemann's original texts with pristine precision, preserving every footnote, nuance, and historical context for the English-speaking world.",
    clinicalPhilosophy: "Dudgeon provided an objective, critical history of medicine, showing how Hahnemann's empirical discovery surpassed the speculative theories of ancient medical sects. He championed precise clinical observation and transparent documentation.",
    keyWorks: [
      "Organon of Medicine (Translation of Hahnemann's 5th Edition)",
      "Lectures on the Theory and Practice of Homoeopathy",
      "Materia Medica Pura (Translation)",
      "Hahnemann's Therapeutic Hints"
    ]
  }
];
