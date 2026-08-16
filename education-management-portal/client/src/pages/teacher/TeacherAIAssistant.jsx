import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, AlertTriangle, Calendar, BookOpen, Clock, BarChart3, Star, MessageSquare } from 'lucide-react';
import { getAIAssistantResponse } from '../../services/aiAssistant';

const suggestedQuestionsList = [
  'Which students are at academic risk?',
  'Show students with attendance below 75%.',
  'Which subject needs revision?',
  'Which students have missing assignments?',
  'Show me the class performance.',
  'What are the major weak topics?',
  'Which students are improving?',
  'Give recommendations for CSE-A.',
];

const quickActions = [
  { icon: <AlertTriangle size={13} />, label: 'At-Risk Students', prompt: 'Which students are at academic risk?' },
  { icon: <Calendar size={13} />, label: 'Low Attendance', prompt: 'Show students with attendance below 75%.' },
  { icon: <BookOpen size={13} />, label: 'Weak Subjects', prompt: 'Which subject needs revision?' },
  { icon: <Clock size={13} />, label: 'Pending Assignments', prompt: 'Which students have missing assignments?' },
  { icon: <BarChart3 size={13} />, label: 'Class Performance', prompt: 'Show me the class performance.' },
  { icon: <Star size={13} />, label: 'AI Recommendations', prompt: 'Give recommendations for CSE-A.' },
];

export default function TeacherAIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setIsTyping(true);

    try {
      const response = await getAIAssistantResponse(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error evaluating your request. Please try again.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={i} style={{ display: 'block', marginBottom: '4px' }}>{line.replace(/\*\*/g, '')}</strong>;
      }
      if (line.startsWith('- **') || line.startsWith('- A)') || line.startsWith('- B)') || line.startsWith('- C)') || line.startsWith('- D)')) {
        return <li key={i} style={{ marginLeft: '16px', fontSize: '13px', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
      }
      if (line.startsWith('**Q')) {
        return <p key={i} style={{ fontWeight: 700, margin: '12px 0 4px', fontSize: '13.5px' }}>{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('#')) {
        return <h4 key={i} style={{ margin: '8px 0 4px', fontSize: '14px' }}>{line.replace(/^#+\s/, '')}</h4>;
      }
      return line ? <p key={i} style={{ margin: '2px 0', fontSize: '13.5px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} /> : <br key={i} />;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 130px)', gap: '0' }}>
      {/* Header */}
      <div className="teacher-page-header" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #1A1A2E 0%, #FF6B00 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={20} color="#FFFFFF" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>AI Teacher Assistant</h1>
            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>● Online • Paper Buddy NLP Engine</span>
          </div>
        </div>
        {messages.length > 0 && (
          <button className="btn-teacher secondary" onClick={() => setMessages([])}>
            <RefreshCw size={14} /> Clear Chat
          </button>
        )}
      </div>

      {/* Quick Action Buttons Row */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {quickActions.map((qa, i) => (
          <button key={i} onClick={() => sendMessage(qa.prompt)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#FFFFFF', fontSize: '12px', fontWeight: 600, color: '#4B5563', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FFF5EB'; e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.color = '#FF6B00'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#4B5563'; }}
          >
            {qa.icon} {qa.label}
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', background: '#FAFBFC', borderRadius: '14px', border: '1px solid #F0F0F0', marginBottom: '16px' }}>
        {messages.length === 0 ? (
          /* Empty State */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FFF5EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid #FFE4D0' }}>
              <MessageSquare size={24} color="#FF6B00" />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#1A1A2E' }}>AI Academic Copilot</h3>
            <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#6B7280', maxWidth: '340px' }}>
              Ask questions about student risk levels, attendance thresholds, weak concepts, or ask for class revision recommendations.
            </p>

            {/* Suggested Questions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '560px', width: '100%' }}>
              {suggestedQuestionsList.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q)}
                  style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#FFFFFF', textAlign: 'left', fontSize: '12px', color: '#4B5563', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.background = '#FFF5EB'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#FFFFFF'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Bubbles List */
          messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-start' }}>
              {msg.role === 'assistant' && (
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #1A1A2E, #FF6B00)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={16} color="#FFFFFF" />
                </div>
              )}
              <div style={{ maxWidth: '75%', background: msg.role === 'user' ? 'linear-gradient(135deg, #FF6B00, #FF8C38)' : '#FFFFFF', color: msg.role === 'user' ? '#FFFFFF' : '#1A1A2E', padding: '12px 16px', borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '4px 14px 14px 14px', border: msg.role === 'assistant' ? '1px solid #F0F0F0' : 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                {msg.role === 'assistant' ? renderContent(msg.content) : <p style={{ margin: 0, fontSize: '13.5px' }}>{msg.content}</p>}
                <span style={{ fontSize: '10px', color: msg.role === 'user' ? 'rgba(255,255,255,0.7)' : '#9CA3AF', display: 'block', marginTop: '6px', textAlign: 'right' }}>{msg.time}</span>
              </div>
              {msg.role === 'user' && (
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={16} color="#FFFFFF" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading / Typing Indicator State */}
        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #1A1A2E, #FF6B00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="#FFFFFF" />
            </div>
            <div style={{ padding: '12px 16px', background: '#FFFFFF', borderRadius: '4px 14px 14px 14px', border: '1px solid #F0F0F0' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(d => (
                  <div key={d} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF6B00', animation: `bounce 1.2s ${d * 0.2}s infinite ease-in-out` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
        <textarea
          placeholder="Ask a question or select a suggested topic..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={2}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13.5px', resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: '1.5' }}
          onFocus={e => e.target.style.borderColor = '#FF6B00'}
          onBlur={e => e.target.style.borderColor = '#E5E7EB'}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isTyping}
          style={{ padding: '12px 18px', borderRadius: '12px', border: 'none', background: input.trim() && !isTyping ? 'linear-gradient(135deg, #FF6B00, #FF8C38)' : '#E5E7EB', color: input.trim() && !isTyping ? '#FFFFFF' : '#9CA3AF', cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px', transition: 'all 0.2s' }}
        >
          <Send size={16} /> Send
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
