const Header = ({ course }) => {
    return (
      <div>
        <h2>{course}</h2>
      </div>
    )
  }
  
  const Part = ({ part, exercises }) =>  {
    return (
      <p>{part} {exercises}</p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce((partialSum, a) => partialSum + a, 0)
  
    return (
      <div>
        <b>Total of {total} exercises</b>
        <br></br>
        <br></br>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course