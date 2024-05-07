const selector = document.querySelector("#login")
selector.addEventListener("click", async () => {
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        //console.log(data);
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/sessions/login", opts)
        response = await response.json()
        response.statusCode === 200
            ? location.replace("/") /////// solo /
            : alert("ERROR: " + response.message);

    } catch (error) {
        alert(error.message)
    }
})