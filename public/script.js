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
    chatMessages.appendChild(messageDiv);
    messageDiv.style.margin = '2px';

}

  