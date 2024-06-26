
  fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
   //habia un log(res)
    if(res.statusCode===200) {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#registerButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#loginButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#verifyButton"))
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("token");
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" /* , token */ },
          };
          let response = await fetch("/api/sessions/signout", opts);
          response = await response.json();
          if (response.statusCode === 200) {
            alert(response.message);
            localStorage.removeItem("token");
            location.replace("/");
          }
        } catch (error) {
          winston.ERROR(error.message);
        }
      });
    } else {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#formButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#formOrdersButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#ordersButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#signout"))
      document.querySelector(".product").removeChild(document.querySelector(".addTo"))
    }
    if (res.response?.role===0) {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#formButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#formOrdersButton"))
    } else if (res.response?.role===1) {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#formOrdersButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#formButton"))
    } else if (res.response?.role===2){
      document.querySelector("#product").removeChild(document.querySelector(".addToCart"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#ordersButton"))
    }
  });