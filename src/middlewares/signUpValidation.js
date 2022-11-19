import { usersCollection } from "../database/db.js"


export default async function signUpValidation(req,res,next){
    const {name, email} = req.body

    try{
        const sameEmail = await usersCollection.findOne({email})

        if(sameEmail){
            res.status(409).send("E-mail already in use")
            return
        }

        const sameName = await usersCollection.findOne({name})

        if(sameName){
            res.status(409).send("Name already in use")
            return
        }
    }catch(err){
        res.status(500).send({message: err})
    }

    next()
}