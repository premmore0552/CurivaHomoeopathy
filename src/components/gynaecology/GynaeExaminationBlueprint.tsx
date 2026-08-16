import React from 'react';
import { 
  FileText, 
  Award, 
  CheckCircle2, 
  Layers, 
  Stethoscope, 
  HelpCircle, 
  Sparkles, 
  Scissors, 
  BookOpen 
} from 'lucide-react';
import { 
  nchGynaeExaminationScheme, 
  practicalExaminationScheme 
} from '../../data/nchGynecologyCurriculum';

const standardInstrumentsList = [
  {
    name: "Sims Double-Bladed Vaginal Speculum",
    uses: "Retracting posterior vaginal wall for inspection of cervix and anterior vaginal wall, taking Pap smear, taking cervical biopsy, inserting Copper-T.",
    specialPoints: "Requires Sims semi-prone position; duck-bill blades of unequal width."
  },
  {
    name: "Cusco Bivalve Self-Retaining Speculum",
    uses: "Visual inspection of cervix and vaginal fornices, outpatient Pap smear, cauterization.",
    specialPoints: "Self-retaining with thumb-screw; can be used in dorsal position without assistant."
  },
  {
    name: "Hegar Cervical Dilators (Double-ended)",
    uses: "Gradual mechanical dilatation of internal and external os during D&C, hysteroscopy, or evacuation.",
    specialPoints: "Curved metallic rods numbered in mm (1/2, 3/4 up to 25/26); gentle pencil grip to prevent uterine perforation."
  },
  {
    name: "Green-Armytage Hemostatic Forceps",
    uses: "Grasping and clamping the bleeding edges of lower uterine segment hysterotomy in LSCS.",
    specialPoints: "Broad triangular serrated blades that compress bleeding vascular sinuses without tearing myometrium."
  },
  {
    name: "Wrigley's Obstetric Forceps",
    uses: "Outlet forceps delivery of fetal head when station is on perineal floor, especially during elective LSCS head extraction.",
    specialPoints: "Short curved blades with cephalic and pelvic curves; pelvic curve is non-rotational."
  },
  {
    name: "Doyen Abdominal Retractor",
    uses: "Retracting the urinary bladder and lower abdominal wall during pelvic surgery and LSCS.",
    specialPoints: "Deep curved metallic blade with comfortable handle."
  },
  {
    name: "Uterine Curette (Blunt & Sharp)",
    uses: "Diagnostic fractional curettage for endometrial biopsy (sharp) or therapeutic evacuation of retained placental fragments (blunt).",
    specialPoints: "Spoon-shaped looped ends with hollow metallic shaft."
  },
  {
    name: "Ayre Spatula & Cytobrush",
    uses: "Collection of ectocervical cells (wooden/plastic spatula rotated 360°) and endocervical cells for conventional Pap smear.",
    specialPoints: "Sample must be immediately fixed with 95% ethyl alcohol spray."
  }
];

export function GynaeExaminationBlueprint() {
  return (
    <div className="space-y-8">
      {/* 1. Summative University Examination Scheme Banner */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Award className="w-4 h-4" />
              NCH Summative Examination Pattern
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
              University Examination Scheme (300 Total Marks)
            </h2>
          </div>
          <div className="text-xs text-text-secondary bg-primary/10 px-3 py-1.5 rounded-full font-bold text-primary border border-primary/20">
            Theory: 200 Marks + Practical: 100 Marks
          </div>
        </div>

        {/* Theory Papers Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {nchGynaeExaminationScheme.map((paper, idx) => (
            <div 
              key={idx}
              className="bg-bg-primary rounded-2xl border border-border/80 p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase text-primary tracking-wider">
                    {paper.paper}
                  </span>
                  <h3 className="text-base font-bold text-text-primary font-serif">
                    {paper.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary block">{paper.marks} Marks</span>
                  <span className="text-[11px] text-text-tertiary">{paper.duration}</span>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-3">
                {paper.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="p-3.5 bg-bg-secondary rounded-xl border border-border/60 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-text-primary text-xs">{sec.sectionName}</strong>
                      <span className="font-bold text-primary">{sec.marks} Marks</span>
                    </div>
                    <div className="text-[11px] text-text-secondary">
                      <strong>Pattern:</strong> {sec.questionTypes}
                    </div>
                    <div className="text-[11px] text-text-tertiary pt-1 border-t border-border/40">
                      <strong>Topics:</strong> {sec.topicsCovered.slice(0, 4).join(', ')} and more...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Practical Examination Scheme Breakdown */}
        <div className="bg-bg-primary rounded-2xl border border-border/80 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400 tracking-wider">
                Clinical Examination
              </span>
              <h3 className="text-lg font-bold text-text-primary font-serif">
                {practicalExaminationScheme.title}
              </h3>
            </div>
            <span className="text-xl font-bold text-rose-600 dark:text-rose-400">
              {practicalExaminationScheme.totalMarks} Marks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {practicalExaminationScheme.breakdown.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 bg-bg-secondary rounded-xl border border-border/60 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5 pr-2">
                  <span className="text-[10px] text-text-tertiary block font-bold">COMPONENT {idx + 1}</span>
                  <span className="text-text-primary font-medium">{item.component}</span>
                </div>
                <span className="px-2.5 py-1 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold rounded-lg shrink-0">
                  {item.marks} M
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <strong>Passing Minimum Criteria:</strong> {practicalExaminationScheme.passingCriteria}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Obstetric & Gynaecological Instrument Spotting Guide */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Scissors className="w-4 h-4" />
            Practical Spotting & Viva Voce
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
            Standard OBG Surgical Instruments Identification
          </h3>
          <p className="text-xs text-text-secondary">
            High-yield instruments frequently kept for practical spotters, Table Viva, and clinical OSCE stations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {standardInstrumentsList.map((inst, idx) => (
            <div 
              key={idx}
              className="bg-bg-primary rounded-xl border border-border/80 p-4 space-y-2 text-xs shadow-sm hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-text-primary text-sm font-serif">
                  {idx + 1}. {inst.name}
                </h4>
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded">
                  Spotter
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                <strong>Clinical Uses:</strong> {inst.uses}
              </p>
              <div className="p-2.5 bg-bg-secondary rounded-lg text-text-tertiary text-[11px] leading-relaxed">
                <strong>Viva Point:</strong> {inst.specialPoints}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
