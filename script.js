"use strict";

var modal = document.getElementById("hire-me-modal");
var forHireButton = document.getElementById("for-hire");

forHireButton.addEventListener("click", openModal);
window.addEventListener("click", clickOutside);

function openModal() {
  modal.style.display = "block";
}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
