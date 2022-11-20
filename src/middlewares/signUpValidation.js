import { usersCollection } from "../database/db.js"
import { signUpSchema } from "../models/userSchemas.js"


export default async function signUpValidation(req,res,next){
    const {name, email} = req.body

    const {error}= signUpSchema.validate(req.body)

    if(error){
        res.status(400).send(error.details.map(detail => detail.message))
        return
    }

    try{
        const sameEmail = await usersCollection.findOne({email: email})

        if(sameEmail){
            res.status(409).send("E-mail already in use")
            return
        }

        const sameName = await usersCollection.findOne({name: name})

        if(sameName){
            res.status(409).send("Name already in use")
            return
        }
    }catch(err){
        res.status(500).send({message: err})
        return
    }
    next()
}