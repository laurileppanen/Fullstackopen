import React from 'react'

const Filter = (props) => {
    return (
      <div>
        Find countries
      <input 
        value={props.newSearch}
        onChange={props.handleSearchChange}
        />
      </div>    
    )    
}

export default Filter