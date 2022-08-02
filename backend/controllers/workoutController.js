const { model, default: mongoose } = require('mongoose')
const Workouts = require('../models/workoutModel')

//get all workout
const getWorkouts = async (req, res) => {
    const workouts = await Workouts.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params
    checkMongooseId(id)

    const workout = await Workouts.findById(id)
    isWorkout(workout)

    res.status(200).json(workout)
}
// create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    const emptyFields = []
    if(!title) emptyFields.push('title')
    if(!load) emptyFields.push('load')
    if(!reps) emptyFields.push('reps')

    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    try {
        const workout = await Workouts.create({title, load, reps})
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
} 
//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    checkMongooseId(id)
    const workout = await Workouts.findOneAndDelete({_id: id})
    
    isWorkout(workout)
    console.log(workout)
    return res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    checkMongooseId(id)

    const workout = await Workouts.findOneAndUpdate({_id: id}, {...req.body})
    isWorkout(workout)

    return res.status(200) .json(workout)
}

//Helper function, returns status 404 - error no such workout if not mongoose id
function checkMongooseId(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout!'})
    }
}

function isWorkout(workout){
    if(!workout) return res.status(400).json({error: 'no such workout'}) 
}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}