const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messageDiv = document.getElementById('messages');

let myId = null;

socket.on('connect', () => {
    myId = socket.id;
    console.log("Connected with id : ", myId);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if(!text) {
        return;
    }
    socket.emit("chat:message", text);
    input.value = "";
})

socket.on("chat:message", (data) => {
    const div = document.createElement('div');
    div.classList.add("msg");
    if(data.id == myId) {
        div.classList.add("me");
        div.textContent = `${data.text}`;
    }
    else {
        div.classList.add("other");
        div.textContent = `${data.id.slice(0, 5)}: ${data.text}`
    }

    messageDiv.appendChild(div);
    messageDiv.scrollTop = messageDiv.scrollHeight;
})