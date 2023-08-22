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
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
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



// const getJSON = function (url, errorMsg = 'Something went wrong...') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`Location not found: ${errorMsg}`);
//     }
//     return response.json();
//   });
// };

const whereAmI = function (lat, lng) {
  getJSON(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`,
    `Something went wrong 2`
  )
    .then(data => {
      if (data.error) {
        throw new Error(`Location not found:${data.error}`);
      }
      getCountryData(data.address.country);
    })
    .catch(err => console.error(err));
};

whereAmI(52.508, 13.381);
*/

/*
console.log('Test start'); //1
setTimeout(() => console.log(`0 seconds`), 0); //4
Promise.resolve('resolved promis 1').then(response => console.log(response)); //3
console.log('Test end'); //2


// Fristly, the execution conttext is created and all the toplevel code is executed.
// The 1st console.log is printed to the console; the callback function of setTimeout is added to the callback queue;
// The callback function of the Promise is added to the microservice queue and the last console.log is printed to the console.
// Now the execution context is empty and the eventloop will check the microservice queue and execute all functions there.
// Next, the eventloop will move on to the callback queue and exucte all callbacks.
// Therefor, the resolved promise is printed before the callback function of setTimeout, eventhough timer was set to 0 seconds.


console.log('Test start'); //1
setTimeout(() => console.log(`0 seconds`), 0); //5
Promise.resolve('resolved promise 1').then(response => console.log(response)); //3
Promise.resolve('resolved promise 2').then(response => {
  for (let i = 0; i < 1000000000; i++);
  console.log(response);
}); //4
console.log('Test end'); //2

// the 2nd promise takes a long time to execute. This blocks the execution of the the callback queue.

*/

/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('draw in progress...');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('you win! 💰');
    } else {
      reject(new Error('you loose! 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(`I waited ${seconds} seconds`), seconds * 1000);
  });
};

wait(3)
  .then(res => {
    console.log(res);
    return wait(2);
  })
  .then(res => console.log(res));

*/

//  PROMISIFYING THE GEOLOCATOR API:
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(new Error(err))
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

/*
// CODING CHALLENGE 2

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', () => {
      document.querySelector('.images').appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', err => reject(new Error(err)));
  });
};

let currentImage;

createImage(`../img/img-1.jpg`)
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage(`../img/img-2.jpg`);
  })
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => (currentImage.style.display = 'none'))
  .catch(err => console.error(err));
*/

// ASYNC AWAIT - A DIFFERENT WAY OF CONSUMING PROMISES
const whereAmIAsync = async function () {
  try {
    //reverse geocoding
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
    );
    if (!resGeo.ok) throw new Error('Problem getting location!');
    const dataGeo = await resGeo.json();
    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo?.address?.country}`
    );
    if (!res.ok) throw new Error('No data on country!');
    const data = await res.json();
    renderCountry(data[0]);
    return `you are in ${dataGeo.address.city}`;
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
    renderError(`Something went wrong: ${err.message}`);
  } finally {
    countriesContainer.style.opacity = 1;
  }
};

console.log('1ST');
whereAmIAsync().then(rtrn => console.log(rtrn));
console.log('3RD');

const get3Countries = async function (c1, c2, c3) {
  try {
    // // running in sequence:
    // const [dataC1] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c1}`,
    //   'Country not found:'
    // );
    // const [dataC2] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c2}`,
    //   'Country not found:'
    // );
    // const [dataC3] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c3}`,
    //   'Country not found:'
    // );
    // console.log(dataC1.capital, dataC2.capital, dataC3.capital);

    // running in parallel:
    const data = await Promise.all([
      getJSON(
        `https://restcountries.com/v3.1/name/${c1}`,
        'Country not found:'
      ),
      getJSON(
        `https://restcountries.com/v3.1/name/${c2}`,
        'Country not found:'
      ),
      getJSON(
        `https://restcountries.com/v3.1/name/${c3}`,
        'Country not found:'
      ),
    ]);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('Tanzania', 'Mozambique', 'Kenya');

//return array if all resolved, shortcircuits at rejected
Promise.all([
  Promise.resolve('.all 1: succes'),
  Promise.reject('.all 2: ERROR'),
  Promise.resolve('.all 3: succes'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//frist past the post, resolved or rejected
Promise.race([
  Promise.resolve('.race 1: succes'),
  Promise.reject('.race 2: ERROR'),
  Promise.resolve('.race 3: succes'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//return array of resolved and rejected
Promise.allSettled([
  Promise.resolve('.allSettled 1: succes'),
  Promise.reject('.allSettled 2: ERROR'),
  Promise.resolve('.allSettled 3: succes'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//first passed the post, only resolved, rejected are ignored
Promise.any([
  Promise.reject('.any 1: ERROR'),
  Promise.resolve('.any 2: succes'),
  Promise.resolve('.any 3: succes'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
