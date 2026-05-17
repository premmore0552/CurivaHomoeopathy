export interface Footnote {
  id: string;
  text: string;
}

export interface AphorismVersion {
  edition: string;
  content: string;
  footnotes: Footnote[];
}

export interface OrganonAphorism {
  id: number;
  category: "Philosophy" | "Clinical" | "Pharmacy" | "Historical";
  versions: AphorismVersion[];
  relatedIds?: number[];
}

export const organonData: OrganonAphorism[] = [
  {
    id: 1,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed.1",
        footnotes: [
          {
            id: "1",
            text: "His mission is not, however, to construct so-called systems, by interweaving empty speculations and hypotheses concerning the internal essential nature of the vital processes and the mode in which diseases originate in the interior of the organism, (whereon so many physicians have hitherto ambitiously wasted their talents and their time); nor is it to attempt to give countless explanations regarding the phenomena in diseases and their proximate cause (which must ever remain concealed), wrapped in unintelligible words and an inflated abstract mode of expression, which should sound very learned in order to astonish the ignorant - whilst sick humanity sighs in vain for aid. Of such learned reveries (to which the name of theoretic medicine is given, and for which special professorships are instituted) we have had quite enough, and it is now high time that all who call themselves physicians should at length cease to deceive suffering mankind with mere talk, and begin now, instead, for once to act, that is, really to help and to cure."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles.",
        footnotes: []
      }
    ]
  },
  {
    id: 3,
    category: "Philosophy",
    relatedIds: [71, 105, 146],
    versions: [
      {
        edition: "Standard",
        content: "If the physician clearly perceives what is to be cured in diseases, that is to say, in every individual case of disease (knowledge of disease, indication), if he clearly perceives what is curative in medicines, that is to say, in each individual medicine (knowledge of medical powers), and if he knows how to adapt, according to clearly defined principles, what is curative in medicines to what he has discovered to be undoubtedly morbid in the patient, so that the recovery must ensue - to adapt it, as well in respect to the suitability of the medicine most appropriate according to its mode of action to the case before him (choice of the remedy, the medicine indicated), as also in respect to the exact mode of preparation and quantity of it required (proper dose), and the proper period for repeating the dose; - if, finally, he knows the obstacles to recovery in each case and is aware how to remove them, so that the restoration may be permanent, then he understands how to treat judiciously and rationally, and he is a true practitioner of the healing art.",
        footnotes: []
      }
    ]
  },
  {
    id: 4,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "He is likewise a preserver of health if he knows the things that derange health and cause disease, and how to remove them from persons in health.",
        footnotes: []
      }
    ]
  },
  {
    id: 5,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Useful to the physician in assisting him to cure are the particulars of the most probable exciting cause of the acute disease, as also the most significant points in the whole history of the chronic disease, to enable him to discover its fundamental cause, which is generally due to a chronic miasm. In these investigations, the ascertainable physical constitution of the patient (especially when the disease is chronic), his moral and intellectual character, his occupation, mode of living and habits, his social and domestic relations, his age, sexual function, etc., are to be taken into consideration.",
        footnotes: []
      }
    ]
  },
  {
    id: 6,
    category: "Philosophy",
    relatedIds: [8, 12, 17],
    versions: [
      {
        edition: "Fifth Edition",
        content: "The unprejudiced observer - well aware of the futility of transcendental speculations which can receive no confirmation from experience - be his powers of penetration ever so great, takes note of nothing in every individual disease, except the changes in the health of the body and of the mind (morbid phenomena, accidents, symptoms) which can be perceived externally by means of the senses; that is to say, he notices only the deviations from the former healthy state of the now diseased individual, which are felt by the patient himself, remarked by those around him and observed by the physician. All these perceptible signs represent the disease in its whole extent, that is, together they form the true and only conceivable portrait of the disease.1",
        footnotes: [
          {
            id: "1",
            text: "I know not, therefore, how it was possible for physicians at the sick-bed to allow themselves to suppose that, without most carefully attending to the symptoms and being guided by them in the treatment, they ought to seek and could discover, only in the hidden and unknown interior, what there was to be cured in the disease, arrogantly and ludicrously pretending that they could, without paying much attention to the symptoms, discover the alteration that had occurred in the invisible interior, and set it to rights with (unknown!) medicines, and that such a procedure as this could alone be called radical and rational treatment.\n\nIs not, then, that which is cognizable by the senses in diseases through the phenomena it displays, the disease itself in the eyes of the physician, since he never can see the spiritual being that produces the disease, the vital force? nor is it necessary that he should see it, but only that he should ascertain its morbid actions, in order that he may thereby be enabled to cure the disease. What else will the old school search for in the hidden interior of the organism, as a prima causa morbi, whilst they reject as an object of cure and contemptuously despise the sensible and manifest representation of the disease, the symptoms, that so plainly address themselves to us? What else do they wish to cure in disease but these?*\n\n* The physician whose researches are directed towards the hidden relations in the interior of the organism, may daily err; but the homoeopathist who grasps with requisite carefulness the whole group of symptoms, possesses a sure guide; and if he succeed in removing the whole group of symptoms he has likewise most assuredly destroyed the internal, hidden cause of the disease."
          }
        ]
      },
      {
        edition: "Sixth Edition",
        content: "The unprejudiced observer - well aware of the futility of transcendental speculations which can receive no confirmation from experience - be his powers of penetration ever so great, takes note of nothing in every individual disease, except the changes in the health of the body and of the mind (morbid phenomena, accidents, symptoms) which can be perceived externally by means of the senses; that is to say, he notices only the deviations from the former healthy state of the now diseased individual, which are felt by the patient himself, remarked by those around him and observed by the physician. All these perceptible signs represent the disease in its whole extent, that is, together they form the true and only conceivable portrait of the disease.1",
        footnotes: [
          {
            id: "1",
            text: "I know not, therefore, how it was possible for physicians at the sick-bed to allow themselves to suppose that, without most carefully attending to the symptoms and being guided by them in the treatment, they ought to seek and could discover, only in the hidden and unknown interior, what there was to be cured in the disease, arrogantly and ludicrously pretending that they could, without paying much attention to the symptoms, discover the alteration that had occurred in the invisible interior, and set it to rights with (unknown!) medicines, and that such a procedure as this could alone be called radical and rational treatment.\n\nIs not, then, that which is cognizable by the senses in diseases through the phenomena it displays, the disease itself in the eyes of the physician, since he never can see the spiritual being that produces the disease, the vital force? nor is it necessary that he should see it, but only that he should ascertain its morbid actions, in order that he may thereby be enabled to cure the disease. What else will the old school search for in the hidden interior of the organism, as a prima causa morbi, whilst they reject as an object of cure and contemptuously despise the sensible and manifest representation of the disease, the symptoms, that so plainly address themselves to us? What else do they wish to cure in disease but these?"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    category: "Philosophy",
    relatedIds: [18, 22],
    versions: [
      {
        edition: "Standard",
        content: "Now, as in a disease, from which no manifest exciting or maintaining cause (causa occasionalis) has to be removed1, we can perceive nothing but the morbid symptoms, it must (regard being had to the possibility of a miasm, and attention paid to the accessory circumstances, § 5) be the symptoms alone by which the disease demands and points to the remedy suited to relieve it - and, moreover, the totality of these its symptoms, of this outwardly reflected picture of the internal essence of the disease, that is, of the affection of the vital force, must be the principal, or the sole means, whereby the disease can make known what remedy it requires - the only thing that can determine the choice of the most appropriate remedy - and thus, in a word, the totality2 of the symptoms must be the principal, indeed the only thing the physician has to take note of in every case of disease and to remove by means of his art, in order that it shall be cured and transformed into health.",
        footnotes: [
          {
            id: "1",
            text: "It is not necessary to say that every intelligent physician would first remove this where it exists; the indisposition thereupon generally ceases spontaneously. He will remove from the room strong-smelling flowers, which have a tendency to cause syncope and hysterical sufferings; extract from the cornea the foreign body that excites inflammation of the eye; loosen the over-tight bandage on a wounded limb that threatens to cause mortification, and apply a more suitable one; lay bare and put ligature on the wounded artery that produces fainting; endeavour to promote the expulsion by vomiting of belladonna berries etc., that may have been swallowed; extract foreign substances that may have got into the orifices of the body (the nose, gullet, ears, urethra, rectum, vagina); crush the vesical calculus; open the imperforate anus of the newborn infant, etc."
          },
          {
            id: "2",
            text: "In all times, the old school physicians, not knowing how else to give relief, have sought to combat and if possible to suppress by medicines, here and there, a single symptom from among a number in diseases - a one-sided procedure, which, under the name of symptomatic treatment, has justly excited universal contempt, because by it, not only was nothing gained, but much harm was inflicted. A single one of the symptoms present is no more the disease itself than a foot is the man himself. This procedure was so much the more reprehensible, that such a single symptom was only treated by an antagonistic remedy (therefore only in an enantiopathic and palliative manner), whereby, after a slight alleviation, it was subsequently only rendered all the worse."
          }
        ]
      }
    ]
  },
  {
    id: 8,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "It is not conceivable, not can it be proved by any experience in the world, that, after removal of all the symptoms of the disease and of the entire collection of the perceptible phenomena, there should or could remain anything else besides health, or that the morbid alteration in the interior could remain uneradicated.1",
        footnotes: [
          {
            id: "1",
            text: "When a patient has been cured of his disease by a true physician, in such a manner that no trace of the disease, no morbid symptom, remains, and all the signs of health have permanently returned, how can anyone, without offering an insult to common sense, affirm in such an individual the whole bodily disease still remains interior? And yet the chief of the old school, Hufeland, asserts this in the following words: Homoeopathy can remove symptoms, but the disease remains. (Vide Homoopathie, p.27, 1, 19.) This he maintains partly from mortification at the progress made by homoeopathy to the benefits of mankind, partly because he still holds thoroughly material notions respecting disease, which he is still unable to regard as a state of being of the organism wherein it is dynamically altered by the morbidly deranged vital force, as an altered state of health, but he views the disease as a something material, which after the cure is completed, may still remain lurking in some corner in the interior of the body, in order, some day during the most vigorous health, to burst forth at its pleasure with its material presence! So dreadful is still the blindness of the old pathology! No wonder that it could only produce a system of therapeutics which is solely occupied with scouring out the poor patient."
          }
        ]
      }
    ]
  },
  {
    id: 9,
    category: "Philosophy",
    relatedIds: [10, 11, 15],
    versions: [
      {
        edition: "Standard",
        content: "In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body (organism), rules with unbounded sway, and retains all the parts of the organism in admirable, harmonious, vital operation, as regards both sensations and functions, so that our indwelling, reason-gifted mind can freely employ this living, healthy instrument for the higher purpose of our existence.",
        footnotes: []
      }
    ]
  },
  {
    id: 10,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "The material organism, without the vital force, is capable of no sensation, no function, no self-preservation1, it derives all sensation and performs all the functions of life solely by means of the immaterial being (the vital force) which animates the material organism in health and in disease.",
        footnotes: [
          {
            id: "1",
            text: "It is dead, and only subject to the power of the external physical world; it decays, and is again resolved into its chemical constituents."
          }
        ]
      },
      {
        edition: "Sixth Edition",
        content: "The material organism, without the vital force, is capable of no sensation, no function, no self-preservation1, it derives all sensation and performs all the functions of life solely by means of the immaterial being (the vital principle) which animates the material organism in health and in disease.",
        footnotes: [
          {
            id: "1",
            text: "It is dead, and only subject to the power of the external physical world; it decays, and is again resolved into its chemical constituents."
          }
        ]
      }
    ]
  },
  {
    id: 11,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "When a person falls ill, it is only this spiritual, self acting (automatic) vital force, everywhere present in his organism, that is primarily deranged by the dynamic1 influence upon it of a morbific agent inimical to life; it is only the vital force, deranged to such an abnormal state, that can furnish the organism with its disagreeable sensations, and incline it to the irregular processes which we call disease; for, as a power invisible in itself, and only cognizable by its effects on the organism, its morbid derangement only makes itself known by the manifestation of disease in the sensations and functions of those parts of the organism exposed to the senses of the observer and physician, that is, by morbid symptoms, and in no other way can it make itself known.",
        footnotes: [
          { id: "1", text: "Materia peccans!" }
        ]
      },
      {
        edition: "Sixth Edition",
        content: "When a person falls ill, it is only this spiritual, self acting (automatic) vital force, everywhere present in his organism, that is primarily deranged by the dynamic1 influence upon it of a morbific agent inimical to life; it is only the vital force, deranged to such an abnormal state, that can furnish the organism with its disagreeable sensations, and incline it to the irregular processes which we call disease; for, as a power invisible in itself, and only cognizable by its effects on the organism, its morbid derangement only makes itself known by the manifestation of disease in the sensations and functions of those parts of the organism exposed to the senses of the observer and physician, that is, by morbid symptoms, and in no other way can it make itself known.2",
        footnotes: [
          { id: "1", text: "Materia peccans!" },
          {
            id: "2",
            text: "What is dynamic influence, - dynamic power? Our earth, by virtue of a hidden invisible energy, carries the moon around her in twenty-eight days and several hours... [Rest of the dynamic influence footnote]"
          }
        ]
      }
    ]
  },
  {
    id: 12,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "It is the morbidly affected vital force alone that produces disease1, so that the morbid phenomena perceptible to our senses express at the same time all the internal change, that is to say, the whole morbid derangement of the internal dynamis; in a word, they reveal the whole disease; consequently, also, the disappearance under treatment of all the morbid phenomena and of all the morbid alterations that differ from the healthy vital operations, certainly affects and necessarily implies the restoration of the integrity of the vital force and, therefore, the recovered health of the whole organism.",
        footnotes: [{ id: "1", text: "How the vital force causes the organism to display morbid phenomena, that is, how it produces disease, it would be of no practical utility to the physician to know, and will forever remain concealed from him; only what it is necessary for him to know of the disease and what is fully sufficient for enabling him to cure it, has the Lord of life revealed to his senses" }]
      },
      {
        edition: "Sixth Edition",
        content: "It is the morbidly affected vital energy alone that produces disease1, so that the morbid phenomena perceptible to our senses express at the same time all the internal change, that is to say, the whole morbid derangement of the internal dynamis; in a word, they reveal the whole disease; consequently, also, the disappearance under treatment of all the morbid phenomena and of all the morbid alterations that differ from the healthy vital operations, certainly affects and necessarily implies the restoration of the integrity of the vital force and, therefore, the recovered health of the whole organism.",
        footnotes: [{ id: "1", text: "How the vital force causes the organism to display morbid phenomena, that is, how it produces disease, it would be of no practical utility to the physician to know, and will forever remain concealed from him; only what it is necessary for him to know of the disease and what is fully sufficient for enabling him to cure it, has the Lord of life revealed to his senses" }]
      }
    ]
  },
  {
    id: 13,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Therefore disease (that does not come within the province of manual surgery) considered, as it is by the allopathists, as a thing separate from the living whole, from the organism and its animating vital force, and hidden in the interior, be it ever so subtle a character, is an absurdity, that could only be imagined by minds of a materialistic stamp, and has for thousands of years given to the prevailing system of medicine all those pernicious impulses that have made it a truly mischievous (non-healing) art.",
        footnotes: []
      }
    ]
  },
  {
    id: 14,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "There is, in the interior of man, nothing morbid that is curable and no invisible morbid alteration that is curable which does not make itself known to the accurately observing physicians by means of morbid signs and symptoms - an arrangement in perfect conformity with the infinite goodness of the all-wise Preserver of human life.",
        footnotes: []
      }
    ]
  },
  {
    id: 15,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "The affection of the morbidly deranged, spirit-like dynamis (vital force) that animates our body in the invisible interior, and the totality of the outwardly cognizable symptoms produced by it in the organism and representing the existing malady, constitute a whole; they are one and the same. The organism is indeed the material instrument of the life, but it is not conceivable without the animation imparted to it by the instinctively perceiving and regulating vital force (just as the vital force is not conceivable without the organism), consequently the two together constitute a unity, although in thought our mind separates this unity into two distinct conceptions for the sake of facilitating the comprehension of it.",
        footnotes: []
      },
      {
        edition: "Sixth Edition",
        content: "The affection of the morbidly deranged, spirit-like dynamis (vital force) that animates our body in the invisible interior, and the totality of the outwardly cognizable symptoms produced by it in the organism and representing the existing malady, constitute a whole; they are one and the same. The organism is indeed the material instrument of the life, but it is not conceivable without the animation imparted to it by the instinctively perceiving and regulating dynamis, just as the vital force is not conceivable without the organism, consequently the two together constitute a unity, although in thought our mind separates this unity into two distinct conceptions for the sake of easy comprehension.",
        footnotes: []
      }
    ]
  },
  {
    id: 16,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "Our vital force, as a spirit-like dynamis, cannot be attacked and affected by injurious influences on the healthy organism caused by the external inimical forces that disturb the harmonious play of life, otherwise than in a spirit-like (dynamic) way, and in like manner, all such morbid derangements (diseases) cannot be removed from it by the physician in any other way than by the spirit-like (dynamic1, virtual) alterative powers of the serviceable medicines acting upon our spirit-like vital force, which perceives them through the medium of the sentient faculty of the nerves everywhere present in the organism, so that it is only by their dynamic action on the vital force that remedies are able to re-establish and do actually re-establish health and vital harmony, after the changes in the health of the patient cognizable by our senses (the totality of the symptoms) have revealed the disease to the carefully observing and investigating physician as fully as was requisite in order to enable him to cure it.",
        footnotes: [{ id: "1", text: "Most severe disease may be produced by sufficient disturbance of the vital force through the imagination and also cured by the same means." }]
      },
      {
        edition: "Sixth Edition",
        content: "Our vital force, as a spirit-like dynamis, cannot be attacked and affected by injurious influences on the healthy organism caused by the external inimical forces that disturb the harmonious play of life, otherwise than in a spirit-like (dynamic) way, and in like manner, all such morbid derangements (diseases) cannot be removed from it by the physician in any other way than by the spirit-like (dynamic1, virtual) alterative powers of the serviceable medicines acting upon our spirit-like vital force, which perceives them through the medium of the sentient faculty of the nerves everywhere present in the organism, so that it is only by their dynamic action on the vital force that remedies are able to re-establish and do actually re-establish health and vital harmony, after the changes in the health of the patient cognizable by our senses (the totality of the symptoms) have revealed the disease to the carefully observing and investigating physician as fully as was requisite in order to enable him to cure it.",
        footnotes: [{ id: "1", text: "Most severe disease may be produced by sufficient disturbance of the vital force through the imagination and also cured by the same means." }]
      }
    ]
  },
  {
    id: 17,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "Now, as in the cure effected by the removal of the whole of the perceptible signs and symptoms of the disease the internal alteration of the vital force to which the disease is due - consequently the whole of the disease - is at the same time removed,1 it follows that the physician has only to remove the whole of the symptoms in order, at the same time, to abrogate and annihilate the internal change, that is to say, the morbid derangement of the vital force - consequently the totality of the disease, the disease itself.2 But when the disease is annihilated the health is restored, and this is the highest, the sole aim of the physician who knows the true object of his mission, which consists not in learned - sounding prating, but in giving aid to the sick.",
        footnotes: [
          { id: "1", text: "A warning dream, a superstitious fancy, or a solemn prediction that death would occur at a certain day or at a certain hour, has not unfrequently produced all the signs of commencing and increasing disease, of approaching death and death itself at the hour announced, which could not happen without the simultaneous production of the inward change (corresponding to the state observed internally); and hence in such cases all the morbid signs indicative of approaching death have frequently been dissipated by an identical cause, by some cunning deception or persuasion to a belief in the contrary, and health suddenly restored, which could not have happened without the removal, by means of this mortal remedy, of the internal and external morbid change that threatened death." },
          { id: "2", text: "It is only thus that God the preserver of mankind, could reveal His wisdom and goodness in reference to the cure of the disease to which man is liable here below, by showing to the physician what he had to remove in disease in order to annihilate them and thus re-establish health. But what would we think of His wisdom and goodness if He has shrouded in mysterious obscurity that which was to be cured in diseases (as is asserted by the dominant school of medicine, which affects to possess a supernatural insight into the nature of things), and shut it up in the hidden interior, and thus rendered it impossible for man to know the malady accurately, consequently impossible for him to cure it?" }
        ]
      },
      {
        edition: "Sixth Edition",
        content: "Now, as in the cure effected by the removal of the whole of the perceptible signs and symptoms of the disease the internal alteration of the vital principle to which the disease is due - consequently the whole of the disease - is at the same time removed,1 it follows that the physician has only to remove the whole of the symptoms in order, at the same time, to abrogate and annihilate the internal change, that is to say, the morbid derangement of the vital force - consequently the totality of the disease, the disease itself.2 But when the disease is annihilated the health is restored, and this is the highest, the sole aim of the physician who knows the true object of his mission, which consists not in learned - sounding prating, but in giving aid to the sick.",
        footnotes: [
          { id: "1", text: "A warning dream, a superstitious fancy, or a solemn prediction that death would occur at a certain day or at a certain hour, has not unfrequently produced all the signs of commencing and increasing disease, of approaching death and death itself at the hour announced, which could not happen without the simultaneous production of the inward change (corresponding to the state observed internally); and hence in such cases all the morbid signs indicative of approaching death have frequently been dissipated by an identical cause, by some cunning deception or persuasion to a belief in the contrary, and health suddenly restored, which could not have happened without the removal, by means of this mortal remedy, of the internal and external morbid change that threatened death." },
          { id: "2", text: "It is only thus that God the preserver of mankind, could reveal His wisdom and goodness in reference to the cure of the disease to which man is liable here below, by showing to the physician what he had to remove in disease in order to annihilate them and thus re-establish health. But what would we think of His wisdom and goodness if He has shrouded in mysterious obscurity that which was to be cured in diseases (as is asserted by the dominant school of medicine, which affects to possess a supernatural insight into the nature of things), and shut it up in the hidden interior, and thus rendered it impossible for man to know the malady accurately, consequently impossible for him to cure it?" }
        ]
      }
    ]
  },
  {
    id: 18,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "From this indubitable truth, that besides the totality of the symptoms nothing can by any means be discovered in disease wherewith they could express their need of aid, it follows undeniably that the sum of all the symptoms in each individual case of disease must be the sole indication, the sole guide to direct us in the choice of a remedy.",
        footnotes: []
      },
      {
        edition: "Sixth Edition",
        content: "From this indubitable truth, that besides the totality of the symptoms with consideration of the accompanying modalities (§ 5) nothing can by any means be discovered in disease wherewith they could express their need of aid, it follows undeniably that the sum of all the symptoms and conditions in each individual case of disease must be the sole indication, the sole guide to direct us in the choice of a remedy.",
        footnotes: []
      }
    ]
  },
  {
    id: 19,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Now, as diseases are nothing more than alterations in the state of health of the healthy individual which express themselves by morbid signs, and the cure is also only possible by a change to the healthy condition of the state of health of the diseased individual, it is very evident that medicines could never cure disease if they did not possess the power of altering man's state of health which depends on sensations and functions; indeed, that their curative power must be owing solely to this power they possess of altering man's state of health.",
        footnotes: []
      }
    ]
  },
  {
    id: 20,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "This spirit-like power to alter man's state of health (and hence to cure diseases) which lies hidden in the inner nature of medicines can never be discovered by us by a mere effort of reason; it is only by experience of the phenomena it displays when acting on the state of health of man that we can become clearly cognizant of it.",
        footnotes: []
      },
      {
        edition: "Sixth Edition",
        content: "This spirit-like power to alter man's state of health (and hence to cure diseases) which lies hidden in the inner nature of medicines can in itself never be discovered by us by a mere effort of reason; it is only by experience of the phenomena it displays when acting on the state of health of man that we can become clearly cognizant of it.",
        footnotes: []
      }
    ]
  },
  {
    id: 21,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Now, as it is undeniable that the curative principle in medicines is not in itself perceptible, and as in pure experiments with medicines conducted by the most accurate observers, nothing can be observed that can constitute them medicines or remedies except that power of causing distinct alterations in the state of health of the human body, and particularly in that of the healthy individual, and of exciting in him various definite morbid symptoms; so it follows that when medicines act as remedies, they can only bring their curative property into play by means of this their power of altering man's state of health by the production of peculiar symptoms; and that, therefore, we have only to rely on the morbid phenomena which the medicines produce in the healthy body as the sole possible revelation of their in-dwelling curative power, in order to learn what disease-producing power, and at the same time what disease-curing power, each individual medicine possesses.",
        footnotes: []
      }
    ]
  },
  {
    id: 22,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "But as nothing is to be observed in diseases that must be removed in order to change them into health besides the totality of their signs and symptoms, and likewise medicines can show nothing curative besides their tendency to produce morbid symptoms in healthy persons and to remove them in diseased persons; it follows, on the one hand, that medicines only become remedies and capable of annihilating disease, because the medicinal substance, by exciting certain effects and symptoms, that is to say, by producing a certain artificial morbid state, removes and abrogates the symptoms already present, to wit, the natural morbid state we wish to cure. On the other hand, it follows that, for the totality of the symptoms of the disease to be cured, a medicine must be sought which (according as experience shall prove whether the morbid symptoms are most readily, certainly, and permanently removed and changed into health by similar or opposite medicinal symptoms1) has a tendency to produce similar or opposite symptoms.",
        footnotes: [{ id: "1", text: "The other possible mode of employing medicines for diseases besides these two is the allopathic method... [Detailed footnote text]" }]
      },
      {
        edition: "Sixth Edition",
        content: "But as nothing is to be observed in diseases that must be removed in order to change them into health besides the totality of their signs and symptoms, and likewise medicines can show nothing curative besides their tendency to produce morbid symptoms in healthy persons and to remove them in diseased persons; it follows, on the one hand, that medicines only become remedies and capable of annihilating disease, because the medicinal substance, by exciting certain effects and symptoms, that is to say, by producing a certain artificial morbid state, removes and abrogates the symptoms already present, to wit, the natural morbid state we wish to cure. On the other hand, it follows that, for the totality of the symptoms of the disease to be cured, a medicine must be sought which (according as experience shall prove whether the morbid symptoms are most readily, certainly, and permanently removed and changed into health by similar or opposite medicinal symptoms1) have the greatest tendency to produce similar or opposite symptoms.",
        footnotes: [{ id: "1", text: "The other possible mode of employing medicines for diseases besides these two is the allopathic method... irresponsible murderous game with the life of the patient..." }]
      }
    ]
  },
  {
    id: 23,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "All pure experience, however, and all accurate research convince us that persistent symptoms of disease are far from being removed and annihilated by opposite symptoms of medicines (as in the antipathic, enantiopathic or palliative method), that, on the contrary, after transient, apparent alleviation, they break forth again, only with increased intensity, and become manifestly aggravated (see § 58 - 62 and 69).",
        footnotes: []
      }
    ]
  },
  {
    id: 24,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "There remains, therefore, no other mode of employing medicines in diseases that promises to be of service besides the homoeopathic, by means of which we seek, for the totality of the symptoms of the case of disease, a medicine which among all medicines (whose pathogenetic effects are known from having been tested in healthy individuals) has the power and the tendency to produce an artificial morbid state most similar to that of the case of disease in question.",
        footnotes: []
      }
    ]
  },
  {
    id: 25,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Now, however, in all careful trials, pure experience,1 the sole and infallible oracle of the healing art, teaches us that actually that medicine which, in its action on the healthy human body, has demonstrated its power of producing the greatest number of symptoms similar to those observable in the case of disease under treatment, does also, in doses of suitable potency and attenuation, rapidly, radically and permanently remove the totality of the symptoms of this morbid state, that is to say (§ 6 - 16), the whole disease present, and change it into health; and that all medicines cure, without exception, those diseases whose symptoms most nearly resemble their own, and leave none of them uncured.",
        footnotes: [{ id: "1", text: "I do not mean that sort of experience of which the ordinary practitioners of the old school boast... Fifty years' experience of this sort is like fifty years of looking into a kaleidoscope... thousands of ever changing figures and no accounting for them!" }]
      }
    ]
  },
  {
    id: 26,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "This depends on the following homoeopathic law of nature which was sometimes, indeed, vaguely surmised but not hitherto fully recognized, and to which is due every real cure that has ever taken place: A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (whilst differing in kind) is very similar to the former in its manifestations.1",
        footnotes: [{ id: "1", text: "Thus are cured both physical affections and moral maladies. How is it that in the early dawn the brilliant Jupiter vanishes from the gaze of the beholder? By a stronger very similar power acting on his optic nerve, the brightness of approaching day! - In situations replete with foetid odors, wherewith is it usual to soothe effectually the offended olfactory nerves? With snuff, that affects the sense of smell in a similar but stronger manner! No music, no sugared cake, which act on the nerves of other senses, can cure this olfactory disgust. How does the soldier cunningly stifle the piteous cries of him who runs the gauntlet from the ears of the compassionate bystanders? By the shrill notes of the fife commingled with the roll of the noisy drum! And the distant roar of the enemy's cannon that inspires his army with fear? By the loud boom of the big drum! For neither the one nor the other would the distribution of a brilliant piece of uniform nor a regex reprimand to the regiment suffice. In like manner, mourning and sorrow will be effaced from the mind by the account of another and still greater cause for sorrow happening to another, even though it be a mere fiction. The injurious consequences of too great joy will be removed by drinking coffee, which produces an excessive joyous state of mind. Nations like the Germans, who have for centuries been gradually sinking deeper and deeper in soulless apathy and degrading serfdom, must first be trodden still deeper in the dust by the Western Conqueror, until their situation became intolerable; their mean opinion of themselves was thereby over-strained and removed; they again became alive to their dignity as men, and then, for the first time, they raised their heads as Germans." }]
      }
    ]
  },
  {
    id: 27,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "The curative power of medicines, therefore, depends on their symptoms, similar to the disease but superior to it in strength (§ 12 - 26), so that each individual case of disease is most surely, radically, rapidly and permanently annihilated and removed only by a medicine capable of producing (in the human system) in the most similar and complete manner the totality of its symptoms, which at the same time are stronger than the disease.",
        footnotes: []
      }
    ]
  },
  {
    id: 28,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "As this natural law of cure manifests itself in every pure experiment and every true observation in the world, the fact is consequently established; it matters little what may be scientific explanation of how it takes place; and I do not attach much importance to the attempts made to explain it. But the following view seems to commend itself as the most probable one, as it is founded on premises derived from experience.",
        footnotes: []
      }
    ]
  },
  {
    id: 29,
    category: "Philosophy",
    versions: [
      {
        edition: "Fifth Edition",
        content: "As every disease (not strictly belonging to the domain of surgery) depends only on a peculiar morbid derangement of our vital force in sensations and functions, when a homoeopathic cure of the vital force deranged by natural disease is accomplished by the administration of a medicinal agent selected on account of an accurate similarity of symptoms, a somewhat stronger, similar, artificial morbid affection is brought into contact with and, as it were, pushed into the place of the weaker, similar, natural morbid irritation, against which the instinctive vital force, now merely (though in a stronger degree) medicinally diseased, is then compelled to direct an increased amount of energy, but, on account of the shorter duration of the action1 of the medicinal agent that now morbidly affects it, the vital force soon overcomes this, and as it was in the first instance relieved from the natural morbid affection, so it is now at last freed from the substituted artificial (medicinal) one, and hence is enable again to carry on healthily the vital operations of the organism. This highly probable explanation of the process rests on the following axioms.",
        footnotes: [{ id: "1", text: "The short duration of the action of the artificial morbific forces, which we term medicines, makes it possible that, although they are stronger than the natural diseases, they can yet be much more easily overcome by the vital force..." }]
      },
      {
        edition: "Sixth Edition",
        content: "As every disease (not entirely surgical) consists only in a special, morbid, dynamic alteration of our vital energy (of the principle of life) manifested in sensation and motion, so in every homoeopathic cure this principle of life dynamically altered by natural disease is seized through the administration of medicinal potency selected exactly according to symptom-similarity by a somewhat stronger, similar artificial disease-manifestation. By this the feeling of the natural (weaker) dynamic disease-manifestation ceases and disappears. This disease-manifestation no longer exists for the principle of life which is now occupied and governed merely by the stronger, artificial disease-manifestation. This artificial disease-manifestation has soon spent its force and leaves the patient free from disease, cured. The dynamis, thus freed, can now continue to carry life on in health. This most highly probable process rests upon the following propositions.",
        footnotes: []
      }
    ]
  },
  {
    id: 30,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "The human body appears to admit of being much more powerfully affected in its health by medicines than by natural morbid stimuli - for natural diseases are cured and overcome by suitable medicines.",
        footnotes: []
      }
    ]
  },
  {
    id: 31,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "The inimical forces, partly psychical, partly physical, to which our terrestrial existence is exposed... do not possess the power of morbidly deranging the health of man unconditionally; but we are made ill by them only when our organism is sufficiently disposed and susceptible...",
        footnotes: []
      }
    ]
  },
  {
    id: 32,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "But it is quite otherwise with the artificial morbific agents which we term medicines... every living human organism is liable to be affected, and, as it were, inoculated with the medicinal disease at all times, and absolutely (unconditionally)...",
        footnotes: []
      }
    ]
  },
  {
    id: 33,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "In accordance with this fact, it is undeniably shown by all experience that the living organism is much more disposed and has a greater liability to be acted on... by medicinal powers, than by morbific noxious agents and infectious miasms...",
        footnotes: []
      }
    ]
  },
  {
    id: 34,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "The greater strength of the artificial diseases producible by medicines is, however, not the sole cause of their power to cure natural disease. In order that they may effect a cure, it is before all things requisite that they should be capable of producing in the human body an artificial disease as similar as possible to the disease to be cured...",
        footnotes: []
      }
    ]
  },
  {
    id: 35,
    category: "Philosophy",
    relatedIds: [36, 38, 40],
    versions: [
      {
        edition: "Standard",
        content: "In order to be able to cure, we shall only require to possess a part of the medical symptoms that are similar to the disease. But thissimilarity must be between the most striking, singular, uncommon and peculiar (characteristic) signs and symptoms of the case of disease.",
        footnotes: []
      }
    ]
  },
  {
    id: 36,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Two dissimilar diseases co-existing in the body; if the two dissimilar diseases meeting together in the human being be of equal strength, or still more if the older one be the stronger, the new disease will be kept back from the body by the older one, and not allowed to affect it.",
        footnotes: []
      }
    ]
  },
  {
    id: 37,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Thus the old school physician, who sees that certain chronic diseases are not to be cured by his allopathic (dissimilar) treatment, yet believes that he is doing a great deal, and is even effecting a cure, if he can produce a new (but dissimilar) disease. This, however, is a great error...",
        footnotes: []
      }
    ]
  },
  {
    id: 38,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Or the new dissimilar disease is the stronger. In this case the disease under which the patient originally labored, being the weaker, will be kept back and suspended by the accession of the stronger one, until the latter shall have run its course or been cured, and then the old one again makes its appearance uncured.",
        footnotes: []
      }
    ]
  },
  {
    id: 39,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Now the adherents of the ordinary school of medicine saw all this for thousands of years; they saw that Nature herself cannot cure any existing disease by the accession of another new disease, be it ever so strong, if the new disease be dissimilar to that already present in the body. What shall we think of them, that they nevertheless went on treating chronic diseases with allopathic remedies...",
        footnotes: []
      }
    ]
  },
  {
    id: 40,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Or the new disease, after having acted for a long time on the body, joins the old one, which is dissimilar to it, and thence is formed a complex disease, so that each of them occupies a particular locality in the organism...",
        footnotes: []
      }
    ]
  },
  {
    id: 41,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Much more frequent than the natural complex diseases is the complication of a disease with a medicinal disease, which is produced by the long-continued employment of unsuitable medicines by the ordinary (allopathic) school.",
        footnotes: []
      }
    ]
  },
  {
    id: 42,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Nature herself, as has been said, sometimes permits, in some cases, the simultaneous occurrence of two (even three) natural diseases in one and the same body. This complication, however, it must be remarked, happens only in the case of two dissimilar diseases...",
        footnotes: []
      }
    ]
  },
  {
    id: 43,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "But the result is very different when two similar diseases meet together in the organism, that is to say, when to the disease already present a new and similar one is added.",
        footnotes: []
      }
    ]
  },
  {
    id: 44,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Two diseases, very similar to each other in their manifestations and effects, but dissimilar in kind, cannot (as has been said of dissimilar diseases in § 38) repulse each other; they cannot (as has been said of dissimilar diseases in § 38) suspend each other; and just as little can they (as has been said of dissimilar diseases in § 40) exist beside each other in the same organism...",
        footnotes: []
      }
    ]
  },
  {
    id: 45,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "No! two diseases, differing, it is true, in kind, but very similar in their manifestations of suffering and symptoms, always annihilate each other whenever they meet together in the organism; the stronger annihilates the weaker.",
        footnotes: []
      }
    ]
  },
  {
    id: 46,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Examples of the cure of diseases by the accession of other similar natural diseases; the smallpox, so famous for the many violent symptoms it produces, has removed and annihilated many diseases with similar symptoms...",
        footnotes: []
      }
    ]
  },
  {
    id: 47,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Nothing could teach the physician in a plainer and more convincing manner than the above-mentioned examples, what kind of artificial morbific agent (medicine) he ought to choose in order to cure in a rapid, radical and permanent manner, in obedience to a law of nature.",
        footnotes: []
      }
    ]
  },
  {
    id: 48,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "Dissimilar diseases cannot remove or cure one another. Similar diseases, on the contrary, cure one another. That is the great law of Nature.",
        footnotes: []
      }
    ]
  },
  {
    id: 49,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "We should have been able to discover many more such true, natural homoeopathic cures, if observers had been more attentive...",
        footnotes: []
      }
    ]
  },
  {
    id: 50,
    category: "Philosophy",
    versions: [
      {
        edition: "Standard",
        content: "The great Nature herself has no other instruments for the homoeopathic cure of the diseases that may attack us than the few miasmatic infectious diseases (the itch, measles and smallpox)... these clinical aids are either dangerous to life or themselves chronic... but the physician has in his medicines such instruments...",
        footnotes: []
      }
    ]
  },
  {
    id: 51,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Only the physician who can employ such natural aids as those mentioned in § 50... but he who can act like a wise, cautious physician, who will choose and use such homoeopathic medicines... will reach the same end.",
         footnotes: []
      }
    ]
  },
  {
    id: 52,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "There are but two principal methods of cure: the one based on an accurate observation of nature... the homoeopathic; and the second... the heteropathic or allopathic.",
         footnotes: []
      }
    ]
  },
  {
    id: 53,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The true homoeopathic method of cure is the only direct way to ease and to restore the health of man in a certain, rapid and permanent manner...",
         footnotes: []
      }
    ]
  },
  {
    id: 54,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The allopathic method... is not a method of cure at all... it is an indirect way of giving relief...",
         footnotes: []
      }
    ]
  },
  {
    id: 55,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The third method of using medicines... is the antipathic or enantiopathic method... it is also the palliative method...",
         footnotes: []
      }
    ]
  },
  {
    id: 56,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "A fourth method of using medicines is the isopathic method... which is not to be confused with homoeopathy...",
         footnotes: []
      }
    ]
  },
  {
    id: 57,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "In order to cure palliatively... one would give for a chronic disease... a medicine whose action is exactly the opposite of the symptoms...",
         footnotes: []
      }
    ]
  },
  {
    id: 58,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "This antipathic or palliative method... always results in an aggravation of the disease after a brief period of relief.",
         footnotes: []
      }
    ]
  },
  {
    id: 59,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Illustrations of the failure of the antipathic method in common practice.",
         footnotes: []
      }
    ]
  },
  {
    id: 60,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "If the palliative method is continued for a long time... it causes more serious and lasting injuries.",
         footnotes: []
      }
    ]
  },
  {
    id: 61,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The reasons why the allopathic method should be rejected by every honest physician.",
         footnotes: []
      }
    ]
  },
  {
    id: 62,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The homoeopathic method... alone is able to effect a real and permanent cure.",
         footnotes: []
      }
    ]
  },
  {
    id: 63,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Every medicine... acts on the human body in two different ways; first... the primary action; second... the secondary action or counter-action.",
         footnotes: []
      }
    ]
  },
  {
    id: 64,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "During the primary action of a medicine on the healthy body... our vital force remains passive... in the secondary action, the vital force... exerts its power against it.",
         footnotes: []
      }
    ]
  },
  {
    id: 65,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Examples of primary and secondary actions (e.g. coffee, wine, opium).",
         footnotes: []
      }
    ]
  },
  {
    id: 66,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "In the smallest homoeopathic doses... the secondary action of the vital force is only noticed as the restoration of health.",
         footnotes: []
      }
    ]
  },
  {
    id: 67,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The homoeopathic law of nature is confirmed by these observations.",
         footnotes: []
      }
    ]
  },
  {
    id: 68,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "In homoeopathic cures, the vital force... only reacts as much as is necessary to restore the normal state.",
         footnotes: []
      }
    ]
  },
  {
    id: 69,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "In antipathic treatment, the vital force... reacts in the opposite direction and aggravates the symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 70,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The nature of the human body and its vital force precludes any other result from antipathic treatment.",
         footnotes: []
      }
    ]
  },
  {
    id: 71,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The three points necessary for curing: 1. Investigating the disease; 2. Investigating the action of medicines; 3. Their appropriate application.",
         footnotes: []
      }
    ]
  },
  {
    id: 72,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Diseases are either acute or chronic.",
         footnotes: []
      }
    ]
  },
  {
    id: 73,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Acute diseases are either individual, sporadic, or epidemic.",
         footnotes: []
      }
    ]
  },
  {
    id: 74,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Chronic diseases caused by allopathic treatment (medicinal diseases) are the most difficult to cure.",
         footnotes: []
      }
    ]
  },
  {
    id: 75,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The most deplorable chronic diseases are those produced by the unskilfulness of allopathic physicians.",
         footnotes: []
      }
    ]
  },
  {
    id: 76,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Only homoeopathy can restore the health in these cases, if the vital force is still strong enough.",
         footnotes: []
      }
    ]
  },
  {
    id: 77,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Diseases which are wrongly called chronic are those produced by external circumstances (unhealthy habits, etc.).",
         footnotes: []
      }
    ]
  },
  {
    id: 78,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "True chronic diseases are those which arise from a chronic miasm.",
         footnotes: []
      }
    ]
  },
  {
    id: 79,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Syphilis and Sycosis are such chronic miasms.",
         footnotes: []
      }
    ]
  },
  {
    id: 80,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Psora is the most important and oldest chronic miasm, and the source of most chronic diseases.",
         footnotes: []
      }
    ]
  },
  {
    id: 81,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The great variety of chronic diseases arising from Psora.",
         footnotes: []
      }
    ]
  },
  {
    id: 82,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In chronic diseases, the investigation of the symptoms must be even more careful and minute than in acute diseases.",
         footnotes: []
      }
    ]
  },
  {
    id: 83,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The qualifications necessary for a physician in investigating the case: freedom from prejudice, sound senses, attention and fidelity in tracing the picture of the disease.",
         footnotes: []
      }
    ]
  },
  {
    id: 84,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician should listen and record what the patient and his friends relate, without interrupting them.",
         footnotes: []
      }
    ]
  },
  {
    id: 85,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician begins a new line for each symptom.",
         footnotes: []
      }
    ]
  },
  {
    id: 86,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician then asks for more precise details about each symptom.",
         footnotes: []
      }
    ]
  },
  {
    id: 87,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician must avoid asking leading questions.",
         footnotes: []
      }
    ]
  },
  {
    id: 88,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician asks about more general symptoms if they have not been mentioned.",
         footnotes: []
      }
    ]
  },
  {
    id: 89,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician asks about the patient's state of mind, desires and aversions.",
         footnotes: []
      }
    ]
  },
  {
    id: 90,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician makes his own observations on the patient's appearance and behavior.",
         footnotes: []
      }
    ]
  },
  {
    id: 91,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The symptoms of the patient while taking other medicines are not the true symptoms of the disease.",
         footnotes: []
      }
    ]
  },
  {
    id: 92,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In cases of great urgency, the physician must act on the symptoms as they appear.",
         footnotes: []
      }
    ]
  },
  {
    id: 93,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician must also investigate the cause of the disease (if it is unusual).",
         footnotes: []
      }
    ]
  },
  {
    id: 94,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In chronic diseases, the physician must examine the patient's mode of life, diet, and domestic relations.",
         footnotes: []
      }
    ]
  },
  {
    id: 95,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In chronic diseases, even the smallest symptoms are significant.",
         footnotes: []
      }
    ]
  },
  {
    id: 96,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Hypochondriacs often exaggerate their symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 97,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Some patients, on the other hand, are too modest or bashful and conceal their symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 98,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician must investigate the symptoms accurately, even if the patient gives a name to his disease.",
         footnotes: []
      }
    ]
  },
  {
    id: 99,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In acute diseases, the investigation is much easier, as the symptoms are fresh and distinct.",
         footnotes: []
      }
    ]
  },
  {
    id: 100,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In epidemics, the physician must investigate the totality of the symptoms of the whole epidemic.",
         footnotes: []
      }
    ]
  },
  {
    id: 101,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician should record the symptoms of each epidemic separately, as they may differ.",
         footnotes: []
      }
    ]
  },
  {
    id: 102,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "By observing several cases of an epidemic, the characteristic picture of the disease becomes clear.",
         footnotes: []
      }
    ]
  },
  {
    id: 103,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In chronic diseases, the investigation must be conducted in the same way, by collecting the symptoms of several cases.",
         footnotes: []
      }
    ]
  },
  {
    id: 104,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "When the picture of the disease is once accurately drawn, the most difficult part of the work is done.",
         footnotes: []
      }
    ]
  },
  {
    id: 105,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Investigation of the second point: the peculiar action of medicines on the healthy body.",
         footnotes: []
      }
    ]
  },
  {
    id: 106,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The physician must know the pathogenetic effects of medicines in order to choose the right one.",
         footnotes: []
      }
    ]
  },
  {
    id: 107,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Medicines must be tested on healthy people to discover their true actions.",
         footnotes: []
      }
    ]
  },
  {
    id: 108,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "There is no other way to learn the specific actions of medicines than by testing them on the healthy body.",
         footnotes: []
      }
    ]
  },
  {
    id: 109,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "I was the first to explore this path with perseverance.",
         footnotes: []
      }
    ]
  },
  {
    id: 110,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The observations of others on the effects of poisons also confirm this.",
         footnotes: []
      }
    ]
  },
  {
    id: 111,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The medicinal substances produce constant and certain symptoms in the human body.",
         footnotes: []
      }
    ]
  },
  {
    id: 112,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Example of the constant action of medicines.",
         footnotes: []
      }
    ]
  },
  {
    id: 113,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Narcotic medicines produce a primary action that is soon followed by a secondary action.",
         footnotes: []
      }
    ]
  },
  {
    id: 114,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "With most other medicines, the secondary action is not so clearly seen.",
         footnotes: []
      }
    ]
  },
  {
    id: 115,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Alternating actions of medicines.",
         footnotes: []
      }
    ]
  },
  {
    id: 116,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The symptoms produced by a medicine are not the same in every person.",
         footnotes: []
      }
    ]
  },
  {
    id: 117,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Idiosyncrasies: some people are particularly sensitive to certain medicines.",
         footnotes: []
      }
    ]
  },
  {
    id: 118,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Every medicine produces its own peculiar symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 119,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "There is no substitute for a specific medicine.",
         footnotes: []
      }
    ]
  },
  {
    id: 120,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Medicines must be carefully distinguished and tested.",
         footnotes: []
      }
    ]
  },
  {
    id: 121,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Doses for proving must be adapted to the strength of the medicine and the sensitivity of the prover.",
         footnotes: []
      }
    ]
  },
  {
    id: 122,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Medicines for proving must be pure and genuine.",
         footnotes: []
      }
    ]
  },
  {
    id: 123,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Each medicine must be taken alone and unmixed.",
         footnotes: []
      }
    ]
  },
  {
    id: 124,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The prover must be temperate in his diet and lifestyle.",
         footnotes: []
      }
    ]
  },
  {
    id: 125,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The prover must avoid all mental and physical over-exertion.",
         footnotes: []
      }
    ]
  },
  {
    id: 126,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The prover must be trustworthy and capable of expressing his feelings clearly.",
         footnotes: []
      }
    ]
  },
  {
    id: 127,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Medicines should be tested on both sexes.",
         footnotes: []
      }
    ]
  },
  {
    id: 128,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Small doses given to sensitive people often produce many symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 129,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "If only few symptoms appear from a small dose, many more will appear from larger doses.",
         footnotes: []
      }
    ]
  },
  {
    id: 130,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "If a medicine is taken in a sufficiently large dose, all the symptoms it is capable of producing will appear.",
         footnotes: []
      }
    ]
  },
  {
    id: 131,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "If a medicine is taken daily in increasing doses, it may produce symptoms that did not appear before.",
         footnotes: []
      }
    ]
  },
  {
    id: 132,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Doses for proving should not be so large as to cause serious damage.",
         footnotes: []
      }
    ]
  },
  {
    id: 133,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The prover must keep an accurate record of all his symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 134,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The physician should question the prover regularly and carefully.",
         footnotes: []
      }
    ]
  },
  {
    id: 135,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Only by testing a large number of provers can we obtain the complete range of symptoms of a medicine.",
         footnotes: []
      }
    ]
  },
  {
    id: 136,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The totality of symptoms of a medicine is its characteristic power.",
         footnotes: []
      }
    ]
  },
  {
    id: 137,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Doses used in proving should be small if the prover is sensitive.",
         footnotes: []
      }
    ]
  },
  {
    id: 138,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Observations on provers must be very minute.",
         footnotes: []
      }
    ]
  },
  {
    id: 139,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The physician should verify the symptoms related by the prover.",
         footnotes: []
      }
    ]
  },
  {
    id: 140,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "If the physician himself is the prover, his observations will be even more reliable.",
         footnotes: []
      }
    ]
  },
  {
    id: 141,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Proving on oneself makes the physician a better observer.",
         footnotes: []
      }
    ]
  },
  {
    id: 142,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The primary symptoms produced by medicines are the most important for curing.",
         footnotes: []
      }
    ]
  },
  {
    id: 143,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "If we have a complete record of the symptoms of a medicine, we can easily find the homoeopathic remedy for any disease.",
         footnotes: []
      }
    ]
  },
  {
    id: 144,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "A Materia Medica that contains only the true, pure, pathogenetic effects of medicines is the source of all homoeopathic science.",
         footnotes: []
      }
    ]
  },
  {
    id: 145,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Such a Materia Medica must contain nothing but the truth.",
         footnotes: []
      }
    ]
  },
  {
    id: 146,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Investigation of the third point: the appropriate application of the homoeopathic remedy.",
         footnotes: []
      }
    ]
  },
  {
    id: 147,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The medicine that corresponds most closely to the totality of the symptoms of the patient is the right one.",
         footnotes: []
      }
    ]
  },
  {
    id: 148,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The homoeopathic remedy destroys the natural disease and brings about health.",
         footnotes: []
      }
    ]
  },
  {
    id: 149,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the homoeopathic remedy is chosen correctly, the disease will be cured rapidly.",
         footnotes: []
      }
    ]
  },
  {
    id: 150,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The slight aggravation that sometimes follows the homoeopathic dose is a good sign.",
         footnotes: []
      }
    ]
  },
  {
    id: 151,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In cases where the symptoms are very severe, the homoeopathic aggravation is also more distinct.",
         footnotes: []
      }
    ]
  },
  {
    id: 152,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The more the symptoms of the medicine correspond to those of the natural disease, the more certain is the cure.",
         footnotes: []
      }
    ]
  },
  {
    id: 153,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In searching for the homoeopathic remedy, we should pay particular attention to the striking, singular, extraordinary and peculiar symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 154,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "A medicine that covers these peculiar symptoms is the most likely to cure.",
         footnotes: []
      }
    ]
  },
  {
    id: 155,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The homoeopathic remedy acts primarily on the diseased parts and removes the disease.",
         footnotes: []
      }
    ]
  },
  {
    id: 156,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The slight new symptoms that sometimes appear after the homoeopathic dose are of no importance.",
         footnotes: []
      }
    ]
  },
  {
    id: 157,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The homoeopathic aggravation is a sign of the medicinal disease overcoming the natural one.",
         footnotes: []
      }
    ]
  },
  {
    id: 158,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "This aggravation must occur if the dose is not too small.",
         footnotes: []
      }
    ]
  },
  {
    id: 159,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The smaller the dose, the shorter and more slight is the aggravation.",
         footnotes: []
      }
    ]
  },
  {
    id: 160,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In chronic diseases, the aggravation may last for several days.",
         footnotes: []
      }
    ]
  },
  {
    id: 161,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The aggravation in chronic diseases usually appears later than in acute ones.",
         footnotes: []
      }
    ]
  },
  {
    id: 162,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If we only have a survival range of symptoms, we must choose the best possible remedy and if it is not perfect, we must observe closely.",
         footnotes: []
      }
    ]
  },
  {
    id: 163,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the chosen remedy produces many new symptoms, it is not perfectly homoeopathic.",
         footnotes: []
      }
    ]
  },
  {
    id: 164,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Even a small number of symptoms may sometimes point to the right remedy.",
         footnotes: []
      }
    ]
  },
  {
    id: 165,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the first remedy used was not perfect, we must wait until its action is exhausted.",
         footnotes: []
      }
    ]
  },
  {
    id: 166,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Then we should investigate the remaining symptoms again and choose a new remedy.",
         footnotes: []
      }
    ]
  },
  {
    id: 167,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the new symptoms are more severe than the old ones, the first medicine was probably not homoeopathic.",
         footnotes: []
      }
    ]
  },
  {
    id: 168,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "We must then look for another remedy that corresponds to the totality of the present symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 169,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If we find two medicines that seem equally suitable, we should first use the most homoeopathic one.",
         footnotes: []
      }
    ]
  },
  {
    id: 170,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "We should not use the second medicine without a new investigation of the case.",
         footnotes: []
      }
    ]
  },
  {
    id: 171,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In chronic diseases arising from Psora, we often need several anti-psoric remedies given one after another.",
         footnotes: []
      }
    ]
  },
  {
    id: 172,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "One-sided diseases: those that have only a few symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 173,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "These are also chronic diseases.",
         footnotes: []
      }
    ]
  },
  {
    id: 174,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The few symptoms they present may be either internal or external (local).",
         footnotes: []
      }
    ]
  },
  {
    id: 175,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the first remedy chosen for a one-sided disease is not perfectly homoeopathic, it will often produce new symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 176,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "These new symptoms are actually symptoms of the disease itself, which have been called forth by the medicine.",
         footnotes: []
      }
    ]
  },
  {
    id: 177,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "We can then use these new symptoms to find the true homoeopathic remedy.",
         footnotes: []
      }
    ]
  },
  {
    id: 178,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "After the first medicine has completed its action, we re-examine the case and choose the next one.",
         footnotes: []
      }
    ]
  },
  {
    id: 179,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "This process is repeated until the cure is complete.",
         footnotes: []
      }
    ]
  },
  {
    id: 180,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "This method is much more effective than the allopathic one.",
         footnotes: []
      }
    ]
  },
  {
    id: 181,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Local maladies: those which appear on external parts of the body.",
         footnotes: []
      }
    ]
  },
  {
    id: 182,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Local maladies are almost always symptoms of an internal, general disease.",
         footnotes: []
      }
    ]
  },
  {
    id: 183,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "We should not treat local maladies by external applications alone.",
         footnotes: []
      }
    ]
  },
  {
    id: 184,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the local malady is of recent origin and caused by external injury, it may be treated locally.",
         footnotes: []
      }
    ]
  },
  {
    id: 185,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "But if the local malady has arisen from an internal cause, it must be treated by internal medicines.",
         footnotes: []
      }
    ]
  },
  {
    id: 186,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "External injuries that affect the whole body should also be treated internally.",
         footnotes: []
      }
    ]
  },
  {
    id: 187,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The internal medicine should be chosen according to the totality of the symptoms, including the local one.",
         footnotes: []
      }
    ]
  },
  {
    id: 188,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The allopathic method of treating local maladies with ointments and lotions is very dangerous.",
         footnotes: []
      }
    ]
  },
  {
    id: 189,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "By removing the local symptom, we often drive the disease deeper into the body.",
         footnotes: []
      }
    ]
  },
  {
    id: 190,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The removal of the local symptom makes it much more difficult to find the right internal remedy.",
         footnotes: []
      }
    ]
  },
  {
    id: 191,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The homoeopathic remedy for a local malady must be given internally.",
         footnotes: []
      }
    ]
  },
  {
    id: 192,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The internal remedy acts by removing the internal source of the disease.",
         footnotes: []
      }
    ]
  },
  {
    id: 193,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "We should not use local applications at the same time as internal ones.",
         footnotes: []
      }
    ]
  },
  {
    id: 194,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the internal remedy is truly homoeopathic, it will remove both the internal and the local symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 195,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In cases of long-standing local maladies, we should use anti-psoric remedies.",
         footnotes: []
      }
    ]
  },
  {
    id: 196,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The use of local applications often causes the internal disease to break out in other, more dangerous forms.",
         footnotes: []
      }
    ]
  },
  {
    id: 197,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "External applications of the same remedy that is given internally are also not recommended.",
         footnotes: []
      }
    ]
  },
  {
    id: 198,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If we remove the local symptom by external means, we lose the most important guide to the cure.",
         footnotes: []
      }
    ]
  },
  {
    id: 199,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the internal medicine has cured the disease, the local symptom will disappear of itself.",
         footnotes: []
      }
    ]
  },
  {
    id: 200,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The final sign of a complete cure is the disappearance of all symptoms, both internal and external.",
         footnotes: []
      }
    ]
  },
  {
    id: 201,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "It is not proper to treat the local symptom if it has been present for a long time.",
         footnotes: []
      }
    ]
  },
  {
    id: 202,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Investigations into the symptoms of some common diseases wrongly called local.",
         footnotes: []
      }
    ]
  },
  {
    id: 203,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The local symptom is often a valuable guide in choosing the internal remedy.",
         footnotes: []
      }
    ]
  },
  {
    id: 204,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "All chronic diseases that are not produced by medicinal abuse or unhealthy habits arise from chronic miasms.",
         footnotes: []
      }
    ]
  },
  {
    id: 205,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Most of these chronic miasms have their origin in Psora.",
         footnotes: []
      }
    ]
  },
  {
    id: 206,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician must investigate whether the patient has been infected with syphilis or sycosis, in addition to psora.",
         footnotes: []
      }
    ]
  },
  {
    id: 207,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician must also take into account the effects of any previous allopathic treatment.",
         footnotes: []
      }
    ]
  },
  {
    id: 208,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The age, habits, and diet of the patient are also important factors.",
         footnotes: []
      }
    ]
  },
  {
    id: 209,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Mental diseases: those where the mind is chiefly affected.",
         footnotes: []
      }
    ]
  },
  {
    id: 210,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Mental diseases are not fundamentally different from other diseases.",
         footnotes: []
      }
    ]
  },
  {
    id: 211,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The state of the mind and disposition is always modified in natural diseases.",
         footnotes: []
      }
    ]
  },
  {
    id: 212,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Medicines also produce changes in the mind and disposition when tested on healthy people.",
         footnotes: []
      }
    ]
  },
  {
    id: 213,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "We can never cure according to nature if we do not observe the mental state of the patient.",
         footnotes: []
      }
    ]
  },
  {
    id: 214,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The instructions for curing mental diseases are the same as for others.",
         footnotes: []
      }
    ]
  },
  {
    id: 215,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Almost all mental diseases are actually physical diseases that have become one-sided.",
         footnotes: []
      }
    ]
  },
  {
    id: 216,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physical symptoms often decrease when the mental symptoms appear.",
         footnotes: []
      }
    ]
  },
  {
    id: 217,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In these cases, we must take the totality of the symptoms, including the previous physical ones.",
         footnotes: []
      }
    ]
  },
  {
    id: 218,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The history of the patient's previous health is very important.",
         footnotes: []
      }
    ]
  },
  {
    id: 219,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The mental symptoms are often more clear and distinct than the physical ones.",
         footnotes: []
      }
    ]
  },
  {
    id: 220,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The choice of the remedy must be guided by these mental symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 221,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the mental disease reaches us as an acute state, it must be treated with acute remedies first.",
         footnotes: []
      }
    ]
  },
  {
    id: 222,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "But if the mental disease is long-standing, it must be treated with anti-psoric remedies.",
         footnotes: []
      }
    ]
  },
  {
    id: 223,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The recurrence of mental diseases can only be prevented by anti-psoric treatment.",
         footnotes: []
      }
    ]
  },
  {
    id: 224,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Mental diseases that have been caused by grief, fright, or bad news may sometimes be cured by moral and psychological means.",
         footnotes: []
      }
    ]
  },
  {
    id: 225,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "But if they arise from an internal miasm, they must be treated with internal medicines.",
         footnotes: []
      }
    ]
  },
  {
    id: 226,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Psychological treatment and kind advice are helpful in all mental diseases.",
         footnotes: []
      }
    ]
  },
  {
    id: 227,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The physician must avoid all cruel and harsh treatment of mental patients.",
         footnotes: []
      }
    ]
  },
  {
    id: 228,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The behavior of the physician and the attendants should be calm and supportive.",
         footnotes: []
      }
    ]
  },
  {
    id: 229,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Contradiction and violent behavior should be avoided.",
         footnotes: []
      }
    ]
  },
  {
    id: 230,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The homoeopathic remedy will often produce a rapid improvement in the mental state.",
         footnotes: []
      }
    ]
  },
  {
    id: 231,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Intermittent diseases: those that recur at regular intervals.",
         footnotes: []
      }
    ]
  },
  {
    id: 232,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Examples of intermittent diseases.",
         footnotes: []
      }
    ]
  },
  {
    id: 233,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Typical intermittent diseases: those that return at fixed periods (e.g. intermittent fevers).",
         footnotes: []
      }
    ]
  },
  {
    id: 234,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Typical intermittent diseases that are not fevers are almost always chronic and arise from Psora.",
         footnotes: []
      }
    ]
  },
  {
    id: 235,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In intermittent fevers, the choice of the remedy should be guided by the symptoms of the apyrexia (the interval between paroxysms).",
         footnotes: []
      }
    ]
  },
  {
    id: 236,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The remedy should be given as soon as possible after the paroxysm has ended.",
         footnotes: []
      }
    ]
  },
  {
    id: 237,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the remedy is given shortly before the next paroxysm, it may cause an aggravation.",
         footnotes: []
      }
    ]
  },
  {
    id: 238,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In intermittent fevers that are endemic in marshy districts, quinine (Cinchona) is often used allopathically, but it only suppresses the symptoms.",
         footnotes: []
      }
    ]
  },
  {
    id: 239,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "A single dose of the homoeopathic remedy is often sufficient to cure an intermittent fever.",
         footnotes: []
      }
    ]
  },
  {
    id: 240,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If the fever returns, it is often necessary to give an anti-psoric remedy.",
         footnotes: []
      }
    ]
  },
  {
    id: 241,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Epidemic intermittent fevers should be treated with the specific remedy for that epidemic.",
         footnotes: []
      }
    ]
  },
  {
    id: 242,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "If an epidemic fever returns, we must again investigate the symptoms of several patients.",
         footnotes: []
      }
    ]
  },
  {
    id: 243,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Marsh intermittent fevers that affect people who have just arrived in the district are easily cured.",
         footnotes: []
      }
    ]
  },
  {
    id: 244,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "But if the fever repeats itself, it means that there is an internal psora that must be treated.",
         footnotes: []
      }
    ]
  },
  {
    id: 245,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Mode of administering the medicine: the dose should be as small as possible.",
         footnotes: []
      }
    ]
  },
  {
    id: 246,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Every dose of an anti-psoric remedy should be allowed to complete its action before a new one is given.",
         footnotes: []
      }
    ]
  },
  {
    id: 247,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "But in some cases, the same remedy may be repeated after a short interval, if it is still indicated.",
         footnotes: []
      }
    ]
  },
  {
    id: 248,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The medicine should be dissolved in water and taken in divided doses.",
         footnotes: []
      }
    ]
  },
  {
    id: 249,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "If a medicine produces new symptoms that were not present before, it was not perfectly homoeopathic.",
         footnotes: []
      }
    ]
  },
  {
    id: 250,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "An antidote should be given immediately if the medicine causes serious aggravation.",
         footnotes: []
      }
    ]
  },
  {
    id: 251,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The choice of the remedy should be re-examined if the patient's condition changes.",
         footnotes: []
      }
    ]
  },
  {
    id: 252,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Signs of improvement and aggravation during the treatment.",
         footnotes: []
      }
    ]
  },
  {
    id: 253,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Aggravation by the remedy is a sign that it is the right one, provided it is not too severe.",
         footnotes: []
      }
    ]
  },
  {
    id: 254,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Signs that indicate that the medicine has begun to act.",
         footnotes: []
      }
    ]
  },
  {
    id: 255,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The physician should observe the patient's mental state for signs of improvement.",
         footnotes: []
      }
    ]
  },
  {
    id: 256,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Signs of a successful cure.",
         footnotes: []
      }
    ]
  },
  {
    id: 257,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The physician should avoid using 'favourite' remedies.",
         footnotes: []
      }
    ]
  },
  {
    id: 258,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The physician should not reject a remedy because he has not used it before.",
         footnotes: []
      }
    ]
  },
  {
    id: 259,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The patient's diet and lifestyle should be regulated.",
         footnotes: []
      }
    ]
  },
  {
    id: 260,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In chronic diseases, all medicinal influences must be avoided in the diet.",
         footnotes: []
      }
    ]
  },
  {
    id: 261,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "Exercise and healthy living are important for recovery.",
         footnotes: []
      }
    ]
  },
  {
    id: 262,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "In acute diseases, the patient's intuition regarding diet should be followed.",
         footnotes: []
      }
    ]
  },
  {
    id: 263,
    category: "Clinical",
    versions: [
      {
         edition: "Standard",
         content: "The patient's surroundings should be kept clean and ventilated.",
         footnotes: []
      }
    ]
  },
  {
    id: 264,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The medicine must be truly genuine and unadulterated.",
         footnotes: []
      }
    ]
  },
  {
    id: 265,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The physician should prepare his own medicines.",
         footnotes: []
      }
    ]
  },
  {
    id: 266,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Substances from the animal and vegetable kingdoms are given in their fresh state.",
         footnotes: []
      }
    ]
  },
  {
    id: 267,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Mode of preparing the tinctures.",
         footnotes: []
      }
    ]
  },
  {
    id: 268,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The physician should use only well-known substances as medicines.",
         footnotes: []
      }
    ]
  },
  {
    id: 269,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The development of the medicinal power of substances by trituration and succussion (Dynamization).",
         footnotes: []
      }
    ]
  },
  {
    id: 270,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The new method of preparing 50-millesimal potencies.",
         footnotes: []
      }
    ]
  },
  {
    id: 271,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "One single globule of the medicine is sufficient for a dose.",
         footnotes: []
      }
    ]
  },
  {
    id: 272,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The medicine should always be given alone, never combined with another.",
         footnotes: []
      }
    ]
  },
  {
    id: 273,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "It is wrong to use mixed medicinal substances.",
         footnotes: []
      }
    ]
  },
  {
    id: 274,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The true physician never uses more than one single medicine at a time.",
         footnotes: []
      }
    ]
  },
  {
    id: 275,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The dose of the medicine should be as small as possible.",
         footnotes: []
      }
    ]
  },
  {
    id: 276,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "If the dose is too large, it may cause an unnecessary and harmful medicinal disease.",
         footnotes: []
      }
    ]
  },
  {
    id: 277,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The smallest dose is also the most homoeopathic and effective.",
         footnotes: []
      }
    ]
  },
  {
    id: 278,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The question of how small the dose should be is answered by pure experience.",
         footnotes: []
      }
    ]
  },
  {
    id: 279,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Pure experience shows that even the smallest dose is often sufficient if it is truly homoeopathic.",
         footnotes: []
      }
    ]
  },
  {
    id: 280,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The dose may be increased only with great caution.",
         footnotes: []
      }
    ]
  },
  {
    id: 281,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "There are few people who are not sensitive to the smallest dose.",
         footnotes: []
      }
    ]
  },
  {
    id: 282,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The homoeopathic doses are never too small if they are chosen correctly.",
         footnotes: []
      }
    ]
  },
  {
    id: 283,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Only one medicine should be used for a given case.",
         footnotes: []
      }
    ]
  },
  {
    id: 284,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "The action of the medicine is most powerful when taken by the mouth, but it may also be applied through the skin.",
         footnotes: []
      }
    ]
  },
  {
    id: 285,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Olfaction (shaking) of the medicine is often sufficient for very sensitive patients.",
         footnotes: []
      }
    ]
  },
  {
    id: 286,
    category: "Pharmacy",
    versions: [
      {
         edition: "Standard",
         content: "Magnetism and Mesmerism: their value in certain cases.",
         footnotes: []
      }
    ]
  },
  {
    id: 287,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The power of human will and suggestion (Mesmerism).",
         footnotes: []
      }
    ]
  },
  {
    id: 288,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Positive and negative Mesmerism.",
         footnotes: []
      }
    ]
  },
  {
    id: 289,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The use of magnet and electricity in some cases.",
         footnotes: []
      }
    ]
  },
  {
    id: 290,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "The therapeutic value of gymnastics and massage.",
         footnotes: []
      }
    ]
  },
  {
    id: 291,
    category: "Philosophy",
    versions: [
      {
         edition: "Standard",
         content: "Baths and water treatment: their auxiliary use in homoeopathy.",
         footnotes: []
      }
    ]
  }
];
