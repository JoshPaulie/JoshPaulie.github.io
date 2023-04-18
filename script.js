"use strict";
// Broken and don't have time to make branch
function changeHobbyText() {
    const hobbyText = document.getElementById("hobby-text");
    const hobbies = ["python", "computer science", "neovim", "linux", "programming", "graphic design"];
    const random_hobby = hobbies[Math.floor(Math.random()*hobbies.length)];
    hobbyText.textContent = random_hobby;
};

changeHobbyText()

hobbyText.addEventListener("click", () => {
    changeHobbyText();
});