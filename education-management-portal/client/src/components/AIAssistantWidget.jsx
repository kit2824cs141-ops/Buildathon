import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello Super Admin! I am EDITH AI Assistant. How can I help you analyze system performance, student progress, or teacher workloads today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Generate intelligent AI response based on keyword matching
    setTimeout(() => {
      let botReply = "I have logged your request into the system metrics log. Let me know if you need specific reports exported.";
      const lower = userText.toLowerCase();

      if (lower.includes('at-risk') || lower.includes('student') || lower.includes('performance')) {
        botReply = "AI Risk Monitor Flagged 3 students needing immediate intervention: Alex Smith (CS-201, Attendance 62%), Priya Sharma (ENG-101, Grade 54%), and Marcus Vance (MATH-302, Attendance 68%).";
      } else if (lower.includes('revenue') || lower.includes('processed') || lower.includes('payment')) {
        botReply = "Total Processed Volume for this quarter is ₹4,85,000 across 3 active subscription tenants with 98.2% on-time fee collection rate.";
      } else if (lower.includes('teacher') || lower.includes('workload')) {
        botReply = "Dr. Alan Turing currently manages 3 courses with 142 active students. Recommended allocating a Teaching Assistant for CS-201.";
      } else if (lower.includes('course') || lower.includes('class')) {
        botReply = "There are 12 active courses published across Computer Science, Electrical, and Mathematics departments.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating AI Trigger Button */}
      <button 
        className="ai-floating-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Open AI Assistant"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} />}
      </button>

      {/* AI Assistant Chat Modal / Widget Panel */}
      {isOpen && (
        <div className="ai-widget-panel">
          <div className="ai-widget-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={22} />
              <div>
                <h4 style={{ color: 'white', margin: 0, fontSize: '0.95rem' }}>E.D.I.T.H AI Assistant</h4>
                <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>System Intelligence & Analytics</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          <div className="ai-widget-messages">
            {messages.map((m) => (
              <div key={m.id} className={`ai-msg ${m.sender}`}>
                {m.sender === 'bot' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)' }}>
                    <Sparkles size={12} /> EDITH AI
                  </div>
                )}
                {m.text}
              </div>
            ))}
          </div>

          <form className="ai-widget-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask EDITH about students, courses..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
