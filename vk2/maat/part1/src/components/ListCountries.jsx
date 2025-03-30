const Button = ({ handleClick, country }) => {
  return (
      <button onClick={() => handleClick({country})}>Show</button>
  )
}

const ListCountries = ({ countriesToShow, handleClick, weather, loadWeatherData }) => {
  if (countriesToShow.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (countriesToShow.length === 1) {
    const newCapital = countriesToShow[0].capital
    console.log("Setting new capital:")
    console.log(newCapital)
    loadWeatherData(newCapital)
    try {
      if (weather.name === newCapital[0]) {
        console.log(weather)
        const weatherIcon = weather.weather[0].icon
        return (
          <div>
            <h1>{countriesToShow[0].name.common}</h1>
            <p>Capital: {newCapital[0]}</p>
            <p>Area: {countriesToShow[0].area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(countriesToShow[0]['languages']).map((lang) => <li key={lang}>{lang}</li>)}
            </ul>
            <h2>Flag</h2>
            <img src={countriesToShow[0].flags['png']} alt="Flag" />
            <h2>Weather in {weather.name}</h2>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather icon" />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
    )} else {
      return (
        <div>
          <h1>{countriesToShow[0].name.common}</h1>
          <p>Capital: {countriesToShow[0].capital}</p>
          <p>Area: {countriesToShow[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(countriesToShow[0]['languages']).map((lang) => <li key={lang}>{lang}</li>)}
          </ul>
          <h2>Flag</h2>
          <img src={countriesToShow[0].flags['png']} alt="Flag" />
        </div>
      )
    }} catch (error) {
      return (
        <div>
          <h1>{countriesToShow[0].name.common}</h1>
          <p>Capital: {countriesToShow[0].capital}</p>
          <p>Area: {countriesToShow[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(countriesToShow[0]['languages']).map((lang) => <li key={lang}>{lang}</li>)}
          </ul>
          <h2>Flag</h2>
          <img src={countriesToShow[0].flags['png']} alt="Flag" />
        </div>
      )
    }
  }
    

  return (
    <ul>
      {countriesToShow.map(country => <li key={country.name.common}>{country.name.common} <Button handleClick={handleClick} country={country.name.common}/></li>)}
    </ul>
  )
}

export default ListCountries