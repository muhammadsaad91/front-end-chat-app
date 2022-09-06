const socket = io('https://saadfirstchatapp.herokuapp.com/')
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
const formName = document.getElementById('nameg')
const name = document.getElementById('nameh').value
const audio = new Audio('ting.mp3')
// form.addEventListener(  )

const appent = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add(position) 
    messageElement.classList.add('message') 
    messageContainer.append(messageElement);
    const messages = document.querySelector('#container');
    messages.scrollTop = messages.scrollHeight;
}

    formName.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('nameh').value
        if(name == ""){
            alert("Please enter a name")
        }else{
         socket.emit('new-user', name)
            formName.style.display = 'none'
            form.style.display = 'block'
            messageContainer.style.display = 'block'
}    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const message = messageInput.value
        if(message == ""){
            alert("Please enter a message")
        }else{
        appent(  ` You: ${message}`, 'right')
        socket.emit('send-chat-message', message)
        messageInput.value = ''
    } })
    
    socket.on('user-connected', name => {
        appent(`${name} Joined The Chat`, 'left')
        audio.play()
    }
    )
    
    socket.on('recieved', data => {
        appent(`${data.name}: ${data.message}`, 'left')
        audio.play()
    }
    )
    
    socket.on('user-disconnected', name => {
        appent(`${name} Leave the Chat`, 'right')
        audio.play()
    }
    )

