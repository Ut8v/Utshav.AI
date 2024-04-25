const socket = io();
const chatMessages = document.getElementById('chat-messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const message = messageInput.value;

    socket.emit('message',message);
    
    addMessage('You', message);
    messageInput.value = '';

})

socket.on('reply', function(reply){
    addMessage('Utshav.AI', reply)
})

function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${message}`;
    messageDiv.style.margin = '2px';
    messageDiv.style.padding = '5px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.backgroundColor = sender === 'Utshav.AI' ? 'white' : 'green'; //if utshav ai white; else green
    messageDiv.style.color = '#000'; 
    chatMessages.appendChild(messageDiv);
}


  