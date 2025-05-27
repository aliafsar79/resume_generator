import express from 'express';
const app = express();

app.get('/test', (req, res) => {
  res.send('Hello test');
});

app.listen(3000, () => {
  console.log('Test server running');
});
