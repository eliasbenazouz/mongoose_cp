let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mongoose = require('mongoose');
let person = require('./models/Person')
let db = 'mongodb://localhost/mongoosecpbase';

mongoose.connect(db)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  urlencoded:true
}))

let port = 3500

app.get('/',function(req,res){
    res.send('Home page')
})

app.post('/persons',function(req,res){
    let newPerson = new person()
    newPerson.name = req.body.name
    newPerson.age = req.body.age
    newPerson.favoriteFoods = req.body.favoriteFoods
  
    newPerson.save(function(err,person){
      if(err){
        res.send('an error occuredd')
      } else {
        res.send(person)
      }
    })
  })

app.get('/persons',function(req,res){
    person.find()
    .exec(function(err,persons){
      if(err){
        res.send('an error occured')
      } else {
        res.json(persons)
      }
    })
  })

app.get('/personsbyname',function(req,res){
    person.find({
      name: 'labib'
    })
    .exec(function(err, person){
      if(err){
        res.send('an error occured')
      } else {
        res.json(person)      
      }
    })
  })

app.get('/persons/:favoriteFoods',function(req,res){
    person.findOne({
        favoriteFoods: req.params.favoriteFoods
    })
    .exec(function(err, person){
      if(err){
        res.send('an error occured')
      } else {
        res.json(person)      
      }
    })
  })

app.get('/personbyid/:id',function(req,res){
    person.findById({
      _id: req.params.id
    })
    .exec(function(err, person){
      if(err){
        res.send('an error occured')
      } else {
        res.json(person)      
      }
    })
  })

app.put('/persons/:name',function(req,res){
    person.findOneAndUpdate({
      name:req.params.name
    },
    {$set:{age:req.body.age}},
    {new:true},
    function(err,newPerson){
      if(err){
        console.log('error')
      } else {
        res.send(newPerson)
      }
    })
  })

app.delete('/persons/:id',function(req,res){
    person.findOneAndRemove({
      _id:req.params.id
    },function(err,person){
      if(err){
        res.send('error deleting')
      } else {
        res.send(person)
      }
    })
  })

app.get('/personsquery',function(req,res){
    person.find({
        favoriteFoods: 'burrito'
    })
    .sort({firstName: 1})
    .limit(2)
    .select({age:false})
    .exec(function(err,persons){
      if(err){
        res.send('an error occured')
      } else {
        res.json(persons)
      }
    })
  })

app.listen(port,function(){
    console.log('Listening on port' + port)
  })