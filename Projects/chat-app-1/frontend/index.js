const socket = io('http://localhost:5002');

const form = document.getElementById("form");
const input = document.getElementById("input");
const messageDiv = document.getElementById('messages');
const roomButtons = document.querySelectorAll('.room-btn')

let myId = null;
let currentRoom = 'general';

socket.on('connect', () => {
    myId = socket.id;
    joinRoom("general");
    console.log("Connected with id : ", myId);
})

function joinRoom(room) {
    currentRoom = room;
    socket.emit('join-room', room);

    messageDiv.innerHTML = "";
    roomButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelector(`[data-room="${room}"]`).classList.add("active");
}

roomButtons.forEach((btn) => {
    btn.addEventListener('click', () => joinRoom(btn.dataset.room));
})


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if(!text) {
        return;
    }
    socket.emit("chat:message", { room : currentRoom, text });
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
        div.textContent = `${data.id.slice(0, 5)}: ${data.text}`
    }

    messageDiv.appendChild(div);
    messageDiv.scrollTop = messageDiv.scrollHeight;
})

socket.on('user-joined', (msg) => {
    const div = document.createElement("div");
    div.classList.add('msg');
    div.style.textAlign = "center";
    div.style.opacity = "0.5";
    div.textContent = msg;
    messageDiv.appendChild(div);
});

