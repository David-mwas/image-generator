const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");
const showMoreBtn = document.getElementById("showmore-btn");
import { accesskey } from "./assets/data.js";
import Data from "./assets/data.js";

window.addEventListener("load", () => {
  let keyword = "";
  let page = 1;

  async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;
    let res, data, result;

    try {
      res = await fetch(url);
      data = await res.json();
      result = data.results;
      console.log(result);
    } catch (error) {
      result = Data.results; // Fallback data
      console.log(error);
    }

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    result.map((result) => {
      const image = document.createElement("img");
      const boxDiv = document.createElement("div");
      const desc = document.createElement("p");

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.classList.add("download");
      downloadLink.setAttribute(
        "data-testid",
        "non-sponsored-photo-download-button"
      );
      downloadLink.title = "Download this image";
      downloadLink.href = `${result.links.download}&force=true`;
      downloadLink.download = "";
      downloadLink.target = "_blank";
      downloadLink.rel = "nofollow";
      downloadLink.innerHTML = `<i class="fa fa-download"></i>`; // Link text

      // Add event listener to the download link
      downloadLink.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default behavior
        e.stopPropagation(); // Stop the click event from bubbling up
        const link = document.createElement("a");
        link.href = downloadLink.href; // Use the download link
        link.download = ""; // Allows the download
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up
      });

      desc.innerHTML = `${result.likes} <i class="fa fa-heart"></i>`;
      desc.appendChild(downloadLink);

      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      boxDiv.appendChild(imageLink);
      boxDiv.appendChild(desc);
      searchResults.appendChild(boxDiv);
    });
    showMoreBtn.style.display = "block";
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
  });

  showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
  });
});
