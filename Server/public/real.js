
winston.INFO("socket");

const socket = io();


socket.on("new success", (message) => alert(message));

document.querySelector("#newProduct").addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const category = document.querySelector("#category").value;
  const poster = document.querySelector("#poster").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const description = document.querySelector("#description").value;
  const data = {};
  if (title) {
    data.title = title;
  }
  if (category){
    data.category = category;
  }
  if (poster) {
    data.poster = poster;
  }
  if (price) {
    data.price = price;
  }
  if (stock) {
    data.stock = stock;
  }
  if (description) {
    data.description = description;
  }
  winston.INFO(data);
  socket.emit("new product", data);
});
