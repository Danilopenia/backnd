winston.INFO("socket");

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

document.querySelector("#newOrder").addEventListener("click", (event) => {
  event.preventDefault();
  const product = document.querySelector("#product").value;
  const cuantity = document.querySelector("#cuantity").value;
  const user = document.querySelector("#user").value;
  const data = {};
  if (product) {
    data.product = product;
  }
  if (cuantity) {
    data.cuantity = cuantity;
  }
  if (user) {
    data.user = user;
  }
 winston.INFO(data);
  socket.emit("new order", data);
});
