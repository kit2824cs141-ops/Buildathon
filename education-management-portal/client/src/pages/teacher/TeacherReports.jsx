import { useState } from 'react';
import { FileText, Printer, Download, Calendar, Search, ShieldAlert } from 'lucide-react';
import SectionCard from './components/SectionCard';

const reportDataTemplates = {
  attendance: {
    title: 'OFFICIAL CLASS ATTENDANCE REPORT',
    description: 'Summary of student log compliance, weekly counts, and low-attendance warnings.',
    columns: ['Roll Number', 'Student Name', 'Total Lectures', 'Present', 'Absent Rate', 'Status'],
    rows: [
      ['CSE2601', 'Rahul Sharma', '45 Sessions', '43 Present', '4% Absent', 'Excellent'],
      ['CSE2602', 'Karthik Raj', '45 Sessions', '29 Present', '35% Absent', 'Critical Warning'],
      ['CSE2603', 'Priya Nair', '45 Sessions', '40 Present', '11% Absent', 'Good'],
      ['CSE2604', 'Aditya Sen', '45 Sessions', '44 Present', '2% Absent', 'Excellent'],
    ]
  },
  assignment: {
    title: 'ASSIGNMENTS COMPLETION & COMPLIANCE SUMMARY',
    description: 'Student worksheet submission tracking, missing tasks, and pending score reports.',
    columns: ['Assignment Name', 'Target Class', 'Syllabus Course', 'Completed Submissions', 'Pending Evaluation', 'Syllabus Rate'],
    rows: [
      ['Binary Tree Traversal', 'CSE-A', 'DSA', '38 / 45', '12 Tasks', '84% Completed'],
      ['ER Diagram Design', 'CSE-B', 'DBMS', '50 / 52', '0 Tasks', '96% Completed'],
      ['Linear Regression Model', 'CSE-A', 'ML', '15 / 38', '15 Tasks', '39% Completed'],
    ]
  },
  examination: {
    title: 'MID-SEMESTER EXAMINATIONS PERFORMANCE LEDGER',
    description: 'Official record of classroom score averages, grade distributions, and highest grades.',
    columns: ['Exam Name', 'Class Section', 'Max Marks', 'Class Average', 'Highest Grade', 'Evaluator'],
    rows: [
      ['DSA Mid-Term Exam', 'CSE-A', '50 Marks', '38.5 (77%)', '48 / 50', 'Prof. Muruga Kumar'],
      ['DBMS Lab Terminal', 'CSE-B', '100 Marks', '73.2 (73%)', '96 / 100', 'Prof. Muruga Kumar'],
      ['ML Quiz 1', 'CSE-A', '20 Marks', '15.4 (77%)', '19 / 20', 'Prof. Muruga Kumar'],
    ]
  },
  student: {
    title: 'INDIVIDUAL STUDENT 360 ACADEMIC SCORECARD',
    description: 'Diagnosed report of general averages, course stats, and strengths checklist.',
    columns: ['Student Name', 'Class', 'Attendance', 'Assignment Avg', 'Exam Average', 'Overall Status'],
    rows: [
      ['Rahul Sharma', 'CSE-A', '95%', '88%', '85%', 'Grade A (Outstanding)'],
      ['Aditya Sen', 'CSE-A', '98%', '95%', '92%', 'Grade A+ (Distinction)'],
      ['Priya Nair', 'CSE-A', '88%', '72%', '78%', 'Grade B (Satisfactory)'],
    ]
  },
  class: {
    title: 'COMPARATIVE CLASSROOM PERFORMANCE LEDGER',
    description: 'Cross-comparison metrics across assigned department divisions.',
    columns: ['Class Name', 'Student Strength', 'Attendance Rate', 'Assignment Avg', 'Exam Average', 'Overall Index'],
    rows: [
      ['CSE-A (3rd Year)', '45 Enrolled', '92% Average', '85% Average', '79% Average', '82% Index'],
      ['CSE-B (2nd Year)', '52 Enrolled', '88% Average', '78% Average', '73% Average', '76% Index'],
      ['IT-A (3rd Year)', '16 Enrolled', '85% Average', '80% Average', '80% Average', '80% Index'],
    ]
  },
  atrisk: {
    title: 'ACADEMIC RISK ASSESSMENT & INTERVENTION REGISTRY',
    description: 'List of students falling below attendance minimums (75%) or failing grades.',
    columns: ['Roll Number', 'Student Name', 'Class Section', 'Attendance Rate', 'Academic Average', 'Risk Assessment'],
    rows: [
      ['CSE2602', 'Karthik Raj', 'CSE-A', '65%', '56%', 'High Risk (Absence & Grades)'],
    ]
  }
};

export default function TeacherReports() {
  const [reportType, setReportType] = useState('attendance');
  const [selectedClass, setSelectedClass] = useState('CSE-A');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Semester-1');

  const selectedReport = reportDataTemplates[reportType] || reportDataTemplates.attendance;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-page">
      <div className="teacher-page-header">
        <h1>Reports & Documents</h1>
      </div>

      <div className="details-grid">
        {/* Filters and options panel */}
        <div className="details-sidebar" style={{ gridColumn: 'span 1' }}>
          <SectionCard title="Report Settings">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Type */}
              <div className="form-group">
                <label>Report Template *</label>
                <select 
                  className="filter-select"
                  style={{ width: '100%' }}
                  value={reportType} 
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="attendance">Attendance Compliance Report</option>
                  <option value="assignment">Assignment Submission Report</option>
                  <option value="examination">Examination Grades Ledger</option>
                  <option value="student">Student Performance Report</option>
                  <option value="class">Class Performance Report</option>
                  <option value="atrisk">At-Risk Student Registry</option>
                </select>
              </div>

              {/* Class */}
              <div className="form-group">
                <label>Target Class *</label>
                <select 
                  className="filter-select"
                  style={{ width: '100%' }}
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="All">All Classes</option>
                  <option value="CSE-A">CSE-A (3rd Year)</option>
                  <option value="CSE-B">CSE-B (2nd Year)</option>
                  <option value="IT-A">IT-A (3rd Year)</option>
                </select>
              </div>

              {/* Course */}
              <div className="form-group">
                <label>Subject Course *</label>
                <select 
                  className="filter-select"
                  style={{ width: '100%' }}
                  value={selectedCourse} 
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="All">All Courses</option>
                  <option value="DSA">Data Structures (CS301)</option>
                  <option value="DBMS">Database Systems (CS201)</option>
                  <option value="ML">Machine Learning (CS401)</option>
                </select>
              </div>

              {/* Semester / Date */}
              <div className="form-group">
                <label>Academic Period *</label>
                <select 
                  className="filter-select"
                  style={{ width: '100%' }}
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="Semester-1">Fall Semester 2026</option>
                  <option value="Semester-2">Spring Semester 2026</option>
                  <option value="Month">Current Month</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                <button className="btn-teacher primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handlePrint}>
                  <Printer size={16} /> Print Official Document
                </button>
                <button className="btn-teacher secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Download size={16} /> Export as CSV / Excel
                </button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Report Document Preview sheet */}
        <div className="details-main" style={{ gridColumn: 'span 1' }}>
          <div className="report-sheet">
            <div className="report-header-section">
              <h2 style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{selectedReport.title}</h2>
              <p>PAPER BUDDY EDUCATIONAL GROUP • DEPT OF COMPUTER SCIENCE</p>
              <span style={{ fontSize: '11px', color: '#9CA3AF', display: 'block', marginTop: '4px' }}>CONFIDENTIAL OFFICIAL DOCUMENT</span>
            </div>

            <div className="report-metadata-grid">
              <div className="report-metadata-item">
                <span>Class / Section</span>
                <strong>{selectedClass}</strong>
              </div>
              <div className="report-metadata-item">
                <span>Academic Period</span>
                <strong>{selectedDate === 'Semester-1' ? 'Fall 2026' : 'Spring 2026'}</strong>
              </div>
              <div className="report-metadata-item">
                <span>Generated On</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </div>

            <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#6B7280', marginBottom: '20px' }}>
              <strong>Description:</strong> {selectedReport.description}
            </p>

            <table className="teacher-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  {selectedReport.columns.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedReport.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ fontWeight: cIdx === 0 ? 600 : 400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="report-signature-block">
              <div>
                <span>Generated by:</span>
                <div className="signature-line">Prof. Muruga Kumar<br /><small style={{ fontWeight: 400, color: '#9CA3AF' }}>Department Instructor</small></div>
              </div>
              <div>
                <span>Authorized seal:</span>
                <div className="signature-line">Registrar Office<br /><small style={{ fontWeight: 400, color: '#9CA3AF' }}>Academic Affairs Division</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
