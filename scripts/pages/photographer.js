import {formulaire} from "../utils/contactForm.js"
import {MediaFactorie} from "../factories/photographer.js"
import {handleButtonsOptions, sortData} from "../utils/selectBox.js"
import {enableLightboxListeners} from "../utils/slider.js"
import {likesInfos} from "../utils/static.js"

// Data recuperer par local storage
async function getData(photographerId) {
  // const res = await fetch("data/photographers.json", {
  //   headers: {
  //     Accept: "application/json",
  //   },
  // });
  //all data
  //const data = await res.json();
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  
  //photographer par id
  const photographer = data.photographers.find((p) => p.id === photographerId);
  
  //data media
  const portfolio = data.media
    .filter((obj) => obj.photographerId === photographerId)
    .map((obj) => obj);
  // console.log(portfolio);
  
  //data name
  const pathName = photographer.name;
  
  //likes box
  const totalLikes = portfolio.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);


  //price box
  const dayPrice = photographer.price;
    
  return {
    photographer,
    portfolio,
    pathName,
    totalLikes,
    dayPrice,
  };
}
  
  //Infos photographe dans la page média
function displayPhotographerInfo(photographer) {
    const { name, portrait, city, country, tagline } = photographer;
    const picture = `assets/photographers/${portrait}`;
    const header = document.querySelector(".photograph-header");
    header.innerHTML = `
                          <div class="photographer_infos">
                            <h1 aria-label= "nom ${name}">${name}</h1>
                            <p class="location" aria-label= "${city}, ${country}">${city}, ${country}</p>
                            <p class="tagline" aria-label="${tagline}">${tagline}</p>
                          </div>
                            
                          <button role="button" class="contact_button" onclick="displayModal() aria-label="Contacter ${name}">
                            Contactez-moi
                          </button>
                          
                          <img src=${picture} aria-hidden="true" class="portraitMedia">
          `;
}
  
export function displayMedia(portfolioArray) {

    const portfolioSection = document.querySelector(".portfolio-section");
    const lightboxSection = document.querySelector(".slider-modal");
    portfolioSection.innerHTML = "";

    portfolioArray.forEach((portfolioItem) => {
      const mediaModel = new MediaFactorie(portfolioItem);
      // console.log(portfolioItem);
      // console.log(mediaModel);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      const mediaSlidesDOM = mediaModel.getMediaSlidesDOM();
      // console.log(mediaSlidesDOM)
      portfolioSection.innerHTML += mediaCardDOM;
      lightboxSection.innerHTML += mediaSlidesDOM;
      
    });
  
    likesInfos();
}



  


  
  //initialisation de la page medias
async function init() {
    // chaine de requete 
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get("photographer"));
    
    console.log(photographerId)

    const { photographer, portfolio, pathName, totalLikes, dayPrice } =
      await getData(photographerId);
    displayPhotographerInfo(photographer);
  
    // Methode sort qui trie les element d'un tableau 
    const triPopularite = portfolio.sort((a, b) => {
      return a.likes < b.likes ? 1 : -1;
    });
  
    // par defaut ont tri par Popularité dans la page médias (à l'ouverture)
    displayMedia(triPopularite, photographer);
  
    displayPhotographerInfo(photographer);
  
    handleButtonsOptions();
  
    sortData(portfolio, photographer, totalLikes, dayPrice);
  
    formulaire(pathName);
  
    enableLightboxListeners();
}
  
init();



