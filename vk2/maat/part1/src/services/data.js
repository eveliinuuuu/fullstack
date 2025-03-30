import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = import.meta.env.VITE_SOME_KEY

const getCountries = () => {
    const request = axios.get(`${baseUrl}`)
    return request.then(response => response.data)
  }

const getWeather = capital => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${api_key}`)
    console.log("request done")
    return request.then(response => response.data)
}

export default {getCountries, getWeather}