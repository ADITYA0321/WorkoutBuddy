import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'



const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext ('')
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('/api/workout',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'content-type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok){
            setError (json.error)
            setEmptyFields(json.emptyFields)
        }else{
             setError(null);
        setTitle('')
        setLoad('')
        setReps('')
        setEmptyFields([])
        console.log('New Workout Added:', json);
          dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
       
        
    }

  return (
       <form className='create' onSubmit={handleSubmit}>
        <h3> Add a New Workout</h3>

        <label>Excerise Title:</label>
        <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)}
            className={emptyFields.includes('title')? 'error': ''}
        />

        <label>Load (in Kg's):</label>
        <input type='number' value={load} onChange={(e)=> setLoad(e.target.value)}
        className={emptyFields.includes('title')? 'error': ''}
        /> 

        <label>Reps:</label>
        <input type='number' value={reps} onChange={(e)=> setReps (e.target.value)}
            className={emptyFields.includes('title')? 'error': ''}
        />
         
        <button >Add Workout</button>

        {error && <div className='error'>{error}</div>}

       </form> 
  )
}

export default WorkoutForm

