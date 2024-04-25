const { OpenAI } = require('openai');
const secondCheck = require('./secondcheck');
require('dotenv').config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//function that calls my fine tuned model
async function AskBot(question,socket){
    const completions = await openai.chat.completions.create({
        messages: [{role:'user', content: question}],
        model: process.env.MODEL
    })

    let response = completions.choices[0].message.content;
    console.log(response);
    secondCheck(response,socket,question);
}

module.exports = AskBot;