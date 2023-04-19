"use strict";
const hobbyText = document.getElementById("hobby-text");
function changeHobbyText() {
    const hobbies = ["python", "computer science", "neovim", "linux", "programming", "graphic design"];
    const random_hobby = hobbies[Math.floor(Math.random()*hobbies.length)];
    hobbyText.textContent = random_hobby;
};

// Run on "init"
changeHobbyText()

// todo
// make it so that the random hobby isn't what is currently selected
hobbyText.addEventListener("click", () => {
    changeHobbyText();
});