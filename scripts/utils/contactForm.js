// recreation du formulaire selon le html existant 


export function formulaire(name) {

  const ModalForm = document.querySelector(".modal-form");
  ModalForm.innerHTML = `<div class="windowContact">
          <div class="modalContact">
            <div class="photographersContact">
              <p aria-label="Contacter ${name}">Contactez-moi</p>
              <h2 class="name-photographer-Contact">${name}</h2>
            </div>
            <form            
              method="GET"
              action=""
              name="Me contacter"
              class="formClass"
              id="formId"  
            >
              <div class="name divInputs">
                <label for="prenom" class="prenom champ" tabindex="0">Prénom</label>
                <input
                  type="text"
                  aria-label="Mettre votre Prénom"
                  name="prenom" 
                  autofocus                
                  placeholder="Votre Prénom"
                  id="prenom"
                  class="valid"
                  minlength="2"
                  maxlength="30"                          
                tabindex="0"
                required
                />
              </div>
              <div class="lastName divInputs">
                <label for="nom" class="nom champ" tabindex="0">Nom</label>
                <input
                  type="text"
                  aria-label="Mettre votre nom"
                  name="nom"               
                  id="nom"
                  class="valid"
                  minlength="2"
                  maxlength="30"
                  placeholder="Votre Nom"
                  tabindex="0"
                  required
                />
              </div>
              <div class="email divInputs">
                <label for="email" class="email champ" tabindex="0">Email</label>
                <input
                  type="email"
                  aria-label="Mettre votre Email"
                  name="email"
                  id="email" 
                  class="valid"
                  minlength="10"
                  maxlength="60"
                  placeholder="Exemple@contact.fr"
                  tabindex="0"
                  required
                />
              </div>
              <div class="message divInputs">
                <label for="msg" tabindex="0">Votre message</label>
                <textarea
                aria-label="Ecrire votre message"
                name="msg"
                  id="msg"
                  class="valid"   
                  cols="50"
                  rows="8"
                  minlength="15"
                  maxlength="400"      
                  placeholder="Ecrire votre message ..."
                  tabindex="0"
                  />
                </textarea>
              </div>
              <div class="submitForm-btn">
                <input type="submit" aria-label="Envoyer votre message" class="btn-Envoyer" id="
                submit-btn" value="Envoyer" tabindex="0"/>
              </div>
            </form>
            <div class="closedContact">
              <button type="button" class="formClose"  aria-label="Cliquez pour fermer" tabindex="0" aria-hidden="true">&times</button>
            </div>
          </div>
        </div>`;
 
  const Contactbtn = document.querySelector(".contact_button");
  Contactbtn.onclick = () => {

    const MainDiv = document.getElementById("main");


    ModalForm.style.display = "block";
    MainDiv.setAttribute("aria-hidden", "true");
    ModalForm.setAttribute("aria-hidden", "false");

    // disable tabindex for other divs outside form
    disableTabindexForm();
  }; 



  //Close modal formulaire by cross
  const CloseModal = document.querySelector(".formClose");

  CloseModal.onclick = () => {
    const MainDiv = document.getElementById("main");
    MainDiv.setAttribute("aria-hidden", "false");
    ModalForm.setAttribute("aria-hidden", "true");
    
    ModalForm.style.display = "none";

    enableTabindexForm();
  }


  const form = document.getElementById("formId");
  let firstName = document.querySelector("#prenom")
  let lastName = document.querySelector("#nom");
  let email = document.querySelector("#email");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console log des value et alert envoye si ok 
    // alert("Formulaire envoyé");
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(email.value);
    ModalForm.style.display = "none";
    enableTabindexForm();
  });


  // Create two functions to enable/disable the tabindexes outside the form
  
  function disableTabindexForm() {
    // disable tabindex for other divs outside lightbox
    document.querySelector("header a").setAttribute("tabIndex", "-1"); //disable tabindex logo
    document.querySelector(".photographer_infos h1").setAttribute("tabIndex", "-1"); //disable tabindex photogaph name header
    document.querySelector(".photographer_infos .location").setAttribute("tabIndex", "-1"); //disable tabindex photogaph city and tagline header
    document.querySelector(".photographer_infos .tagline").setAttribute("tabIndex", "-1"); //disable tabindex photogaph city and tagline header
    document.querySelector(".contact_button").setAttribute("tabIndex", "-1"); //disable tabindex contact button header
    document.querySelector(".portraitMedia").setAttribute("tabIndex", "-1"); //disable tabindex image photographer header
    document.querySelector(".static-box").setAttribute("tabIndex", "-1"); //disable tabindex footer likes
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

  function enableTabindexForm() {
    // enable tabindex for other divs outside lightbox
   document.querySelector("header a").setAttribute("tabIndex", "1");
   document.querySelector(".photographer_infos h1").setAttribute("tabIndex", "2"); 
   document.querySelector(".photographer_infos .location").setAttribute("tabIndex", "2"); 
   document.querySelector(".photographer_infos .tagline").setAttribute("tabIndex", "2"); 
   document.querySelector(".contact_button").setAttribute("tabIndex", "2"); 
   document.querySelector(".portraitMedia").setAttribute("tabIndex", "2"); 
   document.querySelector(".static-box").setAttribute("tabIndex", "2"); 
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
}

