import {v4 as uuidV4} from 'uuid'
import { sessionsCollection, usersCollection } from '../database/db.js'
import bcrypt from 'bcrypt'

export async function SignIn(req, res){
    const user = req.body   
    const token = uuidV4()

    try{
        const userExist = await usersCollection.findOne({email: user.email})

        await sessionsCollection.insertOne({
            token: token,
            userId: userExist._id,
            entryMoment: Date.now(),
            exitMoment: Date.now(),
            status: "valid"
        })

        delete userExist.password
        delete userExist._id

        const objectToSend = {
            name: userExist.name,
            email: userExist.email,
            token
        }

        res.status(200).send(objectToSend)
        return
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function SignUp(req,res){
    const {name, email,password} = req.body

    try{
        const passwordEncrypted = bcrypt.hashSync( password, 12)

        await usersCollection.insertOne({
            name,
            email,
            password: passwordEncrypted
        })

        res.sendStatus(201)
        return

    }catch(err){
        res.status(500).send({message: err})
        return
    }
} 

export async function LogOut(req, res){
    const {authorization} = req.headers
    
    try{
        await sessionsCollection.updateOne({token: authorization}, {$set:{
            exitMoment: Date.now(),
            status: "expired"
        }})
        
        res.sendStatus(200)
        return
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}