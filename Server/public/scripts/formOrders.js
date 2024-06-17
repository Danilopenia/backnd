const selector = document.querySelector("#create");
selector.addEventListener("click", async () => {
  try {
    const data = {
      product_id: document.querySelector("#productId").value
    };
    document.querySelector("#userId").value &&
      (data.user_id = document.querySelector("#userId").value);
    document.querySelector("#userId").value &&
      (data.quantity = document.querySelector("#quantity").value);
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