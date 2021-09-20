const express = require('express');
const cookieParser = require('cookie-parser')
const app =  express();
const {User,validate} = require('../models/userModel')
const {Branch} = require('../models/branchModel')
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

app.use(cookieParser())

const newUser = async (req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ Email: req.body.Email });
    if (user) return res.status(400).send('User already registered!');

    user = new User(req.body);
    // _.pick(req.body, ['Email', 'Password'])

    const salt = await bcrypt.genSalt(10);

    user.Password = await bcrypt.hash(user.Password, salt);
    user.branch = req.params.branch

    user = await user.save()

    const branch = await Branch.findById({_id:user.branch})
    if(!branch) return res.status(400).json({message:"Branch Does not exist"})
    const result = await User.findById(user._id).populate("branch","branch contact" )
    await result.save()
    return res.status(200).send({
        user: _.pick(result, ['_id', 'Email','IsAdmin','IsSuperAdmin','branch']),
    });

}

const allUser = async(req,res)=>{
    const user = await User.find()
    if(!user) return res.status(400).json({message:"No User Found"})
    const result = await User.find().populate("branch","branch contact" )
    return res.status(200).send(result)
}
const getUser = async(req,res)=>{
    const id = req.params.id
    try{
        const user = await User.findById({_id:id})
        if(!user) return res.status(400).json({message:"Id Not Found"})
        const result = await User.findById(user._id).populate("branch","branch contact" )
        await result.save()
        return res.status(200).send(result)
    }catch(err){
        return res.status(400).send("ID Not Found")
    }
    
}

const updateUser = async (req,res)=>{
    const id = req.params.id
    const updatedData = req.body
    try{
        const user = await User.findByIdAndUpdate(id,updatedData,{new:true})
        if(!user) return res.status(400).json({message:"Id Not Found"})
        return res.status(200).send(user)
    }catch(err){
        return res.status(400).send("ID Not Found")
    }

}


const deleteUser = async (req,res)=>{
    const id = req.params.id
    try{
        const user = await User.findByIdAndDelete(id)
        if(!user) return res.status(400).json({message:"Id Not Found"})
        return res.status(200).send(user)
    }catch(err){
        return res.status(400).send("ID Not Found")
    }

}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({message:"fill the empty field"});
    const user = await User.findOne({ Email: req.body.email }).populate("branch","branch contact" )
    if (!user) return res.status(400).json({message:"This email is not registered"})
    const pass = await bcrypt.compare(req.body.password, user.Password);
    if (!pass) return res.status(400).json({message:"incorrect Password"})

    const token = user.generateJWT();

    console.log(token)
    res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
    });
    const result = await user.save();
    res.status(200).send({
        token: token,
        user: _.pick(result, ['_id', 'Email','IsAdmin','IsSuperAdmin','branch'])
    })

}

router.route('/userApi/user/:branch')
    .post(newUser)
router.route('/userApi/user/getUser')
    .get(allUser)
router.route('/userApi/user/:id')
    .get(getUser)
router.route('/userApi/user/update/:id')
    .put(updateUser)
router.route('/userApi/user/delete/:id')
    .delete(deleteUser)
router.route('/userApi/login')
    .post(login)
module.exports = router;

