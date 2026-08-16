import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C38)', padding: '48px 40px 60px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '24px' }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px' }}>Contact Us</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>Get in touch with the EduPortal support team</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '-20px auto 0', padding: '0 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px', alignItems: 'start' }}>

          {/* Info */}
          <div>
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Get in Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: <Mail size={20} color="var(--primary)" />, label: 'Email', value: 'support@eduportal.in' },
                  { icon: <Phone size={20} color="#3B82F6" />, label: 'Phone', value: '+91 98765 43200' },
                  { icon: <MapPin size={20} color="#10B981" />, label: 'Address', value: 'KIT Campus, Coimbatore, Tamil Nadu 641402' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--bg-base)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', marginTop: '28px', paddingTop: '24px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Office Hours</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Mon – Fri: 9:00 AM – 5:30 PM IST</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: '32px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(16,185,129,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={32} color="#10B981" />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn btn-outline" style={{ cursor: 'pointer' }}>Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Send a Message</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Full Name</label>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe"
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-base)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Email</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com"
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-base)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Subject</label>
                    <input required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="How can we help?"
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-base)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Message</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Describe your query in detail..."
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-base)', fontFamily: 'inherit', fontSize: '0.9rem', resize: 'vertical', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px', cursor: 'pointer', gap: '8px' }}>
                    <Send size={16} /> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
