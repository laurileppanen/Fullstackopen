import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2> {props.course.name} </h2>
      </div>
    )
  }
  
  const Content = ({ course }) => {
    
    return (
      <div>
        {course.parts.map(part => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
  }
  
  const Part = ({part, exercises}) => {
    return (
      <div>
        <p>{part} {exercises}</p>
      </div>
    )  
  }
  
  
  const Total = ({course}) => {
    
    const parts = course.parts.map(taulu => taulu.exercises)
    console.log(parts)
  
    const summa = parts.reduce( (s, p) => {
      console.log('testi', s,p)
      return s+p
    }
    );
  
  console.log(summa);
  
    return (
      <div>
        <p>total of exercises {summa}</p>
      </div>
    )
  }
  
  const Course = ({courses}) => {
    return (
      <div>
        <Header course={courses} />
        <Content course={courses} />
        <Total course={courses} />
      </div>
    )
  }

export default Course  