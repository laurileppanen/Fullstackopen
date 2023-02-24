import React from 'react'
import Weather from './Weather'

const Country = ({name, capital, area, languages, flags}) => {
    return (
    <div>
        <h2>{name}</h2>
        
        <ul style={{ listStyleType: 'none', padding:0, margin:0 }}>
          <li>capital {capital}</li>
          <li>area {area}</li>  
        </ul>

        <h3>languages:</h3>

        <ul style={{ listStyleType: 'disc'}}>
          {Object.values(languages).map(language => (
            <li key={language}>{language}</li>
          ))}  
        </ul>

        <div>
            <p></p>
        </div>

        <img src={flags.png} alt="Missing flag" height="100" width="200" />

        <div>
        <Weather capital={capital} />
        </div>

    </div>

    )
}

export default Country