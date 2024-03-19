// HTML to render playlist images.
// Takes an array of playlist items as an argument to render either all of the items or a filtered array of items.
export const playlist = (items) => {
  let html = "<section class='section'>";

  for (const item of items) {
    html += `
       <div>
         <img src="${item.image}" class="item" alt="Image">
       </div>`;
  }

  html += "</section>";
  return html;
};
