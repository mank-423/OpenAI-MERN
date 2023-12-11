const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const port = process.env.PORT;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Correct usage of OpenAI API method
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 150,
    });

    res.send(completion.data.choices[0].text);


  } catch (error) {
    console.error('Error processing OpenAI request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
