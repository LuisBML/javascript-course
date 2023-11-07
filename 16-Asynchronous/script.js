'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(Number(data.population) / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
};

const getJSON = function (url, erroMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`${erroMsg} (${response.status})`)
        }
        return response.json()
    });
};

const getCountryData = function (country) {
    // Country 1
    getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders?.[0];
            if (!neighbour) {
                throw new Error('No neighbour found');
            };

            // Country 2
            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
        })
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.error(`⚠️${err}`);
            renderError(`Something went wrong: ${err.message}.`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
}

// getCountryData('denmark');

////////////////////////////////////////
////// Promisifying settimeout ////////
///////////////////////////////////////
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

////////////////////////////////////////
////// Promisifying geolocation ////////
///////////////////////////////////////
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// getPosition()
//     .then(pos => console.log(pos));


////////////////////////////////////////
////// asycn/await ////////
///////////////////////////////////////
const actualCountry = async function () {
    try {// Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        // Reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!resGeo.ok) { throw new Error('Problem getting location data.'); }
        const dataGeo = await resGeo.json();


        // Country data
        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
        if (!res.ok) { throw new Error('Problem getting country data.'); }
        const data = await res.json();

        renderCountry(data[0]);

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
        console.error(`☣︎ ${err} ☣︎`);
        renderError(`☣︎ ${err.message} ☣︎`);

        // Reject promise returned from async function
        throw err
    }
};

(async function () {
    try {
        const city = await actualCountry();
        console.log(`From IIFE: ${city}`);
    } catch (err) {
        console.error(`From IIFE: ${err.message}`);
    }
})();

////////////////////////////////////////
////// Running promises in parallel  ////////
////////////// Promise all  ///////////
///////////////////////////////////////
const get3Countries = async function (c1, c2, c3) {
    try {
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`)
        ]);
        console.log(data.map(d => d[0].capital[0]));
    } catch (err) {
        console.error(err);
    }
};

get3Countries('denmark', 'mexico', 'japan');

////////////////////////////////////////
//////////// Promise race  ////////////
///////////////////////////////////////

(async function () {
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/egypt`),
        getJSON(`https://restcountries.com/v3.1/name/italy`),
        getJSON(`https://restcountries.com/v3.1/name/france`)
    ]);
    console.log(res[0]);
})();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('Request took too long!'))
        }, sec * 1000);
    });
};

Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/australia`),
    timeout(1)
])
    .then(res => console.log(res[0]))
    .catch(err => console.error(err));

////////////////////////////////////////
//////////// Promise.allSettled  ////////////
///////////////////////////////////////
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success')
]).then(res => console.log(res));

////////////////////////////////////////
//////////// Promise.any  ////////////
///////////////////////////////////////
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success')
])
    .then(res => console.log(res))
    .catch(err => console.error(err));

///////////////////////////////////////
///////// Coding Challenge #1 ///////////
///////////////////////////////////////

const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(response => {
            if (!response.ok) {
                throw Error(`Data not found ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);
            getCountryData(data.country);
            return;
        })
        .catch(err => console.log(`Challenge #1: ${err.message}`));
};

// console.log('Coding Challenge #1');
// whereAmI(-33.933, 18.474);


///////////////////////////////////////
///////// Coding Challenge #2 ///////////
///////////////////////////////////////

const imagesContainer = document.querySelector('.images');

let backgroundImg;

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const myImg = document.createElement('img');
        myImg.src = imgPath;

        myImg.addEventListener('load', function () {
            imagesContainer.append(myImg);
            resolve(myImg);
        });
        myImg.addEventListener('error', function () {
            reject(new Error('Image not found'));
        })
    });
};

// console.log('Coding Challenge #2');

// createImage('/final/img/img-1.jpg')
//     .then((responseImg) => {
//         backgroundImg = responseImg;
//         return wait(2);
//     })
//     .then(() => {
//         backgroundImg.style.display = 'none';
//         return createImage('/final/img/img-2.jpg');
//     })
//     .then((responseImg2) => {
//         backgroundImg = responseImg2;
//         return wait(2);
//     })
//     .then(() => backgroundImg.style.display = 'none')
//     .catch(imgError => console.error(imgError));

///////////////////////////////////////
///////// Coding Challenge #3 ///////////
///////////////////////////////////////

console.log('Coding Challenge #3');

const loadNPause = async function () {
    try {
        // Load image
        const responseImg = await createImage('/final/img/img-1.jpg');
        await wait(2);
        responseImg.style.display = 'none';

        // Load image
        const responseImg2 = await createImage('/final/img/img-2.jpg');
        await wait(2);
        responseImg2.style.display = 'none';

    } catch (err) {
        console.error(err);
    }
};

// loadNPause();

const loadAll = async function (imgArr) {
    try {
        const imgsPromises = imgArr.map(async img => await createImage(img));
        const imgs = await Promise.all(imgsPromises);

        // const imgs = await Promise.all([
        //     createImage(imgArr[0]),
        //     createImage(imgArr[1]),
        //     createImage(imgArr[2])]);

        imgs.forEach(img => {
            img.classList.add('parallel');
        });
    } catch (err) {
        console.error(err.message);
    }
};

loadAll(['/final/img/img-1.jpg', '/final/img/img-2.jpg', '/final/img/img-3.jpg']);