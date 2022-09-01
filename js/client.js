const socket = io('http://localhost:8000')
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")


const appent = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message ;
    messageElement.classList.add(position) 
    messageElement.classList.add('message') 
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInput.value
    appent(  ` You: ${message}`, 'right')
    socket.emit('send-chat-message', message)
    messageInput.value = ''
} )

const name = prompt("What's your name?")
socket.emit('new-user', name)

socket.on('user-connected', name => {
    appent(`${name} Joined The Chat`, 'left')
}
)

socket.on('recieved', data => {
    appent(`${data.name}: ${data.message}`, 'left')
}
)

socket.on('user-disconnected', name => {
    appent(`${name} Leave the Chat`, 'right')
}
)

 
