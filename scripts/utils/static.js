//  static box

export let staticInfos = {};

export function likesInfos(totalLikes, dayPrice) {
  const likesPriceBox = document.querySelector('.likesBox');
  likesPriceBox.innerHTML = `
  <div class="static-box" aria-label="Nombre de likes par jour" tabindex="0">
      <div class="static-box-likes">
          <p class="numberLikesBox"aria="${totalLikes} likes au total" tabindex="0">${totalLikes}</p>
          <em class="heart-box"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.125 18.35L7.85625 17.03C3.35 12.36 0.375 9.28 0.375 5.5C0.375 2.42 2.4925 0 5.1875 0C6.71 0 8.17125 0.81 9.125 2.09C10.0787 0.81 11.54 0 13.0625 0C15.7575 0 17.875 2.42 17.875 5.5C17.875 9.28 14.9 12.36 10.3938 17.04L9.125 18.35Z" fill="black"/>
          </svg></em>
      </div>
      <div class="static-box-price">
          <p class="price-like-box" aria-label=" Son tarif est de: ${dayPrice} Euros par jour" tabindex="0">${dayPrice} € / Jour</p>
      </div>
  </div>`;
}

