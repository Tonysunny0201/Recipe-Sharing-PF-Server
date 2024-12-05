const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register
exports.registerController=async (req,res)=>{
    console.log("inside user register");
console.log(req.body);
const {username,email,password}=req.body
try{
 const existinguser=await users.findOne({email})
if(existinguser){
    res.status(406).json("user already registered.. please Login")

}else{
const newuser =new users({
    username,email,password
})
await newuser.save()
res.status(200).json(newuser)

}

}catch(err){
    console.log(err);
    res.status(401).json(err)
}
}

// login
exports.loginController = async(req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // token geneartion
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(404).json("Incorrect Email / Password!!")
        }
    } catch (err) {
        res.status(401).json(err)
    }   
}


// profile updation of user
exports.editUserController = async (req,res)=>{
    console.log("editUserController");
    const {username,email,password} = req.body
    const userId = req.userId
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
    
}
