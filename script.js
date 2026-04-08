document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('clearButton').addEventListener('click', clearChat);
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    let userInput = document.getElementById('userInput').value;
    if (userInput.trim() === "") return;

    let chatBox = document.getElementById('chatBox');
    let emptyMessage = document.getElementById('emptyMessage');

    if (emptyMessage) {
        emptyMessage.style.display = 'none';
    }

    let lastContainer = chatBox.lastElementChild;
    let userMessageContainer;

    if (lastContainer && lastContainer.classList.contains('botContainer__chat-userContainer')) {
        userMessageContainer = lastContainer;
    } else {
        userMessageContainer = document.createElement('div');
        userMessageContainer.className = 'botContainer__chat-userContainer';
        chatBox.appendChild(userMessageContainer);
    }

    userMessageContainer.innerHTML += `<p class="botContainer__chat-userMessage">${userInput}</p>`;
    
    document.getElementById('userInput').value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        let botResponse = getBotResponse(userInput);
        
        let lastContainer = chatBox.lastElementChild;
        let botMessageContainer;

        if (lastContainer && lastContainer.classList.contains('botContainer__chat-botContainer')) {
            botMessageContainer = lastContainer;
        } else {
            botMessageContainer = document.createElement('div');
            botMessageContainer.className = 'botContainer__chat-botContainer';
            chatBox.appendChild(botMessageContainer);
        }

        botMessageContainer.innerHTML += `<p class='botContainer__chat-botMessage'><span>${botResponse}</span></p>`;
        chatBox.scrollTop = chatBox.scrollHeight; 
    }, 500);
}

function getBotResponse(input) {
    let message = input.toLowerCase();
    if (message.includes("hola")) {
        return "¡Hola!";
    } else if (message.includes("adios")) {
        return "¡Hasta luego!";
    }
    else if (message.includes("estoy") && (message.includes("bien") || message.includes("genial") || message.includes("feliz"))) {
        return "¡Me alegra escuchar eso!";
    }
    else if (message.includes("estas?") || message.includes("cómo estás") || message.includes("como estas")) {
        return "¡Estoy bien, gracias! ¿Y tú?";
    } else {
        return "No entiendo a tu pregunta vuelve a intentarlo.";
    }
}

function clearChat() {
    let chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = 
        `<div class='botContainer__chat-botContainer' id="emptyMessage">
            <p class='botContainer__chat-botEmptyMessage'>
                Digita algo para iniciar la conversación.
            </p>
        </div>`;
}
