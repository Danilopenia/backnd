const selector = document.querySelector("#pagar");
selector.addEventListener("click", async (event) => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/payments/checkout", opts).then((res)=> res.json()).then((res)=>{console.log(res.url)
        location.replace(res.url)
    });
    //response = await response.json();
    //habia un log(response)
  } catch (error) {
    alert(error.message);
  }});