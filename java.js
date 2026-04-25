// SEARCH FORM (hero form)//
const form = document.querySelector("form");

if (form) {
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
}



// MODAL FUNCTIONS// 
function openForm(type) {
  const modal = document.getElementById("formModal");
  const title = document.getElementById("formTitle");

  if (!modal) return;

  modal.style.display = "block";

  if (type === "lost") {
    title.innerText = "Submit Lost Item";
  } else {
    title.innerText = "Submit Found Item";
  }
}

function closeForm() {
  const modal = document.getElementById("formModal");
  if (modal) modal.style.display = "none";
}


    
// MODAL FORM SUBMIT// 
const modalForm = document.getElementById("modalForm");

if (modalForm) {
  modalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Item submitted successfully!");
    closeForm();
  });
}