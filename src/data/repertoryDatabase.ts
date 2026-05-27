export interface Rubric {
  id: string;
  symptom: string;
  remedies: string[];
  notes?: string;
  subCategory?: string;
}

export interface RepertoryChapter {
  id: string;
  name: string;
  icon: string;
  description: string;
  rubrics: Rubric[];
}

export const repertoryDatabase: RepertoryChapter[] = [
  {
    id: "mind",
    name: "Mind",
    icon: "Brain",
    description: "Mental generals, emotions, cognitive state, fears, and delirium.",
    rubrics: [
      // ANGER
      { id: "m_1", subCategory: "Anger", symptom: "Ailments from anger", remedies: ["Bry.", "Cham.", "Coloc.", "Staph."] },
      { id: "m_2", subCategory: "Anger", symptom: "Angry or offended when being questioned", remedies: ["Coloc."] },
      { id: "m_3", subCategory: "Anger", symptom: "Bad effects of anger caused by offense", remedies: ["Nat.m."] },
      { id: "m_4", subCategory: "Anger", symptom: "Child clings to those around, wants to be carried, cries if any one touches him, will not let you feel the pulse", remedies: ["Ant.c.", "Ant.t.", "Sanic."] },
      { id: "m_5", subCategory: "Anger", symptom: "Child cross when spoken to, crying from the slightest cause, gets into a passion about trifles, especially when consoled", remedies: ["Nat.m."] },
      { id: "m_6", subCategory: "Anger", symptom: "Child exceedingly irritable, fretful, quiet only when carried", remedies: ["Cham."] },
      { id: "m_7", subCategory: "Anger", symptom: "Child very cross, irritable, ill-humoured, wants to be carried, but carrying gives no relief", remedies: ["Cina"] },
      { id: "m_8", subCategory: "Anger", symptom: "Child is fretful, peevish, can't bear to be touched or looked at, sulky, does not wish to speak or to be spoken to", remedies: ["Ant.c.", "Ant.t.", "Sil.", "Iod."] },
      { id: "m_9", subCategory: "Anger", symptom: "Extremely irritable, becomes angry or offended on being questioned", remedies: ["Coloc."] },
      { id: "m_10", subCategory: "Anger", symptom: "Irritable, fault finding", remedies: ["Helon."] },
      { id: "m_11", subCategory: "Anger", symptom: "Loses temper easily and gains control slowly", remedies: ["Aes.h."] },
      
      // COMPANY
      { id: "m_12", subCategory: "Company", symptom: "Desires company yet persistently refuses to talk", remedies: ["Verat.alb."] },
      { id: "m_13", subCategory: "Company", symptom: "Desires light and company", remedies: ["Stram.", "Puls."] },
      { id: "m_14", subCategory: "Company", symptom: "Dread of being alone", remedies: ["Sepia"] },
      { id: "m_15", subCategory: "Company", symptom: "Desires to be quiet, to be left alone (does not want to speak or have anyone near even if silent)", remedies: ["Gels.", "Ign.", "Nux.v.", "Caps."] },
      { id: "m_16", subCategory: "Company", symptom: "Dread of death, when alone", remedies: ["Ars.alb."] },
      { id: "m_17", subCategory: "Company", symptom: "Dreads being alone, yet avoids society", remedies: ["Con.", "Kali.c.", "Lyco."] },
      { id: "m_18", subCategory: "Company", symptom: "Great aversion to being alone", remedies: ["Kali.c."] },
      { id: "m_19", subCategory: "Company", symptom: "Solitude is unbearable, desires company", remedies: ["Bis.", "Lil.t.", "Puls.", "Lyco.", "Stram."] },
      
      // DELIRIUM
      { id: "m_20", subCategory: "Delirium", symptom: "Constantly picking his lips, clothes, or boring into his nose with his finger without consciousness", remedies: ["Helleb."] },
      { id: "m_21", subCategory: "Delirium", symptom: "Constantly picking his lips, clothes, or boring into his nose with his finger with consciousness", remedies: ["Arum.t."] },
      { id: "m_22", subCategory: "Delirium", symptom: "Constantly talking, eyes wide open, pupils contracted, face red puffed, preceded by stupor", remedies: ["Opium"] },
      { id: "m_23", subCategory: "Delirium", symptom: "Delirium is more furious and mania more acute but fever lies between Hyos. and Bell.", remedies: ["Stram."] },
      { id: "m_24", subCategory: "Delirium", symptom: "Delirium, loquacious, talks all the time, sings, makes verses", remedies: ["Stram."] },
      { id: "m_25", subCategory: "Delirium", symptom: "Desires to escape in delirium", remedies: ["Bell.", "Bry.", "Op.", "Rhus tox.", "Stram."] },
      { id: "m_26", subCategory: "Delirium", symptom: "Eyes wide open, prominent, brilliant, pupils widely dilated, insensible", remedies: ["Stram."] },
      { id: "m_27", subCategory: "Delirium", symptom: "Lies in a stupid sleep, unconscious of all that is going around, correct answers when aroused but relapses", remedies: ["Acid.phos."] },
      { id: "m_28", subCategory: "Delirium", symptom: "Stupor, falls asleep while being spoken to or in the midst of his answers", remedies: ["Bapt."] },
      { id: "m_29", subCategory: "Delirium", symptom: "Unconsciousness, when spoken to, answers correctly, but unconsciousness and delirium at once return", remedies: ["Arn."] },

      // DELUSIONS
      { id: "m_30", subCategory: "Delusions", symptom: "Anxiety with fear about real or imaginary evils", remedies: ["Sepia"] },
      { id: "m_31", subCategory: "Delusions", symptom: "Everything in the room seems strange as though in a strange place", remedies: ["Tuber."] },
      { id: "m_32", subCategory: "Delusions", symptom: "Sensation as if about to be paralyzed", remedies: ["Syph."] },
      { id: "m_33", subCategory: "Delusions", symptom: "Sensation as if going insane", remedies: ["Syph."] },

      // FEAR
      { id: "m_34", subCategory: "Fear", symptom: "Afraid of sharp pointed things, pins, needles etc", remedies: ["Spig."] },
      { id: "m_35", subCategory: "Fear", symptom: "Fear of being poisoned, being eaten, being sold", remedies: ["Hyos."] },
      { id: "m_36", subCategory: "Fear", symptom: "Fear of darkness", remedies: ["Acon.", "Can.i.", "Lyco.", "Puls.", "Stram."] },
      { id: "m_37", subCategory: "Fear", symptom: "Fear of downward motion, going downstairs or rapidly down hills", remedies: ["Borax", "Sanic."] },
      { id: "m_38", subCategory: "Fear", symptom: "Excessively nervous, easily frightened by slightest noise or unusual sharp sound", remedies: ["Borax", "Asar.", "Calad."] },
      { id: "m_39", subCategory: "Fear", symptom: "Fears that he will fail in business", remedies: ["Psor."] },
      { id: "m_40", subCategory: "Fear", symptom: "Fear to eat and drink, suspicious of some plot", remedies: ["Hyos."] },
      { id: "m_41", subCategory: "Fear", symptom: "Fears he will die, of being poisoned, cannot remain in bed", remedies: ["Rhus.t."] },
      { id: "m_42", subCategory: "Fear", symptom: "Fears the house corners, if he passed that will fall down", remedies: ["Arg.nit."] },
      { id: "m_43", subCategory: "Fear", symptom: "Fears the terrific suffering from exhaustion on awakening", remedies: ["Syph.", "Lach."] },
      { id: "m_44", subCategory: "Fear", symptom: "Great impulse to jump off while crossing a bridge or high place", remedies: ["Arg.nit."] },
      { id: "m_45", subCategory: "Fear", symptom: "Hydrophobia", remedies: ["Stram.", "Bell.", "Lys."] },
      { id: "m_46", subCategory: "Fear", symptom: "Impulse to throw herself from window", remedies: ["Arg.nit."] },
      { id: "m_47", subCategory: "Fear", symptom: "Fear in a crowd", remedies: ["Acon.", "Arg.nit.", "Ars.", "Aur.m.", "Lyco.", "Puls."] },
      { id: "m_48", subCategory: "Fear", symptom: "Fear of becoming insane", remedies: ["Lac.c.", "Lil.t."] },
      { id: "m_49", subCategory: "Fear", symptom: "Of death, believes the disease is incurable", remedies: ["Cact.", "Ars."] },
      { id: "m_50", subCategory: "Fear", symptom: "Of dying", remedies: ["Lac.c.", "Ars."] },
      { id: "m_51", subCategory: "Fear", symptom: "Of falling downstairs", remedies: ["Lac.c.", "Bor."] },
      { id: "m_52", subCategory: "Fear", symptom: "Of work", remedies: ["Arg.nit.", "Puls.", "Sil."] },
      { id: "m_53", subCategory: "Fear", symptom: "Fear to be alone", remedies: ["Hyos.", "Kali.c.", "Lac.c."] },

      // HALLUCINATIONS
      { id: "m_54", subCategory: "Hallucinations", symptom: "Imagines that he sees ghosts, hideous faces and various insects", remedies: ["Bell."] },
      { id: "m_55", subCategory: "Hallucinations", symptom: "Nocturnal hallucinations", remedies: ["Tuber."] },
      { id: "m_56", subCategory: "Hallucinations", symptom: "Imagines that she is double, or lying crosswise (terrifying the patient)", remedies: ["Stram.", "Pet."] },

      // ILLUSIONS
      { id: "m_57", subCategory: "Illusions", symptom: "Head feels as if scattered about", remedies: ["Bapt.", "Stram."] },
      { id: "m_58", subCategory: "Illusions", symptom: "Illusion that he is sick", remedies: ["Sabad."] },
      { id: "m_59", subCategory: "Illusions", symptom: "Illusion that parts are shrunken", remedies: ["Sabad."] },
      { id: "m_60", subCategory: "Illusions", symptom: "Illusion that he has some horrible fatal throat disease", remedies: ["Sabad."] },
      { id: "m_61", subCategory: "Illusions", symptom: "Illusion that she is pregnant when merely distended with flatus", remedies: ["Sabad.", "Thuja"] }
    ]
  },
  {
    id: "vertigo_head_hair",
    name: "Vertigo, Head & Hair",
    icon: "Skull",
    description: "Vertigo triggers, headaches, clinical fontanelles, and scalp/hair characteristics.",
    rubrics: [
      // VERTIGO
      { id: "v_1", subCategory: "Vertigo", symptom: "Ascending from back of neck to head as if one would fall forward", remedies: ["Silicea"] },
      { id: "v_2", subCategory: "Vertigo", symptom: "Every sound seems to penetrate through body, causing nausea and vertigo", remedies: ["Therid."] },
      { id: "v_3", subCategory: "Vertigo", symptom: "Vertigo from any, even least noise", remedies: ["Therid.", "Thuja"] },
      { id: "v_4", subCategory: "Vertigo", symptom: "On closing the eyes", remedies: ["Therid."] },
      { id: "v_5", subCategory: "Vertigo", symptom: "On opening the eyes", remedies: ["Tab."] },
      { id: "v_6", subCategory: "Vertigo", symptom: "From looking up", remedies: ["Sil.", "Puls.", "Tab."] },
      { id: "v_7", subCategory: "Vertigo", symptom: "From looking down", remedies: ["Kalmia.", "Spig."] },
      { id: "v_8", subCategory: "Vertigo", symptom: "On rising", remedies: ["Bell.", "Pet.", "Rhus.t."] },
      { id: "v_9", subCategory: "Vertigo", symptom: "On seeing flowing water", remedies: ["Ferr.m."] },
      { id: "v_10", subCategory: "Vertigo", symptom: "Spreading from occiput, with diplopia, dim vision, loss of sight", remedies: ["Gels."] },
      { id: "v_11", subCategory: "Vertigo", symptom: "When lying down or turning in bed", remedies: ["Con."] },
      { id: "v_12", subCategory: "Vertigo", symptom: "When turning to left", remedies: ["Con.", "Coloc."] },
      { id: "v_13", subCategory: "Vertigo", symptom: "When moving slowly but not when taking violent exercise", remedies: ["Milif."] },
      { id: "v_14", subCategory: "Vertigo", symptom: "When rising from bed feels faint", remedies: ["Phyt.", "Bry."] },
      { id: "v_15", subCategory: "Vertigo", symptom: "When standing or walking, worse on lying down", remedies: ["Rhus.t."] },
      { id: "v_16", subCategory: "Vertigo", symptom: "When stooping or when rising from stooping", remedies: ["Bell.", "Bry.", "Rhus.t."] },
      { id: "v_17", subCategory: "Vertigo", symptom: "With sensation as if falling forward", remedies: ["Eup.p"] },
      
      // HEAD CONDITIONS
      { id: "v_18", subCategory: "Head", symptom: "Boring head into pillow, rolling from side to side, beating head (in hydrocephalus)", remedies: ["Hell."] },
      { id: "v_19", subCategory: "Head", symptom: "Cold sweat on forehead", remedies: ["Ver.alb."] },
      { id: "v_20", subCategory: "Head", symptom: "Coldness of vertex with headache", remedies: ["Sep.", "Verat."] },
      { id: "v_21", subCategory: "Head", symptom: "Concussion of brain from fall or blow while skin is cold and cold sweat", remedies: ["Sul.ac."] },
      { id: "v_22", subCategory: "Head", symptom: "Congestion, esp. of base of brain, basilar meningitis", remedies: ["Verat.alb."] },
      { id: "v_23", subCategory: "Head", symptom: "Scalp eruptions: dry scaly or moist, foetid, suppurating eruptions, oozing sticky fluid", remedies: ["Graph.", "Mez.", "Psor."] },
      { id: "v_24", subCategory: "Head", symptom: "Eczema; raw, red, inflamed esp. at edges of hair", remedies: ["Nat.m."] },
      { id: "v_25", subCategory: "Head", symptom: "Effusions into ventricles", remedies: ["Zinc."] },
      { id: "v_26", subCategory: "Head", symptom: "Fontanelles and sutures remain open too long or close and re-open", remedies: ["Cal.ph."] },
      { id: "v_27", subCategory: "Head", symptom: "Heat and cold at same time on scalp", remedies: ["Verat.alb."] },
      { id: "v_28", subCategory: "Head", symptom: "Heat of vertex", remedies: ["Calc.sul.", "Graph."] },
      { id: "v_29", subCategory: "Head", symptom: "Herpes on borders of hair at nape or neck", remedies: ["Nat.m."] },
      { id: "v_30", subCategory: "Head", symptom: "Open fontanels and sutures in children", remedies: ["Sil.", "Cal.c."] },
      { id: "v_31", subCategory: "Head", symptom: "Pustules which run together on head and face forming thick yellow scab", remedies: ["Cicuta"] },
      { id: "v_32", subCategory: "Head", symptom: "Rawness and soreness of scalp", remedies: ["Caust."] },
      { id: "v_33", subCategory: "Head", symptom: "Head sweats profusely while sleeping, wetting pillow all around", remedies: ["Cal.c."] },
      { id: "v_34", subCategory: "Head", symptom: "Sensation as if brain was loose in forehead, falling from side to side", remedies: ["Bell.", "Bry.", "Rhus.t", "Sul.ac.", "Spig."] },
      { id: "v_35", subCategory: "Head", symptom: "Sensation of a lump of ice on vertex with chilliness", remedies: ["Sul.ac."] },
      { id: "v_36", subCategory: "Head", symptom: "Sensation of coldness in head", remedies: ["Valer."] },

      // HAIR
      { id: "v_37", subCategory: "Hair", symptom: "Dry, lusterless, tangle easily, glued together", remedies: ["Psor.", "Lyco."] },
      { id: "v_38", subCategory: "Hair", symptom: "Falling of hair on head, esp. of whiskers", remedies: ["Sel."] },
      { id: "v_39", subCategory: "Hair", symptom: "Great falling of hair, after chronic headache", remedies: ["Sep.", "Sulph."] },
      { id: "v_40", subCategory: "Hair", symptom: "Hair become frowsy and tangle, split, stick together at tips", remedies: ["Bor.", "Fl.ac.", "Lyco.", "Psor.", "Tub."] },
      { id: "v_41", subCategory: "Hair", symptom: "Hair dry and falling", remedies: ["Thuja"] },
      { id: "v_42", subCategory: "Hair", symptom: "Hair falls out in bunches, baldness of single spot", remedies: ["Phos."] },
      { id: "v_43", subCategory: "Hair", symptom: "Hair falls out when touched, in nursing women", remedies: ["Nat.m.", "Sep."] },
      { id: "v_44", subCategory: "Hair", symptom: "Plica polonica", remedies: ["Psor.", "Bar.c."] },
      { id: "v_45", subCategory: "Hair", symptom: "White scaly dandruff", remedies: ["Thuja", "Phos.", "Lyco.", "Psor."] }
    ]
  },
  {
    id: "headache",
    name: "Headache",
    icon: "Frown",
    description: "Symptom patterns, trigger factors, and modalities of relief/aggravation for cephalalgia.",
    rubrics: [
      { id: "ha_1", subCategory: "Origin", symptom: "Headache after a fall upon occiput", remedies: ["Hyper."] },
      { id: "ha_2", subCategory: "Origin", symptom: "Headache alternating with lumbago", remedies: ["Aloe.s."] },
      { id: "ha_3", subCategory: "Origin", symptom: "American sick headache, begins in forehead extending to occiput in morning on rising", remedies: ["Lac.d."] },
      { id: "ha_4", subCategory: "Origin", symptom: "Beginning in cervical spine, extending over head, forehead and eyeball", remedies: ["Gels."] },
      { id: "ha_5", subCategory: "Origin", symptom: "Beginning with blindness", remedies: ["Iris."] },
      { id: "ha_6", subCategory: "Origin", symptom: "Headache caused by smoking or being in tobacco smoke", remedies: ["Ign."] },
      { id: "ha_7", subCategory: "Origin", symptom: "Headache from carriage by boat or train", remedies: ["Cocc.", "Medo."] },
      { id: "ha_8", subCategory: "Origin", symptom: "Ciliary neuralgia from globes to temples, vertex", remedies: ["Act.r."] },
      { id: "ha_9", subCategory: "Origin", symptom: "Congestive with red face, throbbing of brain/carotids, relieved by tight bandaging", remedies: ["Bell."] },
      { id: "ha_10", subCategory: "Origin", symptom: "Dull heavy sensation in occiput as from a blow, extending to neck, better from pressure", remedies: ["Apis."] },
      { id: "ha_11", subCategory: "Origin", symptom: "Eating a little or too much causes headache", remedies: ["Nux.m."] },
      { id: "ha_12", subCategory: "Origin", symptom: "Headache every six weeks in forehead and eyes, worse from motion, better wrapping up warmly", remedies: ["Mag.m."] },
      { id: "ha_13", subCategory: "Origin", symptom: "From above right eye to occiput", remedies: ["Tuber."] },
      { id: "ha_14", subCategory: "Origin", symptom: "From bites of dogs, whether rabid or not", remedies: ["Lyssin."] },
      { id: "ha_15", subCategory: "Origin", symptom: "From sun or working under gas light", remedies: ["Nat.c.", "Glon."] },
      { id: "ha_16", subCategory: "Sensations", symptom: "Sensation as if a thousand little hammers were knocking in brain", remedies: ["Nat.m."] },
      { id: "ha_17", subCategory: "Sensations", symptom: "Sensation of a bolt from temple to temple", remedies: ["Hamm."] },
      { id: "ha_18", subCategory: "Sensations", symptom: "Sensation as if a nail has been driven into parietal bone", remedies: ["Thuja."] },
      { id: "ha_19", subCategory: "Sensations", symptom: "Sensation of an iron hook around head", remedies: ["Anac.", "Sul.", "Tuber."] },
      { id: "ha_20", subCategory: "Sensations", symptom: "Sensation in brain as if torn or dashed into pieces", remedies: ["Coff.", "Verat.alb."] },
      { id: "ha_21", subCategory: "Sensations", symptom: "Sensation as if brain was driven out", remedies: ["Ign."] },
      { id: "ha_22", subCategory: "Sensations", symptom: "Sensation as if hair were pulled up", remedies: ["Mag.c."] },
      { id: "ha_23", subCategory: "Sensations", symptom: "Sensation as of the skull being too small for the brain", remedies: ["Tarent."] },
      
      // AGGRAVATION
      { id: "ha_24", subCategory: "Aggravation", symptom: "At menstrual nisus, scanty flow", remedies: ["Sep."] },
      { id: "ha_25", subCategory: "Aggravation", symptom: "Aggravation 10 - 11 P.M.", remedies: ["Syp."] },
      { id: "ha_26", subCategory: "Aggravation", symptom: "Aggravation from 10 to 11 A.M. or 4 to 5 P.M.", remedies: ["Mag.ph."] },
      { id: "ha_27", subCategory: "Aggravation", symptom: "Aggravation at 4 P.M.", remedies: ["Syph."] },
      { id: "ha_28", subCategory: "Aggravation", symptom: "Before and during menses", remedies: ["Kreos."] },
      { id: "ha_29", subCategory: "Aggravation", symptom: "By noises of running water or bright light", remedies: ["Lyssin."] },
      { id: "ha_30", subCategory: "Aggravation", symptom: "By noise, touch, or strong light", remedies: ["Tarent."] },
      { id: "ha_31", subCategory: "Aggravation", symptom: "During sleep, dreads to go to sleep because she awakens with headache", remedies: ["Lach."] },
      { id: "ha_32", subCategory: "Aggravation", symptom: "From exhaustive mental labour, better by tight bandaging", remedies: ["Arg.n."] },
      { id: "ha_33", subCategory: "Aggravation", symptom: "Aggravation from others walking on the floor", remedies: ["Therid."] },

      // AMELIORATION
      { id: "ha_34", subCategory: "Amelioration", symptom: "Amelioration at 11 - 12 P.M.", remedies: ["Lyco."] },
      { id: "ha_35", subCategory: "Amelioration", symptom: "Amelioration by continued hard motion", remedies: ["Sep."] },
      { id: "ha_36", subCategory: "Amelioration", symptom: "Amelioration by epistaxis", remedies: ["Melilotus"] },
      { id: "ha_37", subCategory: "Amelioration", symptom: "Amelioration by perspiration", remedies: ["Nat.m."] },
      { id: "ha_38", subCategory: "Amelioration", symptom: "Amelioration by profuse urination", remedies: ["Gels."] },
      { id: "ha_39", subCategory: "Amelioration", symptom: "Amelioration by rubbing head against the pillow", remedies: ["Tarent."] },
      { id: "ha_40", subCategory: "Amelioration", symptom: "Amelioration in daylight", remedies: ["Syph."] },
      { id: "ha_41", subCategory: "Amelioration", symptom: "Relieved entirely when eating", remedies: ["Anac.", "Psor"] }
    ]
  },
  {
    id: "eye_vision",
    name: "Eye & Vision",
    icon: "Eye",
    description: "Conjunctivitis, lachrymation patterns, ptosis, neuralgia, and optical disorders.",
    rubrics: [
      { id: "e_1", subCategory: "Sensation", symptom: "Aching in and over eyes with blurred vision as if strained", remedies: ["Ruta.g."] },
      { id: "e_2", subCategory: "Condition", symptom: "Acute granular conjunctivitis like raw beef", remedies: ["Arg.n."] },
      { id: "e_3", subCategory: "Lachrymation", symptom: "Bland lachrymation with watery and acrid nasal discharge", remedies: ["All.c."] },
      { id: "e_4", subCategory: "Lachrymation", symptom: "Bland lachrymation with muco-purulent discharge", remedies: ["Arg.n."] },
      { id: "e_5", subCategory: "Lachrymation", symptom: "Bland lachrymation with profuse pus, relieved by cold bathing", remedies: ["Syph."] },
      { id: "e_6", subCategory: "Appearance", symptom: "Blue rings around the eyes", remedies: ["Nat.c.", "Phos."] },
      { id: "e_7", subCategory: "Sensation", symptom: "Burning, capillaries injected and excessive lachrymation", remedies: ["All.c."] },
      { id: "e_8", subCategory: "Neuralgia", symptom: "Ciliary neuralgic pain in globes extending to temples, vertex, occiput", remedies: ["Act.r."] },
      { id: "e_9", subCategory: "Modality", symptom: "Cold air or cold water feels very pleasant to eyes", remedies: ["Asarum"] },
      { id: "e_10", subCategory: "Trauma", symptom: "Conjunctival or retinal hemorrhage from injury or cough", remedies: ["Arn.", "Led.", "Nux.v."] },
      { id: "e_11", subCategory: "Sensation", symptom: "Dryness of eyes, too dry to close the lids", remedies: ["Nux.m."] },
      { id: "e_12", subCategory: "Eyelids", symptom: "Eyelashes turned inwards (distichiasis/wild hair) and inflamed", remedies: ["Borax", "Rhus t"] },
      { id: "e_13", subCategory: "Eyelids", symptom: "Eyelashes loaded with dry gummy exudates", remedies: ["Borax"] },
      { id: "e_14", subCategory: "Sensitivity", symptom: "Eye trouble from bright glare or welders flash", remedies: ["Euph.", "Merc.s."] },
      { id: "e_15", subCategory: "Sensation", symptom: "Eyeballs sore to touch, feel as if they would be pulled back into head", remedies: ["Hep.s.", "Oleand."] },
      { id: "e_16", subCategory: "Eyelids", symptom: "Eyelids agglutinated at night, dry scaly on edges", remedies: ["Thuja"] },
      { id: "e_17", subCategory: "Sensation", symptom: "Eyes burn, ache, feel strained, hot like balls of fire", remedies: ["Ruta."] },
      { id: "e_18", subCategory: "Appearance", symptom: "Eyes sunken and surrounded by blue margins", remedies: ["China"] },
      { id: "e_19", subCategory: "Condition", symptom: "Fistula lachrymalis", remedies: ["Sil.", "Ac.fl."] },
      { id: "e_20", subCategory: "Eyelids", symptom: "Granular lids like small blisters", remedies: ["Nat.s."] },
      { id: "e_21", subCategory: "Sensation", symptom: "Intolerable pressing pain in eyeballs, cannot turn eyes without turning whole body", remedies: ["Spig."] },
      { id: "e_22", subCategory: "Lachrymation", symptom: "Lachrymation, tears stream down the face whenever he coughs", remedies: ["Nat.m."] },
      { id: "e_23", subCategory: "Eyelids", symptom: "Large granulations like warts or blisters in eyes", remedies: ["Thuja"] },
      { id: "e_24", subCategory: "Neuralgia", symptom: "Neuralgia, supra and infra-orbital (especially right-sided)", remedies: ["Mag.p."] },
      { id: "e_25", subCategory: "Modality", symptom: "Pain worse from 2 - 5 A.M.", remedies: ["Syph."] },
      { id: "e_26", subCategory: "Trauma", symptom: "Pain in eyes after blow on an obtuse body", remedies: ["Symph"] },
      { id: "e_27", subCategory: "Sensation", symptom: "Painful soreness of eyeballs with coryza", remedies: ["Eup.per."] },
      { id: "e_28", subCategory: "Neuralgia", symptom: "Periodical orbital right-sided neuralgia, with excessive lachrymation", remedies: ["Chelid."] },
      { id: "e_29", subCategory: "Lachrymation", symptom: "Profuse acrid lachrymation with bland coryza", remedies: ["Euph."] },
      { id: "e_30", subCategory: "Ptosis", symptom: "Ptosis, sleepy look from drooping lids", remedies: ["Syph.", "Caust."] },
      { id: "e_31", subCategory: "Ptosis", symptom: "Ptosis, great heaviness of eyelids, cannot keep them open", remedies: ["Gels.", "Caust.", "Graph.", "Sep."] },
      { id: "e_32", subCategory: "Swelling", symptom: "Puffy swelling under the eyes", remedies: ["Apis."] },
      { id: "e_33", subCategory: "Swelling", symptom: "Puffy swelling over the eyes", remedies: ["Kali.c."] },
      { id: "e_34", subCategory: "Swelling", symptom: "Puffy swelling of both lids", remedies: ["Phos."] },
      { id: "e_35", subCategory: "Pupils", symptom: "Pupils dilate when child is reprimanded", remedies: ["Stram."] },
      { id: "e_36", subCategory: "Pain", symptom: "Severe stitching pain in right eye and orbit", remedies: ["Kalmia"] },
      { id: "e_37", subCategory: "Pain", symptom: "Severe stitching pain in left eye", remedies: ["Spig."] },
      { id: "e_38", subCategory: "Sensation", symptom: "Severe stitching pain as if cold wind blowing across eyes", remedies: ["Croc.sat."] },
      { id: "e_39", subCategory: "Sensation", symptom: "Sharp stabbing pain through eyeballs, back into the head", remedies: ["Spig."] },
      { id: "e_40", subCategory: "Styes", symptom: "Styes, chalazae, leaving hard nodes, one after another on lids", remedies: ["Staph.", "Conium.", "Thuja."] },
      { id: "e_41", subCategory: "Styes", symptom: "Styes, especially on upper lids, from eating fat, pork or rich food", remedies: ["Puls."] },
      { id: "e_42", subCategory: "Twitching", symptom: "Twitching of lids and muscles of eyes", remedies: ["Physo.", "Agar."] },
      { id: "e_43", subCategory: "Warts", symptom: "Warts on eyelids", remedies: ["Caust."] },

      // VISION
      { id: "vi_1", subCategory: "Vision", symptom: "Amaurosis, from atrophy of retina or optic nerve", remedies: ["Tab."] },
      { id: "vi_2", subCategory: "Vision", symptom: "Amblyopia or asthenopia from over-exertion or refraction anomalies", remedies: ["Ruta."] },
      { id: "vi_3", subCategory: "Vision", symptom: "Day blindness, mist before eyes", remedies: ["Ran.b."] },
      { id: "vi_4", subCategory: "Vision", symptom: "Dim sighted, sees as through a veil (ascribes to brain trouble)", remedies: ["Tab."] },
      { id: "vi_5", subCategory: "Vision", symptom: "Dim vision, complete obscuration at distance", remedies: ["Ruta."] },
      { id: "vi_6", subCategory: "Vision", symptom: "Diplopia (one image seen below the other)", remedies: ["Syph."] },
      { id: "vi_7", subCategory: "Vision", symptom: "Flickering, fiery sparks, glittering needles, dim vision of fog", remedies: ["Cyclamen."] },
      { id: "vi_8", subCategory: "Vision", symptom: "Hemiopia, sees only lower half", remedies: ["Aur.m."] },
      { id: "vi_9", subCategory: "Vision", symptom: "Hemiopia, sees only left half", remedies: ["Lith.c.", "Lyco."] },
      { id: "vi_10", subCategory: "Vision", symptom: "Intense photophobia, with inflamed lids, lies face buried in pillow", remedies: ["Psor."] },
      { id: "vi_11", subCategory: "Vision", symptom: "To clear up vision after keratitis or kerato-iritis", remedies: ["Crot.h."] },
      { id: "vi_12", subCategory: "Vision", symptom: "When reading, letters seem to turn, go up/down or disappear", remedies: ["Cicuta.", "Cocc."] },
      { id: "vi_13", subCategory: "Vision", symptom: "Yellow colour of conjunctiva", remedies: ["Crot.h."] }
    ]
  },
  {
    id: "ear_hearing",
    name: "Ear & Hearing",
    icon: "Volume2",
    description: "Otitis, purulent otorrhoea, Meniere's disease, and auditory hyper-sensitivities.",
    rubrics: [
      // EAR
      { id: "ea_1", subCategory: "Ears", symptom: "Catarrhal inflammation of middle ear with deafness", remedies: ["Merc.", "Dulc."] },
      { id: "ea_2", subCategory: "Ears", symptom: "Chronic otitis, discharge purulent like putrid meat", remedies: ["Thuja."] },
      { id: "ea_3", subCategory: "Ears", symptom: "Humid scruffs and soreness on and behind ears", remedies: ["Psor."] },
      { id: "ea_4", subCategory: "Ears", symptom: "Eustachian tube closed", remedies: ["Merc.dul."] },
      { id: "ea_5", subCategory: "Ears", symptom: "Furuncle and boils in external meatus", remedies: ["Merc.sol.", "Pic.ac."] },
      { id: "ea_6", subCategory: "Ears", symptom: "Meniere's disease", remedies: ["Therid."] },
      { id: "ea_7", subCategory: "Ears", symptom: "Oozes an offensive viscid fluid", remedies: ["Psor.", "Graph."] },
      { id: "ea_8", subCategory: "Ears", symptom: "Otorrhoea: thin and ichorous, horrible fetid discharge like decayed meat", remedies: ["Psor."] },
      { id: "ea_9", subCategory: "Ears", symptom: "Painful swelling behind the ear (mastoid) extremely sore and sensitive", remedies: ["Caps."] },
      { id: "ea_10", subCategory: "Ears", symptom: "Physical exertion brings on abscess, generally in right ear", remedies: ["Carbo.an."] },
      { id: "ea_11", subCategory: "Ears", symptom: "Polypi and fungus excrescences in external meatus", remedies: ["Merc.sol.", "Thuja."] },
      { id: "ea_12", subCategory: "Ears", symptom: "Polypi, pale, red, bleeds easily", remedies: ["Thuja."] },
      
      // HEARING
      { id: "ea_13", subCategory: "Hearing", symptom: "Deafness of old age", remedies: ["Kali.m."] },
      { id: "ea_14", subCategory: "Hearing", symptom: "Hearing confused, cannot tell from which direction sound comes", remedies: ["Carbo-an."] },
      { id: "ea_15", subCategory: "Hearing", symptom: "Hears better in a noise or when there is a rumbling sound", remedies: ["Graph.", "Nit.ac."] },
      { id: "ea_16", subCategory: "Hearing", symptom: "Hears better when riding in a carriage", remedies: ["Graph."] },
      { id: "ea_17", subCategory: "Hearing", symptom: "Over-sensitive to hearing", remedies: ["Coffea", "Bell."] },
      { id: "ea_18", subCategory: "Hearing", symptom: "Roaring and humming with deafness before and during menses", remedies: ["Kreos."] }
    ]
  },
  {
    id: "fever_chill_sweat",
    name: "Fever, Chill & Sweat",
    icon: "Flame",
    description: "Thermoregulation profiles, intermittent chill patterns, and exhausting sweat phases.",
    rubrics: [
      // CHILL
      { id: "f_1", subCategory: "Chill", symptom: "Begins in back between scapulae, of bones and extremities", remedies: ["Pyr."] },
      { id: "f_2", subCategory: "Chill", symptom: "Chill at 9:00 AM on one day, at noon the next day", remedies: ["Eup.p."] },
      { id: "f_3", subCategory: "Chill", symptom: "Chill especially along the spine running up and down the back in waves", remedies: ["Gels."] },
      { id: "f_4", subCategory: "Chill", symptom: "Cold stage predominates, coldness felt more in abdomen and legs", remedies: ["Meny."] },
      { id: "f_5", subCategory: "Chill", symptom: "Insatiable thirst before and during chill (knows chill is coming because of drinking)", remedies: ["Eup.p."] },
      { id: "f_6", subCategory: "Chill", symptom: "Paroxysms of chill at 10:00 or 11:00 AM", remedies: ["Nat.mur."] },
      { id: "f_7", subCategory: "Chill", symptom: "Thirst during chill only (Heat without thirst)", remedies: ["Ign."] },
      { id: "f_8", subCategory: "Chill", symptom: "Chill at 3:00 PM, with thirst, always", remedies: ["Apis."] },

      // FEVER
      { id: "f_9", subCategory: "Fever", symptom: "Fever anticipating 2-3 hours on each attack", remedies: ["China"] },
      { id: "f_10", subCategory: "Fever", symptom: "Fever at 11:00 AM and 11:00 PM", remedies: ["Cactus."] },
      { id: "f_11", subCategory: "Fever", symptom: "Fever at night", remedies: ["Puls."] },
      { id: "f_12", subCategory: "Fever", symptom: "Heat stage without thirst (thirst during chill only)", remedies: ["Ign."] },
      { id: "f_13", subCategory: "Fever", symptom: "Hectic fever, skin dry/hot, red spot on left cheek, drenching sweats", remedies: ["Ac.ac."] },
      { id: "f_14", subCategory: "Fever", symptom: "Intermittent fever complicating chronic urethritis or stricture", remedies: ["Petrosel."] },
      { id: "f_15", subCategory: "Fever", symptom: "Fever never occurs at night", remedies: ["China."] },
      { id: "f_16", subCategory: "Fever", symptom: "On falling asleep, no thirst, dreads uncovering", remedies: ["Samb."] },
      { id: "f_17", subCategory: "Fever", symptom: "Fever paroxysm at 7:00 AM", remedies: ["Podo."] },
      { id: "f_18", subCategory: "Fever", symptom: "Pulse rapid abnormally, out of all proportion to temperature", remedies: ["Pyr."] },
      { id: "f_19", subCategory: "Fever", symptom: "Rapidly becomes typhoid", remedies: ["Hyos."] },
      { id: "f_20", subCategory: "Fever", symptom: "Ravenous hunger for days before the attack", remedies: ["Staph."] },
      { id: "f_21", subCategory: "Fever", symptom: "Rheumatism with high fever, full hard rapid pulse, joint pain", remedies: ["Verat.v.", "Bry.", "Sal.ac."] },
      { id: "f_22", subCategory: "Fever", symptom: "Septic fever, specially puerperal", remedies: ["Pyr."] },
      { id: "f_23", subCategory: "Fever", symptom: "Septic fever, rapid loss of strength, sinking pulse", remedies: ["Anthracinum"] },

      // PERSPIRATION
      { id: "f_24", subCategory: "Perspiration", symptom: "After 4:00 AM every morning on neck and forehead (very debilitating)", remedies: ["Stan."] },
      { id: "f_25", subCategory: "Perspiration", symptom: "Sweat all over except on head", remedies: ["Thuja."] },
      { id: "f_26", subCategory: "Perspiration", symptom: "Cold sweat on forehead", remedies: ["Verat.alb."] },
      { id: "f_27", subCategory: "Perspiration", symptom: "Day and night, as soon as he sleeps or when closing eyes", remedies: ["Con.", "China."] },
      { id: "f_28", subCategory: "Perspiration", symptom: "In axilla, smells like onion", remedies: ["Bov."] },
      { id: "f_29", subCategory: "Perspiration", symptom: "Musty odour of sweat", remedies: ["Stan."] },
      { id: "f_30", subCategory: "Perspiration", symptom: "Slight sweat towards morning", remedies: ["Phos.ac."] },
      { id: "f_31", subCategory: "Perspiration", symptom: "Sweat smells of sulphur", remedies: ["Phos."] },
      { id: "f_32", subCategory: "Perspiration", symptom: "Of hands, toes, feet, axilla (offensive sweat of single parts)", remedies: ["Sil."] },
      { id: "f_33", subCategory: "Perspiration", symptom: "Only on uncovered parts", remedies: ["Calc.c."] },
      { id: "f_34", subCategory: "Perspiration", symptom: "Over entire body", remedies: ["Thuja."] },
      { id: "f_35", subCategory: "Perspiration", symptom: "Profuse perspiration which does NOT relieve (may increase suffering)", remedies: ["Merc."] },
      { id: "f_36", subCategory: "Perspiration", symptom: "Profuse sweat on back of head/neck or upper portion of body", remedies: ["Calc.c.", "Sil."] },
      { id: "f_37", subCategory: "Perspiration", symptom: "Profuse sweat over entire body during waking hours", remedies: ["Samb."] },
      { id: "f_38", subCategory: "Perspiration", symptom: "Profuse day and night, sour smelling", remedies: ["Hepar.", "Rheum.", "Mag.c."] },
      { id: "f_39", subCategory: "Perspiration", symptom: "Profuse sweat with relief of all sufferings", remedies: ["Psor.", "Nat.m.", "Verat. alb."] },
      { id: "f_40", subCategory: "Perspiration", symptom: "Profuse sweat which aggravates/prevents relief", remedies: ["Sil.", "Calc."] },
      { id: "f_41", subCategory: "Perspiration", symptom: "Perspiration scanty and absent", remedies: ["Nux.m."] },
      { id: "f_42", subCategory: "Perspiration", symptom: "Sweet sweat that attracts flies", remedies: ["Calad."] }
    ]
  },
  {
    id: "urine_bladder",
    name: "Urine & Bladder",
    icon: "Droplets",
    description: "Renal colic, enuresis occurrences, dysuria modulations, and prostatic effects.",
    rubrics: [
      // PAIN
      { id: "u_1", subCategory: "Pain", symptom: "Pain as from distension, not better after urinating", remedies: ["Equis."] },
      { id: "u_2", subCategory: "Pain", symptom: "Pain at the close of urination", remedies: ["Equis.", "Sars."] },
      { id: "u_3", subCategory: "Pain", symptom: "Drinking even small quantities of water increases bladder pain", remedies: ["Canth."] },
      { id: "u_4", subCategory: "Pain", symptom: "Pressure in bladder as if constantly full, continues after urinating", remedies: ["Ruta."] },
      { id: "u_5", subCategory: "Pain", symptom: "Tenesmus of bladder with intense burning in urethra", remedies: ["Merc.c."] },
      { id: "u_6", subCategory: "Pain", symptom: "Bladder tenesmus", remedies: ["Tereb."] },
      { id: "u_7", subCategory: "Pain", symptom: "Violent burning and cutting in bladder", remedies: ["Tereb."] },
      
      // RETENTION
      { id: "u_8", subCategory: "Retention", symptom: "Retention from excessive use of tobacco", remedies: ["Op."] },
      { id: "u_9", subCategory: "Retention", symptom: "Retention in fever or acute illness", remedies: ["Op."] },
      { id: "u_10", subCategory: "Retention", symptom: "In nursing children after passion/anger of nurse", remedies: ["Op."] },
      { id: "u_11", subCategory: "Retention", symptom: "Of urine after labour", remedies: ["Amm.", "Op."] },

      // URINATION
      { id: "u_12", subCategory: "Urination", symptom: "Bladder is full but fullness is unrecognized", remedies: ["Op."] },
      { id: "u_13", subCategory: "Urination", symptom: "Can only be passed by bearing down with abdominal muscles", remedies: ["Mag.mur."] },
      { id: "u_14", subCategory: "Urination", symptom: "Can only void urine while sitting, bent backwards", remedies: ["Zinc.met."] },
      { id: "u_15", subCategory: "Urination", symptom: "Child cries before urination", remedies: ["Lyco.", "Borax."] },
      { id: "u_16", subCategory: "Urination", symptom: "Cystitis and retention from atony of fundus", remedies: ["Tereb."] },
      { id: "u_17", subCategory: "Urination", symptom: "First stage of diabetes", remedies: ["Helon."] },
      { id: "u_18", subCategory: "Urination", symptom: "Difficult urination if the urge not immediately attained", remedies: ["Ruta."] },
      { id: "u_19", subCategory: "Urination", symptom: "Has to wait long for urination if others are present", remedies: ["Nat.m."] },
      { id: "u_20", subCategory: "Urination", symptom: "Urine dribbles while sitting, with painful distended bladder", remedies: ["Sars."] },
      { id: "u_21", subCategory: "Urination", symptom: "Passes large quantity of colourless urine", remedies: ["Sul."] },
      { id: "u_22", subCategory: "Urination", symptom: "Passes slowly so as to press the bladder till anus protrudes", remedies: ["Mur.ac."] },
      { id: "u_23", subCategory: "Urination", symptom: "Voided volume is larger than amount of water drunk", remedies: ["Merc."] },
      { id: "u_24", subCategory: "Urination", symptom: "Suppression of urine", remedies: ["Stram."] },
      { id: "u_25", subCategory: "Urination", symptom: "Urine passes unconsciously day and night", remedies: ["Arg.n.", "Caust."] },
      { id: "u_26", subCategory: "Urination", symptom: "Urging to urinate, has to sit for hours at urinal, in young married women after coition", remedies: ["Staph."] },

      // ENURESIS
      { id: "u_27", subCategory: "Enuresis", symptom: "Enuresis after catheterization", remedies: ["Mag.p."] },
      { id: "u_28", subCategory: "Enuresis", symptom: "High coloured, ammoniacal urine in bed every night, worse after play", remedies: ["Medo."] },
      { id: "u_29", subCategory: "Enuresis", symptom: "Enuresis during full moon, in obstinate cases", remedies: ["Psor."] },
      { id: "u_30", subCategory: "Enuresis", symptom: "Flow impeded, voided slowly, without force drops vertically", remedies: ["Hepar.s."] },
      { id: "u_31", subCategory: "Enuresis", symptom: "Flow intermits, then flows again", remedies: ["Conium."] },
      { id: "u_32", subCategory: "Enuresis", symptom: "Incontinence during 1st sleep, child rouses with difficulty", remedies: ["Kreos.", "Sep."] },
      { id: "u_33", subCategory: "Enuresis", symptom: "Incontinence of urine after labour", remedies: ["Arn.", "Op."] },
      { id: "u_34", subCategory: "Enuresis", symptom: "Can only urinate when lying down", remedies: ["Kreos."] }
    ]
  },
  {
    id: "skin",
    name: "Skin & Eruptions",
    icon: "ShieldAlert",
    description: "Eczema, chronic urticaria types, cicatrices, and distinct pathologic warts.",
    rubrics: [
      { id: "s_1", subCategory: "Dryness", symptom: "Cicatrices (especially from burns/scalds) freshen up and become sore again", remedies: ["Caust."] },
      { id: "s_2", subCategory: "Dryness", symptom: "Coarse, greasy, as if bathed in oil", remedies: ["Psor."] },
      { id: "s_3", subCategory: "Dryness", symptom: "Dry inactive skin, rarely sweats, dirty look as if never washed", remedies: ["Psor."] },
      { id: "s_4", subCategory: "Sensitivity", symptom: "Extremely sensitive to touch, pain often causes fainting", remedies: ["Hepar."] },
      { id: "s_5", subCategory: "Fibrosis", symptom: "Hard cicatrices remaining after mammary abscess", remedies: ["Graph."] },
      { id: "s_6", subCategory: "Climate", symptom: "Icy coldness of surface, covered with cold sweat", remedies: ["Tabac."] },
      { id: "s_7", subCategory: "Itch", symptom: "Itch appears each year as winter approaches", remedies: ["Aloe.", "Psor."] },
      { id: "s_8", subCategory: "Itch", symptom: "Itch worse at night", remedies: ["Puls."] },
      { id: "s_9", subCategory: "Dryness", symptom: "Old cicatrices break open again", remedies: ["Graph."] },
      { id: "s_10", subCategory: "Sensitivity", symptom: "Painful sensitiveness of skin of the whole body", remedies: ["Pet."] },
      { id: "s_11", subCategory: "Dryness", symptom: "Parchment-like dryness of skin", remedies: ["Sabad."] },
      { id: "s_12", subCategory: "Climate", symptom: "Skin eruptions appear every spring", remedies: ["Nat.s.", "Psor."] },
      { id: "s_13", subCategory: "Trauma", symptom: "Tendency to bed sores", remedies: ["Nux.m."] },
      { id: "s_14", subCategory: "Trauma", symptom: "Burn tends to ulceration and ichorous discharge", remedies: ["Carbo.ac."] },

      // WARTS - KINDS
      { id: "s_15", subCategory: "Warts", symptom: "Fig warts with intolerable itching and burning", remedies: ["Sabina."] },
      { id: "s_16", subCategory: "Warts", symptom: "Fig warts, cauliflower-like, pedunculated", remedies: ["Staph."] },
      { id: "s_17", subCategory: "Warts", symptom: "Flat smooth warts (on palms of hand)", remedies: ["Ruta."] },
      { id: "s_18", subCategory: "Warts", symptom: "Fleshy, large, smooth", remedies: ["Dulc."] },
      { id: "s_19", subCategory: "Warts", symptom: "Large, jagged, often pedunculated", remedies: ["Nit.ac.", "Caust."] },
      { id: "s_20", subCategory: "Warts", symptom: "Large, seedy, pedunculated", remedies: ["Thuja."] },

      // WARTS - PLACE
      { id: "s_21", subCategory: "Warts Location", symptom: "On face, back of hands and fingers", remedies: ["Thuja.", "Dulc."] },
      { id: "s_22", subCategory: "Warts Location", symptom: "On palm of hand, sore to touch", remedies: ["Nat.c."] },
      { id: "s_23", subCategory: "Warts Location", symptom: "On the prepuce", remedies: ["Cinnab.", "Ac.ph."] },
      { id: "s_24", subCategory: "Warts Location", symptom: "Warts on palm of hands", remedies: ["Anac.", "Nat.m."] },
      { id: "s_25", subCategory: "Warts Location", symptom: "Warts with sore pain", remedies: ["Ruta."] }
    ]
  }
];
