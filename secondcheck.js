require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const filetxt = fs.readFileSync('text.env', 'utf-8');

//function to check if generated response is correct
async function secondCheck(generatedResponse,socket,question){
    const content = process.env.CHECK
    .replace('${filetxt}', filetxt)
    .replace('${question}',question )
    .replace('${generatedResponse}',generatedResponse)
    ;

    const completions = await openai.chat.completions.create({
        messages: [{role:'user', content: content}],
        model: "gpt-3.5-turbo-0125"
    })

    let response = completions.choices[0].message.content;
    socket.emit('reply', response);

}

module.exports = secondCheck;