console.log("socket");

const socket = io();

//socket.on("welcome", (message) => alert(message));
/*socket.emit("new product", {
title: "remera",
poster: "https://i.postimg.cc/HxdvTwqJ/events.jpg",
price: 33,
stock: 44 ,
capacity: 111,
date: new Date(),
});*/
socket.on("new success", (message) => alert(message));

document.querySelector("#newProduct").addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const poster = document.querySelector("#poster").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const description = document.querySelector("#description").value;
  const data = {};
  if (title) {
    data.title = title;
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
  console.log(data);
  socket.emit("new product", data);
});
