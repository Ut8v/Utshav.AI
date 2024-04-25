const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config();
const { OpenAI } = require('openai');
const fs = require('fs');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/views')); 
app.use(express.static(__dirname + '/public')); 

app.use(express.urlencoded({extended:true}));

app.use(express.json());

const filetxt = fs.readFileSync('text.env', 'utf-8');

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', (socket)=>{
    console.log('user connected');
    socket.emit('reply', 'Hello, This is Utshav.AI. How can I assist you?')

    socket.on('message', async(message)=>{
        console.log(message);

        try{
            AskBot(message,socket);

        }catch(err){
            
        }
    })
})



async function AskBot(question,socket){
    const completions = await openai.chat.completions.create({
        messages: [{role:'user', content: question}],
        model: "ft:gpt-3.5-turbo-0125:personal:utshavaiv3:9HvxHRjw"
    })

    let response = completions.choices[0].message.content;
    console.log(response);
    secondCheck(response,socket,question);
}
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

server.listen(3000,()=>{
    console.log('Server running')
})