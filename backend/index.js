const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = process.env.PORT;
// Load environment variables
dotenv.config();

const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
    apiKey: process.env.OPENAI_API,
})

const openai = new OpenAIApi(config);

// Setup server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint for GPT
app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens: 512,
            temperature: 0,
            prompt: prompt,
        });

        res.send(completion.data.choices[0].text);
    } catch (error) {
        console.error('Error processing OpenAI request:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})