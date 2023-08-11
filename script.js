let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let favoriteHeroes = [];
let favButton=document.querySelector('.fav-btn');


let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 3) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener(
  "click",
  (getRsult = async () => {
    if (input.value.trim().length ==1) {
      alert("Input cannot be of one word.");
    }
    
    showContainer.innerHTML = "";
    
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    // console.log(jsonData.data["results"]);
    jsonData.data["results"].forEach((element) => {
      let heroData = {
        heroName: element.name,
        heroDescription: element.description,
        heroImage: element.thumbnail["path"] + "." + element.thumbnail["extension"]
      }
      showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${heroData.heroImage}"/></div>
        <div class="character-name">${heroData.heroName}</div>
        <div class="character-description">${heroData.heroDescription}</div>
        <button class="fav-btn">Add To Favorite</button>
        </div>`;
        
        favButton = showContainer.querySelector(".fav-btn");
      favButton.addEventListener("click", () => {
        favoriteHeroes.push(heroData);
        localStorage.setItem("favoriteHeroes", JSON.stringify(favoriteHeroes));
        updateFavoriteList(); // Call the function to update the favorite list display
        console.log(favoriteHeroes);
      });
    });
    })
);



function updateFavoriteList() {
  let favoriteListContainer = document.getElementById("favorite-list");
  favoriteListContainer.innerHTML = ""; // Clear the existing content

  favoriteHeroes.forEach((hero) => {
    let favoriteHeroDiv = document.createElement("div");
    favoriteHeroDiv.classList.add("favorite-hero");
    favoriteHeroDiv.innerHTML = `
      <img src="${hero.heroImage}" class="favorite-hero-image">
      <div class="text-cont">
      <div class="favorite-hero-name">${hero.heroName}<span> <i class="fa-solid fa-trash"></i></span>
      </div></div>`;

    // Add the event listener to the 'span' inside the hero div
    favoriteHeroDiv.querySelector("span").addEventListener('click', () => {
      const heroIndex = favoriteHeroes.indexOf(hero);
      if (heroIndex !== -1) {
        favoriteHeroes.splice(heroIndex, 1);
        localStorage.setItem("favoriteHeroes", JSON.stringify(favoriteHeroes));
        updateFavoriteList();
      }
    });

    favoriteListContainer.appendChild(favoriteHeroDiv);
  });

  // Remove the 'animate' class from the favorite container
  document.getElementById("favorite-container").classList.remove('animate');
}


window.onload = () => {
  updateFavoriteList();
  getRsult();
};
window();
// ----------------------Add to favorite------------------------------------------//
