import { getItems } from "./getItems.js";
import { playlist } from "./playlist.js";

//function to handle playlist rendering on page.
const handleRendering = async () => {
  const playlistItems = await getItems();
  const searchBar = document.querySelector(".input");
  const playlistContainer = document.querySelector(".playlist-container");

  // Initial render of all items
  playlistContainer.innerHTML = playlist(playlistItems);

  //playlist filtering logic for sorting by title, tier, popularity
  const tierOrPopularityPopup = () => {
    let tierOrPopularity;
    do {
      tierOrPopularity = prompt("Please enter 'tier' or 'popularity'");
      if (!tierOrPopularity) {
        return "Please enter 'tier' or 'popularity'";
      }
    } while (
      tierOrPopularity.toLowerCase() !== "tier" &&
      tierOrPopularity.toLowerCase() !== "popularity"
    );

    return tierOrPopularity.toLowerCase();
  };

  //playlist filtering logic for sorting by title, tier, popularity
  searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    let filteredPlaylist;

    // Check if the search term is a number
    if (!isNaN(searchTerm) && searchTerm !== "") {
      const searchCriteria = tierOrPopularityPopup();
      if (searchCriteria) {
        if (searchCriteria === "popularity") {
          filteredPlaylist = playlistItems.filter(
            (item) => item.popularity.toString() === searchTerm
          );
        } else if (searchCriteria === "tier") {
          filteredPlaylist = playlistItems.filter(
            (item) => item.tier.toString() === searchTerm
          );
        }
      } else {
        // If the user cancels or inputs invalid criteria, show all items
        filteredPlaylist = playlistItems;
      }
    } else {
      // Search by title if the search term is not a number
      filteredPlaylist = playlistItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
    }

    // Check if filteredPlaylist is empty
    if (filteredPlaylist.length === 0) {
      // Display a message if no items are found
      playlistContainer.innerHTML = '<p class="warning">Item not found</p>';
    } else {
      // Re-render the playlist with filtered items
      playlistContainer.innerHTML = playlist(filteredPlaylist);
    }
  });
};

//html for heading (title, and text input)
export const heading = () => {
  let html = `
  <div class="heading">
  <div class="left">Turning Point <b>Playlists</b></div>
  <div class="right">
     <div class="input-icons">
       <i class="fa fa-search icon"></i>
       <input class='input' type='text' placeholder="title | popularity | tier">
     </div>
  </div>
 </div>

  `;

  return html;
};

// Adding event listener to ensure handleRendering runs after DOM content is loaded
//ensures that the playlist container is populated with the playlist content and any necessary event listeners are attached before the user interacts with the page
document.addEventListener("DOMContentLoaded", handleRendering);
