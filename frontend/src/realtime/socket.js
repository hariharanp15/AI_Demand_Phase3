const socket = new WebSocket("ws://localhost:8000/realtime/dashboard");

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
};

export default socket;