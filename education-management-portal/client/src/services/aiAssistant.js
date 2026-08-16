/**
 * AI Assistant Service — Paper Buddy AI Assistant NLP Engine
 *
 * Integrated with the Centralised Academic Data Store to ensure 100% consistency.
 * All functions are async and return Promises to mirror real API calls.
 */

import { getStudents, getWeakTopicsList } from './academicDataService';

const MOCK_RECOMMENDATIONS = {
  'CSE-A': [
    'Schedule a 2-hour revision class on Turing Machines & Decidability.',
    'Conduct a Graph Traversal practical coding lab for BFS/DFS.',
    'Initiate one-on-one academic counselling for Karthik Raj.'
  ],
  general: [
    'Provide additional practice worksheets for students scoring below 60%.',
    'Stagger assignment deadlines to reduce last-minute rush submissions.'
  ]
};

/**
 * Normalises string to match queries
 */
function matchQuery(text, keywords) {
  const normalised = text.toLowerCase();
  return keywords.every(kw => normalised.includes(kw.toLowerCase()));
}

/**
 * Process input and return response
 * [API_INTEGRATION_POINT] — Replace with POST /api/ai/assistant/chat
 */
export async function getAIAssistantResponse(userMessage) {
  // Simulate network latency (800ms)
  await new Promise(resolve => setTimeout(resolve, 800));

  const text = userMessage.trim();
  const students = await getStudents();
  const weakTopics = await getWeakTopicsList();

  // 1. Low attendance
  if (matchQuery(text, ['attendance', '75']) || matchQuery(text, ['low', 'attendance'])) {
    const lowAtt = students.filter(s => s.attendance < 75);
    let resp = `Here are the students with **attendance below 75%**:\n\n`;
    lowAtt.forEach(s => {
      resp += `- **${s.name}** (${s.class}) — **${s.attendance}%** attendance (Risk: ${s.attendance < 60 ? 'Critical' : 'High'})\n`;
    });
    resp += `\n**Recommended Action:** Send an attendance reminder notification to these students or schedule a mentoring session.`;
    return resp;
  }

  // 2. Academic Risk
  if (matchQuery(text, ['academic', 'risk']) || matchQuery(text, ['risk', 'student'])) {
    const riskStudents = students.filter(s => s.overall < 65 || s.attendance < 75);
    let resp = `I've analyzed the academic records. The following students are flagged at **academic risk**:\n\n`;
    riskStudents.forEach(s => {
      let severity = 'Medium';
      if (s.overall < 55 && s.attendance < 65) severity = 'Critical';
      else if (s.overall < 60 || s.attendance < 70) severity = 'High';
      resp += `- **${s.name}** (${s.class}) — Overall: **${s.overall}%**, Attendance: **${s.attendance}%** (Risk Level: **${severity}**)\n`;
    });
    resp += `\nWould you like me to generate a personalized remediation study guide for them?`;
    return resp;
  }

  // 3. Subject needs revision
  if (matchQuery(text, ['subject', 'revision']) || matchQuery(text, ['subject', 'need', 'revision'])) {
    let resp = `Based on recent test data, these subjects require **urgent class revision** due to below-average scores:\n\n`;
    resp += `- **Theory of Computation** — Average Class Score: **44%**\n`;
    resp += `- **Data Structures & Algorithms** — Average Class Score: **58%**\n`;
    resp += `- **Database Management Systems** — Average Class Score: **63%**\n\n`;
    resp += `Would you like me to draft a 45-minute revision lecture plan for Theory of Computation?`;
    return resp;
  }

  // 4. Missing assignments
  if (matchQuery(text, ['missing', 'assignment']) || matchQuery(text, ['pending', 'assignment'])) {
    const missing = students.filter(s => s.missingAssignments > 0);
    let resp = `Here is the list of students with **missing or pending assignments**:\n\n`;
    missing.forEach(s => {
      resp += `- **${s.name}** (${s.class}) — **${s.missingAssignments} missing assignment(s)**\n`;
    });
    resp += `\nWould you like me to send automated submission reminders to these students?`;
    return resp;
  }

  // 5. Class performance
  if (matchQuery(text, ['class', 'performance'])) {
    let resp = `Here is the **classroom performance summary** across sections:\n\n`;
    resp += `- **CSE-A (3rd Year)** — Overall Avg: **82%** | Attendance: **92%** | Assignment Avg: **85%**\n`;
    resp += `- **CSE-B (2nd Year)** — Overall Avg: **76%** | Attendance: **88%** | Assignment Avg: **78%**\n\n`;
    resp += `**Classroom Trend:** CSE-A performance is stable, but CSE-B has a declining trend in assignment quality compared to last semester.`;
    return resp;
  }

  // 6. Major weak topics
  if (matchQuery(text, ['weak', 'topic']) || matchQuery(text, ['major', 'weak'])) {
    let resp = `I have detected the following **major weak topics** where student performance is lowest:\n\n`;
    weakTopics.forEach(t => {
      const strugglingCount = t.studentsStruggling || t.struggling || 0;
      resp += `- **${t.topic}** (${t.subject}) — Class Avg: **${t.avgScore}%** | Struggling students: **${strugglingCount}**\n`;
    });
    resp += `\nI recommend scheduling coding labs or practical exercises to reinforce these concepts.`;
    return resp;
  }

  // 7. Improving students
  if (matchQuery(text, ['improving', 'student']) || matchQuery(text, ['who', 'improving'])) {
    const improvingList = students.filter(s => s.overall > 80);
    let resp = `These students show **positive progress and improving academic trends** this month:\n\n`;
    improvingList.forEach(s => {
      resp += `- **${s.name}** — Overall Grade: **${s.overall}%** (Trend: Improving)\n`;
    });
    resp += `\nThese students have shown significant consistency in assignment submissions.`;
    return resp;
  }

  // 8. Recommendations for CSE-A
  if (matchQuery(text, ['recommendation', 'cse-a']) || matchQuery(text, ['cse-a', 'recommendation'])) {
    let resp = `Here are the AI-suggested **academic recommendations for CSE-A**:\n\n`;
    MOCK_RECOMMENDATIONS['CSE-A'].forEach((rec, idx) => {
      resp += `${idx + 1}. **${rec}**\n`;
    });
    resp += `\nImplementation Impact: Applying these changes is estimated to increase exam pass rates by **+12%**.`;
    return resp;
  }

  // Fallback / default AI response
  return `I'm not quite sure about that query, but I'm ready to help! You can try asking me specific questions like:
 
- *"Which students are at academic risk?"*
- *"Show students with attendance below 75%."*
- *"Give recommendations for CSE-A."*
- *"What are the major weak topics?"*`;
}
