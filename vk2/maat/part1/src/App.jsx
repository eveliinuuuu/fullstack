import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'
import dataService from './services/data'

const App = () => {
  const [countries, setCountry] = useState([])
  const [newfilter, setNewFilter] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState(null)

 
  useEffect(() => {
    dataService.getCountries().then((initialCountries) => {
      setCountry(initialCountries)
    })
  }, [])
  
  const loadWeatherData = (newCapital) => {
    if (capital) {
      setCapital(newCapital[0])
      console.log("printing in loadweatherdata")
      console.log(capital)
      useEffect(() => {
        dataService.getWeather(capital).then((response) => {
          setWeather(response)
        })
      }, [capital])
  } else {
    setCapital(newCapital[0])
  }
}

  const handleFilter = event => {
    if (event.target.value) {
      setNewFilter(event.target.value)
      const filter = event.target.value
      if (! (filter === '')) {
          setShowResults(true)
      } else {
        setShowResults(false)}
    }
  }

  const handleClick = ({ country }) => {
    if (country) {
      setNewFilter(country)
      setShowResults(true)
    }
  }

  let countriesToShow = showResults
  ? countries.filter(country => country.name.common.startsWith(newfilter))
  : []

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <ListCountries countriesToShow={countriesToShow} handleClick={handleClick} dataService={dataService} weather={weather} loadWeatherData={loadWeatherData}/>
    </div>
  )
}
 
export default App