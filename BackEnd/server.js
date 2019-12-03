const express = require('express')
const app = express()
const port = 4000
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://admin:admin@cluster0-veakn.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{useNewUrlParser:true});
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));
//
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    brand:String,
    model:String,
    year:String,
    poster:String
})

const PhoneModel = mongoose.model('car', phoneSchema);
const HorrorPhoneModel = mongoose.model('horror', phoneSchema);



app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/api/phones', (req, res) => {

    PhoneModel.find((error, data) =>{
        res.json({phones:data});
    })

})

app.get('/api/phones/:id', (req, res)=>{
    console.log(req.params.id);

    PhoneModel.findById(req.params.id, (error,data)=>{
        res.json(data);
    })
})

app.delete('/api/phones/:id', (req, res)=>{
    console.log(req.params.id);

    PhoneModel.deleteOne({_id: req.params.id},
        (error, data) =>{
            res.json(data);
        })
})

app.put('/api/phones/:id',(req,res)=>{
    console.log("Edit: "+req.params.id);
    console.log(req.body);
    
    PhoneModel.findByIdAndUpdate(req.params.id,
        req.body,
        {new:true},
        (error,data)=>{
            res.json(data);
        })
})

app.get('/api/phones/:id', (req,res)=>{
    console.log("GET: "+req.params.id);

    PhoneModel.findById(req.params.id,(error, data)=>{
        res.json(data);
    })
})

app.post('/api/phones', (req,res)=>{
    console.log('Post request Successful');
    console.log(req.body.brand);
    console.log(req.body.model);
    console.log(req.body.year);
    console.log(req.body.poster);

    PhoneModel.create({
        brand:req.body.brand,
        model:req.body.model, 
        year:req.body.year, 
        poster:req.body.poster
    });

    res.json('post recieved!');
})
app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send('Hello ' + req.params.name)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))