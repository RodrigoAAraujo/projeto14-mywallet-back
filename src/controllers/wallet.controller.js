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