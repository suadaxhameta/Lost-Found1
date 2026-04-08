const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const item = document.getElementById("item").value;
  const location = document.getElementById("location").value;

  if (item.trim() === "" || location === "Select") {
    alert("Please fill in all required fields.");
    return;
  }

  alert("Search submitted successfully!");
});