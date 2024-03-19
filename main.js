import { heading } from "./headingAndSort.js";

//container element
const main = document.querySelector(".container");

//function that renders all HTML
const renderPage = () => {
  const allHTML = `
    ${heading()}
    <div class='playlist-container'></div>
 `;
  main.innerHTML = allHTML;
};

renderPage();
