//Api url

const url = "https://content.newtonschool.co/v1/pr/"
const Api_Key = "64e3d1b73321338e9f18e1a1"

// Event listener when the window loads all news

window.addEventListener("load", async () => {
    const response = await fetch(`${url}${Api_Key}/inshortsnews`);
    const result = await response.json();
    //console.log(result);
    bindData(result);
  });
  
  // Function to bind data
  
  function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardContainer.innerHTML = "";
    articles.forEach((result) => {
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillData(cardClone, result);
      cardContainer.appendChild(cardClone);
    });
  }
  
  // Function to reload the page
  
  function reload() {
    window.location.reload();
  }
  
  // Function to fetch news based on a specific category
  
  async function fetchNews(query) {
    const res = await fetch(`${url}${Api_Key}/inshortsnews?category=${query}`);
    const data = await res.json();
    console.log(data);
    bindData(data);
  }
  function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardContainer.innerHTML = "";
    articles.forEach((data) => {
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillData(cardClone, data);
      cardContainer.appendChild(cardClone);
    });
  }
  
  // Function to fill data into the news card template
  
  function fillData(cardClone, data) {
    const newsContent = cardClone.querySelector("#news-content");
    const newsCategory = cardClone.querySelector("#news-category");
    const newsAuthor = cardClone.querySelector("#news-author");
  
    newsContent.innerHTML = data.content + "  read more...";
    newsAuthor.innerHTML = "Author: " + data.author;
    newsCategory.innerHTML = "Category: " + data.category;
  
    newsContent.addEventListener("click", () => {
      window.open(data.url, "_blank");
    });
  
    //  for like and saved to localStorage
  
    const likeButton = cardClone.querySelector("#like");
    const isLiked = JSON.parse(localStorage.getItem("likedArticles")) || {};
  
    if (isLiked[data.content]) {
      likeButton.classList.add("fa-solid");
      likeButton.classList.remove("fa-regular");
    } else {
      likeButton.classList.add("fa-regular");
      likeButton.classList.remove("fa-solid");
    }
  
    likeButton.addEventListener("click", () => {
      isLiked[data.content] = !isLiked[data.content];
      updateLikeButton();
  
      localStorage.setItem("likedArticles", JSON.stringify(isLiked));
    });
  
    function updateLikeButton() {
      if (isLiked[data.content]) {
        likeButton.classList.add("fa-solid");
        likeButton.classList.remove("fa-regular");
      } else {
        likeButton.classList.add("fa-regular");
        likeButton.classList.remove("fa-solid");
      }
    }
  }
  
  // handle click events on navigation items
  
  let curSelectedNav = null;
  function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
  }