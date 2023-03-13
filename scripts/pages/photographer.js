import {formulaire} from "../utils/contactForm.js"
import {MediaFactorie} from "../factories/photographer.js"
import {handleButtonsOptions, sortData} from "../utils/selectBox.js"
import {enableLightboxListeners} from "../utils/slider.js"
// import {handleEventLike} from "../utils/static.js"
import { likesInfos } from "../utils/static.js"
import { staticInfos } from "../utils/static.js"


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
    const likeCards = document.querySelectorAll(".media-card-text");
  // Creation de la boucle qui va incrémenter au click
  for (let i = 0; i < incrementButton.length; i++) {
    
    incrementButton[i].addEventListener("click", function (event) {
  
     let buttonClicked = event.target;
     let textLike = buttonClicked.parentElement.children[2];
     let textLikeValue = textLike.innerHTML;
      //  return la chaine avec +1
     let newValue = parseInt(textLikeValue) - 1;
      --likesTotal.innerHTML;
  
     if ((textLike.innerHTML = newValue )) {
       incrementButton[i].style.display = "none";
       decrementButton[i].style.display = "block";
     }
     event.preventDefault();
   });
   
  }
  // Creation de la boucle qui va décrémenter au click
    for (let i = 0; i < decrementButton.length; i++) {
      decrementButton[i].addEventListener("click", function (event) {

        let buttonClicked = event.target;
        let textLike = buttonClicked.parentElement.children[2];
        let textLikeValue = textLike.innerHTML;
        let newValue = parseInt(textLikeValue) + 1;
        ++likesTotal.innerHTML;
  
        if ((textLike.innerHTML = newValue)) {
          decrementButton[i].style.display = "none";
          incrementButton[i].style.display = "block";
        } else {
          likeCards.innerHTML = 0;
        }
        event.preventDefault();
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


  




