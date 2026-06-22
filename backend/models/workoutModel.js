const mongoose = require('mongoose');
const { applyTimestamps } = require('../../../fullstack project/backend/models/workoutModel');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    reps:{
        type:Number,
        required: true
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        requirde:true
    }
 }, {
            timestamps: true
        

}
)

module.exports = mongoose.model('Workout', workoutSchema)