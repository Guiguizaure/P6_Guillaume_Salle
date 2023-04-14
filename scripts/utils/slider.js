// Select the slider container element and add the HTML code for the slider modal
const sliderContainer = document.querySelector(".slider-modal")
sliderContainer.innerHTML = `
 <div class="slider-container" >
   <div class="arrow-left-container">
     <div class="arrow-left" aria-label=" Voir l'image précédente"  tabindex="0"></div>
   </div>
   <div class="slider-media-container"></div>
   
   <div class="arrow-right-container" >
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
      // Display the slider container
      sliderContainer.style.display = "block";

      prevBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.prev));
      });

      nextBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.next));
      });

      closeBtn.addEventListener("click", () => {
        sliderContainer.style.display = "none";
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
      // Display the slider container
      sliderContainer.style.display = "block";

      prevBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.prev));
      });

      nextBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.next));
      });

      e.preventDefault();
    }
  });


  // closeBtn.addEventListener(
  //   "keydown",
  //   function (e) {
  //     if (e.key == "Enter") {
  //       sliderContainer.style.display = "none";
  //     }
  //   },
  //   false
  // );

  // closeBtn.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") {
  //     sliderContainer.style.display = "none";
  //   }
  // });

  // Add event listeners so that we can close the lightbox by 
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sliderContainer.style.display = "none";
    } else if (e.key === "ArrowLeft") {
      prevBtn.click();
    } else if (e.key === "ArrowRight") {
      nextBtn.click();
    }
  });
  


}; //end enableLightboxListeners


