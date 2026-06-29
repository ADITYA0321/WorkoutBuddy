const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')
const cors = require('cors')

dotenv.config();

const app = express()

app.use(cors())

app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
       
})

app.get('/',(req, res)=>{
    res.json({msg:'Welcome to our appln'})
    })

app.use('/api/workout', workoutRoutes)
app.use('/api/user',userRoutes)

//connect to db

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`start server http://localhost:${PORT} connect DB`);
        
    })

}).catch((error)=>{
    console.log(error);
    
})

    const PORT = process.env.PORT;