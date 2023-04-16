"use strict";
const hobbyText = document.getElementById("hobby-text");
const hobbies = ["python", "computer science", "neovim"];
const random_hobby = hobbies[Math.floor(Math.random()*hobbies.length)];

hobbyText.textContent = random_hobby;