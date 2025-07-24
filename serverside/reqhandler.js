
import userSchema from './models/model.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
import bookSchema from './models/model1.js'
const { sign } = pkg

export async function adduser(req, res) {
    console.log(req, res);

    const { name, email, pass, cpass,pic } = req.body
    if (!(name&&email&&pass&&cpass))

        return res.status(500).send({ msg:"invalid input" })
    else if (pass != cpass)
        return res.status(500).send({ msg:"password not match" })
    bcrypt.hash(pass,10).then((hpwd) => {
        console.log(hpwd);
        console.log("data added");
        userSchema.create({ name,email,pass:hpwd }).then(() => {
            res.status(201).send({ msg:"succesfull" })

        }).catch((error) => {
            res.status(404).send({ error: error })
        })

    })
}
export async function login(req,res) {
    

    console.log(req.body);
    const {email,pass}=req.body
    console.log(email,pass);

    if(!(email&&pass)) 
        return res.status(500).send({msg:"fileds are required"})
const user =await userSchema.findOne({email})
        
if (!user)    
return res.status(500).send({msg:"user not exist"})
const success = await bcrypt.compare(pass,user.pass)
console.log(success);

if (success!==true) 
    return res.status(500).send({msg:"user or password not match"})
const token = await sign({userID:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
res.status(200).send({token})  

}

export async function getData(req, res) {
    console.log(req.user);

    const usr = await userSchema.findOne({ _id: req.user.userID })
    console.log(usr);

    console.log("get data");
    res.status(200).send({ usr })



}
export async function addData(req,res) {
    console.log(req.body);
    const{...Data} =req.body
    await bookSchema.create({...Data}).then(()=>{
        res.status(201).send({msg:"success"})
    }).catch((error)=>{
        res.status(404).send({error:error})
    })
    
}

export  async function  getBook(req,res) {
    console.log("get data");
    const data = await bookSchema.find();
    console.log(data);
    res.status(200).send(data)
    
}
 export async function updateOne(req,res) {
    console.log(req.body);
    const{...Data}=req.body
    await bookSchema.updateOne({_id:req.params.id},{$set:{...Data}}).then(()=>{
        res.status(201).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({error:error})
    })
 }
 export async function deleteOne(req,res) {
    const {id} =req.params
    const data = await bookSchema.deleteOne({_id:id}).then(()=>{
        res.status(201).send({msg:"deleted"})
    }).catch((error)=>{
        res.status(500).send({error})
    })
 }
 export async function getUser(req,res) {
    console.log("get  user data ")
    const {id}=req.params
    const data = await bookSchema.findOne({_id:id})
    console.log(data)
    res.status(200).send(data)

 }