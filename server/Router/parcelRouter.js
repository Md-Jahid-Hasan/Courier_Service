const express = require('express');
const app = express()
app.use(express.json())
const { Parcel } = require('../models/parcelModel')
const _ = require('lodash');
const router = express.Router();
const mongoose = require('mongoose');
const { Branch } = require('../models/branchModel');
const { result } = require('lodash');
const { User } = require('../models/userModel');
const toId = mongoose.Types.ObjectId

const newParcel = async (req, res) => {
    try {
        // const {ProductType,SenderName,SenderNumber,SenderEmail,RecieverName,RecieverNumber,RecieverEmail,Totalcost,PaidAmount,PayableAmount,status,SearchId} = req.body
        req.params.send = toId(req.params.send)
        if (!req.params.send) return res.status(400).json({ message: "Branch Does Not Exist" })
        req.params.to = toId(req.params.to)
        if (!req.params.send) return res.status(400).json({ message: "Branch Does Not Exist" })
        //         var dateobj = 
        //    new Date('October 15, 1996 05:35:32');
        // if(!ProductType|| !SenderName||!SenderNumber||!SenderEmail||!RecieverName||!RecieverNumber||!RecieverEmail||!Totalcost||!SearchId||!PaidAmount||!PayableAmount||!status) return res.status(400).send({
        //     check:SenderName
        // })
        // .json({message:"All Field Must Be Filled Up"})
        parcel = await Parcel.findOne({SearchId:req.body.SearchId})
        if(parcel) return res.status(400).json({message:"This ID is already Exists"})
        parcel = new Parcel(req.body);
        parcel.BookedFrom = req.params.to
        parcel.SendTo = req.params.send
        parcel.BookedBy = req.params.employee
        const save = await parcel.save()
        const result = await Parcel.findById(save._id).populate("BookedFrom SendTo BookedBy", "branch contact Username Email")
        await result.save()
        return res.status(200).send(result)
    } catch (err) {
        res.status(400).json({ message: "Something Went Wrong" })
    }

}


const getParcel = async (req, res) => {
    try {

        const parcels = await Parcel.findOne({ SearchId: req.params.parcelid })
        console.log(parcels)
        if (!parcels) return res.status(400).json({ message: "Parcel Not Found" })
        const result = await Parcel.findById({ _id: parcels._id }).populate("BookedFrom SendTo", "branch")


        return res.status(200).send({
            parcel: result
        })

    } catch (err) {
        return res.status(400).json({ messag: "The Parcel Does not Exist " })
    }
}

const allParcel = async (req, res) => {
    const parcel = await Parcel.find().populate("BookedFrom SendTo BookedBy", "branch contact Username Email")
    if (!parcel) return res.status(400).json({ message: "No Parcel Found" })
    return res.status(200).send(parcel)
}

const updateParcel = async (req, res) => {
    const id = req.params.id
    const updatedData = req.body
    try {
        const parcel = await Parcel.findByIdAndUpdate(id, updatedData, { new: true })
        if (!parcel) return res.status(400).json({ message: "Parcel Not Found" })
        return res.status(200).send(parcel)
    } catch (err) {
        return res.status(400).json({ message: "Parcel Not Found" })
    }

}

const deleteParcel = async (req, res) => {
    const id = req.params.id
    try {
        const parcel = await Parcel.findByIdAndDelete(id)
        if (!parcel) return res.status(400).json({ message: "Parcel Not Found" })
        return res.status(200).send(parcel)
    } catch (err) {
        return res.status(400).send("Parcel Not Found")
    }

}
// GET /parcelApi/deleteParcel/sorted?sortBy=createdAt:desc
const sortedData = async (req, res) => {
    var name = req.query.sortBy;
    console.log(name)
    var obj = {}
    if (req.query.sortBy) {
        const parts = name.split(':')
        obj[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    console.log(obj)

    Parcel
        .find().populate("BookedFrom SendTo", "branch")
        .sort(obj)
        .exec(function (err, parcels) {
            if (err) {
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

const comingProduct = async (req, res) => {
    const id = req.params.id
    const result = await Parcel.find({ SendTo: id })
    if (!result) return res.status(400).json({ message: "No Parcel Available" })
    res.status(200).send(result)

}

//GET 'http://localhost:4000/parcelApi/deleteParcel/getData'

const getData = async (req, res) => {
    const time = req.params.time
    var result;
    if (time === "month") {
        const d = new Date().toISOString()
        console.log(d)
        var test = d.slice(0, 7)
        console.log(test)
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: "Delivered",
                    creationDate: test
                }
            },
            {
                // {
                //     $month:'$createdAt'
                // }
                $group: {
                    _id: '$creationDate',
                    Delivered: { $sum: 1 }
                }

            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            }

        ]
        )
    }
    else if (time === "day") {
        const d = new Date().toISOString()
        console.log(d)
        var test = d.split('T')
        console.log(test)
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: "Delivered",
                    creationDate: test[0]
                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    Delivered: { $sum: 1 }
                }

            },
            {
                $addFields: { day: '$_id' }
            },

            {
                $project: {
                    _id: 0
                }
            }

        ]
        )
    }
    else if (time === 'week') {
        const presentTime = new Date()
        const e = presentTime.getTime() - (7 * 24 * 60 * 60 * 1000)
        var earlierTime = new Date(e).toJSON();
        var updatedeTime = earlierTime.split('T')
        console.log(updatedeTime[0])
        const updatedpTime = presentTime.toISOString()
        var updatedpTime1 = updatedpTime.split('T')
        console.log(updatedpTime1[0])

        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: "Delivered",
                    creationDate: {
                        $lte: updatedpTime1[0],
                        $gte: updatedeTime[0]
                    }

                }
            },

            {
                $group: {
                    _id: '$creationDate',

                    Delivered: { $sum: 1 }
                }

            },


            {
                $addFields: { week_day: '$_id' }
            },

            {
                $project: {
                    _id: 0
                }
            },


        ]
        )
    }
    else {
        result = await Parcel.aggregate([
            {
                $match: { status: "Delivered" }
            },
            {
                $group: {
                    _id: {
                        $year: '$createdAt'
                    },
                    Delivered: { $sum: 1 }
                }

            },
            {
                $addFields: { Year: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            }

        ]
        )
    }
    // console.log(time)

    res.status(200).json({
        status: 'success',
        data: {
            result
        }
    })

}

const BookedBranchData = async (req, res) => {

    const time = req.params.time
    const status = req.params.status
    const branchId = req.params.branchId
    console.log(branchId)
    const testing = toId(branchId)
    console.log(testing)
    var d = new Date(time)
    d = d.getTime()
    d = new Date(d).toJSON();
    console.log(d)
    var test = d.split('T')
    console.log(test)

    var result
    if (status === "Booked") {
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: status,
                    creationDate: test[0],
                    BookedFrom: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Booked: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },

            {
                $project: {
                    _id: 0,
                    data: 1,
                    Booked: 1
                }
            }

        ]
        )

        // const Booked  = result[0].Booked
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
    }
    else if (status === "Recieved") {
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: status,
                    creationDate: test[0],
                    BookedFrom: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Recieved: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Recieved: 1
                }
            }

        ]
        )

        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    


    }
    else if (status === "Sent") {
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: status,
                    creationDate: test[0],
                    BookedFrom: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Sent: { $sum: 1 },
                    data: { $push: "$$ROOT" }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Sent: 1
                }
            }

        ]
        )
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
    }
    else if (status === 'Delivered') {

        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: status,
                    creationDate: test[0],
                    BookedFrom: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Delivered: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Booked: 1
                }
            }

        ]
        )
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
    }
    else {

        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$expectedDate" } } }
            },
            {
                $match: {
                    status: "Sent",
                    creationDate: test[0],
                    BookedFrom: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Upcoming: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Upcoming: 1
                }
            }

        ]
        )
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
    }
}


const SentBranchData = async (req, res) => {
    const time = req.params.time
    const status = req.params.status
    const branchId = req.params.branchId
    console.log(branchId)
    const testing = toId(branchId)
    console.log(testing)
    var d = new Date(time)
    d = d.getTime()
    d = new Date(d).toJSON();
    console.log(d)
    var test = d.split('T')
    console.log(test)
    var result
    if (status === "Booked") {
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: status,
                    creationDate: test[0],
                    SendTo: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Booked: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Booked: 1
                }
            }

        ]
        )
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
    }
    else if (status === "Recieved") {
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: status,
                    creationDate: test[0],
                    SendTo: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Recieved: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Recieved: 1
                }
            }

        ]
        )
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
    }
    else if (status === "Sent") {
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: status,
                    creationDate: test[0],
                    SendTo: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Sent: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Booked: 1
                }
            }

        ]
        )
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
    }
    else if (status === "Delivered") {

        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    status: status,
                    creationDate: test[0],
                    SendTo: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Delivered: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Delivered: 1
                }
            }

        ]
        )
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
    }
    else {
        result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$expectedDate" } } }
            },
            {
                $match: {
                    status: "Sent",
                    creationDate: test[0],
                    SendTo: testing
                }
            },

            {
                $group: {
                    _id: null,
                    Upcoming: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }

            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    Upcoming: 1
                }
            }

        ]
        )
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    

    }

}

const SelfData = async (req, res) => {
    var userId = req.params.userId
    userId = toId(userId)
    const time = req.params.date
    var d = new Date(time)
    d = d.getTime()
    d = new Date(d).toJSON();
    console.log(d)
    var test = d.split('T')
    console.log(test)
    var result
    result = await Parcel.aggregate([
        {
            $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
        },
        {
            $match: {
                creationDate: test[0],
                BookedBy: userId
            }
        },

        {
            $group: {
                _id: null,
                Count: { $sum: 1 },
                data: { $push: '$$ROOT' }
            }

        },
        {
            $project: {
                _id: 0,
                data: 1,
                Count: 1
            }
        }


    ]
    )
    if(result.length < 1 || result === undefined){
        return res.status(400).json({message:"There is no data to show"})
    }
    else{
        const promises =await Promise.all(result[0].data.map(async (val, ind) => {
            var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
            return parcel
        })) 
 
        return res.status(200).send(promises)
    
    }

}


const generateProductId = async (req, res) => {
    let r = (Math.random() + 1).toString(36).substring(7);
    const parcel = await Parcel.findOne({ SearchId: r })
    if (parcel) return res.status(400).json({ mesage: "This Id Is already Exists.Click Again to get new Id" })
    return res.status(200).send({
        searchId: r
    })
}

const subAdminDash = async (req, res) => {
    const calender = req.params.calender
    const date = req.params.date
    if (date === "Monthly") {
        const presentTime = new Date(calender)

        const presentMonth = presentTime.getMonth()
        console.log(presentMonth)
        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-0${presentMonth + 1}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-0${presentMonth + 1}-30`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    creationDate: {
                        $lte: LastDayMonth,
                        $gte: FirstDayMonth
                    },
                    // status:'Delivered'
                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    // Total:{$add:['$TotalCost','$PaidAmount']},
                    Booked: { $sum: "$TotalCost" },
                    PaidAmount: { $sum: "$PaidAmount" },
                    PayableAmount: { $sum: '$PayableAmount' }
                }

            },
            // {
            //     $match: {    
            //         status:'Delivered'
            //     }
            // },
            // {
            //     $group:{
            //         _id:null,
            //         PayableAmount:{ $sum: '$PayableAmount' }

            //     }
            // },
            {
                $addFields: { week_day: '$_id' }
            },
            {
                $sort: { week_day: 1 }
            },

            {
                $project: {
                    _id: 0,

                }
            },

        ]
        )


        res.status(200).send(result)
    }
    else {

        const presentTime = new Date(calender)


        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-12`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m", date: "$createdAt" } } }
            },
            {
                $match: {
                    creationDate: {
                        $lte: LastDayMonth,
                        $gte: FirstDayMonth
                    }

                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    Booked: { $sum: "$TotalCost" },
                    PaidAmount: { $sum: "$PaidAmount" },
                    PayableAmount: { $sum: '$PayableAmount' }
                }

            },


            {
                $addFields: { Month: '$_id' }
            },
            {
                $sort: { Month: 1 }
            },

            {
                $project: {
                    _id: 0,

                }
            },

        ]
        )
        res.status(200).send(result)
    }

}

const subAdminDashCard = async (req, res) => {
    const branch = req.params.branch
    console.log(branch)
    const result = await Parcel.aggregate([
        {
            // $match:{
            //     $BookedFrom:toId(branchId)
            // },
            $group: {
                _id: '$status',
                Total: { $sum: 1 }
            }

        }
    ])
    return res.status(200).send(result)
}
const subAdminHistory = async (req, res) => {
    const calender = req.params.calender
    const presentTime = new Date(calender)
    const branch = toId(req.params.branch)
    
    const presentMonth = presentTime.getMonth()
    
    const presentYear = presentTime.getFullYear()
   
    const presentDate = presentTime.getDate()
   
    const LatestDayMonth = `${presentYear}-0${presentMonth + 1}-${presentDate}`
    console.log(LatestDayMonth)



    const result = await Parcel.aggregate([
        {
            $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
        },
        {
            $match: {
                creationDate: {
                    $eq: LatestDayMonth
                },
                BookedFrom: branch
            }
        },

        {
            $group: {
                _id: 'null',
                // Total:{$add:['$TotalCost','$PaidAmount']},
                // Booked: { $sum: "$TotalCost" },
                // PaidAmount: { $sum: "$PaidAmount" },
                // PayableAmount: { $sum: '$PayableAmount' }
                Product: { $sum: 1 },
                data: { $push: '$$ROOT' }
            }

        },
        {
            $project: {
                _id: 0,
                data: 1,
                Product: 1
            }
        },

        ]
        )
        console.log(result)
        // const Product  = result[0].Product
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
            

    return res.status(200).send(promises)

    // res.status(200).send(result)

}


const subAdminHistorySend = async (req, res) => {
    const calender = req.params.calender
    const presentTime = new Date(calender)
    const branch = toId(req.params.branch)
    console.log(branch)
    const presentMonth = presentTime.getMonth()
    console.log(presentMonth)
    const presentYear = presentTime.getFullYear()
    console.log(presentYear)
    const presentDate = presentTime.getDate()
    console.log(presentDate)
    const LatestDayMonth = `${presentYear}-0${presentMonth + 1}-${presentDate}`
    console.log(LatestDayMonth)



        const result = await Parcel.aggregate([
            {
                $addFields: { updatedDate: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } } }
            },
            {
                $match: {
                    updatedDate: {
                        $eq: LatestDayMonth
                    },
                    SendTo:branch ,
                    $or:[
                        {status:"Delivered"},
                        {status:"Recieved"}
                    ]
                }
            },

 

        {
            $group: {
                _id: 'null',
                // Total:{$add:['$TotalCost','$PaidAmount']},
                // Booked: { $sum: "$TotalCost" },
                // PaidAmount: { $sum: "$PaidAmount" },
                // PayableAmount: { $sum: '$PayableAmount' }
                Product: { $sum: 1 },
                data: { $push: '$$ROOT' }
            }

        },
        {
            $project: {
                _id: 0,
                data: 1,
                Product: 1
            }
        },

    ]
    )


        console.log(result)
        // const Product  = result[0].Product
        if(result.length < 1 || result === undefined){
            return res.status(400).json({message:"There is no data to show"})
        }
        else{
            const promises =await Promise.all(result[0].data.map(async (val, ind) => {
                var parcel = await Parcel.findById({ _id: val._id }).populate("BookedFrom SendTo", "branch")
                return parcel
            })) 
     
            return res.status(200).send(promises)
        
        }
    
}

const AdminDash = async (req, res) => {
    const calender = req.params.calender
    const date = req.params.date
    const branchId = toId(req.params.branchId)
    console.log(branchId)
    if (date === "Monthly") {
        const presentTime = new Date(calender)

        const presentMonth = presentTime.getMonth()
        console.log(presentMonth)
        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-0${presentMonth + 1}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-0${presentMonth + 1}-30`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    creationDate: {
                        $lte: LastDayMonth,
                        $gte: FirstDayMonth
                    },
                    BookedFrom: branchId

                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    // Total:{$add:['$TotalCost','$PaidAmount']},
                    Booked: { $sum: "$TotalCost" },
                    PaidAmount: { $sum: "$PaidAmount" },

                }

            },


            {
                $addFields: { week_day: '$_id' }
            },
            {
                $sort: { week_day: 1 }
            },

            {
                $project: {
                    _id: 0,

                }
            },

        ]
        )


        res.status(200).send(result)
    }
    else {

        const presentTime = new Date(calender)


        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-12`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m", date: "$createdAt" } } }
            },
            {
                $match: {
                    creationDate: {
                        $lte: LastDayMonth,
                        $gte: FirstDayMonth
                    },
                    BookedFrom: branchId
                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    Booked: { $sum: "$TotalCost" },
                    PaidAmount: { $sum: "$PaidAmount" }
                }

            },


            {
                $addFields: { Month: '$_id' }
            },
            {
                $sort: { Month: 1 }
            },

            {
                $project: {
                    _id: 0,

                }
            },

        ]
        )


        res.status(200).send(result)
    }

}
const AdminDashAll = async (req, res) => {
    const calender = req.params.calender
    const date = req.params.date

    if (date === "Monthly") {
        const presentTime = new Date(calender)

        const presentMonth = presentTime.getMonth()
        console.log(presentMonth)
        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-0${presentMonth + 1}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-0${presentMonth + 1}-30`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    creationDate: {
                        $lte: LastDayMonth,
                        $gte: FirstDayMonth
                    },
                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    // Total:{$add:['$TotalCost','$PaidAmount']},
                    Booked: { $sum: "$TotalCost" },
                    PaidAmount: { $sum: "$PaidAmount" },

                }

            },


            {
                $addFields: { week_day: '$_id' }
            },
            {
                $sort: { week_day: 1 }
            },

            {
                $project: {
                    _id: 0,

                }
            },

        ]
        )


        res.status(200).send(result)
    }
    else {

        const presentTime = new Date(calender)


        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-12`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m", date: "$createdAt" } } }
            },
            {
                $match: {
                    creationDate: {
                        $lte: LastDayMonth,
                        $gte: FirstDayMonth
                    },
                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    Booked: { $sum: "$TotalCost" },
                    PaidAmount: { $sum: "$PaidAmount" }
                }

            },


            {
                $addFields: { Month: '$_id' }
            },
            {
                $sort: { Month: 1 }
            },

            {
                $project: {
                    _id: 0,

                }
            },

        ]
        )


        res.status(200).send(result)
    }
}

const AdminDashCardAll = async (req, res) => {
    const result = await Parcel.aggregate([
        {
            $group: {
                _id: '$status',
                Total: { $sum: 1 }
            }

        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
    return res.status(200).send(result)
}
const AdminDashCardBranch = async (req, res) => {
    const branchId = toId(req.params.branch)
    // console.log(branchId)
    const result = await Parcel.aggregate([
        {
            $match: {
                BookedFrom: branchId
            }
        },
        {
            $group: {
                _id: '$status',
                Total: { $sum: 1 }
            }

        }
    ])
    return res.status(200).send(result)
}

const AdminDashCardBranchSend = async (req, res) => {
    const branchId = toId(req.params.branch)
    // console.log(branchId)
    const result = await Parcel.aggregate([
        {
            $match: {
                SendTo: branchId
            }
        },
        {
            $group: {
                _id: '$status',
                Total: { $sum: 1 }
            }

        }
    ])
    return res.status(200).send(result)
}


const AdminDashSend = async (req, res) => {
    const calender = req.params.calender
    const date = req.params.date
    const branchId = toId(req.params.branchId)
    console.log(branchId)
    if (date === "Monthly") {
        const presentTime = new Date(calender)

        const presentMonth = presentTime.getMonth()
        console.log(presentMonth)
        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-0${presentMonth + 1}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-0${presentMonth + 1}-30`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
            },
            {
                $match: {
                    creationDate: {
                        $lte: LastDayMonth,
                        $gte: FirstDayMonth
                    },
                    SendTo: branchId

                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    // Total:{$add:['$TotalCost','$PaidAmount']},
                    Booked: { $sum: "$TotalCost" },
                    PaidAmount: { $sum: "$PaidAmount" },

                }

            },


            {
                $addFields: { week_day: '$_id' }
            },
            {
                $sort: { week_day: 1 }
            },

            {
                $project: {
                    _id: 0,

                }
            },

        ]
        )


        res.status(200).send(result)
    }
    else {

        const presentTime = new Date(calender)


        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-12`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $addFields: { creationDate: { $dateToString: { format: "%Y-%m", date: "$createdAt" } } }
            },
            {
                $match: {
                    creationDate: {
                        $lte: LastDayMonth,
                        $gte: FirstDayMonth
                    },
                    SendTo: branchId
                }
            },

            {
                $group: {
                    _id: '$creationDate',
                    Booked: { $sum: "$TotalCost" },
                    PaidAmount: { $sum: "$PaidAmount" }
                }

            },


            {
                $addFields: { Month: '$_id' }
            },
            {
                $sort: { Month: 1 }
            },

            {
                $project: {
                    _id: 0,

                }
            },

        ]
        )


        res.status(200).send(result)
    }

}

const getUniqueParcel = async(req,res)=>{
    try {
        
        const parcels = await Parcel.findOne({SearchId:req.params.parcelid})
        console.log(parcels)
        if (!parcels) return res.status(400).json({ message: "Parcel Not Found" })
        const result = await Parcel.findById({_id:parcels._id}).populate("BookedFrom SendTo","branch")


        return res.status(200).send({
            parcel: result
        })

    } catch (err) {
        return res.status(400).json({ messag: "The Parcel Does not Exist " })
    }
}



// ----------------
const Test = async (req, res) => {
    const calender = req.params.calender
    const date = req.params.date
    const branch = req.params.branch
    if (date === "Monthly") {
        const presentTime = new Date(calender)

        const presentMonth = presentTime.getMonth()
        console.log(presentMonth)
        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-0${presentMonth + 1}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-0${presentMonth + 1}-30`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([
            {
                $facet: {
                    "showData": [
                        {
                            $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
                        },
                        {
                            $match: {
                                creationDate: {
                                    $lte: LastDayMonth,
                                    $gte: FirstDayMonth
                                },
                                BookedFrom: toId(branch)

                            }
                        },

                        {
                            $group: {
                                _id: '$creationDate',

                                PaidAmount: { $sum: "$PaidAmount" },
                                PayableAmount: { $sum: '$PayableAmount' }
                            }

                        },


                        {
                            $addFields: { week_day: '$_id' }
                        },
                        {
                            $sort: { week_day: 1 }
                        },

                        {
                            $project: {
                                _id: 0,

                            }
                        },
                    ],

                    "showPayable": [
                        {
                            $addFields: { creationDate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }
                        },
                        {
                            $match: {
                                creationDate: {
                                    $lte: LastDayMonth,
                                    $gte: FirstDayMonth
                                },
                                status: "Delivered",
                                SendTo: toId(branch)

                            }
                        },

                        {
                            $group: {
                                _id: '$creationDate',
                                PayableAmount: { $sum: '$PayableAmount' }
                            }

                        },


                        {
                            $addFields: { week_day: '$_id' }
                        },
                        {
                            $sort: { week_day: 1 }
                        },

                        {
                            $project: {
                                _id: 0,

                            }
                        },
                    ]
                }
            },


        ]
        )


        res.status(200).send(result)
    }
    else {

        const presentTime = new Date(calender)


        const presentYear = presentTime.getFullYear()
        console.log(presentYear)
        const FirstDayMonth = `${presentYear}-01`
        console.log(FirstDayMonth)
        const LastDayMonth = `${presentYear}-12`
        console.log(LastDayMonth)


        const result = await Parcel.aggregate([


            {
                $facet: {
                    "showData": [
                        {

                            $addFields: { creationDate: { $dateToString: { format: "%Y-%m", date: "$createdAt" } } }
                        },

                        {
                            $match: {
                                creationDate: {
                                    $lte: LastDayMonth,
                                    $gte: FirstDayMonth
                                },
                                BookedFrom: toId(branch)

                            }
                        },

                        {
                            $group: {
                                _id: '$creationDate',

                                PaidAmount: { $sum: "$PaidAmount" },
                                PayableAmount: { $sum: '$PayableAmount' }
                            }

                        },


                        {
                            $addFields: { week_day: '$_id' }
                        },
                        {
                            $sort: { week_day: 1 }
                        },

                        {
                            $project: {
                                _id: 0,

                            }
                        },
                    ],

                    "showPayable": [
                        {

                            $addFields: { creationDate: { $dateToString: { format: "%Y-%m", date: "$createdAt" } } }
                        },
                        {
                            $match: {
                                creationDate: {
                                    $lte: LastDayMonth,
                                    $gte: FirstDayMonth
                                },
                                status: "Delivered",
                                SendTo: toId(branch)

                            }
                        },

                        {
                            $group: {
                                _id: '$creationDate',
                                PayableAmount: { $sum: '$PayableAmount' }
                            }

                        },

                        {
                            $addFields: { week_day: '$_id' }
                        },
                        {
                            $sort: { week_day: 1 }
                        },

                        {
                            $project: {
                                _id: 0,

                            }
                        },
                    ]
                }
            },


        ]
        )


        res.status(200).send(result)
    }

}

// ----------------
const sendText = async(req,res)=>{
    const branch = await Branch.findOne({_id:toId(req.body.branchId)})
    const parcel = await Parcel.findOne({SendTo:toId(req.body.sendToBranch)}).populate("SendTo BookedBy","branch contact Username Email")
    const user = await User.findOne({_id:toId(req.body.bookedbyId)})

    if(req.body.status === "Booked"){
        
        console.log(`Dear ${req.body.SenderName}, Your Product is Booked at ${branch.branch} Branch. The Proqduct Will Be Sent To ${parcel.SendTo.branch} Branch. Your Product is Booked By ${user.Username} ` )
    }
    else if(req.body.status === "Recieved"){
        console.log(`Dear ${req.body.RecieverName}, Your Product is Booked at ${branch.branch} Branch. The Proqduct is  now rtecieved At ${parcel.SendTo.branch} Branch. Your Product is Booked By ${user.Username} `)
    }
    else{
        console.log(`Dear ${req.body.SenderName}, Your Product is delivered to ${req.body.RecieverName}`)
    }
}

router.route('/parcelApi/parcel/:send/:to/:employee')
    .post(newParcel)
    // optional Route
router.route('/parcelApi/see/:parcelid')
    .get(getParcel)
    // 
router.route('/parcelApi/see/oneProduct/:parcelUniqueid')
    .get(getUniqueParcel)
router.route('/parcelApi/seeComingProduct/:id')
    .get(comingProduct)
router.route('/parcelApi/see/getAll/allParcel')
    .get(allParcel)
router.route('/parcelApi/updateParcel/:id')
    .put(updateParcel)
router.route('/parcelApi/deleteParcel/:id')
    .delete(deleteParcel)
router.route('/parcelApi/deleteParcel/sorted')
    .get(sortedData)
router.route('/parcelApi/deleteParcel/getData/:time')
    .get(getData)
router.route('/parcelApi/branchUser/bookedFrom/:branchId/:status/:time')
    .get(BookedBranchData)
router.route('/parcelApi/branchUser/sendTo/:branchId/:status/:time')
    .get(SentBranchData)
router.route('/parcelApi/branchUser/:userId/:date')
    .get(SelfData)
router.route('/parcelApi/generateId')
    .get(generateProductId)
router.route('/parcelApi/subAdmin/dashboard/:calender/:date/')
    .get(subAdminDash)
router.route('/parcelApi/subAdmin/dashboard/card/totalshow/:branch')
    .get(subAdminDashCard)
router.route('/parcelApi/subAdmin/bookedFrom/history/:calender/:branch')
    .get(subAdminHistory)
router.route('/parcelApi/subAdmin/sendTo/history/:calender/:branch')
    .get(subAdminHistorySend)
router.route('/parcelApi/admin/dashboard/allBranch/:calender/:date/')
    .get(AdminDashAll)
router.route('/parcelApi/admin/dashboard/:calender/:date/:branchId')
    .get(AdminDash)
router.route('/parcelApi/admin/dashboard/sendTo/all/:calender/:date/:branchId')
    .get(AdminDashSend)
router.route('/parcelApi/admin/dashboard/cardAll/totalshow/')
    .get(AdminDashCardAll)
router.route('/parcelApi/admin/dashboard/cardBranch/:branch')
    .get(AdminDashCardBranch)
router.route('/parcelApi/admin/dashboard/sendTo/totalShowbranch/cardBranch/:branch')
    .get(AdminDashCardBranchSend)
router.route('/testApi/testData/:calender/:date/:branch')
    .get(Test)
router.route("/textApi/userMessage")
    .post(sendText)


module.exports = router;
