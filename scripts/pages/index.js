import {photographerFactory} from "../factories/index.js"

async function getPhotographers() {
  const res = await fetch("data/photographers.json", {
    headers: {
      Accept: "application/json",
    },
  });

  const data = await res.json();

/*si les données sont inexistantes dans localStorage alors retourne les données
  à l'interieur*/
  if (localStorage.getItem("data") == null) {
    // convertit une valeur JS en chaine JSON
    localStorage.setItem("data", JSON.stringify(data));
  }
  return {
    //mettre les données fetch par localstorage
    photographers: JSON.parse(localStorage.getItem("data")).photographers

    // photographers: [...data.photographers], correction linter
  };
}

async function displayData(photographers) {
  // rattachement const a la classe 
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);

}

init();
    
