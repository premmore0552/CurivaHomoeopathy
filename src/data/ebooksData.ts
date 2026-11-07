export interface EBookSection {
  id: string;
  title: string;
  content: string;
}

export interface EBookBook {
  id: string;
  title: string;
  subtitle: string;
  brand: string;
  version: string;
  category: string;
  readTime: string;
  coverImage: string;
  tagline: string;
  description: string;
  isBestSeller?: boolean;
  icon?: string;
  sections: EBookSection[];
}

export const EBOOKS_DATABASE: EBookBook[] = [
  // -------------------------------------------------------------
  // BEST SELLERS / FEATURED LAUNCH TITLES
  // -------------------------------------------------------------

  {
    id: "hair-fall-causes-myths-care",
    title: "Hair Fall: Causes, Myths & Everyday Care",
    subtitle: "A Complete Public Health Guide to Scalp Biology, Telogen Shedding, DHT Pattern Loss, Nutrition, and Homoeopathic Restoration",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Skin & Hair",
    readTime: "20 min read",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    tagline: "Unlocking root-cause hair restoration through scalp science, iron balance, and holistic care.",
    description: "Understand the hair growth cycle, telogen effluvium triggers, male/female pattern baldness, scalp hygiene, dietary ferritin, and homoeopathic hair remedies.",
    isBestSeller: true,
    icon: "🧴",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Hair Fall: Causes, Myths & Everyday Care
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial & Academic Board  
**Series:** Curiva Public Health eBooks  
**Version:** 2.0 (Evidence-Informed Edition)  

---

## Educational & Medical Disclaimer
This eBook is published by Curiva Homoeopathy strictly for public health education, patient empowerment, and student reference. It does not constitute individual clinical advice, medical diagnosis, or prescription. Always consult a registered medical practitioner or qualified homoeopath for personalized health management.

---

## Welcome Note from Curiva Homoeopathy
Dear Reader,  
Hair is often viewed as a symbol of vitality, confidence, and identity. However, when excessive strands collect in your brush or shower drain, it can cause severe anxiety.

At Curiva Homoeopathy, we believe that true hair health begins from within. Hair loss is rarely just a local scalp problem; it is a sensitive barometer of internal systemic balance, reflecting nutritional status, hormonal shifts, stress, and metabolic health.

This guide provides clear, evidence-informed knowledge to help you understand hair growth biology, separate myths from scientific facts, and adopt sustainable habits.

Warm regards,  
**Curiva Homoeopathy Editorial Team**`
      },
      {
        id: "what-is-the-condition",
        title: "What Is Hair Fall & Hair Biology?",
        content: `## What Is Hair Fall & Understanding Hair Biology

Hair grows from specialized microscopic mini-organs in the dermis called **hair follicles**. Every person is born with approximately 100,000 scalp follicles.

### The Three Phases of the Hair Growth Cycle
1. **Anagen (Growth Phase):** Lasts 2 to 6 years. About 85% to 90% of scalp hair follicles are in this active growing phase at any given moment.
2. **Catagen (Transition Phase):** Lasts 2 to 3 weeks. Hair growth ceases, and the outer root sheath shrinks and attaches to the root.
3. **Telogen (Resting & Shedding Phase):** Lasts 2 to 3 months. The strand rests until it is naturally shed during washing or brushing to make way for a new Anagen fiber.

📌 **Quick Fact:** *Losing between 50 and 100 hair strands per day is a completely normal physiological shedding process.*`
      },
      {
        id: "causes-and-risk-factors",
        title: "Causes & Risk Factors",
        content: `## Primary Causes & Risk Factors of Hair Loss

Hair loss is classified into distinct physiological patterns based on root cause:

### 1. Telogen Effluvium (Acute Diffuse Shedding)
Occurs when a major physical or emotional shock prematurely pushes up to 30-50% of growing Anagen hair follicles into the Telogen shedding phase 2 to 3 months later.
- **Triggers:** High fever (typhoid, viral infection), severe stress, post-childbirth hormonal drop, crash dieting, or post-surgical shock.

### 2. Androgenetic Alopecia (Pattern Baldness)
Genetically mediated follicle sensitivity to **Dihydrotestosterone (DHT)**, an androgen hormone synthesized via the enzyme 5-alpha reductase.
- **In Men:** Receding frontal hairline and thinning crown (vertex).
- **In Women:** Diffuse widening of the central parting line with preserved frontal hairline.

### 3. Nutritional & Metabolic Deficiencies
- Low serum **ferritin** (stored iron), Vitamin D3 deficiency, B12 deficiency, or thyroid dysfunction (hypothyroidism/hyperthyroidism).`
      },
      {
        id: "signs-and-symptoms",
        title: "Common Signs & Symptoms",
        content: `## Signs & Symptoms To Watch For

- **Excessive Daily Shedding:** Finding >100-150 strands on your pillow, floor, or shower drain consistently for over 4 weeks.
- **Scalp Parting Widening:** Visible scalp exposure when parting hair down the middle.
- **Reduction in Ponytail Thickness:** A noticeable drop in hair volume when tied.
- **Scalp Sensitivity or Itching:** Redness, flaking, oily buildup, or soreness at root beds.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Diagnosis & Common Tests",
        content: `## Diagnostic Evaluation & Laboratory Tests

To pinpoint the underlying trigger, doctors evaluate key blood markers:

| Test Parameter | Optimal Target Range | Clinical Significance |
| :--- | :--- | :--- |
| **Serum Ferritin** | >50 - 70 ng/mL | Essential stored iron for follicular protein synthesis |
| **Vitamin D3 (25-OH)** | 40 - 60 ng/mL | Activates hair follicle stem cells |
| **TSH (Thyroid Function)** | 1.0 - 2.5 µIU/mL | Evaluates metabolic rate and cellular energy |
| **Hemoglobin / CBC** | Male: 13.5-17.5 g/dL / Female: 12.0-15.5 g/dL | Assesses oxygen delivery capacity |
| **Vitamin B12** | >400 pg/mL | Crucial for red blood cell formation and nerve conduction |`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle & Everyday Care",
        content: `## Scalp Care & Daily Hygiene Guidelines

- **Gentle Washing Routine:** Wash scalp 2 to 3 times weekly with a mild, sulfate-free cleanser to prevent sebum and microbial buildup.
- **Avoid Friction & Heat Damage:** Never comb wet hair vigorously. Limit thermal styling tools (flat irons, high-heat blow dryers).
- **Scalp Massage:** 5 minutes of gentle fingertip circular scalp massage increases cutaneous microcirculation to follicle roots.`
      },
      {
        id: "diet-and-nutrition",
        title: "Diet & Nutrition Tips",
        content: `## Hair-Nourishing Nutritional Plan

Hair fiber is composed of 95% **keratin protein**. Nutrient-dense foods fuel the matrix cells:

- **Protein-Rich Staples:** Sprouted lentils, chickpeas, paneer, eggs, nuts, and pumpkin seeds.
- **Iron & Folate Sources:** Spinach, beetroot, pomegranate, dates, and black raisins.
- **Zinc & Omega-3:** Walnuts, flaxseeds, chia seeds, and sesame seeds.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Physical Activity & Circulation Boost

- **Cardiovascular Fitness:** 30 minutes of brisk walking or jogging 4 times weekly promotes systemic arterial blood flow to scalp capillaries.
- **Inverted Yoga Postures:** *Adho Mukha Svanasana* (Downward Dog) and *Sarvangasana* enhance cephalic blood circulation.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Busting Common Hair Myths

- **Myth:** Shaving your head makes hair grow back thicker and denser.  
  *Fact:* Shaving cuts hair at the thick base of the shaft, giving a blunt appearance as it emerges, but does not alter follicle count or thickness.
- **Myth:** Daily hair washing causes permanent hair fall.  
  *Fact:* Washing sheds hairs that were already detached in the Telogen phase resting inside the follicle.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## When to Seek Medical Evaluation

Consult a physician or dermatologist if you notice:
- Rapid, smooth circular bald patches appearing overnight (indicates **Alopecia Areata**).
- Severe scalp redness, painful pustules, burning sensation, or scarring.
- Hair loss accompanied by unexplained weight changes, chronic fatigue, or menstrual disruption.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## Frequently Asked Questions

**Q: How long does it take to see improvements after correcting nutritional deficiencies?**  
*A: Because the Telogen phase lasts 2 to 3 months, visible reduction in shedding typically takes 8 to 12 weeks of consistent nutritional therapy.*

**Q: Can stress really cause hair loss?**  
*A: Yes. High stress elevates systemic cortisol, which disrupts the hair cycle and triggers Telogen Effluvium.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways & Action Plan",
        content: `## Key Takeaways

1. **Rule Out Internal Deficiencies:** Test Serum Ferritin, Vitamin D3, and TSH.
2. **Prioritize Protein & Iron:** Include sprouted beans, seeds, and greens daily.
3. **Maintain Scalp Hygiene:** Keep the scalp clean without harsh chemical stripping.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. Harrison's Principles of Internal Medicine (Dermatology Section).
2. World Health Organization (WHO) Guidelines on Micronutrient Deficiencies.
3. Boericke's Materia Medica & Homoeopathic Therapeutics.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy is a trusted medical knowledge and health education portal dedicated to advancing evidence-informed, patient-centric healthcare and student academic support.`
      }
    ]
  },

  {
    id: "pcos-explained-simply",
    title: "PCOS & Hormonal Health Explained Simply",
    subtitle: "A Complete Public Health Guide to Endocrine Balance, Insulin Sensitivity, Nutrition, and Classical Homoeopathic Care",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Women's Health",
    readTime: "25 min read",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
    tagline: "Empowering women with clear, scientific, and holistic hormonal knowledge.",
    description: "An evidence-based guide breaking down insulin resistance, ovarian physiology, dietary interventions, and constitutional homoeopathic care for PCOS.",
    isBestSeller: true,
    icon: "👩",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# PCOS & Hormonal Health Explained Simply
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board  

---

## Educational & Medical Disclaimer
This eBook is published solely for educational and awareness purposes. It does not replace individualized clinical advice, diagnosis, or medical care from a registered health professional.`
      },
      {
        id: "what-is-the-condition",
        title: "What Is PCOS?",
        content: `## What Is Polycystic Ovary Syndrome (PCOS)?

PCOS is a common endocrine and metabolic condition affecting 8-13% of women of reproductive age globally. It involves hormonal feedback loop dysregulation, insulin resistance, and elevated androgen levels.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Causes & Risk Factors",
        content: `## Root Drivers of PCOS

1. **Insulin Resistance:** Up to 75% of women with PCOS exhibit cellular insulin resistance regardless of weight. High insulin signals ovarian theca cells to overproduce testosterone.
2. **Low-Grade Inflammation:** Elevated inflammatory markers stimulate adrenal and ovarian androgen synthesis.
3. **Genetic Susceptibility:** Family history of diabetes or metabolic syndrome increases predisposition.`
      },
      {
        id: "signs-and-symptoms",
        title: "Common Signs & Symptoms",
        content: `## Clinical Manifestations

- **Menstrual Irregularities:** Cycles lasting >35 days or complete absence (Amenorrhea).
- **Hirsutism:** Dark hair growth on chin, upper lip, chest, or lower abdomen.
- **Hormonal Acne:** Cystic breakouts concentrated along the jawline.
- **Acanthosis Nigricans:** Darkened skin patches around neck folds indicating high insulin.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Diagnosis & Lab Tests",
        content: `## Diagnostic Evaluation (Rotterdam Criteria)

Diagnosis requires at least two of the following:
1. Irregular or absent ovulation.
2. Clinical or lab signs of hyperandrogenism.
3. Ultrasound evidence of polycystic ovarian morphology (≥12 follicles along ovary rim).`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle & Self-Care",
        content: `## Lifestyle Modification

- Establish regular 7-8 hour sleep schedules to normalize cortisol.
- Practice daily stress-reduction techniques.`
      },
      {
        id: "diet-and-nutrition",
        title: "Diet Tips",
        content: `## Low-GI Anti-Inflammatory Nutrition

- **Embrace:** Complex millets (ragi, jowar), green leafy vegetables, seeds (chia, flax, pumpkin), and low-sugar fruits.
- **Limit:** Refined flour (maida), sugary drinks, and ultra-processed snacks.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Physical Activity Protocol

- **Strength Training:** 3 days weekly to build muscle tissue that absorbs glucose without extra insulin.
- **Brisk Walking & Yoga:** Improves pelvic circulation and stress resilience.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## PCOS Myths Debunked

- **Myth:** Women with PCOS can never get pregnant naturally.  
  *Fact:* Restoring ovulation through diet, weight balance, and holistic care enables healthy natural conception.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## Emergency Red Flags

Seek immediate emergency medical care for sudden severe pelvic pain or heavy unceasing bleeding lasting >10 days.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: Is birth control pill the only solution?**  
*A: No. Contraceptive pills induce withdrawal bleeding but do not address root insulin resistance.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Focus on glycemic control and muscle building.
2. Monitor blood insulin and HbA1c periodically.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. Rotterdam ESHRE/ASRM PCOS Consensus Guidelines.
2. NCH Homoeopathic Curriculum Guidelines.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy provides evidence-based medical education and patient empowerment resources.`
      }
    ]
  },

  {
    id: "diabetes-made-easy",
    title: "Diabetes Made Easy & Blood Sugar Control",
    subtitle: "A Practical Public Health Guide to Glucose Metabolism, HbA1c Interpretation, Glycemic Nutrition, and Holistic Wellness",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Diabetes & Metabolism",
    readTime: "22 min read",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tagline: "Mastering blood sugar through glycemic nutrition, active habits, and root-cause balance.",
    description: "Understand insulin resistance, HbA1c targets, diabetic meal timing, neuropathy prevention, and homoeopathic constitutional support.",
    isBestSeller: true,
    icon: "🩸",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Diabetes Made Easy
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board  

---

## Educational & Medical Disclaimer
This guide is published for public health education. Do not alter prescribed diabetic medication without physician supervision.`
      },
      {
        id: "what-is-the-condition",
        title: "What Is Type 2 Diabetes?",
        content: `## Understanding Type 2 Diabetes

Type 2 Diabetes Mellitus is a metabolic disorder characterized by elevated blood glucose caused by **cellular insulin resistance** and progressive pancreatic beta-cell fatigue.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Causes & Risk Factors",
        content: `## Causes & Risk Factors

- Sedentary lifestyle and visceral abdominal fat.
- Diets high in refined sugar and simple carbohydrates.
- Genetic predisposition and family history.`
      },
      {
        id: "signs-and-symptoms",
        title: "Common Signs & Symptoms",
        content: `## Common Symptoms

- **Polydipsia:** Excessive thirst.
- **Polyuria:** Frequent urination, especially at night.
- **Polyphagia:** Unexplained persistent hunger and fatigue.
- Slow-healing cuts or tingling in feet.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Diagnosis & Lab Tests",
        content: `## Diagnostic Test Target Table

| Test Parameter | Normal Range | Prediabetes | Diabetes Diagnosis |
| :--- | :--- | :--- | :--- |
| **Fasting Blood Sugar** | <100 mg/dL | 100 - 125 mg/dL | ≥126 mg/dL |
| **Post-Prandial Sugar** | <140 mg/dL | 140 - 199 mg/dL | ≥200 mg/dL |
| **HbA1c (3-Mo Avg)** | <5.7% | 5.7% - 6.4% | ≥6.5% |`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle & Self-Care",
        content: `## Daily Self-Care Rules

- Perform daily foot inspections for hidden cuts or pressure sores.
- Maintain consistent sleep timing.`
      },
      {
        id: "diet-and-nutrition",
        title: "Diet Tips",
        content: `## Diabetic Nutrition Plan

- Eat vegetables and protein first before complex carbs to flatten post-meal glucose spikes.
- Use bitter greens like karela, fenugreek seeds, and amla.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Physical Activity Guidelines

- 30 minutes of brisk walking after dinner boosts muscle glucose uptake independent of insulin.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Debunking Diabetes Myths

- **Myth:** Eating jaggery or honey is safe for diabetics.  
  *Fact:* Jaggery and honey increase blood sugar almost as fast as white sugar.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## Emergency Red Flags

Seek urgent care for blood sugar <70 mg/dL (Hypoglycemia) or >300 mg/dL accompanied by nausea and deep breathing.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: Can prediabetes be completely reversed?**  
*A: Yes! Prediabetes can be fully reversed with weight management, dietary shifts, and daily walking.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Keep HbA1c monitored every 3 months.
2. Prioritize fiber and protein in every meal.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. American Diabetes Association (ADA) Clinical Care Standards.
2. Boericke's Homoeopathic Therapeutics.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy delivers structured, transparent health guidance for families and healthcare students.`
      }
    ]
  },

  {
    id: "high-blood-pressure-handbook",
    title: "High Blood Pressure Handbook",
    subtitle: "A Complete Public Health Guide to Arterial Health, Sodium Management, Cardiac Vitality, and Stress Balance",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Heart & Circulation",
    readTime: "20 min read",
    coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    tagline: "Protecting your heart through arterial care, sodium control, and holistic lifestyle balance.",
    description: "Learn how blood pressure works, home BP monitoring, DASH diet sodium control, and homoeopathic cardiovascular support.",
    isBestSeller: true,
    icon: "🫀",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# High Blood Pressure Handbook
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board`
      },
      {
        id: "what-is-the-condition",
        title: "What Is High Blood Pressure?",
        content: `## Understanding Hypertension

Blood pressure is the hydrostatic force exerted by blood against arterial walls.
- **Systolic (Top):** Pressure when heart pumps.
- **Diastolic (Bottom):** Pressure when heart rests between beats.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Causes & Risk Factors",
        content: `## Risk Factors

- Excess dietary sodium, physical inactivity, chronic mental stress, alcohol, and arterial stiffness.`
      },
      {
        id: "signs-and-symptoms",
        title: "Signs & Symptoms",
        content: `## The Silent Killer

Hypertension often presents with no symptoms until organ stress develops. Occasional signs include occipital morning headaches and dizziness.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Diagnosis & Categories",
        content: `## Blood Pressure Classification Table

| Category | Systolic (mmHg) | Diastolic (mmHg) |
| :--- | :--- | :--- |
| **Normal** | <120 | AND <80 |
| **Elevated** | 120-129 | AND <80 |
| **Stage 1** | 130-139 | OR 80-89 |
| **Stage 2** | ≥140 | OR ≥90 |
| **Crisis** | >180 | AND/OR >120 |`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle & Self-Care",
        content: `## Home BP Monitoring Guidelines

Measure BP after sitting quietly for 5 minutes without caffeine or smoking.`
      },
      {
        id: "diet-and-nutrition",
        title: "Diet Tips & DASH Protocol",
        content: `## Sodium Control & DASH Diet

- Limit daily elemental sodium to <2,000 mg (1 teaspoon table salt).
- Increase potassium-rich foods like bananas, coconut water, and spinach.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Aerobic Activity

30 minutes of brisk walking daily lowers systolic BP by 5-8 mmHg.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Myths Debunked
- **Myth:** If I don't feel a headache, my blood pressure is fine.  
  *Fact:* BP damage occurs silently without headaches.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## Hypertensive Crisis Red Flags

Seek emergency care for BP >180/120 with chest pain, shortness of breath, or severe visual blurring.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: Does stress temporarily raise BP?**  
*A: Yes, acute stress causes adrenaline surges that spike BP.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Keep a weekly home BP log.
2. Cut extra table salt and processed papads.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. AHA/ACC Hypertension Clinical Practice Guidelines.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy is dedicated to empowering families with verified health knowledge.`
      }
    ]
  },

  {
    id: "thyroid-explained-simply",
    title: "Thyroid Explained Simply",
    subtitle: "A Complete Public Health Guide to Hypothyroidism, Hyperthyroidism, TSH Lab Reports, and Metabolism Care",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Thyroid Health",
    readTime: "20 min read",
    coverImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    tagline: "Understanding butterfly gland biology, TSH reports, selenium nutrition, and metabolic vitality.",
    description: "Demystify T3, T4, and TSH lab results, Hashimoto's thyroiditis, dietary iodine, and homoeopathic thyroid support.",
    isBestSeller: true,
    icon: "🦋",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Thyroid Explained Simply
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board`
      },
      {
        id: "what-is-the-condition",
        title: "What Is the Thyroid Gland?",
        content: `## The Body's Metabolic Engine

The thyroid is a butterfly-shaped endocrine gland located at the base of the neck. It secretes **T3 (Triiodothyronine)** and **T4 (Thyroxine)**, which control systemic metabolic speed.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Causes & Risk Factors",
        content: `## Root Causes

- **Hypothyroidism:** Underactive gland often caused by **Hashimoto's Thyroiditis** (autoimmune attack) or iodine deficiency.
- **Hyperthyroidism:** Overactive gland often caused by **Graves' Disease** or hyperfunctioning thyroid nodules.`
      },
      {
        id: "signs-and-symptoms",
        title: "Common Signs & Symptoms",
        content: `## Symptom Profile

- **Hypothyroidism:** Weight gain, cold intolerance, fatigue, dry skin, constipation, and hair loss.
- **Hyperthyroidism:** Unexplained weight loss, heat intolerance, rapid heart rate, tremors, and anxiety.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Diagnosis & Lab Tests",
        content: `## Lab Report Guide

| Parameter | Hypothyroidism | Hyperthyroidism | Optimal Target |
| :--- | :--- | :--- | :--- |
| **TSH** | Elevated (>4.5 µIU/mL) | Suppressed (<0.4 µIU/mL) | 1.0 - 2.5 µIU/mL |
| **Free T4** | Low | Elevated | 0.8 - 1.8 ng/dL |
| **Free T3** | Low | Elevated | 2.3 - 4.2 pg/mL |`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle & Self-Care",
        content: `## Daily Habits
Maintain stress management as cortisol inhibits T4 to T3 conversion.`
      },
      {
        id: "diet-and-nutrition",
        title: "Diet Tips",
        content: `## Thyroid Nutrition
- Consume selenium and zinc sources (Brazil nuts, pumpkin seeds).
- Cook goitrogenic vegetables (cabbage, broccoli) well before eating.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Movement
30 minutes of moderate aerobic exercise stimulates sluggish metabolism.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Myths Debunked
- **Myth:** High TSH means your thyroid is producing too much hormone.  
  *Fact:* TSH is released by the pituitary to demand MORE hormone when thyroid output is low.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## Red Flags
Seek medical attention for rapid irregular heartbeats, severe neck swelling, or difficulty swallowing.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: Should thyroid medication be taken on an empty stomach?**  
*A: Yes, thyroid supplements are absorbed best with water 30-60 minutes before breakfast.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Monitor TSH periodically.
2. Support selenium and zinc intake.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. American Thyroid Association Guidelines.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy is committed to evidence-based health education.`
      }
    ]
  },

  {
    id: "fatty-liver-handbook",
    title: "Fatty Liver Handbook",
    subtitle: "A Complete Public Health Guide to NAFLD, Liver Enzyme Tests, Reversing Hepatic Steatosis, and Detox Wellness",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Digestive Health",
    readTime: "20 min read",
    coverImage: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1200&q=80",
    tagline: "Reversing hepatic steatosis naturally through dietary resets, weight balance, and liver vitality.",
    description: "Understand Grade 1/2/3 fatty liver, SGOT/SGPT enzymes, fructose toxicity, and homoeopathic hepatic remedies.",
    isBestSeller: true,
    icon: "🍽️",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Fatty Liver Handbook
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board`
      },
      {
        id: "what-is-the-condition",
        title: "What Is Fatty Liver Disease?",
        content: `## Hepatic Steatosis Explained

Non-Alcoholic Fatty Liver Disease (NAFLD) occurs when excess fat (triglycerides) accumulates inside liver cells, exceeding 5% of total liver weight.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Causes & Risk Factors",
        content: `## Causes

- High intake of high-fructose corn syrup, refined sugar, trans fats, sedentary lifestyle, and insulin resistance.`
      },
      {
        id: "signs-and-symptoms",
        title: "Common Signs & Symptoms",
        content: `## Symptoms
NAFLD is usually asymptomatic in early stages. Users may feel mild right upper abdominal fullness and fatigue.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Diagnosis & Lab Tests",
        content: `## Diagnostic Parameters

| Test | Normal Range | Fatty Liver Finding |
| :--- | :--- | :--- |
| **USG Abdomen** | Normal echogenicity | Grade 1, 2, or 3 increased brightness |
| **SGOT (AST)** | <35 U/L | Mildly elevated |
| **SGPT (ALT)** | <45 U/L | Elevated (ALT > AST ratio) |`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle & Self-Care",
        content: `## Reversing Fatty Liver
Losing 7-10% of body weight completely mobilizes excess liver fat.`
      },
      {
        id: "diet-and-nutrition",
        title: "Diet Tips",
        content: `## Liver Resets
- Eliminate sugary sodas, packaged juices, and refined flour.
- Eat cruciferous vegetables (broccoli, cauliflower) and garlic.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Exercise
150 minutes weekly of aerobic exercise enhances hepatic lipid oxidation.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Myths
- **Myth:** Fatty liver only occurs in alcoholics.  
  *Fact:* NAFLD occurs in non-drinkers due to high fructose and carbs.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## Emergency Signs
Seek emergency care for jaundice (yellowing eyes), abdominal fluid swelling (ascites), or dark stool.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: Is Grade 1 Fatty Liver reversible?**  
*A: Yes! Grade 1 and 2 fatty liver are 100% reversible with dietary resets.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Stop added fructose and sodas.
2. Exercise 30 minutes daily.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. EASL-EASD-EASO Clinical Practice Guidelines for NAFLD.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy provides clear health education for families and students.`
      }
    ]
  },

  {
    id: "heart-attack-warning-signs",
    title: "Heart Attack: Warning Signs Everyone Should Know",
    subtitle: "A Complete Public Health Guide to Coronary Artery Care, Emergency Red Flags, CPR Basics, and Cardiac Safety",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Heart & Circulation",
    readTime: "18 min read",
    coverImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80",
    tagline: "Recognizing early cardiovascular signals to save lives through swift emergency action.",
    description: "Master typical and atypical heart attack symptoms (especially in women and diabetics), emergency protocols, and preventative heart habits.",
    isBestSeller: true,
    icon: "🫀",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Heart Attack: Warning Signs Everyone Should Know
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board`
      },
      {
        id: "what-is-the-condition",
        title: "What Is a Heart Attack?",
        content: `## Myocardial Infarction Explained

A heart attack occurs when blood supply to a portion of the heart muscle is acutely blocked by a blood clot inside a narrowed coronary artery.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Causes & Risk Factors",
        content: `## Risk Factors

Atherosclerosis, high cholesterol, hypertension, diabetes, smoking, obesity, and stress.`
      },
      {
        id: "signs-and-symptoms",
        title: "Classic & Atypical Symptoms",
        content: `## Warning Signals

- **Classic Signs:** Heavy central chest pressure, pain radiating to left arm, neck, or jaw, cold sweats.
- **Atypical Signs in Women & Diabetics:** Sudden shortness of breath, unusual fatigue, nausea, epigastric discomfort.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Emergency Diagnostics",
        content: `## Tests
- **ECG:** Detects ST-segment elevation.
- **Troponin I/T:** Cardiac enzymes confirming heart muscle injury.`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle & Prevention",
        content: `## Preventative Steps
Maintain tobacco-free living, control blood pressure, and practice stress balance.`
      },
      {
        id: "diet-and-nutrition",
        title: "Diet Tips",
        content: `## Heart-Healthy Eating
Eat Mediterranean diet staples: olive oil, walnuts, oats, berries, and vegetables.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Physical Activity
150 minutes weekly of moderate cardio strengthens heart muscle.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Myths
- **Myth:** Heart attacks always feel like a sharp crushing pain in the chest.  
  *Fact:* Many present with indigestion-like burning or severe fatigue.`
      },
      {
        id: "red-flags",
        title: "Emergency Response Protocol",
        content: `## What to Do Immediately
Call local emergency services (102 / 112) immediately. Do NOT drive yourself to the hospital.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: What is the golden hour in cardiac care?**  
*A: The first 60 minutes after symptom onset, where swift arterial unblocking saves maximum heart muscle.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Never ignore unexplained jaw, chest, or arm discomfort.
2. Keep emergency cardiac helpline numbers saved.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. WHO & American Heart Association Emergency Cardiac Care Guidelines.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy advocates public health literacy and life-saving awareness.`
      }
    ]
  },

  {
    id: "cbc-reports-simplified",
    title: "Understanding Common Blood Tests & CBC Reports Simplified",
    subtitle: "A Complete Public Health Guide to Hemoglobin, WBC Differential, Platelets, ESR, and Lab Chemistry",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Preventive Health",
    readTime: "22 min read",
    coverImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    tagline: "Empowering patients to read and interpret their laboratory blood test results with confidence.",
    description: "Decode Complete Blood Counts (CBC), anemia indices (MCV/MCH), white blood cell differentials, platelets, and ESR values.",
    isBestSeller: true,
    icon: "🛡️",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# CBC Reports & Blood Tests Simplified
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board`
      },
      {
        id: "what-is-the-condition",
        title: "What Is a Complete Blood Count (CBC)?",
        content: `## Decoding Your Blood Test

A Complete Blood Count (CBC) is the most common diagnostic blood test. It measures red cells, white cells, and platelets.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Red Cell Parameters (RBC & Hemoglobin)",
        content: `## Anemia & RBC Parameters

| Parameter | Normal Range | Low Indication | High Indication |
| :--- | :--- | :--- | :--- |
| **Hemoglobin** | M: 13.5-17.5 / F: 12-15.5 g/dL | Anemia | Polycythemia / Dehydration |
| **MCV** | 80 - 100 fL | Iron Deficiency | B12 / Folate Deficiency |
| **MCH** | 27 - 33 pg | Hypochromic Anemia | Macrocytic State |`
      },
      {
        id: "signs-and-symptoms",
        title: "White Blood Cells (WBC Differential)",
        content: `## Immune Army Cells

- **Neutrophils (40-70%):** Fight bacterial infections.
- **Lymphocytes (20-40%):** Fight viral infections.
- **Eosinophils (1-6%):** Elevated in allergies, asthma, and parasitic infections.
- **Monocytes & Basophils:** Chronic inflammation markers.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Platelets & Inflammatory Markers",
        content: `## Platelets & ESR

- **Platelet Count:** Normal 150,000 - 450,000 /µL. Low in dengue or viral fevers (Thrombocytopenia).
- **ESR (Erythrocyte Sedimentation Rate):** Marker of general systemic inflammation.`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle & Self-Care",
        content: `## Maintaining Healthy Blood Metrics
Ensure hydration before blood sampling to prevent falsely elevated cell concentrations.`
      },
      {
        id: "diet-and-nutrition",
        title: "Diet Tips",
        content: `## Blood-Building Foods
Iron-rich greens, vitamin C citrus, B12 foods, and beetroot.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Exercise
Regular physical activity supports bone marrow microcirculation.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Myths
- **Myth:** Slightly out-of-range lab numbers always indicate serious disease.  
  *Fact:* Lab reference ranges represent 95% of healthy populations; minor fluctuations are normal.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## Urgent Lab Findings
Seek urgent medical care for Platelets <50,000 or Hemoglobin <7.0 g/dL.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: Is fasting required for a standard CBC?**  
*A: No, standard CBC does not require fasting unless combined with lipid or sugar panels.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Always correlate lab numbers with clinical symptoms.
2. Keep past CBC reports for trend comparison.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. Clinical Laboratory Reference Standards & Pathology Manuals.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy clarifies medical diagnostic reports for public empowerment.`
      }
    ]
  },

  {
    id: "healthy-weight-loss-guide",
    title: "Healthy Weight Loss & Metabolic Optimization Guide",
    subtitle: "A Complete Public Health Guide to Caloric Balance, Muscle Retention, Hormonal Fat Loss, and Sustainable Diets",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Nutrition",
    readTime: "22 min read",
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    tagline: "Achieving sustainable fat loss while preserving lean muscle and metabolic rate.",
    description: "Learn metabolic rate factors, protein intake rules, intermittent fasting science, avoiding crash diets, and holistic weight management.",
    isBestSeller: true,
    icon: "🍎",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Healthy Weight Loss Guide
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board`
      },
      {
        id: "what-is-the-condition",
        title: "Understanding Fat Loss Science",
        content: `## Caloric Balance & Metabolism

Weight loss requires a sustainable energy deficit while maintaining adequate protein to preserve muscle mass.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Hormonal Drivers of Fat Storage",
        content: `## Hormonal Drivers

Insulin (fat storage hormone), Cortisol (stress fat storage), Thyroid hormones, and Leptin resistance.`
      },
      {
        id: "signs-and-symptoms",
        title: "Healthy vs Unhealthy Fat Loss",
        content: `## Signs of Success

Target losing 0.5 to 1.0 kg per week. Rapid loss (>2 kg/week) leads to muscle loss and gallstone risk.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Body Composition Metrics",
        content: `## Body Metrics

- **BMI:** Body Mass Index.
- **Waist-to-Hip Ratio:** Target <0.8 for women, <0.9 for men to evaluate visceral abdominal fat.`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "Lifestyle Habits",
        content: `## Sleep & Stress
Sleep deprivation raises ghrelin (hunger hormone) and triggers cravings.`
      },
      {
        id: "diet-and-nutrition",
        title: "Dietary Strategy",
        content: `## High-Protein High-Fiber Nutrition
Focus on whole foods, lentils, vegetables, protein sources, and fiber.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Strategy",
        content: `## Exercise
Combine progressive strength training 3x weekly with daily 10,000 steps.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Myths
- **Myth:** Skipping meals accelerates fat loss.  
  *Fact:* Skipping meals lowers metabolic rate and causes late-night bingeing.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## Red Flags
Seek medical review for sudden unexplained rapid weight loss without dieting.`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: Is intermittent fasting effective?**  
*A: Yes, a 12-14 hour overnight fast improves insulin sensitivity.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Prioritize protein and strength training.
2. Target gradual, long-term habit changes.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. WHO Obesity & Metabolic Health Guidelines.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy promotes evidence-informed metabolic health.`
      }
    ]
  },

  {
    id: "better-sleep-handbook",
    title: "Better Sleep Handbook & Circadian Rest Guide",
    subtitle: "A Complete Public Health Guide to Sleep Hygiene, Melatonin Biology, Insomnia Management, and Nighttime Rest",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Mental Wellness",
    readTime: "18 min read",
    coverImage: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80",
    tagline: "Unlocking restorative sleep through circadian alignment, melatonin care, and nocturnal relaxation.",
    description: "Understand sleep architecture, blue-light suppression, anxiety-induced insomnia, sleep hygiene protocols, and homoeopathic rest remedies.",
    isBestSeller: true,
    icon: "🧠",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Better Sleep Handbook
*Curiva Public Health Series — Your Trusted Health Education Library*

**Publisher:** Curiva Homoeopathy Editorial Board`
      },
      {
        id: "what-is-the-condition",
        title: "What Is Sleep & Sleep Architecture?",
        content: `## Sleep Cycles Explained

Sleep consists of 90-minute cycles transitioning through Light NREM, Deep Slow-Wave Rest, and REM (Dreaming) sleep.`
      },
      {
        id: "causes-and-risk-factors",
        title: "Causes of Sleep Disruption",
        content: `## Disruption Triggers

Blue light exposure from screens before bed, caffeine late in the day, stress, and irregular bedtime schedules.`
      },
      {
        id: "signs-and-symptoms",
        title: "Signs of Poor Sleep Quality",
        content: `## Symptoms
Taking >30 minutes to fall asleep, frequent night awakenings, morning fatigue, and brain fog.`
      },
      {
        id: "diagnosis-and-tests",
        title: "Evaluating Sleep Quality",
        content: `## Evaluation
Keep a 14-day sleep diary tracking bedtime, awakenings, and daytime alertness.`
      },
      {
        id: "lifestyle-and-selfcare",
        title: "10-Step Sleep Hygiene Protocol",
        content: `## Sleep Hygiene Rules
1. Keep the bedroom dark, quiet, and cool (18-21°C).
2. Stop screen use 60 minutes before bed.`
      },
      {
        id: "diet-and-nutrition",
        title: "Nutrition & Sleep",
        content: `## Sleep Foods
Warm chamomile tea, magnesium-rich almonds, and avoiding heavy meals within 3 hours of sleep.`
      },
      {
        id: "exercise-recommendations",
        title: "Exercise Recommendations",
        content: `## Movement
Regular morning exercise improves deep sleep duration.`
      },
      {
        id: "myths-vs-facts",
        title: "Myths vs Facts",
        content: `## Myths
- **Myth:** You can catch up on a week of lost sleep over the weekend.  
  *Fact:* Weekend catch-up sleep disrupts circadian rhythms and creates 'social jetlag'.`
      },
      {
        id: "red-flags",
        title: "When to Seek Medical Care",
        content: `## Red Flags
Consult a doctor for loud snoring accompanied by gasping or breathing pauses (Obstructive Sleep Apnea).`
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        content: `## FAQs
**Q: How many hours of sleep do adults need?**  
*A: Most adults require 7 to 8 hours of uninterrupted sleep per night.*`
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: `## Key Takeaways
1. Maintain consistent wake-up times every day.
2. Expose eyes to morning sunlight.`
      },
      {
        id: "references",
        title: "References",
        content: `## References
1. National Sleep Foundation Guidelines.`
      },
      {
        id: "about-curiva",
        title: "About Curiva Homoeopathy",
        content: `## About Curiva Homoeopathy
Curiva Homoeopathy promotes holistic lifestyle wellness.`
      }
    ]
  },

  // -------------------------------------------------------------
  // OTHER FULL PUBLIC HEALTH SERIES EBOOKS BY CATEGORY
  // -------------------------------------------------------------

  {
    id: "understanding-stroke-guide",
    title: "Stroke Awareness & Brain Protection Guide",
    subtitle: "A clear public guide to stroke warning signs, emergency action, hospital care, recovery, and prevention.",
    brand: "Curiva Homoeopathy",
    version: "3.0 (Public Health Edition)",
    category: "Heart & Circulation",
    readTime: "30 min read",
    coverImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    tagline: "Recognise stroke early. Act quickly. Protect brain health.",
    description: "Learn what a stroke is, how to recognise sudden warning signs, why every minute matters, and how risk factors can be managed with a healthcare team.",
    icon: "🫀",
    sections: [
      {
        id: "welcome-note",
        title: "Start Here: A Safety-First Guide",
        content: "# Stroke Awareness & Brain Protection Guide\n\nA stroke is a medical emergency. This guide explains warning signs in everyday language, what to do, what happens in hospital, and how people can reduce future risk.\n\n**Important:** This book cannot diagnose a stroke. If stroke is suspected, call emergency services immediately. Do not wait for symptoms to improve.\n\n**For readers in India:** The national emergency response number is **112**. If you are elsewhere, use your local emergency number."
      },
      {
        id: "what-is-stroke",
        title: "What Is a Stroke?",
        content: "## A simple explanation\n\nYour brain needs a steady supply of blood. Blood carries oxygen and nutrients that brain cells need to work. A stroke happens when part of the brain suddenly loses its normal blood supply or when a blood vessel breaks and bleeding occurs.\n\nBrain cells can be injured quickly. This is why a stroke must be treated as an emergency, even when the first symptom seems small.\n\n### Two main types\n\n- **Ischaemic stroke:** A blood clot or other blockage prevents blood from reaching part of the brain. This is the more common type.\n- **Haemorrhagic stroke:** A blood vessel breaks and blood leaks into or around the brain.\n\nA **transient ischaemic attack (TIA)** can cause stroke-like symptoms that disappear after a short time. It is not safe to ignore it. A TIA needs urgent medical assessment because it can be a warning of a future stroke.\n\nOnly a healthcare team using examination and brain imaging can identify the type. The correct treatment depends on that assessment."
      },
      {
        id: "be-fast",
        title: "Know the Warning Signs: BE-FAST",
        content: "## BE-FAST: a memory aid\n\nStroke symptoms often begin suddenly. Remember **BE-FAST**:\n\n- **B — Balance:** sudden loss of balance, dizziness, or difficulty walking.\n- **E — Eyes:** sudden loss or change of vision.\n- **F — Face:** one side of the face droops or looks uneven when smiling.\n- **A — Arms:** weakness or numbness in an arm or leg, especially on one side.\n- **S — Speech:** speech becomes slurred, strange, or difficult to understand; the person may struggle to understand you.\n- **T — Time:** time to call an ambulance immediately.\n\nOther possible warning signs include a sudden, unusually severe headache, sudden confusion, or loss of coordination.\n\n**You do not need to see every sign. One sudden warning sign is enough to act.** A quick face, arm, and speech check can help you notice a problem, but it must never delay the emergency call."
      },
      {
        id: "emergency-action",
        title: "What to Do If You Suspect a Stroke",
        content: "## Act first. Do not wait.\n\n1. Call 112 in India or your local emergency number. Request an ambulance and say that stroke is suspected.\n2. Note the time the symptoms started. If the person woke up with symptoms, note the last time they were known to be well.\n3. Keep the person safe and supported. Follow the emergency call-taker's instructions.\n4. Do not give food, drink, or tablets unless a clinician or emergency professional instructs you. Swallowing may be unsafe, and some treatments can be harmful for certain stroke types.\n5. Do not give aspirin on your own. A bleeding stroke must be ruled out first.\n6. Do not wait for symptoms to disappear and do not drive the person yourself when an ambulance is available.\n\nIf symptoms improve or disappear, still seek urgent assessment. A TIA can be an important warning."
      },
      {
        id: "hospital-care",
        title: "What Happens in Hospital?",
        content: "## Why scans and quick assessment matter\n\nThe hospital team checks breathing, circulation, blood glucose, blood pressure, the time symptoms began, medicines, and medical history. A brain scan such as CT or MRI helps the team understand whether bleeding or a blockage is present.\n\n### Treatment depends on the stroke type\n\nFor selected people with an ischaemic stroke, doctors may consider clot-busting medicine or a procedure to remove a clot. These treatments have strict time windows and medical eligibility rules. They are not suitable for everyone.\n\nA haemorrhagic stroke is managed differently. The team works to control the bleeding and pressure, manage the cause, and protect the brain.\n\nDo not compare one person's treatment with another's. Stroke care is individual and time-sensitive. The safest action for the public is early ambulance transport and clear information about the first symptom time."
      },
      {
        id: "recovery-and-rehabilitation",
        title: "Recovery, Rehabilitation, and Family Support",
        content: "## Recovery can take time\n\nAfter a stroke, a person may have difficulty moving, speaking, swallowing, remembering, seeing, or managing emotions. The pattern is different for each person.\n\nA rehabilitation team may include doctors, nurses, physiotherapists, occupational therapists, speech and language therapists, dietitians, and mental-health professionals.\n\n### How family members can help\n\n- Ask the care team what activities are safe at the current stage.\n- Use prescribed walking aids and home modifications.\n- Keep follow-up appointments and bring a current medicine list.\n- Allow the person time to communicate. Do not finish every sentence for them.\n- Watch for new stroke symptoms. New sudden symptoms are an emergency, not a routine rehabilitation issue.\n- Support the caregiver too. Rest, practical help, and emotional support matter.\n\nNever start an exercise programme or change medicines without the treating team’s guidance."
      },
      {
        id: "prevention-and-risk",
        title: "Reducing the Risk of Another Stroke",
        content: "## Risk factors that can be managed\n\nRisk can be affected by high blood pressure, diabetes, high cholesterol, smoking or tobacco use, some heart rhythm problems such as atrial fibrillation, physical inactivity, and an unhealthy diet. Age and family history may also affect risk, but they cannot be changed.\n\n### Useful steps to discuss with a clinician\n\n- Check blood pressure and follow the agreed treatment plan.\n- Review diabetes and cholesterol control at recommended visits.\n- Ask whether an irregular heartbeat needs assessment.\n- Stop tobacco use with support if needed.\n- Choose regular movement that is safe for your abilities.\n- Eat a varied diet with vegetables, fruit, pulses, and suitable whole grains; discuss salt intake if you have high blood pressure.\n- Take prescribed medicines as directed. Do not stop them because you feel well.\n\nA prevention plan should be personal. Supplements and home remedies are not substitutes for proven risk-reducing treatment."
      },
      {
        id: "sources",
        title: "Sources & Further Reading",
        content: "## Trusted public information\n\n- [World Health Organization — Stroke fact sheet](https://www.who.int/news-room/fact-sheets/detail/stroke)\n- [US Centers for Disease Control and Prevention — Stroke signs and symptoms](https://www.cdc.gov/stroke/signs-symptoms/index.html)\n- [Government of India — Emergency Response Support System (112)](https://112.gov.in/)\n\n**Editorial note:** This guide is general education, not a substitute for clinical assessment. Source pages and recommendations can change; check the linked organisations for the latest guidance."
      }
    ]
  }
  {
    id: "pCOS-and-women-menstrual-health",
    title: "Menstrual Health & Cycle Care Handbook",
    subtitle: "A reader-friendly guide to the menstrual cycle, period symptoms, hygiene, common conditions, and when to seek care.",
    brand: "Curiva Homoeopathy",
    version: "3.0 (Public Health Edition)",
    category: "Women's Health",
    readTime: "30 min read",
    coverImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    tagline: "Understand your cycle. Recognise changes. Ask for care without shame.",
    description: "Understand cycle changes, track symptoms, learn safer ways to manage discomfort, and recognise signs that need medical review.",
    icon: "👩",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome: Your Cycle Is Health Information",
        content: "# Menstrual Health & Cycle Care Handbook\n\nPeriods are a normal body process, but pain, heavy bleeding, or sudden changes should not be ignored. This guide explains the menstrual cycle in simple language and helps readers prepare for a respectful healthcare conversation.\n\nMenstrual experiences differ. Not every person has a 28-day cycle, and a period app cannot diagnose a condition. This book is for education, not individual diagnosis or treatment."
      },
      {
        id: "cycle-basics",
        title: "How the Menstrual Cycle Works",
        content: "## The cycle in simple words\n\nThe menstrual cycle is a series of hormone changes involving the brain, ovaries, and uterus (womb). The uterus builds a soft lining. If pregnancy does not occur, that lining is shed as menstrual bleeding.\n\nThe cycle is counted from the first day of one period to the first day of the next. For many adults, cycles around 21 to 35 days can be normal, and bleeding often lasts 2 to 7 days. Cycles can be less predictable during the first years after periods begin and around the transition to menopause.\n\n### Four broad phases\n\n1. **Menstruation:** the uterine lining leaves the body as bleeding.\n2. **Follicular phase:** hormones support the growth of an egg follicle and the uterine lining begins to build again.\n3. **Ovulation:** an ovary releases an egg. Timing varies and is not always day 14.\n4. **Luteal phase:** hormones prepare the uterine lining. If pregnancy does not occur, hormone levels fall and another period begins.\n\nThe cycle is not a clock. Stress, illness, sleep changes, weight change, medicines, and health conditions can affect timing."
      },
      {
        id: "tracking-your-cycle",
        title: "A Simple Way to Track Your Period",
        content: "## What to write down\n\nA small diary or calendar can help you describe a pattern to a clinician. You do not need an expensive app.\n\nRecord:\n- the first and last day of bleeding;\n- whether flow is light, moderate, or heavy;\n- how often you change pads, tampons, or other products;\n- pain level and whether pain affects sleep, school, or work;\n- bleeding between periods or after sex;\n- headaches, bowel symptoms, mood changes, or other symptoms;\n- medicines or contraception changes.\n\nA record is useful only if it feels safe to keep. On a shared device, consider privacy before saving sensitive cycle information to an app. A paper record may be preferable for some people."
      },
      {
        id: "period-pain-and-pms",
        title: "Cramps, PMS, and Everyday Comfort",
        content: "## Why cramps happen\n\nThe uterus tightens to help shed its lining. This can cause lower-abdominal cramps that may spread to the back or thighs. Some people also have headache, breast tenderness, bloating, tiredness, or mood changes before a period.\n\n### Low-risk comfort measures\n\n- Try gentle walking or stretching if it feels comfortable.\n- A warm bath or a wrapped heat pack may ease cramps.\n- Rest, regular meals, and hydration can support general wellbeing.\n- Track symptoms so you can explain what changes over time.\n\nSome over-the-counter pain medicines help some people, but they are not suitable for everyone. For example, anti-inflammatory medicines may be unsafe with certain stomach, kidney, heart, bleeding, pregnancy, or asthma-related situations. Ask a clinician or pharmacist what is suitable for you and follow the product label. Do not mix medicines or exceed label instructions."
      },
      {
        id: "heavy-or-irregular-periods",
        title: "Heavy, Irregular, or Missed Periods",
        content: "## What changes deserve attention?\n\nA period may be heavier or lighter than another person's. Consider a medical review if bleeding regularly disrupts normal activities, lasts longer than usual, or changes suddenly.\n\nExamples of heavy bleeding include needing to change a pad or tampon every 1 to 2 hours, needing two products at once, or passing large clots. Heavy bleeding can lead to iron deficiency or anaemia, which may cause tiredness, dizziness, or breathlessness.\n\nPeriods can be irregular during puberty, after pregnancy, with some contraceptives, and near menopause. Other causes can include PCOS, thyroid problems, fibroids, changes in weight, stress, or other medical conditions.\n\nA missed period can happen for many reasons, including pregnancy. If pregnancy is possible, consider a pregnancy test and seek advice about the result and next steps. A clinician may suggest blood tests, examination, or ultrasound depending on the history."
      },
      {
        id: "common-conditions",
        title: "Conditions That Can Affect Menstrual Health",
        content: "## Examples, not self-diagnoses\n\n- **PCOS:** a hormone-related condition that may involve irregular periods, acne, increased facial or body hair, and metabolic changes. Not everyone has the same features.\n- **Endometriosis:** tissue similar to the uterine lining grows outside the uterus. It can cause significant period pain, pelvic pain, pain during sex, or bowel and bladder symptoms.\n- **Fibroids:** non-cancerous growths in or around the uterus that may cause heavy bleeding, pressure, or pain.\n- **Thyroid disorders:** changes in thyroid hormone levels can affect menstrual patterns.\n- **Pregnancy-related bleeding:** bleeding during pregnancy should be assessed; pain with bleeding can need urgent evaluation.\n\nSymptoms overlap. A checklist or online article cannot tell which condition is present. A healthcare professional can evaluate the pattern and discuss tests and options."
      },
      {
        id: "hygiene-and-self-care",
        title: "Menstrual Hygiene and Everyday Care",
        content: "## Keeping comfortable and reducing irritation\n\nWash your hands before and after changing menstrual products. Follow the product instructions and change products at the recommended intervals. Wash reusable products as directed and allow them to dry fully. Store products in a clean, dry place.\n\nThe vagina cleans itself. Avoid internal vaginal washing or scented products that can irritate the skin. Clean the external genital area gently with water; use mild, unscented products only if they suit your skin.\n\nMenstruation is not dirty. A person can bathe, study, work, exercise, and take part in everyday activities during a period if they feel well enough. There is no single correct product: pads, tampons, menstrual cups, and period underwear each have practical considerations. Choose what is accessible, comfortable, and safe for you."
      },
      {
        id: "when-to-get-care",
        title: "When to Seek Medical Help",
        content: "## Arrange a healthcare review\n\nSeek a medical review if periods become much heavier, more painful, or irregular; if bleeding occurs between periods or after sex; if pelvic pain affects daily life; or if you have symptoms of anaemia such as persistent tiredness, dizziness, or breathlessness.\n\n**Seek urgent medical care** if you have severe or worsening pelvic pain, very heavy bleeding with faintness or weakness, or bleeding with possible pregnancy and abdominal/pelvic pain. Pregnancy outside the uterus (ectopic pregnancy) can be life-threatening.\n\nBleeding after menopause should always be checked by a healthcare professional.\n\nIf you feel faint, collapse, have severe pain, or think you may be in immediate danger, use your local emergency service."
      },
      {
        id: "sources",
        title: "Sources & Further Reading",
        content: "## Trusted public information\n\n- [NHS — Periods and cycle overview](https://www.nhs.uk/conditions/periods/)\n- [NHS — Period problems and heavy bleeding](https://www.nhs.uk/conditions/periods/period-problems/)\n- [NHS — Period pain](https://www.nhs.uk/symptoms/period-pain/)\n- [NHS — Bleeding between periods or after sex](https://www.nhs.uk/symptoms/vaginal-bleeding-between-periods-or-after-sex/)\n\nThis guide does not replace assessment. If you have a concern, take your symptom notes to a qualified healthcare professional."
      }
    ]
  }
  {
    id: "childhood-fever-guide",
    title: "Childhood Fever & Immunity Handbook",
    subtitle: "A safety-first guide for parents and carers about measuring fever, comfort, hydration, and warning signs.",
    brand: "Curiva Homoeopathy",
    version: "3.0 (Public Health Edition)",
    category: "Child Health",
    readTime: "30 min read",
    coverImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
    tagline: "Calm, clear steps for caring for a child with fever.",
    description: "Learn how to measure a child's temperature, support comfort and fluids, avoid common medicine mistakes, and recognise when a child needs urgent help.",
    icon: "👶",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome: Fever Needs Context",
        content: "# Childhood Fever & Immunity Handbook\n\nA fever is common in children and often happens when the body responds to an infection. The number on a thermometer is only one part of the picture. A child's age, breathing, alertness, drinking, urine output, and other symptoms matter too.\n\nThis guide is for parents and carers. It does not diagnose the cause of fever or replace advice from a paediatrician. Babies and children can become unwell quickly; trust your concern and seek help when needed."
      },
      {
        id: "fever-basics",
        title: "What Is a Fever?",
        content: "## Understanding temperature\n\nA temperature of **38°C or higher** is commonly used as a fever threshold in children. A digital thermometer is more reliable than judging temperature by touch alone.\n\nTo measure, follow the thermometer instructions. For a young child, an underarm digital reading is commonly used in public guidance. Record the number, the time, and how the child is behaving.\n\nA fever is a sign, not a diagnosis. Viral infections are common causes, but bacterial infections and other conditions can also cause fever. A fever after vaccination can occur, but serious symptoms still need assessment."
      },
      {
        id: "home-care",
        title: "Comfort, Fluids, and Home Observation",
        content: "## What carers can do\n\n- Offer fluids often. Continue breastfeeding for babies who breastfeed.\n- Offer normal food if the child wants it; do not force meals.\n- Let the child rest and keep the room comfortably ventilated.\n- Dress the child comfortably. Avoid wrapping in too many layers.\n- Check the child regularly, including during the night.\n- Watch for wet nappies or urination, tears, mouth moisture, alertness, and breathing.\n- Keep a note of temperature, symptoms, fluids, and medicines already given.\n\nDo not use cold baths or alcohol rubs. Tepid sponging is not recommended in the cited NHS guidance. The goal is to keep the child comfortable and notice worsening illness, not to force the temperature to a normal number."
      },
      {
        id: "medicine-safety",
        title: "Fever Medicines: Avoid Common Mistakes",
        content: "## Ask before giving a medicine\n\nParacetamol or ibuprofen may be considered for a child who is distressed or uncomfortable, but the correct product and amount depend on the child's age, weight, medical history, and formulation. Read the exact product leaflet and ask a pharmacist or doctor if unsure.\n\nImportant safety points:\n- Do not give aspirin to a child under 16 unless a specialist has specifically prescribed it.\n- Do not give paracetamol to a baby under 2 months.\n- Ibuprofen is not suitable for every child; age, weight, dehydration, chickenpox, asthma, and other health factors matter.\n- Do not alternate paracetamol and ibuprofen unless a healthcare professional tells you to.\n- Check combination cough/cold products so the same ingredient is not given twice.\n- Never use an adult dose or a kitchen spoon to measure liquid medicine.\n\nThis guide intentionally does not provide a dosing table. Use the child's own product label and professional advice."
      },
      {
        id: "urgent-age-signs",
        title: "Age-Based Warning Signs",
        content: "## Babies need extra caution\n\nSeek urgent medical assessment if:\n- a baby under **3 months** has a temperature of **38°C or higher**;\n- a baby aged **3 to 6 months** has a temperature of **39°C or higher**;\n- a fever lasts 5 days or more;\n- the child is becoming less responsive, is not drinking, or you are worried.\n\nThese thresholds are examples from NHS public guidance; local clinical advice may differ. A child who looks seriously unwell needs help regardless of the exact temperature.\n\nSigns of dehydration can include much less urine or fewer wet nappies, dry mouth, sunken eyes, and no tears when crying. Seek medical advice promptly if these appear."
      },
      {
        id: "emergency-red-flags",
        title: "Emergency Signs: Get Help Now",
        content: "## Do not wait if you notice these signs\n\nGet immediate emergency help if a child:\n- struggles to breathe, breathes very fast, grunts, or has the chest pulling in with each breath;\n- is blue, grey, very pale, or unusually blotchy;\n- is difficult to wake, confused, floppy, or not responding normally;\n- has a seizure, especially a first seizure;\n- has a stiff neck or a rash that does not fade when pressed with a clear glass;\n- has a very weak or continuous high-pitched cry;\n- cannot keep fluids down or shows severe dehydration.\n\nCall **112 in India** or your local emergency number if the child appears to be in immediate danger. Follow the emergency call-taker's instructions. Do not delay to search online."
      },
      {
        id: "febrile-seizure",
        title: "What About a Fever-Related Seizure?",
        content: "## A seizure can be frightening\n\nA fever-related seizure can happen in some young children. During a seizure, move dangerous objects away, protect the child's head, and note how long it lasts. Do not restrain the child and do not put anything in the mouth.\n\nAfter the movements stop, follow emergency advice. A first seizure, a seizure lasting longer than expected, breathing difficulty, injury, or failure to recover normally needs urgent assessment. Do not assume every seizure is caused by fever.\n\nA clinician should assess the child and explain what to watch for next time."
      },
      {
        id: "sources",
        title: "Sources & Further Reading",
        content: "## Trusted public information\n\n- [NHS — High temperature (fever) in children](https://www.nhs.uk/symptoms/fever-in-children/)\n- [NHS — Urgent medical help for babies and children under 5](https://www.nhs.uk/baby/health/when-to-get-urgent-medical-help-for-babies-and-children-under-5/)\n- [Government of India — Emergency Response Support System (112)](https://112.gov.in/)\n\nChildren's guidance differs by age and country. Follow your child's clinician and local emergency service when their advice differs from this general guide."
      }
    ]
  }
  {
    id: "asthma-and-allergy-survival-guide",
    title: "Asthma & Allergy Survival Guide",
    subtitle: "A practical guide to asthma symptoms, inhalers, action plans, allergy triggers, and emergency warning signs.",
    brand: "Curiva Homoeopathy",
    version: "3.0 (Public Health Edition)",
    category: "Respiratory Health",
    readTime: "32 min read",
    coverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    tagline: "Understand symptoms. Use your agreed action plan. Know when breathing trouble is an emergency.",
    description: "Understand how asthma affects the airways, how to use a clinician-approved action plan, and how to recognise a severe asthma or allergic emergency.",
    icon: "🫁",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome: Breathing Safety Comes First",
        content: "# Asthma & Allergy Survival Guide\n\nAsthma and allergies can affect daily life, sleep, school, work, and exercise. Many people manage them well with a clear diagnosis, the right treatment plan, and knowledge of warning signs.\n\n**Emergency reminder:** Severe breathing difficulty is an emergency. Do not wait for a website, an inhaler search, or a home remedy to make the decision for you. Use your local emergency service."
      },
      {
        id: "asthma-basics",
        title: "What Is Asthma?",
        content: "## What happens inside the airways?\n\nThe airways are tubes that carry air into and out of the lungs. In asthma, the airways can become inflamed and extra-sensitive. The muscles around them may tighten, the lining can swell, and mucus may increase. This makes it harder for air to move.\n\nSymptoms can include wheezing, cough, chest tightness, and shortness of breath. Symptoms may come and go. Some people notice them at night, during exercise, after an infection, or around specific triggers.\n\nAsthma symptoms have other possible causes. A clinician assesses the pattern and may use breathing tests before confirming a diagnosis."
      },
      {
        id: "triggers-and-patterns",
        title: "Triggers and Symptom Patterns",
        content: "## Common triggers\n\nTriggers vary from person to person. Examples include tobacco smoke, air pollution, dust, mould, pollen, animal allergens, respiratory infections, cold air, and some workplace exposures.\n\nA trigger diary can help identify patterns. Record when symptoms happen, where you were, possible exposures, activity, and what helped. Do not deliberately expose yourself to a suspected allergen to test it.\n\nAvoiding smoke and reducing known exposures may help, but trigger avoidance alone is not a replacement for prescribed asthma treatment."
      },
      {
        id: "inhalers-and-action-plan",
        title: "Inhalers and Your Written Action Plan",
        content: "## Different inhalers can have different jobs\n\nSome inhalers are used to prevent symptoms over time. Others are used for quick relief, and some prescribed inhalers may have both roles. The colour of an inhaler is not a safe way to identify its purpose because products and plans differ.\n\nAsk your clinician or pharmacist to:\n- explain the name and purpose of each inhaler;\n- demonstrate the correct technique and check you doing it;\n- explain whether a spacer is recommended;\n- write down what to do when symptoms worsen;\n- explain when to call for urgent or emergency help.\n\nCarry your prescribed reliever if your action plan says to. Do not stop a preventer or change doses because symptoms have improved without speaking to the prescriber."
      },
      {
        id: "during-an-asthma-attack",
        title: "What to Do During an Asthma Attack",
        content: "## Follow the person's own action plan\n\nIf symptoms suddenly worsen, stop the activity and sit upright. Use the prescribed reliever exactly as stated in the person's written asthma action plan or as directed by an emergency professional.\n\nGet emergency help if breathing is very difficult, symptoms are getting worse, the person cannot speak in full sentences, becomes drowsy or confused, looks blue or grey, or is not improving as the action plan says. In India call 112; elsewhere use the local emergency number.\n\nDo not leave a severely breathless person alone. Do not make them lie flat, and do not delay an emergency call to search for a home treatment."
      },
      {
        id: "allergy-and-anaphylaxis",
        title: "Allergies and Anaphylaxis",
        content: "## Allergy is not always a minor reaction\n\nAn allergy is an immune reaction to a substance that is usually harmless to most people. It can cause sneezing, itchy eyes, hives, swelling, or stomach symptoms.\n\n**Anaphylaxis** is a severe, potentially life-threatening allergic reaction. Warning signs can include sudden swelling of the tongue or throat, difficulty breathing, wheeze, faintness or collapse, or rapidly worsening symptoms affecting more than one body system.\n\nIf the person has been prescribed an adrenaline auto-injector, use it according to their emergency plan and the product instructions, then call emergency services. Do not wait to see whether the reaction settles. Follow the emergency call-taker's instructions."
      },
      {
        id: "prevention-and-follow-up",
        title: "Prevention, Review, and Everyday Life",
        content: "## Make a plan before symptoms get worse\n\n- Keep regular review appointments, even when symptoms feel controlled.\n- Check inhaler technique and expiry dates.\n- Know the person's written action plan and share it with school, work, or carers when appropriate.\n- Avoid tobacco smoke and known triggers where practical.\n- Ask about vaccinations and infection prevention according to age and medical history.\n- Seek review if symptoms wake you at night, limit activity, or require reliever use more often than the plan expects.\n\nA peak-flow meter may be part of a clinician-designed plan for some people; not everyone needs one. Do not use a reading alone to decide whether a severe attack is safe."
      },
      {
        id: "sources",
        title: "Sources & Further Reading",
        content: "## Trusted public information\n\n- [NHS — Asthma](https://www.nhs.uk/conditions/asthma/)\n- [NHS — Anaphylaxis](https://www.nhs.uk/conditions/anaphylaxis/)\n- [Global Initiative for Asthma — Strategy reports and patient resources](https://ginasthma.org/)\n\nTreatment plans are individual. Follow the most recent plan prepared by your healthcare team."
      }
    ]
  }
  {
    id: "acidity-and-gerd-handbook",
    title: "Acidity, GERD & Digestive Relief Handbook",
    subtitle: "A plain-language guide to heartburn, acid reflux, common triggers, self-care boundaries, and warning signs.",
    brand: "Curiva Homoeopathy",
    version: "3.0 (Public Health Edition)",
    category: "Digestive Health",
    readTime: "30 min read",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    tagline: "Understand reflux, make practical changes, and recognise symptoms that should not be ignored.",
    description: "Understand why reflux happens, which everyday habits may help, and when chest or digestive symptoms need medical assessment.",
    icon: "🍽️",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome: Not Every Chest Symptom Is Acidity",
        content: "# Acidity, GERD & Digestive Relief Handbook\n\nHeartburn is common, but repeated reflux can affect sleep and quality of life. This guide explains the basics, practical steps, and when medical help is important.\n\n**Safety first:** New, severe, or unexplained chest pain should not automatically be labelled acidity. Heart and lung problems can also cause chest discomfort. If you have chest pressure or pain with breathlessness, sweating, faintness, or pain spreading to the arm, jaw, back, or neck, call emergency services."
      },
      {
        id: "reflux-basics",
        title: "What Are Heartburn, Reflux, and GERD?",
        content: "## A simple explanation\n\nThe oesophagus is the tube that carries food from the mouth to the stomach. A ring of muscle near the lower end helps keep stomach contents from flowing backwards.\n\nAcid reflux happens when stomach contents move back into the oesophagus. It may cause a burning feeling behind the breastbone or a sour taste in the mouth. If reflux keeps happening and causes troublesome symptoms or complications, it may be called gastro-oesophageal reflux disease (GERD or GORD).\n\nOccasional heartburn does not always mean a person has GERD. Symptoms, frequency, risk factors, and other warning signs guide assessment."
      },
      {
        id: "symptoms-and-triggers",
        title: "Symptoms and Common Triggers",
        content: "## What can reflux feel like?\n\nCommon symptoms include a burning feeling in the chest after meals, sour or bitter fluid coming up into the mouth, or symptoms that worsen when bending or lying down. Some people report cough, hoarse voice, nausea, or bloating, but these symptoms can have other causes too.\n\nPossible triggers include large meals, eating close to bedtime, smoking, excess body weight, pregnancy, alcohol, and particular foods or drinks. Not everyone reacts to the same foods. A brief symptom diary can help you notice your own pattern without unnecessarily restricting many foods."
      },
      {
        id: "practical-self-care",
        title: "Everyday Steps That May Help",
        content: "## Start with manageable changes\n\n- Try smaller meals if large meals trigger symptoms.\n- Avoid lying down for about 3 to 4 hours after eating if night reflux is a problem.\n- If symptoms happen at night, ask a clinician or pharmacist whether raising the head end of the bed is appropriate.\n- If you smoke, seek support to stop.\n- If weight is contributing to symptoms, discuss a sustainable plan without crash diets.\n- Notice your own food triggers; do not remove whole food groups without a reason.\n- Wear comfortable clothing that does not press tightly on the abdomen.\n\nThese steps may reduce symptoms for some people, but persistent symptoms still deserve medical review."
      },
      {
        id: "medicines-and-tests",
        title: "Medicines and Medical Assessment",
        content: "## What a clinician may discuss\n\nA pharmacist or doctor can review symptoms, medicines, pregnancy status, and other health conditions. Depending on the situation, they may discuss antacids, alginates, acid-reducing medicines, or tests.\n\nDo not use over-the-counter medicines continuously for long periods without advice. Some medicines can interact with other prescriptions, and some symptoms need investigation rather than repeated symptom relief.\n\nDo not stop a prescribed medicine that may be contributing to reflux without discussing an alternative with the prescriber."
      },
      {
        id: "red-flags",
        title: "Warning Signs: When to Seek Care",
        content: "## Arrange prompt medical review\n\nSeek a medical review if heartburn happens most days, does not improve with suitable self-care, or is accompanied by repeated vomiting, unexplained weight loss, or food sticking when you swallow.\n\nBlood in vomit, black tar-like stools, fainting, or severe weakness needs urgent medical assessment.\n\n**Call emergency services** for new or severe chest pressure/pain, especially with breathlessness, sweating, faintness, nausea, or pain spreading to the arm, jaw, back, or neck. Do not try to diagnose this as reflux yourself."
      },
      {
        id: "sources",
        title: "Sources & Further Reading",
        content: "## Trusted public information\n\n- [NHS — Heartburn and acid reflux](https://www.nhs.uk/conditions/heartburn-and-acid-reflux/)\n- [National Institute of Diabetes and Digestive and Kidney Diseases — GER and GERD in adults](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults)\n\nThese resources provide general information. A clinician can help assess persistent, severe, or unusual symptoms."
      }
    ]
  }
  {
    id: "arthritis-and-joint-care-guide",
    title: "Arthritis & Joint Care Handbook",
    subtitle: "An easy guide to joint structure, osteoarthritis, inflammatory arthritis, movement, and medical care.",
    brand: "Curiva Homoeopathy",
    version: "3.0 (Public Health Edition)",
    category: "Bone & Joint Health",
    readTime: "32 min read",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    tagline: "Understand joint pain and protect movement with an informed care plan.",
    description: "Learn why joints become painful, how osteoarthritis differs from rheumatoid arthritis, and which signs need early or urgent assessment.",
    icon: "🦴",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome: Joint Pain Has More Than One Cause",
        content: "# Arthritis & Joint Care Handbook\n\nJoint pain can make walking, writing, climbing stairs, or sleeping difficult. The word arthritis covers many conditions. The right care depends on the cause, the affected joints, and the person's overall health.\n\nThis guide explains common patterns in everyday language. It does not diagnose arthritis or recommend an individual treatment."
      },
      {
        id: "joint-basics",
        title: "How a Healthy Joint Works",
        content: "## The parts of a joint\n\nA joint is where two or more bones meet. Smooth cartilage covers the ends of many bones and helps them glide. A joint lining makes fluid that lubricates movement. Muscles, tendons, ligaments, and surrounding tissues help support the joint.\n\nPain can come from cartilage, joint lining, tendons, muscles, nerves, or nearby structures. Swelling or stiffness should not automatically be called wear and tear."
      },
      {
        id: "osteoarthritis-vs-inflammatory",
        title: "Osteoarthritis and Rheumatoid Arthritis",
        content: "## Two different examples\n\n**Osteoarthritis (OA)** involves changes in the whole joint, including cartilage, bone, and surrounding tissues. Pain may worsen with activity and stiffness often appears after rest. It can affect knees, hips, hands, and other joints.\n\n**Rheumatoid arthritis (RA)** is an autoimmune inflammatory condition. The immune system mistakenly attacks the joint lining. It can cause swelling, warmth, pain, and morning stiffness, often in several joints. It may also affect parts of the body beyond joints.\n\nOther conditions such as gout, infection, injury, and other autoimmune diseases can also cause joint symptoms. Only assessment can identify the cause."
      },
      {
        id: "assessment-and-red-flags",
        title: "When Joint Symptoms Need Assessment",
        content: "## Arrange a clinical review\n\nGet assessed if joint pain is persistent, swelling keeps returning, morning stiffness lasts a long time, several joints are affected, or pain is limiting everyday life. Early assessment matters when inflammatory arthritis is possible because timely treatment can reduce damage.\n\n**Urgent warning:** A joint that becomes suddenly very painful, hot, red, or swollen—especially with fever or feeling very unwell—may be infected. Seek urgent medical care. Do not wait for a routine appointment or try to treat it at home."
      },
      {
        id: "movement-and-daily-care",
        title: "Movement, Exercise, and Daily Activities",
        content: "## Gentle, regular movement\n\nFor many people with osteoarthritis, suitable strengthening and aerobic exercise can improve pain and function. A physiotherapist can help choose movements that match ability, balance, and other conditions.\n\n- Start with manageable activity and build gradually.\n- Warm up and use comfortable footwear.\n- Break long tasks into smaller parts.\n- Use handrails or appropriate walking aids if recommended.\n- Balance activity with rest; complete inactivity can make stiffness and strength worse.\n- Ask for help modifying work, school, or home tasks when needed.\n\nIf exercise causes severe or unusual pain, swelling, chest symptoms, or breathlessness, stop and seek appropriate advice."
      },
      {
        id: "medical-treatment",
        title: "Treatment and Medicines: What to Discuss",
        content: "## Treatment depends on the diagnosis\n\nTreatment may include education, supervised exercise, physiotherapy, weight support when relevant, aids for daily tasks, and medicines selected for the individual. Rheumatoid arthritis often needs disease-modifying treatment from a specialist; pain relief alone does not control the underlying inflammation.\n\nMedicines such as anti-inflammatory painkillers can cause stomach, kidney, heart, blood pressure, or bleeding problems in some people. Do not start, combine, or use them for long periods without checking whether they are safe for you.\n\nDo not stop prescribed arthritis or steroid treatment suddenly without medical advice. Supplements, topical products, and complementary therapies should be discussed with a clinician and should not replace effective treatment."
      },
      {
        id: "living-well",
        title: "Living Well With a Long-Term Joint Condition",
        content: "## A practical support plan\n\n- Keep a list of affected joints, symptoms, swelling, and morning stiffness.\n- Attend review appointments and bring your medicine list.\n- Ask about vaccinations and infection risk if you take immune-suppressing treatment.\n- Seek support for sleep, mood, work, and daily activities.\n- Set realistic movement goals and review them when symptoms change.\n\nLiving well is not about ignoring pain. It is about finding a safe, sustainable plan with the right team."
      },
      {
        id: "sources",
        title: "Sources & Further Reading",
        content: "## Trusted public information\n\n- [NICE — Osteoarthritis in over 16s: diagnosis and management](https://www.nice.org.uk/guidance/ng226)\n- [NICE — Rheumatoid arthritis in adults: management](https://www.nice.org.uk/guidance/ng100)\n- [NHS — Osteoarthritis](https://www.nhs.uk/conditions/osteoarthritis/)\n\nGuidelines may be updated. Ask your healthcare team about the current recommendations for your diagnosis."
      }
    ]
  }
  {
    id: "stress-and-anxiety-self-help",
    title: "Understanding Stress & Anxiety Self-Help Guide",
    subtitle: "A compassionate, practical guide to stress, anxiety, grounding, daily routines, and getting professional support.",
    brand: "Curiva Homoeopathy",
    version: "3.0 (Public Health Edition)",
    category: "Mental Wellness",
    readTime: "30 min read",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    tagline: "Small practical steps, supportive relationships, and timely care.",
    description: "Understand the body's stress response, learn simple coping skills, and recognise when professional or urgent mental-health support is needed.",
    icon: "🧠",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome: You Do Not Have to Manage Alone",
        content: "# Understanding Stress & Anxiety Self-Help Guide\n\nStress and anxiety are common human experiences. They can affect sleep, concentration, appetite, relationships, and the body. Support is available, and asking for help is a strength.\n\nThis guide offers general coping ideas. It is not a diagnosis, psychotherapy, or an emergency service. If you feel unsafe or may harm yourself or someone else, seek immediate help from a trusted person and emergency services."
      },
      {
        id: "stress-and-anxiety",
        title: "What Are Stress and Anxiety?",
        content: "## Similar feelings, different meanings\n\n**Stress** is a response to pressure or a demand. A short-lived stress response can help a person act, but ongoing pressure can become exhausting.\n\n**Anxiety** involves worry, fear, or anticipation of danger. It can continue even when the immediate threat is not clear. Anxiety disorders are health conditions that may need professional treatment.\n\nPossible signs include racing thoughts, restlessness, irritability, poor concentration, muscle tension, stomach discomfort, a racing heart, and sleep changes. These symptoms can also have physical causes, so new or severe symptoms should not automatically be labelled anxiety."
      },
      {
        id: "body-response",
        title: "How the Body Responds to Stress",
        content: "## The alarm system\n\nWhen the brain senses a challenge or threat, it can activate the body's alarm response. Heart rate and breathing may increase, muscles tense, and attention narrows. This can be useful in a short emergency.\n\nIf pressure continues, a person may feel tired, irritable, distracted, or unable to relax. There is no single hormone test that can explain every person's stress. Avoid products or online claims that promise to reset or detoxify cortisol.\n\nThe aim is not to remove every stressful event. It is to build ways to respond, recover, and get support when the load becomes too heavy."
      },
      {
        id: "quick-grounding",
        title: "Grounding and Calming Skills",
        content: "## A gentle exercise you can try\n\nGrounding brings attention back to the present moment. Try this slowly:\n1. Put both feet on the floor if comfortable.\n2. Notice five things you can see.\n3. Notice four things you can feel, such as your feet on the floor.\n4. Notice three things you can hear.\n5. Take a comfortable, unforced breath and name one thing you can do next.\n\nYou do not have to force deep breathing. If focusing on breathing makes you feel worse, open your eyes, look around, and focus on an ordinary object or a conversation with someone you trust.\n\nThese exercises may help some people manage a difficult moment. They are not a substitute for treatment when anxiety or depression is persistent or severe."
      },
      {
        id: "daily-routines",
        title: "Daily Habits That Support Wellbeing",
        content: "## Small steps are more realistic than a perfect routine\n\n- Keep a regular wake-up time when possible.\n- Eat regular meals and drink enough water.\n- Include enjoyable movement that fits your health and ability.\n- Make time for daylight, rest, and activities that matter to you.\n- Keep contact with supportive people.\n- Limit news or social-media exposure if it increases distress.\n- Reduce caffeine if it makes anxiety or sleep worse.\n- Break large tasks into smaller steps and allow recovery time.\n\nSelf-care is not a test. If a habit is not possible today, begin again when you can. Avoid blaming yourself for symptoms that need care."
      },
      {
        id: "professional-help",
        title: "When Professional Help Can Make a Difference",
        content: "## You can ask for help early\n\nSpeak with a healthcare professional if worry, panic, low mood, poor sleep, or physical symptoms are persistent, worsening, or affecting study, work, relationships, or daily tasks.\n\nSupport may include a medical assessment, talking therapies such as cognitive behavioural therapy (CBT), practical social support, or medication when appropriate. Treatment is individual. A clinician can also check whether a physical condition or medicine is contributing to symptoms.\n\nIf you start medication, take it as prescribed and discuss concerns or side effects with the prescriber. Do not stop psychiatric medicines suddenly without advice."
      },
      {
        id: "urgent-mental-health",
        title: "Urgent Mental-Health Warning Signs",
        content: "## Take immediate safety concerns seriously\n\nGet urgent professional help if distress is escalating, you cannot care for basic needs, panic or agitation feels unmanageable, or you are using alcohol or drugs in a way that puts you at risk.\n\nIf you think you may harm yourself or another person, have taken an overdose, or cannot stay safe:\n- tell a trusted person and do not stay alone if possible;\n- move away from medicines, weapons, or other items that could be used for harm, with help from another person;\n- call **112 in India** or your local emergency number, or go to the nearest emergency department.\n\nYou deserve timely, compassionate help. Do not rely on an online article or AI tool during a crisis."
      },
      {
        id: "sources",
        title: "Sources & Further Reading",
        content: "## Trusted public information\n\n- [World Health Organization — Stress: questions and answers](https://www.who.int/news-room/questions-and-answers/item/stress)\n- [WHO — Mental well-being resources for the public](https://www.who.int/news-room/feature-stories/mental-well-being-resources-for-the-public/)\n- [NHS — Get help with stress](https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/stress/)\n- [NHS — Get help with anxiety, fear or panic](https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anxiety-fear-panic/)\n- [Government of India — Emergency Response Support System (112)](https://112.gov.in/)\n\nThis publication cannot provide diagnosis, counselling, or crisis response."
      }
    ]
  },
];
