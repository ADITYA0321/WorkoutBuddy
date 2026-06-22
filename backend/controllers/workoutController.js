const Workout = require("../models/workoutModel"); // Capitalized to distinguish from instances
const mongoose = require('mongoose')

const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    // Remove the extra parentheses
    const workouts = await Workout.find({user_id}).sort({createdAt: -1});
    
    if(!workouts){
        return res.status(400).json({error:"No entries found"});
    }
    res.status(200).json(workouts);
}

const getWorkout = async (req, res) => {
    const {id} = req.params;
    // Use a different name than the Model
  if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout (Invalid ID format)" });
    }
    const singleWorkout = await Workout.findById(id);
    if (!singleWorkout) {
        return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(singleWorkout);
}

const createWorkout = async (req, res) => {
    

    const {title, load, reps} = req.body;

        let emptyFields = [];

        if(!title){
            emptyFields.push('title')
        }else if(!load){
            emptyFields.push('load')
        }else if(!reps){
            emptyFields.push('reps')
        }

        if(emptyFields.length>0){
            return res.status(400).json ({error: 'Please fill out all the fields!', emptyFields})
        }

    try {
        const user_id = req.user._id
        const newWorkout = await Workout.create({title, load, reps, user_id});
        res.status(200).json(newWorkout);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const deleteWorkout = async (req, res)=>{
     const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No Such workouts"})
     }
        const workout= await Workout.findOneAndDelete({_id:id})

        if(!workout){
            return res.status(400).json({error:"No Such workout delete"})
        }
        res.status(200).json(workout)
}

//  update workouts by its id

    const updateWorkout = async (req, res)=>{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No Such workouts"})
     }
        const workout = await Workout.findOneAndUpdate(
            {
                _id:id
            },
                {
                     ...req.body
                }
            
        )
        if(!workout){
            return res.status(400).json({error:"No Such workouts"})
        }
        res.status(200).json(workout)
    }

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}
