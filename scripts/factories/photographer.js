export class MediaFactorie  {
    constructor(data) {
        if(Object.prototype.hasOwnProperty.call(data, "image")){
            return new MediaImage(data)
        }

        else if(Object.prototype.hasOwnProperty.call(data, "video")){
            return new MediaVideo(data)
        }
    }
}


export class MediaImage{
    constructor (data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.image = data.image
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
    }

     getMediaCardDOM() {
        return  `
        <article>
            <figure class ="media-card" data-id="${this.id}" data-title= "${this.title}" data-date="${this.date}" data-likes="${this.likes}">
                <img class="media-card-img lb-target" src="assets/newSamplePhotos/${this.image}" alt="nom du média : ${this.title}" tabindex="0"/>
                <figcaption class="media-card-text">
                    <span class="media-card-title">${this.title}</span>
                    <div class="likesByMedia">
                        <em class="infos-Likes-Icon" aria-label="Like" tabindex="0" likeNumber="${this.likes}">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
                            </svg>
                        </em>
                       
                        <p class="img-likes" aria-label="Ce média a ${this.likes} likes" tabindex="0">${this.likes}</p>  
                    </div>
                </figcaption>
            </figure>
        </article>
        `
    }

    getMediaSlidesDOM() {
        return `
            <div  class="slide hide-slide" data-id="${this.id}" data-title="${this.title}" data-date="${this.date}">
                <div class="slide-container">
                    <figure class="slide-media-container">
                         <span class="media-slide-title">${this.title}</span>
                         <img class="media-img lb-target" src="assets/newSamplePhotos/${this.image}" alt="intitulé du média ! ${this.title}" tabindex="0"/>       
                    </figure>
                </div>
            </div>
        `
    }
}

export class MediaVideo {
    constructor (data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.video = data.video
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
    }

     getMediaCardDOM() {
        return  `
        <article>
            <figure class ="media-card" data-id="${this.id}" data-title= "${this.title}" data-date="${this.date}">
                <video preload='metadata' id="ctrls-vid" class="media-card-img lb-target" aria-label="intitulé du média : ${this.title}" tabindex="0">
                    <source src="assets/videos/${this.video}" type = "video/mp4">
                </video>
                <figcaption class="media-card-text" data-likes= "${this.likes}">
                    <span class="media-card-title">${this.title}</span> 
                    <div class="likesByMedia">
                        <em class="infos-Likes-Icon" aria-label="Like" tabindex="0" likeNumber="${this.likes}">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
                            </svg>
                        </em>
               
                        <p class="img-likes" aria-label="Ce média a ${this.likes} likes" tabindex="0">${this.likes}</p>   
                    </div>
                </figcaption>
            </figure>
        </article>
        `
    }

    getMediaSlidesDOM() {
        return `
            <div  class="slide hide-slide" data-id="${this.id}" data-title="${this.title}" data-date="${this.date}">
                <div class="slide-container">
                    <div class="slide-media-container">
                         <span class="media-slide-title">${this.title}</span>
                        <video controls preload='metadata' id="ctrls-vid" class="media-img lb-target" aria-label="intitulé du média ${this.title}" tabindex="0" >
                            <source src="assets/videos/${this.video}" type = "video/mp4">
                        </video>
                    </div>
                </div>
            </div>
        `
    }
}

