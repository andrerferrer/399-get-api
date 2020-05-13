const apiKey = "yourAPIkey";

const results = document.querySelector("#results");


// We are going to do this over and over again
// fetch(url)
//   .then(response => response.json())
//   .then((data) => console.log(data));

const callTheAPI = (searchWord) => {
  // Calling the omdapi
  fetch(`http://www.omdbapi.com/?s=${searchWord}&apikey=${apiKey}`)
    // receiving a string as a response and parsing it into a JSON (Hash in JS)
    .then(response => response.json())
    // taking this 'json' and do THE MAGIC
    .then((json) => {
    //  Console Log Driven Development - CLDD
      // console.log(json['Search'])
      // console.log(json.Search)
      const movies = json.Search;
      results.innerHTML = "";
      movies.forEach((movie) => {
        const movieHTML = `<li class="list-inline-item">
                             <p>${movie.Title}</p>
                             <img src="${movie.Poster}" alt="">
                           </li>`;
        results.insertAdjacentHTML("beforeend", movieHTML);
      });
    });
};


// 1 find the element
const form = document.querySelector("#search-movies");

// 2 add event listener
form.addEventListener('submit', (event) => {
  // 3 do behavior (callback)
  // call the API with the submited searchWord

  // The default behavior of a form is to go to another page
  // We want to prevent that the page reloads
  event.preventDefault();
  const currentTarget = event.currentTarget;
  const keywordElement = currentTarget.querySelector("#keyword");
  const searchWord = keywordElement.value;
  callTheAPI(searchWord);
});
