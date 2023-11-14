const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");

const showMoreBtn = document.getElementById("showmore-btn");
import { accesskey } from "./assets/data.js";

import Data from "./assets/data.js";

window.addEventListener("load", () => {
  let keyword = "";
  let page = 1;
  let desc;

  async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;
    let res;
    let data;
    let result;
    try {
      res = await fetch(url);
      data = await res.json();
      result = data.results;
      console.log(result);
    } catch (error) {
      if (error) {
        result = Data.results;
        console.log(error);
      }
    }

    if (page == 1) {
      searchResults.innerHTML = "";
    }

    // const result = data.results || Data.results;
    console.log(result);
    result.map((result) => {
      // desc?.lastChild?.addEventListener("click", () => {
      //   // let count =desc.firstChild.trim;
      //   console.log(count);
      //   // console.log();
      // });
      const image = document.createElement("img");
      const boxDiv = document.createElement("div");
      desc = document.createElement("p");
      desc.innerHTML = `${result.likes}  <i class="fa fa-heart"></i>`;
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      boxDiv.appendChild(imageLink);
      boxDiv.appendChild(desc);
      searchResults.appendChild(boxDiv);

      // console.log(desc.lastChild);
    });
    showMoreBtn.style.display = "block";
  }
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e.returnValue);
    page = 1;
    searchImage();
  });

  showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
  });
});
