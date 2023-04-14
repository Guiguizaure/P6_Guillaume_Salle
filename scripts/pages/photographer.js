import {formulaire} from "../utils/contactForm.js"
import {MediaFactorie} from "../factories/photographer.js"
import {handleButtonsOptions, sortData} from "../utils/selectBox.js"
import {enableLightboxListeners} from "../utils/slider.js"



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
  // console.log(data);
  // console.log(photographerId)
  
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
  console.log(totalLikes)

// function IncrementTotalLikes() {
//    const likesTotal = document.querySelector(".numberLikesBox");
//    handleEventLike()
//    console.log(totalLikes)
//   }
// IncrementTotalLikes();

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
  




export async function displayMedia(portfolioArray) {

  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("photographer"));
  // const { } =
  await getData(photographerId);

    const portfolioSection = document.querySelector(".portfolio-section");
    const lightboxSection = document.querySelector(".slider-modal");
    portfolioSection.innerHTML = "";

    portfolioArray.forEach((portfolioItem) => {
      const mediaModel = new MediaFactorie(portfolioItem); 

      const mediaCardDOM = mediaModel.getMediaCardDOM();
      const mediaSlidesDOM = mediaModel.getMediaSlidesDOM();

      portfolioSection.innerHTML += mediaCardDOM;
      lightboxSection.innerHTML += mediaSlidesDOM;
      
    });
  

    const incrementButton = document.querySelectorAll(".increment-likes");
    const decrementButton = document.querySelectorAll(".decrement-likes");
    const likesTotal = document.querySelector(".numberLikesBox");
    // const likeCards = document.querySelectorAll(".media-card-text");
    
    // Fonction pour incrémenter le nombre de likes
    function incrementLikes(button) {
      const textLike = button.parentElement.children[2];
      let textLikeValue = parseInt(textLike.innerHTML);
      textLike.innerHTML = textLikeValue - 1;
      likesTotal.innerHTML = parseInt(likesTotal.innerHTML) - 1;
      button.style.display = "none";
      button.nextElementSibling.style.display = "block";
    }
    
    // Fonction pour décrémenter le nombre de likes
    function decrementLikes(button) {
      const textLike = button.parentElement.children[2];
      let textLikeValue = parseInt(textLike.innerHTML);
      textLike.innerHTML = textLikeValue + 1;
      likesTotal.innerHTML = parseInt(likesTotal.innerHTML) + 1;
      button.style.display = "none";
      button.previousElementSibling.style.display = "block";
    }
    
    // Boucle pour ajouter les écouteurs d'événements aux boutons
    for (let i = 0; i < incrementButton.length; i++) {
      // Événement de clic pour incrémenter les likes
      incrementButton[i].addEventListener("click", function(event) {
        incrementLikes(event.target);
        event.preventDefault();
      });
      // Événement de clic pour décrémenter les likes
      decrementButton[i].addEventListener("click", function(event) {
        decrementLikes(event.target);
        event.preventDefault();
      });
      // Événement de pression de touche pour incrémenter les likes avec la touche Entrée
      incrementButton[i].addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          incrementLikes(event.target);
          event.preventDefault();
        }
      });
      // Événement de pression de touche pour décrémenter les likes avec la touche Entrée
      decrementButton[i].addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          decrementLikes(event.target);
          event.preventDefault();
        }
      });
    }
    

  enableLightboxListeners();
}




    //initialisation de la page medias
async function init() {
      // chaine de requete 
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get("photographer"));
      

      const { photographer, portfolio, pathName, totalLikes, dayPrice } =
        await getData(photographerId);
      displayPhotographerInfo(photographer);
    
      // Methode sort qui trie les element d'un tableau 
      const triPopularite = portfolio.sort((a, b) => {
        return a.likes < b.likes ? 1 : -1;
      });
    
      // par defaut ont tri par Popularité dans la page médias (à l'ouverture)
      displayMedia(triPopularite, photographer);

      // likesInfos(totalLikes, dayPrice);
    
      displayPhotographerInfo(photographer);
    
      handleButtonsOptions();
    
      sortData(portfolio, photographer, totalLikes, dayPrice);
    
      formulaire(pathName);
    
      // enableLightboxListeners();
}
    
init();


  




