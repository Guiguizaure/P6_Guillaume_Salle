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
  // console.log(totalLikes)


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
                            
                          <button role="button" class="contact_button" aria-label="Contacter ${name}">
                            Contactez-moi
                          </button>
                          
                          <img src=${picture} aria-hidden="true" class="portraitMedia">
          `;
}
  




export async function displayMedia(portfolioArray) {

  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("photographer"));
  
  const { totalLikes } = await getData(photographerId);


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
console.log(totalLikes)
    

  //Like event
  const totalLikesBox = document.querySelector('.numberLikesBox');
  const likeButtons = document.querySelectorAll('.infos-Likes-Icon');
  const likesElements = document.querySelectorAll('.img-likes');

  let totalLikeItem = parseInt(totalLikesBox.textContent);
  console.log(totalLikeItem)
  
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


  




