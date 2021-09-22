const express = require('express');
const app = express()
app.use(express.json())
const {Parcel} = require('../models/parcelModel')
const _ = require('lodash');
const router = express.Router();
const mongoose = require('mongoose');
const {Branch} =require('../models/branchModel');
const toId = mongoose.Types.ObjectId

const newParcel = async (req,res)=>{
    try{
        req.params.send = toId(req.params.send)
        if(!req.params.send) returnres.status(400).json({message:"Branch Does Not Exist"})
        req.params.to = toId(req.params.to)
        if(!req.params.send) return res.status(400).json({message:"Branch Does Not Exist"})
        parcel = new Parcel(req.body);
        parcel.BookedFrom =req.params.send
        parcel.SendTo =req.params.to
        parcel.BookedBy= req.params.employee
        const save = await parcel.save()
        const result = await Parcel.findById(save._id).populate("BookedFrom SendTo BookedBy","branch contact Username Email" )
        await result.save()
        return res.status(200).send(result)
    }catch(err){
        res.status(400).json({message:"Something Went Wrong"})
    }

}


const getParcel = async (req,res)=>{
    try{
        // .populate("BookedFrom SendTo BookedBy","branch contact Username Email" )
        const parcels = await Parcel.findById(req.params.parcelid).populate("BookedFrom ","branch" )
        // console.log(parcels)
        if(!parcels) return res.status(400).json({message:"Parcel Not Found"})
        const bookedBranch = await Branch.findById({_id:parcels.BookedFrom._id})
        if(!bookedBranch) return res.status(400).json({message:"Branch Does not Exist"})
        const sentBranch = await Branch.findById({_id:parcels.SendTo._id})
        if(!sentBranch) return res.status(400).json({message:"Branch Does not Exist"})
        // const bookedBy= await User.findById({_id:req.params.employeeid})
        // if(!bookedBy||bookedBy===null) return res.status(400).json({message:"Employee Does not Exist"})
        
        return res.status(200).send({
            parcel:parcels
        })

    }catch(err){
        return res.status(400).json({messag:"The Parcel Or The Employee Does not Exist "})
    }    
}

const allParcel = async (req,res)=>{
    const parcel = await Parcel.find().populate("BookedFrom SendTo BookedBy","branch contact Username Email" )
    if(!parcel) return res.status(400).json({message:"No Parcel Found"})
    return res.status(200).send(parcel)
} 

const updateParcel =  async (req,res)=>{
    const id = req.params.id
    const updatedData = req.body
    try{
        const parcel = await Parcel.findByIdAndUpdate(id,updatedData,{new:true})
        if(!parcel) return res.status(400).json({message:"Parcel Not Found"})
        return res.status(200).send(parcel)
    }catch(err){
        return res.status(400).json({message:"Parcel Not Found"})
    }

}

const deleteParcel = async(req,res)=>{
    const id = req.params.id
    try{
        const parcel = await Parcel.findByIdAndDelete(id)
        if(!parcel) return res.status(400).json({message:"Parcel Not Found"})
        return res.status(200).send(parcel)
    }catch(err){
        return res.status(400).send("Parcel Not Found")
    }

}
// GET /parcelApi/deleteParcel/sorted?sortBy=createdAt:desc
const sortedData = async(req,res)=>{
  var name = req.query.sortBy;
  console.log(name)
  var obj={}
  if (req.query.sortBy) {
    const parts = name.split(':')
    obj[parts[0]] = parts[1] === 'desc' ? -1 : 1
}
console.log(obj)

  Parcel
   .find().populate("BookedFrom SendTo","branch")
   .sort(obj)
   .exec(function(err, parcels) {
      if(err){
          res.status(404).send({
              message: err,
              data: []
          });
      } else {
          res.status(200).send({
              message: 'OK',
              data: parcels
          });
      }
  });
}

//GET 'http://localhost:4000/parcelApi/deleteParcel/getData'

const getData = async(req,res)=>{
    const time = req.params.time
    var result;
    if(time==="month"){
        const d = new Date().toISOString()
        console.log(d)
        var test = d.slice(0,7)
        console.log(test)
         result = await Parcel.aggregate([
            {
                $addFields: { creationDate:  {$dateToString:{format: "%Y-%m", date: "$createdAt"}}}
            },
            {
                $match:{
                    status:"Delivered",
                    creationDate:test
                }
            },
            {
                // {
                //     $month:'$createdAt'
                // }
                $group:{
                    _id:'$creationDate',
                    Delivered:{$sum:1}
                }
               
            },
            {
                $addFields:{month:'$_id'}
            },
            {
                $project:{
                    _id:0
                }
            }
            
        ]
        )
    }
    else if(time==="day"){
        const d = new Date().toISOString()
        console.log(d)
        var test = d.split('T')
        console.log(test)
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate:  {$dateToString:{format: "%Y-%m-%d", date: "$createdAt"}}}
            },
            {
                $match:{
                    status:"Delivered",
                    creationDate:test[0]
                    }
            }, 
      
            {
                $group:{
                    _id:'$creationDate',     
                    Delivered:{$sum:1}
                }
               
            },
            {
                $addFields:{day:'$_id'}
            },
            
            {
                $project:{
                    _id:0
                }
            }
            
        ]
        )
    }
    else if(time==='week'){
        const presentTime = new Date()
        const e = presentTime.getTime()-(7 * 24 * 60 * 60 * 1000)
        var earlierTime = new Date(e).toJSON();
        var updatedeTime = earlierTime.split('T')
        console.log(updatedeTime[0])
        const updatedpTime = presentTime.toISOString()
        var updatedpTime1 = updatedpTime.split('T')
        console.log(updatedpTime1[0])

        result = await Parcel.aggregate([
            {
                $addFields:  { creationDate:  {$dateToString:{format: "%Y-%m-%d", date: "$createdAt"}}}
            },
            {
                $match:{
                    status:"Delivered",
                    creationDate:{
                        $lte: updatedpTime1[0], 
                        $gte:updatedeTime[0]
                    }
   
                    }
            }, 

            {
                $group:{
                    _id:'$creationDate',
                        
                    Delivered:{$sum:1}
                }
               
            },
   

            {
                $addFields:{week_day:'$_id'}
            },
            
            {
                $project:{
                    _id:0
                }
            },

            
        ]
        )
    }
    else{
        result = await Parcel.aggregate([
            {
                $match:{status:"Delivered"}
            },
            {
                $group:{
                    _id:{
                        $year:'$createdAt'
                    },
                    Delivered:{$sum:1}
                }
               
            },
            {
                $addFields:{Year:'$_id'}
            },
            {
                $project:{
                    _id:0
                }
            }
            
        ]
        )
    }
    // console.log(time)

  res.status(200).json({
      status:'success',
      data:{
          result
      }
  })
   
}
router.route('/parcelApi/parcel/:send/:to/:employee')
    .post(newParcel)
router.route('/parcelApi/see/:parcelid/:employeeid')
    .get(getParcel)
router.route('/parcelApi/see/allParcel')
    .get(allParcel)
router.route('/parcelApi/updateParcel/:id')
    .put(updateParcel)
router.route('/parcelApi/deleteParcel/:id')
    .delete(deleteParcel)
router.route('/parcelApi/deleteParcel/sorted')
    .get(sortedData)
router.route('/parcelApi/deleteParcel/getData/:time')
    .get(getData)

module.exports = router;


// router.route('/parcelApi/:parcel/:send/:to')
//     .get(getParcel)

// {
// 	"products":[{"ProductType":"Electrtic"},{"ProductType":"Books"}],
// 	"SenderName":"xyz",
// 	"SenderNumber":"5656",
// 	"RecieverName":"oml",
// 	"RecieverNumber":"025",
// 	"TotalCost":"65656",
// 	"PaidAmount":"554",
// 	"PayableAmount":"55",
// 	"status":"Booked"
// }

// see parcel
// http://localhost:4000/see/61417fcd07a88871a93540ef/61417a45144ae021eedd1b4c