"use strict";

// Pick a random hobby
const hobbyText = document.getElementById("hobby-text");
const hobbies = ["python", "computer science", "neovim", "linux", "programming", "graphic design"];
let currentHobby = "";

function changeHobbyText() {
  const availableHobbies = hobbies.filter((hobby) => hobby != currentHobby);
  const random_hobby = availableHobbies[Math.floor(Math.random() * availableHobbies.length)];
  currentHobby = random_hobby;
  hobbyText.textContent = random_hobby;
}

// on page load
changeHobbyText();

// on text click
hobbyText.addEventListener("click", () => {
  changeHobbyText();
});
