const express = require('express');
const {Branch} = require('../models/branchModel')
const _ = require('lodash');
const router = express.Router();

const newBranch =async (req,res)=>{
    let branch = await Branch.findOne({branch: req.body.branch });
    if (branch) return res.status(400).json({message:'Branch already exists!'});
    let check = await Branch.find()
    let reqBranch = req.body.branch.toUpperCase()
    console.log(reqBranch)
    check.map((val,ind)=>{
        var value = val.branch.toUpperCase()
        console.log(value)
        if(value.localeCompare(reqBranch)===0)
        return res.status(400).json({message:'Branch already exists!'});
    })
    if(!req.body.branch || !req.body.contact)
    return res.status(400).json({message:"Fill All The Fields"})
    
    branch = new Branch(req.body);

    const result = await branch.save();

    return res.status(201).send({
        branch: _.pick(result, ['_id', 'branch','contact'])
    });
}

const allBranch = async(req,res)=>{
    let branch = await Branch.find()
    if(!branch) return res.status(400).json({message:"No Branch Found"})

    res.status(200).send(branch)
}

const getBranch = async (req,res)=>{
    const id = req.params.id
    try{
        const branch = await Branch.findById({_id:id})
        if(!branch) return res.status(400).json({message:"Branch Not Found"})
        return res.status(200).send(branch)
    }catch(err){
        return res.status(400).send("Branch Not Found")
    }
}
const updateBranch =async (req,res)=>{
    const id = req.params.id
    const updatedData = req.body
    try{
        const branch = await Branch.findByIdAndUpdate(id,updatedData,{new:true})
        if(!branch) return res.status(400).json({message:"Branch Not Found"})
        return res.status(200).send(branch)
    }catch(err){
        return res.status(400).send("Branch Not Found")
    }
}

const deleteBranch = async(req,res)=>{
    const id = req.params.id
    try{
        const branch = await Branch.findByIdAndDelete(id)
        if(!branch) return res.status(400).json({message:"Branch Not Found"})
        return res.status(200).send(branch)
    }catch(err){
        return res.status(400).send("Branch Not Found")
    }
}
//testApi/branchTest?page=2&limit=5
const TestData = async (req,res)=>{
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page-1)*limit
    const endIndex = page*limit
    const branch = await Branch.find()
    const results = {}
    results.results = branch.slice(startIndex,endIndex)
    if(endIndex<branch.length){
        results.next={
            page:page+1,
            limit:limit
        }
    }
    else{
        results.next={
            page:page,
            limit:limit
        }
    }

    if(startIndex>0){
        results.prev={
            page:page-1,
            limit:limit
        }
    }
    else{
        results.prev={
            page:0,
            limit:limit
        }
    }
    
    res.status(200).send(results)
}

router.route('/branchApi/createBranch')
    .post(newBranch)
router.route('/branchApi/getBranch')
    .get(allBranch)
router.route('/branchApi/getBranch/:id')
    .get(getBranch)
router.route('/branchApi/updateBranch/:id')
    .put(updateBranch)
router.route('/branchApi/deleteBranch/:id')
    .delete(deleteBranch)
 router.route('/testApi/branchTest')
    .get(TestData)
module.exports = router;