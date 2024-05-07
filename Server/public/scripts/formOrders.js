const selector = document.querySelector("#create");
selector.addEventListener("click", async () => {
  try {
    const data = {
      product: document.querySelector("#product").value
    };
    document.querySelector("#cuantity").value &&
      (data.cuantity = document.querySelector("#cuantity").value);
    document.querySelector("#user").value &&
      (data.user = document.querySelector("#user").value);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/orders", opts);
    response = await response.json();
    response.statusCode === 201
      ? alert("order created!") && location.replace("/")
      : alert("ERROR: " + response.message);
  } catch (error) {
    alert(error.message);
  }
});