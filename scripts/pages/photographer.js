import {formulaire} from "../utils/contactForm.js"
import {MediaFactorie} from "../factories/photographer.js"
import {handleButtonsOptions, sortData} from "../utils/selectBox.js"
import {enableLightboxListeners} from "../utils/slider.js"
import { likesInfos } from "../utils/static.js";

// Data recuperer par local storage
async function getData(photographerId) {
  
  const data = JSON.parse(localStorage.getItem("data"));
  
  //photographer par id
  const photographer = data.photographers.find((p) => p.id === photographerId);
 
  //data media
  const portfolio = data.media
    .filter((obj) => obj.photographerId === photographerId)
    .map((obj) => obj);
  
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
                          <div class="photographer_infos tabindex="0" ">
                            <h1 aria-label= "nom ${name}" tabindex="0">${name}</h1>
                            <p class="location" tabindex="0" aria-label= "${city}, ${country}">${city}, ${country}</p>
                            <p class="tagline" tabindex="0" aria-label="${tagline}">${tagline}</p>
                          </div>
                            
                          <button role="button" 
                            aria-haspopup="dialog"
                            aria-controls="dialog"
                            class="contact_button" 
                            aria-label="Contacter ${name}">
                                  Contactez-moi
                          </button>
                          
                          <img src=${picture} aria-hidden="true" class="portraitMedia">
          `;
}
  




export async function displayMedia(portfolioArray, sortOption) {

  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("photographer"));
  
  await getData(photographerId);


  const portfolioSection = document.querySelector(".portfolio-section");
  const lightboxSection = document.querySelector(".slider-modal");

  portfolioSection.innerHTML = "";
  const slides = document.querySelectorAll('.slide')
  slides.forEach(slide => {
    slide.remove()
  });

  portfolioArray.forEach((portfolioItem) => {
    const mediaModel = new MediaFactorie(portfolioItem); 

    const mediaCardDOM = mediaModel.getMediaCardDOM();
    const mediaSlidesDOM = mediaModel.getMediaSlidesDOM();

    portfolioSection.innerHTML += mediaCardDOM;
    lightboxSection.innerHTML += mediaSlidesDOM;
  });

  //Like event
  const totalLikesBox = document.querySelector('.numberLikesBox');
  const likeButtons = document.querySelectorAll('.infos-Likes-Icon');
  const likesElements = document.querySelectorAll('.img-likes');

  let totalLikeItem = parseInt(totalLikesBox.textContent);
  
  let likes = Array.from(likesElements).map(element => parseInt(element.textContent));
  let isLikedArray = Array.from(likeButtons).map(() => false);
  
  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener('click', function() {
      const isLiked = isLikedArray[index];
      const likesElement = likesElements[index];
  
      if (isLiked) {
        likes[index]--;
        totalLikeItem--
      } else {
        likes[index]++;
        totalLikeItem++
      }
      
      totalLikesBox.textContent = `${totalLikeItem}`;
      likesElement.textContent = `${likes[index]}`;
      likeButton.setAttribute('aria-label', isLiked ? 'Like' : 'Unlike');
      isLikedArray[index] = !isLiked;
    });
  
    likeButton.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        likeButton.click();
      }
    });
  });
  enableLightboxListeners(portfolioArray, sortOption);
}




//initialisation de la page medias
async function init() {
    // chaine de requete 
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("photographer"));
    

    const { photographer, portfolio, pathName, totalLikes, dayPrice } = await getData(photographerId);
    displayPhotographerInfo(photographer);
  
    // Methode sort qui trie les element d'un tableau 
    const triPopularite = portfolio.sort((a, b) => {
      return a.likes < b.likes ? 1 : -1;
    });
  
    // par defaut ont tri par Popularité dans la page médias (à l'ouverture)
    displayMedia(triPopularite, 'Popularité');
  
    displayPhotographerInfo(photographer);
  
    handleButtonsOptions();
  
    sortData(portfolio);

    likesInfos(totalLikes, dayPrice);
  
    formulaire(pathName);

    
}
    
init();


  




