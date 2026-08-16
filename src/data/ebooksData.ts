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
    subtitle: "A Public Health Guide to Recognizing Stroke Symptoms, Ischemic Risk, Prevention, and Emergency Protocols",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Heart & Circulation",
    readTime: "18 min read",
    coverImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    tagline: "BE-FAST stroke recognition and brain vascular health.",
    description: "Understand stroke types (ischemic vs hemorrhagic), BE-FAST warning acronym, emergency protocols, and vascular care.",
    icon: "🫀",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Stroke Awareness Guide
*Curiva Public Health Series*`
      },
      {
        id: "what-is-stroke",
        title: "What Is a Stroke?",
        content: `## Brain Vascular Accidents

A stroke occurs when blood flow to part of the brain is interrupted, depriving brain tissue of oxygen.`
      },
      {
        id: "be-fast",
        title: "BE-FAST Warning Signals",
        content: `## The BE-FAST Acronym
- **B:** Balance loss
- **E:** Eyesight changes
- **F:** Facial drooping
- **A:** Arm weakness
- **S:** Speech difficulty
- **T:** Time to call 102/112 emergency immediately!`
      }
    ]
  },

  {
    id: "pCOS-and-women-menstrual-health",
    title: "Menstrual Health & Cycle Care Handbook",
    subtitle: "A Complete Public Health Guide to Menstrual Physiology, Pain Management, Iron Balance, and Hygiene",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Women's Health",
    readTime: "20 min read",
    coverImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    tagline: "Nourishing women's cycle health through physiological awareness and compassionate care.",
    description: "Explore the 4 cycle phases, dysmenorrhea relief, PMS management, iron replacement, and holistic women's care.",
    icon: "👩",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Menstrual Health Handbook
*Curiva Public Health Series*`
      },
      {
        id: "cycle-phases",
        title: "The 4 Cycle Phases",
        content: `## Cycle Physiology
1. Menstrual Phase
2. Follicular Phase
3. Ovulatory Phase
4. Luteal Phase`
      }
    ]
  },

  {
    id: "childhood-fever-guide",
    title: "Childhood Fever & Immunity Handbook",
    subtitle: "A Gentle Public Health Guide to Pediatric Fever Management, Hydration, Warning Signs, and Child Care",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Child Health",
    readTime: "18 min read",
    coverImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
    tagline: "Compassionate, safe guidance for parents managing pediatric fever and building strong immunity.",
    description: "Understand child fever mechanisms, tepid sponging rules, hydration, febrile seizure awareness, and red flag warnings.",
    icon: "👶",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Childhood Fever Guide
*Curiva Public Health Series*`
      },
      {
        id: "fever-basics",
        title: "Understanding Pediatric Fever",
        content: `## Fever Is an Immune Response

Fever is the immune system's physiological weapon against viruses and bacteria, not a disease itself.`
      }
    ]
  },

  {
    id: "asthma-and-allergy-survival-guide",
    title: "Asthma & Allergy Survival Guide",
    subtitle: "A Complete Public Health Guide to Airway Reactivity, Trigger Control, Inhaler Safety, and Breath Health",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Respiratory Health",
    readTime: "20 min read",
    coverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    tagline: "Breathe freely through trigger identification, peak flow checks, and respiratory vitality.",
    description: "Understand bronchial hypersensitivity, allergy triggers, peak flow monitoring, emergency asthma action plans, and homoeopathic respiratory support.",
    icon: "🫁",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Asthma & Allergy Survival Guide
*Curiva Public Health Series*`
      },
      {
        id: "asthma-basics",
        title: "What Is Asthma?",
        content: `## Airway Hyper-responsiveness

Asthma involves chronic airway inflammation, bronchospasm, and mucus hypersecretion.`
      }
    ]
  },

  {
    id: "acidity-and-gerd-handbook",
    title: "Acidity, GERD & Digestive Relief Handbook",
    subtitle: "A Public Health Guide to Gastric Acid Physiology, Heartburn Relief, Diet Resets, and Gut Care",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Digestive Health",
    readTime: "18 min read",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    tagline: "Restoring digestive calm through gastric acid balance, posture care, and dietary mindfulness.",
    description: "Understand stomach acid production, lower esophageal sphincter weakness, GERD triggers, meal timing, and homoeopathic digestive remedies.",
    icon: "🍽️",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Acidity & GERD Handbook
*Curiva Public Health Series*`
      },
      {
        id: "gerd-basics",
        title: "Understanding Acidity & Reflux",
        content: `## Gastric Acid Physiology
When stomach acid flows back up into the esophagus due to sphincter relaxation, burning heartburn occurs.`
      }
    ]
  },

  {
    id: "arthritis-and-joint-care-guide",
    title: "Arthritis & Joint Care Handbook",
    subtitle: "A Public Health Guide to Osteoarthritis, Rheumatoid Pain Relief, Joint Movement, and Cartilage Health",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Bone & Joint Health",
    readTime: "20 min read",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    tagline: "Protecting mobility and joint flexibility through gentle movement, anti-inflammatory foods, and cartilage care.",
    description: "Compare Osteoarthritis vs Rheumatoid Arthritis, morning stiffness relief, knee care, Vitamin D3/Calcium synergy, and joint remedies.",
    icon: "🦴",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Arthritis & Joint Care Handbook
*Curiva Public Health Series*`
      },
      {
        id: "joint-basics",
        title: "Understanding Joint Health",
        content: `## Joint Mechanics & Cartilage
Cartilage cushions bone ends. Degradation leads to stiffness, swelling, and friction.`
      }
    ]
  },

  {
    id: "stress-and-anxiety-self-help",
    title: "Understanding Stress & Anxiety Self-Help Guide",
    subtitle: "A Public Health Guide to Cortisol Regulation, Mindful Breathing, Emotional Resilience, and Calming Habits",
    brand: "Curiva Homoeopathy",
    version: "2.0 (Public Health Series)",
    category: "Mental Wellness",
    readTime: "20 min read",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    tagline: "Calming the nervous system through evidence-informed stress reduction and emotional balance.",
    description: "Understand the fight-or-flight response, cortisol effects, 4-7-8 breathing techniques, cognitive grounding, and homoeopathic anxiety support.",
    icon: "🧠",
    sections: [
      {
        id: "welcome-note",
        title: "Welcome Note & Disclaimer",
        content: `# Stress & Anxiety Self-Help Guide
*Curiva Public Health Series*`
      },
      {
        id: "stress-physiology",
        title: "Stress & the Autonomic Nervous System",
        content: `## Fight-or-Flight Physiology
Chronic stress maintains sympathetic arousal, elevating cortisol and resting heart rate.`
      }
    ]
  }
];
