const messages = document.getElementById("messages");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = sender;
    msg.innerText = text;
    messages.appendChild(msg);
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value;

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    botReply(text);
}

function botReply(userText) {

    addMessage("Typing...", "bot");

    fetch("/chatbot/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText })
    })
    .then(res => res.json())
    .then(data => {
        if (messages.lastChild) {
            messages.lastChild.remove();
        }
        addMessage(data.reply, "bot");
    })
    .catch(err => {
        if (messages.lastChild) {
            messages.lastChild.remove();
        }
        addMessage("Server error. Try again.", "bot");
    });
}