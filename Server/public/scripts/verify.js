const selector = document.querySelector("#verify");
selector.addEventListener("click", async () => {
    try {
        const data = {
            email: document.querySelector("#email").value,
            verifiedCode: document.querySelector("#verifyCode").value
        };
        console.log();
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        let response = await fetch("/api/sessions/verify", opts)
        response = await response.json()
        response.statusCode === 200
            ? location.replace("/sessions/login")
            : alert("ERROR: " + response.message);

    } catch (error) {
        alert(error.message)
    }
})