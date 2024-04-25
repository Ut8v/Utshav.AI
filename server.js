const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config();
const AskBot = require('./askbot');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/views')); 
app.use(express.static(__dirname + '/public')); 

app.use(express.urlencoded({extended:true}));

app.use(express.json());


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


server.listen(3000,()=>{
    console.log('Server running')
})