'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//THE OLD SCHOOL WAY OF DOING AJAX: XMLHttpRequest-function

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
  countriesContainer.style.opacity = '1';
};
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
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
      const neighbour = data.borders?.[0];
      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => alert(err));
};

btn.addEventListener('click', function () {
  getCountryData('belgium');
});
