const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* ===================== MODAL ===================== */
const openButtons = document.querySelectorAll(".open-modal");
const modal = document.getElementById("registerModal");
const closeModal = document.getElementById("closeModal");
const registerForm = document.getElementById("registerForm");
const successMessage = document.getElementById("successMessage");

openButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("show");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  successMessage.classList.remove("show");
  registerForm.reset();
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    successMessage.classList.remove("show");
    registerForm.reset();
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  successMessage.classList.add("show");

  setTimeout(() => {
    modal.classList.remove("show");
    successMessage.classList.remove("show");
    registerForm.reset();
  }, 1800);
});