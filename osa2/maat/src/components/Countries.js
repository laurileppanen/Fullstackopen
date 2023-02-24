import React from 'react'
import Country from './Country'
import { useState } from 'react'


const Countries = (props) => {
  const pituus = props.countries.filter(country => country.name.common.toUpperCase().includes(props.newSearch.toUpperCase())).length
  console.log(pituus)

  const [selectedCountry, setSelectedCountry] = useState()

  const showInformation = (event) => {
    const countryName = event.target.value
    console.log(event.target.value)
    console.log(countryName)
    setSelectedCountry(countryName)

  }

  const filteredCountries = props.countries.filter(country =>
      country.name.common.toUpperCase().includes(props.newSearch.toUpperCase())
      
      )

  if (selectedCountry) {
    const country = filteredCountries.find(country => country.name.common === selectedCountry)
    console.log(country)

    return(
      <Country
        key={country.name.common} 
        name={country.name.common}
        capital={country.capital}
        area={country.area}
        languages={country.languages}
        flags={country.flags}
      />

    )
  }    


  if ( !selectedCountry && pituus <= 10 && pituus > 1) {
    return (
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {filteredCountries.map(country => 
            <li key={country.name.common}>
              {country.name.common} 
              <button value={country.name.common} onClick={showInformation}>show</button>  
            </li>
        )}
      </ul>  
    )
  }

  else {
    if (pituus !== 1) {
      return(
        <div>
          Too many matches, specify another filter
        </div>
      )
    }

    else {

      return (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {props.countries.filter(country => country.name.common.toUpperCase().includes(props.newSearch.toUpperCase()))
            .map(country => 
              <Country
                key={country.name.common} 
                name={country.name.common}
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                flags={country.flags}

              />
              
          )}

        </ul>
        
      
      )
    }

  }

}

export default Countries

