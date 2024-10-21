import express from 'express';

const app = express();

app.use(express.json());

app.get('/test', (_, res) => {
  res.send('Hello from SWC + TypeScript!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
