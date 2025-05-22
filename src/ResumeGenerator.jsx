import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)

export default function ResumeGenerator() {
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [experience, setExperience] = useState('')
  const [summary, setSummary] = useState('')
  const [resume, setResume] = useState('')
  const [loading, setLoading] = useState(false)

  async function generateResume() {
    setLoading(true)
    const prompt = `
Create a professional resume summary for a candidate with:
Name: ${name}
College: ${college}
Experience: ${experience}
Summary: ${summary}
    `
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      })
      setResume(response.data.choices[0].message.content)
    } catch (error) {
      setResume('Error generating resume: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Resume Generator</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />
      <input
        placeholder="College"
        value={college}
        onChange={e => setCollege(e.target.value)}
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />
      <input
        placeholder="Experience (company names)"
        value={experience}
        onChange={e => setExperience(e.target.value)}
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />
      <textarea
        placeholder="Summary / Skills"
        value={summary}
        onChange={e => setSummary(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />
      <button onClick={generateResume} disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Generating...' : 'Generate Resume'}
      </button>
      <pre
        style={{
          marginTop: 20,
          whiteSpace: 'pre-wrap',
          backgroundColor: '#f0f0f0',
          padding: 12,
          borderRadius: 4,
          minHeight: 150,
        }}
      >
        {resume}
      </pre>
    </div>
  )
}
