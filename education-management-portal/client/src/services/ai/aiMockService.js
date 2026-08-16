/**
 * AI Mock Service — Paper Buddy AI Academic Intelligence Engine
 *
 * Integrated with the Centralised Academic Data Store to ensure 100% consistency.
 * All functions are async and return Promises to mirror real API calls.
 *
 * API Integration Points are marked with:  // [API_INTEGRATION_POINT]
 */

import { getStudents, getWeakTopicsList } from '../academicDataService';

const MOCK_RECOMMENDATIONS = [
  {
    id: 'REC001', priority: 'Critical', category: 'Remedial Class',
    title: 'Conduct Emergency Revision — Theory of Computation',
    description: '84% of CSE-A students are struggling with Turing Machines. An emergency revision session before the upcoming exam is critical.',
    targetClass: 'CSE-A (3rd Year)', targetSubject: 'Theory of Computation',
    estimatedImpact: '+15–20% on final exam scores',
    actions: ['Schedule 2-hour revision session this week', 'Share simplified handouts on decidability problems', 'Conduct practice MCQ set on Turing Machine states'],
  },
  {
    id: 'REC002', priority: 'High', category: 'Student Mentoring',
    title: 'Immediate Mentoring — Karthik Raj & Rohan Mehta',
    description: 'Both students have attendance below 65% and assignment averages below 50%. Without intervention, academic failure is likely this semester.',
    targetClass: 'CSE-A / CSE-B', targetSubject: 'All Subjects',
    estimatedImpact: 'Prevent semester failure for 2 students',
    actions: ['Schedule weekly one-on-one mentoring sessions', 'Notify parents or guardians', 'Provide assignment extension and remedial material'],
  },
  {
    id: 'REC003', priority: 'High', category: 'Topic Revision',
    title: 'Graph Traversal Deep-Dive — DSA',
    description: '28 out of 45 students scored below 50% on BFS/DFS assessments. A targeted revision class would significantly improve mid-term performance.',
    targetClass: 'CSE-A (3rd Year)', targetSubject: 'Data Structures & Algorithms',
    estimatedImpact: '+12% average on next quiz',
    actions: ['Run a 1-hour graph traversal coding lab', 'Assign LeetCode-style practice problems', 'Review DFS/BFS animation visualisations'],
  },
  {
    id: 'REC004', priority: 'Medium', category: 'Assignment Strategy',
    title: 'Stagger Assignment Deadlines — DBMS',
    description: '76% of submissions arrive in the last 6 hours before deadline, correlating with lower quality. Staged submission milestones improve depth of learning.',
    targetClass: 'CSE-B (2nd Year)', targetSubject: 'Database Management Systems',
    estimatedImpact: '+8% assignment quality score',
    actions: ['Introduce milestone-based deadlines (draft → final)', 'Provide mid-week auto-graded checkpoint quiz', 'Reward early submissions with bonus marks'],
  },
  {
    id: 'REC005', priority: 'Medium', category: 'Engagement',
    title: 'Replicate ML Lab Format Across DSA',
    description: 'ML Lab shows 94% attendance and highest engagement scores. The interactive notebook format is measurably more effective than lecture-only DSA delivery.',
    targetClass: 'CSE-A (3rd Year)', targetSubject: 'Data Structures & Algorithms',
    estimatedImpact: '+9% attendance and engagement score',
    actions: ['Convert one weekly DSA session into a coding lab', 'Use Jupyter-style visualisation for tree/graph algorithms', 'Include peer-programming exercises'],
  },
  {
    id: 'REC006', priority: 'Low', category: 'Additional Practice',
    title: 'Provide Neural Network Supplementary Notes',
    description: '63% of ML students report confusion with backpropagation. Clear visual step-by-step notes would significantly reduce revision time.',
    targetClass: 'CSE-A (4th Year)', targetSubject: 'Machine Learning',
    estimatedImpact: '+7% on ML final exam',
    actions: ['Share annotated PDF: "Backpropagation Step-by-Step"', 'Link curated YouTube playlist (3Blue1Brown series)', 'Add optional practice problem set'],
  },
];

// ─── Risk Classification Logic ────────────────────────────────────────────────
function classifyRisk(student) {
  const reasons = [];
  let riskScore = 0;

  if (student.attendance < 65)       { riskScore += 3; reasons.push('Critical attendance deficit (below 65%)'); }
  else if (student.attendance < 75)  { riskScore += 2; reasons.push('Low attendance (below 75% threshold)'); }

  if (student.assignmentAvg < 50)    { riskScore += 3; reasons.push('Critically low assignment scores'); }
  else if (student.assignmentAvg < 65) { riskScore += 2; reasons.push('Below-average assignment performance'); }

  if (student.examAvg < 50)          { riskScore += 3; reasons.push('Failing exam average (below 50%)'); }
  else if (student.examAvg < 65)     { riskScore += 2; reasons.push('Below-pass exam performance'); }

  let level = 'Low';
  if (riskScore >= 6)       level = 'High';
  else if (riskScore >= 3)  level = 'Medium';

  const recommendedActions = {
    High:   ['Schedule immediate parent-teacher conference', 'Assign dedicated academic mentor', 'Provide personalised remedial study plan', 'Monitor weekly assignment submissions', 'Issue formal academic warning letter'],
    Medium: ['Schedule one-on-one counselling session', 'Assign topic-specific practice material', 'Monitor attendance for next 3 weeks', 'Review and provide feedback on recent submissions'],
    Low:    ['Continue current academic trajectory', 'Assign optional challenge exercises', 'Recognise performance in class to motivate peers'],
  };

  return { ...student, riskLevel: level, riskScore, reasons, recommendedActions: recommendedActions[level] };
}

// ─── Exported Service Functions ───────────────────────────────────────────────

/**
 * Returns overall AI risk summary for the dashboard.
 * [API_INTEGRATION_POINT]: Replace with GET /api/ai/risk-summary
 */
export async function getAIRiskSummary() {
  const students = await getStudents();
  const classified = students.map(classifyRisk);
  
  // Calculate predictions on-the-fly for consistency
  const predictions = students.map(s => {
    let trend = 'Stable';
    if (s.overall > 80) trend = 'Improving';
    else if (s.overall < 65) trend = 'Declining';
    return { ...s, trend };
  });

  return {
    high:   classified.filter(s => s.riskLevel === 'High'),
    medium: classified.filter(s => s.riskLevel === 'Medium'),
    low:    classified.filter(s => s.riskLevel === 'Low'),
    trends: {
      improving: predictions.filter(p => p.trend === 'Improving').length,
      stable:    predictions.filter(p => p.trend === 'Stable').length,
      declining: predictions.filter(p => p.trend === 'Declining').length,
    },
    attendanceRisk:  classified.filter(s => s.attendance < 75),
    assignmentRisk:  classified.filter(s => s.assignmentAvg < 60),
    weakSubjects: [
      { subject: 'Theory of Computation', avgScore: 44, severity: 'Critical' },
      { subject: 'Data Structures & Algorithms', avgScore: 58, severity: 'High' },
      { subject: 'Machine Learning', avgScore: 63, severity: 'Medium' },
    ],
    lastUpdated: new Date().toLocaleString(),
    modelVersion: 'Paper Buddy AI v1.0 (Mock Engine)',
  };
}

/**
 * Returns all students with their AI risk classification and recommended actions.
 * [API_INTEGRATION_POINT]: Replace with GET /api/ai/at-risk-students
 */
export async function getAtRiskStudents() {
  const students = await getStudents();
  return students.map(classifyRisk).sort((a, b) => b.riskScore - a.riskScore);
}

/**
 * Returns weak topics detected across all subjects.
 * [API_INTEGRATION_POINT]: Replace with GET /api/ai/weak-topics
 */
export async function getWeakTopics() {
  return await getWeakTopicsList();
}

/**
 * Returns AI-generated teaching recommendations.
 * [API_INTEGRATION_POINT]: Replace with GET /api/ai/recommendations
 */
export async function getRecommendations() {
  return [...MOCK_RECOMMENDATIONS];
}

/**
 * Returns AI performance predictions for each student.
 * [API_INTEGRATION_POINT]: Replace with GET /api/ai/predictions
 */
export async function getPerformancePredictions() {
  const students = await getStudents();
  return students.map(s => {
    let trend = 'Stable';
    let predictedScore = s.overall;
    let riskLevel = 'Low';
    
    if (s.overall > 80) {
      trend = 'Improving';
      predictedScore = Math.min(100, s.overall + 3);
    } else if (s.overall < 65) {
      trend = 'Declining';
      predictedScore = Math.max(0, s.overall - 6);
      riskLevel = s.overall < 55 ? 'High' : 'Medium';
    }

    return {
      id: s.roll,
      name: s.name,
      class: s.class.split(' ')[0],
      currentScore: s.overall,
      predictedScore,
      trend,
      riskLevel,
      confidence: Math.round(80 + (s.attendance / 6))
    };
  });
}
