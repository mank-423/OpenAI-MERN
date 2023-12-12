const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API });

router.post('/chat', async (req, res) => {
    try {
        const { prompt } = req.body;

        // Assuming 'prompt' contains the user's message
        const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ];

        // Completion code
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 150,
        });

        // console.log(completion.choices[0].message.content);

        const reply = completion.choices[0].message.content;
        res.send(reply);


    } catch (error) {
        console.error('Error processing OpenAI request:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;