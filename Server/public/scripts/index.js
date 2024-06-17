const params = new URLSearchParams(location.search);
const selector = document.querySelector("#serachCategory");
selector.value = params.get("category");
document.querySelector("#search").addEventListener("click", async (event) => {
  try {
    const text = selector.value;
    location.search = "category=" + text;
  } catch (error) {
    alert(error.message);
  }
});
