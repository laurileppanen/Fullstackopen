import React from 'react'

const Person = (props) => {
    return (
        <li>
        {props.name} {props.number}
        <button onClick={props.deletePerson}>remove</button>
        </li>
    )
}

export default Person