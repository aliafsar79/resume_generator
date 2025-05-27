import React, { useState } from 'react';

export default function ResumeGenerator() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
    projects: '',
    certifications: ''
  });

  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function generateResume() {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setResume(data.result || data.error);
    } catch (err) {
      setResume('Error: ' + err.message);
    }
    setLoading(false);
    setCopied(false);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{
      maxWidth: 750,
      margin: 'auto',
      padding: 24,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9fbff',
      borderRadius: 10,
      border: '1px solid #e0e0e0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#3f51b5' }}>📝 AI-Powered Resume Generator</h2>

      <p style={{
        backgroundColor: '#e8f0fe',
        padding: '10px 16px',
        borderRadius: 6,
        fontSize: 14,
        color: '#2c3e50',
        marginBottom: 20
      }}>
        🚀 This is a free preview version. Premium features like PDF download, custom styling, and job-specific tailoring will be available soon!
      </p>

      {[
        { label: 'Full Name', name: 'name' },
        { label: 'Email', name: 'email' },
        { label: 'Phone', name: 'phone' },
        { label: 'LinkedIn URL', name: 'linkedin' },
        { label: 'Professional Summary', name: 'summary', isTextArea: true },
        { label: 'Skills (comma separated)', name: 'skills', isTextArea: true },
        { label: 'Work Experience', name: 'experience', isTextArea: true },
        { label: 'Education', name: 'education', isTextArea: true },
        { label: 'Projects', name: 'projects', isTextArea: true },
        { label: 'Certifications & Awards', name: 'certifications', isTextArea: true },
      ].map(({ label, name, isTextArea }) => (
        <div key={name} style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>{label}</label>
          {isTextArea ? (
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              rows={4}
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            />
          ) : (
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            />
          )}
        </div>
      ))}

      <button
        onClick={generateResume}
        disabled={loading}
        style={{
          padding: '12px 24px',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          marginTop: 8
        }}
      >
        {loading ? 'Generating...' : 'Generate Resume'}
      </button>

      {resume && (
        <>
          <div style={{
            marginTop: 20,
            whiteSpace: 'pre-wrap',
            backgroundColor: '#f4f6f8',
            padding: 16,
            borderRadius: 6,
            border: '1px solid #ddd',
            position: 'relative'
          }}>
            <button
              onClick={copyToClipboard}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: copied ? '#4caf50' : '#2196f3',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <pre style={{ margin: 0 }}>{resume}</pre>
          </div>
        </>
      )}
    </div>
  );
}
