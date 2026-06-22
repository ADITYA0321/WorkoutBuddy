
import React, {useEffect, useState} from 'react'
import WorkoutDetails from '../componants/WorkoutDetails'
import WorkoutForm from '../componants/WorkoutForm'


const Home = () =>{
    const [workouts, setWorkouts] = useState(null)
  useEffect(()=>{
    const fetchWorkouts = async () => {
     const response = await fetch('/api/workout/')
      const json = await response.json()

        if(response.ok){
          setWorkouts(json)
        }
    }
      fetchWorkouts()
  },[])

    return(
      <div className='home'>
        <div className='workouts'>
          {
            workouts && workouts.map((workout)=>(
              //<p key={workout._id}>{workout.title}</p>
              <WorkoutDetails key={workout._id} workout={workout} />

            ))
          }
        </div>
         <WorkoutForm />
      </div>
    )
}



export default Home