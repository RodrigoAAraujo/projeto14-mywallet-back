import { ObjectId } from "mongodb";
import { balanceCollection } from "../database/db.js";

export async function findBalance(req, res){
    const {user} = req.headers

    if(!user){
        res.sendStatus(401);
        return
    }

    try{
        const balance = await balanceCollection.find({user: user}).toArray()
        res.status(200).send(balance)
        return

    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function createMovimentation(req,res){
    const {date, value, description,type} = req.body
    const {user} = req.headers

    try{
        await balanceCollection.insertOne({
            date: date,
            value: value,
            description: description,
            type: type,
            user: user
        })

        res.sendStatus(201)
        return

    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function deleteMovimentation(req,res){
    const {id} = req.params

    try{
        await balanceCollection.deleteOne({_id: ObjectId(id)})

        res.sendStatus(200)
        return
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function updateMovimentation(req,res){
    const {id} = req.params
    const {date, value, description, type} = req.body 

    if( !id){
        res.status(400).send("Bad Request")
        return
    }

    try{
        await balanceCollection.updateOne({_id: ObjectId(id)},{$set: {
            date: date,
            value: value,
            description: description,
            type: type
        }})

        res.sendStatus(201)
        return
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}