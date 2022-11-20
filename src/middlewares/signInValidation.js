import { usersCollection } from "../database/db.js";
import { signInSchema } from "../models/userSchemas.js";
import bcrypt from 'bcrypt'

export default async function signInValidation(req,res, next){
    const {email, password} =req.body

    const {error}= signInSchema.validate(req.body)

    if(error){
        res.status(400).send(error.details.map(detail => detail.message))
        return
    }

    try{
       const userExist = await usersCollection.findOne({email: email})
       if(!userExist){
            res.status(401).send("E-mail not registered")
            return
        }

        const passwordValid = bcrypt.compareSync(password, userExist.password)

        if(!passwordValid){
            res.status(401).send("Password or email incorrect")
            return
        }
    }catch(err){
        res.status(500).send({message: err})
    }
    next()
}