//import React, {useEffect, useState} from 'react'
import React, {useEffect} from 'react'

import WorkoutDetails from '../componants/WorkoutDetails'
import WorkoutForm from '../componants/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'






const Home = () => {

    // const [workouts, setWorkout] = useState(null)

    const {workouts, dispatch} = useWorkoutsContext()

  useEffect(()=>{
    const fetchWorkouts = async ()=>{
      const response = await fetch('/api/workout')
      const json = await response.json()
        if(response.ok){
          //setWorkout(json)

          dispatch({type: 'SET_WORKOUTS', payload: json})
        }
    }
      fetchWorkouts()
  }, [dispatch])

  

  return (
    <div className='home'>
        <div className='workouts'>
          {
            workouts && workouts.map((workout)=>(
              //<p key={workout._id}> {workout.title} </p>
                <WorkoutDetails key={workout._id} workout = {workout} />
            ))
          }
        </div>
          <WorkoutForm />
    </div>
  )
}

export default Home