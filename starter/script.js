'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = function (data, className = '') {
  // const [data] = JSON.parse(request.responseText);
  console.log(data);
  const lang = Object.values(data.languages);
  console.log(lang);
  const currencies = Object.values(data.currencies).map(el => el.name);

  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${lang.join(', ')}</p>
      <p class="country__row"><span>💰</span>${currencies.join(', ')}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

///////////////////////////////////////

// const request = new XMLHttpRequest();

// request.open('GET', 'https://restcountries.com/v3.1/name/switzerland');
// request.send();
// console.log(request.responseText);
// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);

//   const html = `<article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)}M people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages.name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies.name}</p>
//   </div>
// </article>`;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// });

/*
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    const lang = Object.values(data.languages);
    const [currency] = Object.values(data.currencies);
    console.log(data.currencies);

    const html = `<article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${lang.join(', ')}</p>
      <p class="country__row"><span>💰</span>${currency.name}</p>
    </div>
  </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountry('Portugal');
getCountry('Belgium');
*/

/* THESE TO BLOCKS OF CODE DO THE SAME THING

// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/portugal`);
//   request.send();
//   console.log(request.responseText);

const request = fetch('https://restcountries.com/v3.1/name/spain');
console.log(request);
*/

const getJSON = function (url, errorMsg = 'Something went wrong...') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg}${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found:'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://restcountries.com/v3.1/name/${neighbour}`,
        'Country not found:'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 😭`);
      renderError(`Something went wrong: ${err.message} 😭`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});
// getCountryData('belgium');
// getCountryData('cuba');
