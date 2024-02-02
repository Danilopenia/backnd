const socket = io();

const user = {};

Swal.fire({
  title: "type you nickname",
  input: "text",
  inputValidator: (nickname) => !nickname && "type your nickname!",
  allowOutsideClick: false,
}).then((obj) => {
  user.name = obj.value;
  document.querySelector("#name").innerHTML = obj.value;
  socket.emit("user", user);
});

const newChat = document.querySelector("#text");
newChat.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    socket.emit("new chat", { name: user.name, message: newChat.value });
    newChat.value = "";
  }
});

socket.on("all", (data) => {
  data = data
    .map(
      (each) =>
        `<p><span class="fw-bolder">${each.name}</span>${each.message}</p>`
    )
    .join("");
  document.querySelector("#chats").innerHTML = data;
});
