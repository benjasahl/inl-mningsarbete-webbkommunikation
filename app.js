const movieModal = document.getElementById("modal-wrapper");
const modalContainer = document.getElementById("modal-container");
const modalContent = document.getElementById("modal-content");
const movie = document.getElementsByClassName("movie");
const closeBtn = document.getElementById("close-modal");
const loadCircle = document.getElementById("loader");
const movieWrapper = document.getElementById("movie-wrapper");
const modalChars = document.getElementById("modal-chars");

//These empty arrays will contain the movie & character url:s
let films = [];
let chars = [];

/*
The function "getFilms" contains two variables; "res" which is set to await a fetch-request
to the swapi-films url, and "data" is set to convert the response to json.
The data is later added into the films array.

After that the "movie-wrapper"-div's innerHTML will map through each film in the films-array 
and add a new div for each film. These divs will have the class "movie" and contain each film 
title and release date. 
*/
const getFilms = async () => {
  const res = await fetch("https://swapi.dev/api/films");
  const data = await res.json();
  films = data;
  movieWrapper.innerHTML = films.results
    .map(
      (film) =>
        `<div class="movie"><h2>${film.title}</h2><h3>${film.release_date}</h3></div>`
    )
    .join("");
  
  /*
  This for-loop will iterate through each div in the "movie"-class and when a div is clicked
  it will first display the movie modal and a loader. After that the setCharacters function is
  called on (see comments further down). Lastly, a setTimeout function is set to display the 
  modal container and it's content, and to set the display of the loader to none after 2 sec. 
  */

  for (let i = 0; i < movie.length; i++) {
    movie[i].addEventListener("click", () => {
      movieModal.style.display = "flex";
      loadCircle.style.display = "flex";
      setCharacters(i);
      setTimeout(() => {
        loadCircle.style.display = "none";
        modalContainer.style.display = "flex";
        modalContent.style.display = "block";
      }, 2000);
    });
  }
};

/*
The setCharacters function contains the parameter (i) which is called on in the previous for-loop.
First the function will map over the character-urls in film[i] and return a fetch with those urls.
The result will then be converted to json and the name of each data will then be pushed into the chars-array, 
along with a linebreak after each character. Afterwards, the chars-array gets sorted in alphabetical order.

Finally, the innerHTML of the modal content is set with the iterated films title, and the
div "modal-chars"'s innerHTML will contain the chars-array (the name of each character + a linebreak).
*/
const setCharacters = async (i) => {
  films.results[i].characters.map((url) => {
    return fetch(url).then((res) =>
      res.json().then((data) => {
        chars.push(data.name + "<br>");
        chars.sort();
        modalContent.innerHTML = `<h1>${films.results[i].title}</h1>`;
        modalChars.innerHTML = `<p>${chars.join("")}</p>`;
      })
    );
  });
};

/*
This function will close the modal and it's content when the close button is clicked, it will also
empty the chars-array.
*/

const closeModal = () => {
  closeBtn.addEventListener("click", () => {
    movieModal.style.display = "none";
    modalContainer.style.display = "none";
    chars = [];
  });
};

window.addEventListener("load", () => {
  getFilms();
  closeModal();
});
