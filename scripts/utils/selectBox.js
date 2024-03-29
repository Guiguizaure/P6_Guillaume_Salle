import { displayMedia } from "../pages/photographer.js";
import { enableLightboxListeners } from './slider.js';

const selectSort = document.querySelector(".selectBox");

selectSort.innerHTML = `   
      <div class="works-sort">
          <div>
             <p class="sort-title">Trier par</p>
          </div>

          <div id="sort-wrapper" >
              <div class="sort-base" >
                  <button id="select-first-option" class="select-option" aria-label="Section trier par popularité ">
                    <span id="select-first-option-text" data-filtre="Popularité" >Popularité</span>
                  </button>
                  <span class="fas fa-chevron-up arrow-down-open"></span>
              </div>
              <div class="flex-block-button">
                <div id="select-block-options" role="listbox">
                  <button class="select-option date" data-filtre="Date" aria-label="Section trier par date">Date</button>
                  <button class="select-option titre" data-filtre="Titre" aria-label="Section trier par titre ">Titre</button>
                </div>
              </div>
          </div>
      </div>`;



      
let isOpen = false;

const selectOptions = document.querySelector('#select-block-options');
const firstButtonText = document.querySelector('#select-first-option-text');
const arrow = document.querySelector('.arrow-down-open')  
const optionsButtons = selectOptions.querySelectorAll('button');
const select = document.querySelector('.sort-base');


function closeSelect() {
  // Fermer le select

  selectOptions.style.display = 'none';
  select.style.borderRadius = '5px';

  return (isOpen = false);
}

document.querySelector('#select-first-option').addEventListener('click', () => {

  arrow.classList.toggle("arrow-down-open");

  if (isOpen === false) {
    // Ouvrir le select

    selectOptions.style.display = 'block';
    select.style.borderRadius = '5px 5px 0 0';

    isOpen = true;

    return handleButtonsOptions();
  }

  if (isOpen === true) {
    return closeSelect();
  }
});


export function handleButtonsOptions() {
  optionsButtons.forEach((button) => {
    button.onclick = () => {
      const buttonText = button.textContent;

      button.innerHTML = firstButtonText.textContent;
      button.dataset.filtre = buttonText;

      firstButtonText.innerHTML = buttonText;
      firstButtonText.dataset.filtre = buttonText;

      return closeSelect();
    };
  });
}

/*////////////////////////////////////////////////////////////////////*/

export function sortData(data) {

  let sortOption = ''; // Declare the sortOption variable

  for (const element of optionsButtons) {
    element.addEventListener('click', function (e) {
        sortOption = e.target.dataset.filtre;
      // console.log(sortOption)
      if (sortOption === 'Date') {
        const mediasSortedByDate = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        displayMedia(mediasSortedByDate, sortOption);
      } else if (sortOption === 'Titre') {
        const mediasSortedByTitre = data.sort((a, b) => a.title.localeCompare(b.title));
        displayMedia(mediasSortedByTitre, sortOption);
      } else if (sortOption === 'Popularité') {
        const triPopularite = data.sort((a, b) => (a.likes < b.likes ? 1 : -1));
        displayMedia(triPopularite, sortOption);
      }
    });
  }
  
}