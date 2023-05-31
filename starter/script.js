'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = ' ') {
  const html = `
<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages
      .map(el => el.name)
      .join(', ')}</p>
    <p class="country__row"><span>💰</span>${data.currencies
      .map(el => el.name)
      .join(', ')}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = '1';
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

btn.addEventListener('click', function () {
  getCountryData('germany');
});

///////////////////////////////////////
//THE OLD SCHOOL WAY OF DOING AJAX: XMLHttpRequest-function

/*
//AJAX call country 1;
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //render country 1;
    renderCountry(data);

    //Get neighbour country (2)
    const neighbour = data.borders?.[0];
    if (!neighbour) return;
    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      //render country 2;
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryData('belgium');
getCountryAndNeighbour('portugal');
// getCountryData('france');
// getCountryData('spain');
// getCountryData('canada');
// getCountryData('cuba');
// getCountryData('usa');
*/

//THE MODERN WAY OF CALLING API:

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);
// //the fetch API inmediately created a promise.
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };

const request = fetch('https://restcountries.com/v2/name/portugal');
console.log(request);
//the fetch API inmediately created a promise.

/*
// --- test to see how long it takes to fulfill the promise ---
let counter = 0;
let intervalId;

function myFunction(a) {
  console.log(a);
  counter++;
  if (counter >= 2) {
    clearInterval(intervalId);
  }
}
function start() {
  intervalId = setTimeout(() => myFunction(request), 190);
}

start();
*/

/*
//CONSUMING A FULFILLED PROMISE:
// the then-method is available on al promises (i.e. the return of fetch).
// it receives the promis as an argument, named response in this example, for its callback function. 

// const getCountryData = function (country){
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//   .then(function(response){
//     console.log(response);
//   })
// };

// at this point we cannot read the response.
// we need to call the JSON method on the response(fulfilled promis).
// however, the json method is also an async function and will itself return a promis.
// which, in its turn must be handeled by a then-method.

// const getCountryData = function (country){
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//   .then(function(response){
//     // call JSON method on response
//     return response.json()
//   })
//   // handle the promis generated by the JSON method
//   // data is is the response passed on from the JSON method
//   .then(function(data){
//     renderCountry(data[0])
//   });
// };

// simplified version:

const getCountryData = function (country){
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => response.json())
  .then(data => renderCountry(data[0]));
};

getCountryData('portugal');
*/

/*
//CHAINING PROMISES

const getCountryData = function (country){
  //COUNTRY 1:
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => response.json())
  .then(data => {
    renderCountry(data[0]);
  //create a new variable for the neighbour country
  const neighbour = data[0].borders?.[0];
  if (!neighbour) return;
  // COUNTRY 2;
  return fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`);
  })
  //outside the callback function, chain a new then method.
  //if you chain it inside the callback function, we are back to callback-hell.
  .then(response => response.json())
  .then(data => renderCountry(data[0], 'neighbour'))
};

getCountryData('portugal');
*/

/* 
//HOW TO HANDLE PROMIS REJECTIONS.

//IMPORTANT: the only way in which the FETCH-promis rejects, is when user loses connection.
//method 1: 2nd argument of the fetch method can be a callback function handling the error.
// the callback function receives the error as an argument

//method 2: at the end of the chain use the CATCH-method.
// Errors fall through the chain untill they are caught.
// the catch method at the and will receive the error as an argument.
*/

/*
// THE FINALLY METHOD
// is activated at the end, regardless of fulfillment or rejection.
// it serves to execute code at the end of the chain that has to be executed in all cases.

*/

/* 
//THROWING MANUAL ERRORS


const getCountryData = function (country){
  //COUNTRY 1:
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => {
  //if response is not ok (ok is a boolean property on on the response object)
  //throw an error, which will result in instant rejection of the promis.  
    if(!response.ok)
    throw new Error(`country not found (${response.status})`)

    return response.json()})
  .then(data => {
    renderCountry(data[0]);
  //create a new variable for the neighbour country
  const neighbour = data[0].borders?.[0];
  if (!neighbour) return;
  // COUNTRY 2;
  return fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`);
  })
  //outside the callback function, chain a new then method.
  //if you chain it inside the callback function, we are back to callback-hell.
  .then(response => {  
    if(!response.ok)
    throw new Error(`country not found (${response.status})`)
    return response.json()})
  .then(data => renderCountry(data[0], 'neighbour'))
  .catch(err => {
      renderError(`Something went wrong 🤬 ${err.message} 🤬`);
      console.error(`${err} 🤬🤬`);
    })
  .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

getCountryData('portugal');

*/

//CREATE getJSON HELPER FUNCTION:

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found.')
    .then(data => {
      // console.log(data[0]);
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found.'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong 🤬 ${err.message} 🤬`);
      console.error(`${err} 🤬🤬`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

/*
Asynchronous JavaScript
Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. 
For that, you will use a second API to geocode coordinates. 
So in this challenge, you’ll use an API on your own for the first time 😁

Your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value('lat') and a longitude value ('lng')
(these are GPS coordinates, examples are in test data below).

2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location,
like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. 
Use the fetch API and promises to get the data. 
Do not use the 'getJSON' function we created, that is cheating 😉

3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location.
Then, using this data, log a message like this to the console: “You are in Berlin, Germany”

4. Chain a .catch method to the end of the promise chain and log errors to the console

5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. 
This is an error with the request. Remember, fetch() does not reject the promise in this case. 
So create an error to reject the promise yourself, with a meaningful error message

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result,
and plug it into the countries API that we have been using.

7. Render the country and catch any errors, just like we have done in the last lecture 
(you can even copy this code, no need to type the same code)

Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude) 
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
GOOD LUCK 😀

*/

const whereAmI = function (lat, lng) {
  const request = a;
};
