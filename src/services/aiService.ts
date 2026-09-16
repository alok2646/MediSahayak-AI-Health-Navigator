import type { ReportAnalysis } from '../types';

export const analyzeMedicalReport = (): ReportAnalysis => ({
  summary:
    'Your report contains several laboratory measurements. Some values are outside the laboratory reference range. Discuss the results with a qualified healthcare professional.',
  parameters: [
    {
      name: 'Hemoglobin',
      value: '10.2 g/dL',
      reference: '12?16 g/dL',
      status: 'Below reference range',
      explanation: 'Hemoglobin is a protein in red blood cells that helps carry oxygen. Lower-than-expected levels can lead to fatigue and weakness.',
    },
    {
      name: 'Vitamin D',
      value: '14 ng/mL',
      reference: '20?50 ng/mL',
      status: 'Below reference range',
      explanation: 'Vitamin D supports bone health and immunity. Low levels can contribute to fatigue and bone pain.',
    },
    {
      name: 'WBC',
      value: '7.1 ?10?/L',
      reference: '4?11 ?10?/L',
      status: 'Within reference range',
      explanation: 'White blood cells help protect against infection. This result falls within the expected range.',
    },
  ],
  explanations: [
    'Low hemoglobin may suggest nutritional deficiency, blood loss, or another underlying issue that deserves evaluation.',
    'Vitamin D deficiency is common and often improves with dietary changes, supplements, and clinician guidance.',
  ],
  questionsForDoctor: [
    'What could explain this result?',
    'Should I repeat this test?',
    'Should I discuss this result with a specialist?',
  ],
  careCategory: 'Internal Medicine / General Physician',
  safetyMessage:
    'MediSahayak provides informational assistance and does not provide a definitive diagnosis or replace a qualified healthcare professional.',
});
