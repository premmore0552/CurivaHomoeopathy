import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { allBhmsSubjects } from '../src/data/bhmsSubjects';
import { materiaMedicaData } from '../src/data/materiaMedica';
import { repertoryDatabase } from '../src/data/repertoryDatabase';
import { HomoeopathicFlashcards } from '../src/data/flashcards_data';
import { importedMedicalMCQs } from '../src/data/medicalMcqBank';
import { nativeQuestionBank } from '../src/native-app/quizBank';
import { CBDC_TOPIC_STUDY_DATABASE } from '../src/data/cbdc_topics_study_data';
import { anatomyModules } from '../src/data/anatomyModulesData';
import { physiologyModules } from '../src/data/physiologyModulesData';

const clean = (value) => typeof value === 'string' ? value.trim() : '';
const list = (value) => Array.isArray(value) ? value.map(clean).filter(Boolean) : [];
const section = (heading, body) => {
  const content = Array.isArray(body) ? body.map(clean).filter(Boolean).join('\n') : clean(body);
  return content ? { heading, body: content } : null;
};

const detailedLessons = [];
for (const [id, topic] of Object.entries(CBDC_TOPIC_STUDY_DATABASE)) {
  detailedLessons.push({
    id: clean(topic.id || topic.topicId) || id,
    title: clean(topic.name || topic.topicTitle) || id,
    subjectId: clean(topic.subjectId),
    subject: clean(topic.subjectName),
    year: clean(topic.year),
    overview: clean(topic.overview),
    importance: clean(topic.whyImportant || topic.whyItMatters),
    sections: [
      section('Core concepts', topic.coreConcepts),
      section('Clinical and applied learning notes', topic.clinicalPearls),
      section('Miasmatic / conceptual links', topic.miasmaticBasis),
      section('Long-answer questions', topic.examLAQs || topic.examBlueprint?.longAnswerQuestions),
      section('Short-answer questions', topic.examSAQs || topic.examBlueprint?.shortAnswerQuestions),
      section('Viva voce', topic.vivaQuestions || topic.examBlueprint?.vivaVoceQuestions),
      section('Suggested reading', topic.recommendedBooks || topic.referenceTextbooks)
    ].filter(Boolean),
    keyPoints: [...list(topic.coreConcepts), ...list(topic.clinicalPearls)]
  });
}

for (const [id, item] of Object.entries(anatomyModules)) {
  detailedLessons.push({
    id: 'anatomy-' + id,
    title: clean(item.title),
    subjectId: 'anatomy',
    subject: 'Anatomy',
    year: '1st BHMS',
    overview: clean(item.introduction),
    importance: clean(item.quickFacts?.clinicalImportance),
    sections: [
      section('Definition', item.definitionText),
      section('Quick facts', [
        item.quickFacts?.definition, item.quickFacts?.location,
        item.quickFacts?.function, item.quickFacts?.oneLineRevision
      ]),
      section('Gross anatomy', [
        ...(item.grossAnatomy?.parts || []),
        ...(item.grossAnatomy?.relations || []),
        ...(item.grossAnatomy?.anatomicalFeatures || [])
      ]),
      section('Blood and nerve supply', [item.bloodSupply, item.nerveSupply]),
      section('Development', item.development),
      section('Applied anatomy', [item.appliedAnatomy, item.clinicalCorrelation, item.surfaceAnatomy]),
      section('High-yield revision', [...(item.highYieldPoints || []), ...(item.oneMinuteRevision || [])]),
      section('Viva questions', (item.vivaQuestions || []).map(v => v.q + '\n' + v.a))
    ].filter(Boolean),
    keyPoints: [...list(item.learningObjectives), ...list(item.highYieldPoints), ...list(item.oneMinuteRevision)]
  });
}

for (const [id, item] of Object.entries(physiologyModules)) {
  detailedLessons.push({
    id: 'physiology-' + id,
    title: clean(item.title),
    subjectId: 'physiology',
    subject: 'Physiology & Biochemistry',
    year: '1st BHMS',
    overview: clean(item.introduction),
    importance: clean(item.quickFacts?.clinicalImportance),
    sections: [
      section('Definition and basic concepts', [item.definition, item.basicConcepts]),
      section('Quick facts', [
        item.quickFacts?.definition, item.quickFacts?.normalRange,
        item.quickFacts?.primaryRole, item.quickFacts?.oneLineRevision
      ]),
      section('Detailed explanation', item.detailedExplanation),
      section('Physiological mechanisms', (item.physiologicalMechanism || []).map(s => s.step + '. ' + s.title + '\n' + s.detail)),
      section('Applied physiology', [item.appliedPhysiology, item.clinicalCorrelation]),
      section('Important disorders', (item.importantDisorders || []).map(d => d.name + '\n' + d.mechanism + '\n' + d.symptoms)),
      section('High-yield revision', [...(item.highYieldPoints || []), ...(item.oneMinuteRevision || [])]),
      section('Viva questions', (item.vivaQuestions || []).map(v => v.q + '\n' + v.a)),
      section('Frequently asked questions', (item.faqs || []).map(v => v.q + '\n' + v.a))
    ].filter(Boolean),
    keyPoints: [...list(item.learningObjectives), ...list(item.highYieldPoints), ...list(item.oneMinuteRevision)]
  });
}

const subjects = allBhmsSubjects.map(subject => ({
  id: subject.id,
  code: subject.code,
  title: subject.title,
  year: subject.year,
  yearNumber: subject.yearNumber,
  category: subject.category,
  badge: subject.badge,
  summary: subject.summary,
  examPattern: subject.examPattern,
  theoryHours: subject.theoryHours,
  practicalHours: subject.practicalHours,
  nonLectureHours: subject.nonLectureHours,
  hoursNote: subject.hoursNote,
  totalMarks: subject.totalMarks,
  chapters: (subject.chapters || []).map(chapter => ({
    title: chapter.title,
    tag: chapter.tag || ''
  })),
  highYieldTopics: list(subject.highYieldTopics)
}));

const questions = [
  ...nativeQuestionBank.map(question => ({
    id: question.id,
    subject: question.subject,
    prompt: question.prompt,
    options: question.options,
    answer: question.answer,
    explanation: question.explanation,
    difficulty: question.difficulty,
    source: 'Curiva practice bank'
  })),
  ...importedMedicalMCQs.map(question => ({
    id: 'curiva-' + question.id,
    subject: question.subject,
    prompt: question.question,
    options: question.options,
    answer: question.correctAnswer,
    explanation: question.explanation,
    difficulty: String(question.category || '').toLowerCase().includes('clinical') ? 'Intermediate' : 'Foundational',
    source: question.credits || 'Curiva question bank'
  }))
].filter(question =>
  question.id && question.prompt && Array.isArray(question.options) &&
  question.options.length >= 2 && Number.isInteger(question.answer) &&
  question.answer >= 0 && question.answer < question.options.length
);

const remedies = materiaMedicaData.map(remedy => ({
  id: remedy.id,
  name: remedy.name,
  commonName: remedy.commonName,
  family: remedy.family,
  keynotes: list(remedy.keynotes),
  mind: list(remedy.mind),
  physical: list(remedy.physical),
  better: list(remedy.modalities?.better),
  worse: list(remedy.modalities?.worse)
}));

const repertory = repertoryDatabase.map(chapter => ({
  id: chapter.id,
  name: chapter.name,
  description: chapter.description,
  rubrics: (chapter.rubrics || []).map(rubric => ({
    id: rubric.id,
    symptom: rubric.symptom,
    subCategory: rubric.subCategory || '',
    remedies: list(rubric.remedies),
    notes: clean(rubric.notes)
  }))
}));

const content = {
  schemaVersion: 1,
  appName: 'Curiva Homoeopathy',
  generatedAt: new Date().toISOString(),
  subjects,
  detailedLessons,
  questions,
  flashcards: HomoeopathicFlashcards.map(card => ({
    term: card.term,
    subType: card.subType,
    definition: card.definition,
    significance: card.clinicalSignificance
  })),
  remedies,
  repertory
};

const outputDir = path.resolve(process.env.CURIVA_ANDROID_PROJECT_DIR || 'android', 'app', 'src', 'main', 'assets');
await mkdir(outputDir, { recursive: true });
const outputPath = path.join(outputDir, 'learning-content.json');
await writeFile(outputPath, JSON.stringify(content), 'utf8');
const summary = {
  subjects: subjects.length,
  detailedLessons: detailedLessons.length,
  questions: questions.length,
  flashcards: content.flashcards.length,
  remedies: remedies.length,
  repertoryChapters: repertory.length,
  rubricCount: repertory.reduce((count, chapter) => count + chapter.rubrics.length, 0),
  bytes: Buffer.byteLength(JSON.stringify(content))
};
if (!subjects.length || !detailedLessons.length || !questions.length || !content.flashcards.length || !remedies.length || !repertory.length) {
  throw new Error('Native learning content export is incomplete: ' + JSON.stringify(summary));
}
console.log('Exported offline Android learning library:', JSON.stringify(summary));
