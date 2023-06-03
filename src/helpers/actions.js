window.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("mb-menu");
  const mbLinks = document.getElementById("mobile-links");
  const btnMsg = document.getElementById("close-msg");
  const alertElem = document.getElementById("alert");

  btnMenu.addEventListener("click", () => {
    mbLinks.classList.toggle("show");
  });

  btnMsg.addEventListener("click", () => {
    alertElem.style.display = "none";
  })

});
