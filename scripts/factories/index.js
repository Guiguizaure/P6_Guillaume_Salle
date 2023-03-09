
 export function photographerFactory(data) {
    // données JSON 
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

     function getUserCardDOM() {

        const article = document.createElement('article')
        const baseURL = "photographer.html";
        // mise en place du nom et de l'id dans l URL
        const url = `${baseURL}?photographer=${id}`;
        // creation innerHTML au lieu d'appendchild 
        article.innerHTML = `<a href= ${url}>
                <img src=${picture} class="imageProfil" alt="Voir le portfolio de ${name}">
                <h2 class="photographer-name-profil">${name}</h2>
            </a>
            <div class="photographer_details">
                <p class="location">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
                <p class="price-card">${price}€/jour</p>
            </div>
            `;

        return (article);
    }
   
    // retourner les data et ma fonction getUser
    return { data, getUserCardDOM}

}

