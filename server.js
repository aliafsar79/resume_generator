import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize OpenAI (OpenRouter) client
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});

app.post('/api/generate-resume', async (req, res) => {
  const {
    name, email, phone, linkedin,
    summary, skills, experience,
    education, projects, certifications
  } = req.body;

  const prompt = `
Create a professional, well-structured resume based on the following details:

Name: ${name}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedin}

Professional Summary:
${summary}

Skills (comma separated):
${skills}

Work Experience:
${experience}

Education:
${education}

Projects:
${projects}

Certifications and Awards:
${certifications}

Format the resume so it is ready to be copied and presented to a potential employer.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'anthropic/claude-2',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7
    });
    res.json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenRouter Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
