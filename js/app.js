'use strict'

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q='
const API_KEY = '7939b649e70282572b1ac38aa8190594'

// Icons : https://github.com/manifestinteractive/weather-underground-icons
const WEATHER_ICONS = {
    '01d': 'clear',
    '01n': 'nt_clear',
    '02d': 'mostlysunny',
    '02n': 'nt_mostlysunny',
    '03d': 'cloudy',
    '03n': 'nt_cloudy',
    '04d': 'cloudy',
    '04n': 'nt_cloudy',
    '09d': 'rain',
    '09n': 'nt_rain',
    '10d': 'chancerain',
    '10n': 'nt_chancerain',
    '11d': 'chancetstorms',
    '11n': 'nt_chancetstorms',
    '13d': 'snow',
    '13n': 'nt_snow',
    '50d': 'fog',
    '50n': 'nt_fog'
}

const weatherDetails = document.querySelector('.details')

const weatherLoad = (city) => {
    if (city === '') return
    let url = API_URL + city + '&appid=' + API_KEY
    fetch(url).then(response => {
        if (response.ok) {
            response.json().then(data => {
                console.log(data)
                document.querySelector('.city').innerHTML = `<span class="city">${city}</span>`
                document.querySelector('.icon').innerHTML = `<img src="./img/${WEATHER_ICONS[data.weather[0].icon]}.svg" alt="">`
                weatherDetails.innerHTML = `
                    <span class="temp">${Math.ceil(data.main.temp)} °C</span>
                    <span class="description">${data.weather[0].description}</span>
                `
            })
        }
        else {
            document.querySelector('.city').innerHTML = null
            document.querySelector('.icon').innerHTML = '<img src="./img/unknown.svg" alt="">'
            weatherDetails.innerHTML = null
        }
    })
}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
    let city = document.querySelector('form #city').value
    weatherLoad(city)
})