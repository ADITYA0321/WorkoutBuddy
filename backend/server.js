// Importing express package
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const work = require('./routes/workout')

dotenv.config()

// Express APP
const app = express();
app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
    
})


app.get('/', (req, res)=>{
    res.json({msg:'Home Page'})
})

app.use('/api/workout',work);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server Start http://localhost:${PORT} & connect DB`);
    
})
}).catch((error)=>{
    console.log(error);
    
}
)

const PORT = process.env.PORT;



