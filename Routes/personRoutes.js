const express=require('express')
const router=express.Router()
const Person=require('../models/personSchema')

// Create and Save a Record of a Model: @ Post//
router.post('/newperson',(req,res)=>{
    let newPerson= new Person(req.body)
    newPerson.save((err,data)=>{
        err ? console.log(err): res.send('person was added')
    })
})
// Create many People with Model.create():@ Post //

var arrayOfPeople = [
    {name: "Salma", age: 24,   favoriteFoods: ["pizza"]},
    {name: "Amine", age: 35,    favoriteFoods: ["burritos"]},
    {name: "Intissar", age:30, favoriteFoods: ["hamburger"]}
   ];
   router.post('/many', (req, res) => {
   Person.create (arrayOfPeople,(err,data)=>{
    err ? console.log(err) : res.json(data)
   }
   )})
 //Use model.find() to Search Your Database :@ Get//
router.get('/',(req,res)=>{
    Person.find({},(err,data)=>{
        err ? console.log(err): res.json(data)
    })
})
//Use model.findOne() to Return a Single Matching Document from Your Database: @ Get// a revoir

router.get('/food/:favoriteFoods',(req,res)=> {
    Person.findOne({favoriteFoods: req.params.favoriteFoods}, (err, data)=> {
        err ? console.log(err): res.json(data)
    });  
  })


//Use model.findById() to Search Your Database By _id//
router.get('/:id', (req, res) => {
    Person.findById({_id:req.params.id},(err, data) => {
    err ? console.log(err) : res.json( data )
        ;})
      })
      
//Perform Classic Updates by Running Find, Edit, then Save//

router.get('/hamburger/:id', (req, res) => {
    Person.findById( {_id:req.params.id}, (err, data) => {
        data.favoriteFoods.push("hamburger");
        data.save(err ? console.log(err) : res.json({ data })
        );
    })
    })



//Perform New Updates on a Document Using model.findOneAndUpdate()// a voir

router.get('/Person/:id', (req, res) => {
    Person.findOneAndUpdate( {_id:req.params.id},{...req.body},{new:true}, (err, data) => {
        
        data.save(err ? console.log(err) : res.json({ data })
     );
     });
    })
   
  
//Delete One Document Using model.findByIdAndRemove//


 router.delete('/:id',(req,res)=>{
        Person.findByIdAndRemove({_id:req.params.id},(err,data)=>{
            err ? console.log(err) : res.json(data)
        })
    })


//MongoDB and Mongoose - Delete Many Documents with model.remove()//

   router.delete('/', (req, res) => {
        Person.remove({ name: 'Rihab' }, (err, data) => {
            err ? console.log(err) : res.json({ msg: "ALL name:Rihab deleted" })
        })
    })

//Chain Search Query Helpers to Narrow Search Results//
router.get('/burritos', (req, res) => {
        Person.find({ favoriteFoods: "burritos" }).
            sort({name: 1 }).
            limit(2).
            select({ age: false }).
            exec((err, data) => {
                err ? console.log(err) : res.json(data)
            })
    });
module.exports=router