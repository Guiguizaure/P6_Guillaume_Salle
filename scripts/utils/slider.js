// Select the slider container element and add the HTML code for the slider modal
const sliderModal = document.querySelector(".slider-modal")
sliderModal.innerHTML = `
 <div class="slider-container" >
   <div class="arrow-left-container">
     <div class="arrow-left" aria-label=" Voir l'image précédente"  tabindex="0"></div>
   </div>
   <div class="slider-media-container"></div>
   
   <div class="arrow-right-container">
     <div class="arrow-right" aria-label=" Voir l'image suivante" tabindex="0"></div>
     <div class="closeContainer">
        <div class="close-lightbox" aria-label=" Cliquer pour fermer" tabindex="0">X</div>
     </div>
   </div>
   
 </div>`;



// Function to enable the lightbox listeners
export const enableLightboxListeners = () => {
 // Select the previous, next, and close buttons for the slider modal
  const prevBtn = document.querySelector(".arrow-left");
  const nextBtn = document.querySelector(".arrow-right");
  const closeBtn = document.querySelector(".close-lightbox");

  // Select all media cards and create an array of media card elements
  const mediaCardsList = Array.from(
    document.querySelectorAll(".media-card-img")
  );

  // Create an array of slide elements
  const slides = Array.from(document.querySelectorAll(".slide"));

  // Create an array of slide IDs for navigation purposes
  const slidesIds = slides.map((slide) => parseInt(slide.dataset.id));

  // Function to show a particular slide
  const showSlide = (index) => {
    slides.forEach((slide) => {
      // If the slide ID matches the current index, show the slide, otherwise hide it
      parseInt(slide.dataset.id) === slidesIds[index]
        ? (slide.style.display = "block")
        : (slide.style.display = "none");
    });

    // If the current index is at the beginning of the array, set the previous button's ID to the last element of the array, otherwise set it to the index before the current one
    index - 1 < 0
      ? (prevBtn.dataset.prev = slidesIds.length - 1)
      : (prevBtn.dataset.prev = index - 1);
    // If the current index is at the end of the array, set the next button's ID to the first element of the array, otherwise set it to the index after the current one
    index + 1 > slidesIds.length - 1
      ? (nextBtn.dataset.next = 0)
      : (nextBtn.dataset.next = index + 1);
  };

  
  // Add event listeners to each media card
  mediaCardsList.forEach((mc) => {
    // Set the media card tabindex to 0 for accessibility
    mc.setAttribute("tabindex", "0");

    mc.addEventListener("click", (e) => {
      // Get the current index of the clicked media card's parent element in the slidesIds array
      const currIndex = slidesIds.indexOf(parseInt(e.target.parentElement.dataset.id));
      // Show the current slide
      showSlide(currIndex);

      disableTabindexLightbox();
      
      // Display the slider container
      sliderModal.style.display = "block";

      prevBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.prev));
      });

      nextBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.next));
      });

      closeBtn.addEventListener("click", () => {

        enableTabindexLightbox();



        sliderModal.style.display = "none";
      });

      e.preventDefault();
    });
  });


  // Add event listeners to each media card but with keydown
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("media-card-img")) {
      
      // Get the current index of the clicked media card's parent element in the slidesIds array
      const currIndex = slidesIds.indexOf(parseInt(e.target.parentElement.dataset.id));
      // Show the current slide
      showSlide(currIndex);

      disableTabindexLightbox();

      // Display the slider container
      sliderModal.style.display = "block";

      prevBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.prev));
      });

      nextBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.next));
      });

      e.preventDefault();
    }
  });

  // Add event listeners so that we can close and navigate in the lightbox by pressing Enter
  closeBtn.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Enter") {
        sliderModal.style.display = "none";
        enableTabindexLightbox();
      }
    },
    false
  );
  prevBtn.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Enter") {
        prevBtn.click();
      }
    },
    false
  );
  nextBtn.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Enter") {
        nextBtn.click();
      }
    },
    false
  );

  // Add event listeners so that we can interact with the lightbox using Escape and arrows
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sliderModal.style.display = "none";
    } else if (e.key === "ArrowLeft") {
      prevBtn.click();
    } else if (e.key === "ArrowRight") {
      nextBtn.click();
    }
  });



  // Create two functions to enable/disable the tabindexes outside the lightbox

  function disableTabindexLightbox() {
    // disable tabindex for other divs outside lightbox
    document.querySelector("header a").setAttribute("tabIndex", "-1"); //disable tabindex logo
    document.querySelector(".photographer_infos h1").setAttribute("tabIndex", "-1"); //disable tabindex photogaph name header
    document.querySelector(".photographer_infos .location").setAttribute("tabIndex", "-1"); //disable tabindex photogaph city and tagline header
    document.querySelector(".photographer_infos .tagline").setAttribute("tabIndex", "-1"); //disable tabindex photogaph city and tagline header
    document.querySelector(".contact_button").setAttribute("tabIndex", "-1"); //disable tabindex contact button header
    document.querySelector(".portraitMedia").setAttribute("tabIndex", "-1"); //disable tabindex image photographer header
    document.querySelector(".static-box").setAttribute("tabIndex", "-1"); //disable tabindex footer likes
    document.querySelector(".numberLikesBox").setAttribute("tabIndex", "-1"); //disable tabindex footer likes
    document.querySelector(".price-like-box").setAttribute("tabIndex", "-1"); //disable tabindex footer likes
    // document.querySelector("#sort").setAttribute("tabIndex", "-1"); //disable tabindex sort by text
    document.querySelector(".select-option").setAttribute("tabIndex", "-1"); //disable tabindex sort button

    const imageSelected = document.querySelectorAll(".media-card-img"); //select tabindex medias catalog
    const imageTxt = document.querySelectorAll(".media-card-title"); //select tabindex medias catalog title
    const imageLike = document.querySelectorAll(".img-likes"); //select tabindex medias catalog like number
    const imageLikeHeart = document.querySelectorAll(".infos-Likes-Icon"); //select tabindex medias catalog like heart icon

    for (let i = 0; i < imageSelected.length; i++) {
      imageSelected[i].setAttribute("tabIndex", "-1"); //disable tabindex medias catalog
      imageTxt[i].setAttribute("tabIndex", "-1"); //disable tabindex medias catalog title
      imageLike[i].setAttribute("tabIndex", "-1"); //disable tabindex medias catalog like number
      imageLikeHeart[i].setAttribute("tabIndex", "-1"); //disable tabindex medias catalog like heart icon
    }
  }

  function enableTabindexLightbox() {
    // enable tabindex for other divs outside lightbox
   document.querySelector("header a").setAttribute("tabIndex", "1"); 
   document.querySelector(".photographer_infos h1").setAttribute("tabIndex", "2");
   document.querySelector(".photographer_infos .location").setAttribute("tabIndex", "2"); 
   document.querySelector(".photographer_infos .tagline").setAttribute("tabIndex", "2"); 
   document.querySelector(".contact_button").setAttribute("tabIndex", "2"); 
   document.querySelector(".portraitMedia").setAttribute("tabIndex", "2"); 
   document.querySelector(".static-box").setAttribute("tabIndex", "2"); 
   document.querySelector(".numberLikesBox").setAttribute("tabIndex", "2"); 
    document.querySelector(".price-like-box").setAttribute("tabIndex", "2"); 
   document.querySelector(".select-option").setAttribute("tabIndex", "0"); 

   const imageSelected = document.querySelectorAll(".media-card-img");
   const imageTxt = document.querySelectorAll(".media-card-title"); 
   const imageLike = document.querySelectorAll(".img-likes"); 
   const imageLikeHeart = document.querySelectorAll(".infos-Likes-Icon"); 

   for (let i = 0; i < imageSelected.length; i++) {
     imageSelected[i].setAttribute("tabIndex", "0"); 
     imageTxt[i].setAttribute("tabIndex", "0"); 
     imageLike[i].setAttribute("tabIndex", "0"); 
     imageLikeHeart[i].setAttribute("tabIndex", "0");
   }
 }

}; //end enableLightboxListeners


