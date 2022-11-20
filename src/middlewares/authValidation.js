import { sessionsCollection, usersCollection } from "../database/db.js"

export default async function authValidation(req,res,next){
    console.log(req.headers)

    const {authorization, user} = req.headers

    const tokenReceived = authorization?.replace("Bearer ", "")

    if (!tokenReceived) {
        res.sendStatus(401);
        return
    }

    try{
        const session = await sessionsCollection.findOne({token: tokenReceived})

        if(!session){
            res.status(401).send("Session invalid")
            return
        }

        const userExist = await usersCollection.findOne({_id: session?.userId})

        if(!userExist || userExist.email !== user){
            res.status(401).send("User invalid")
            return
        }

        if (Date.now() > session.exitMoment + 300000){
            await sessionsCollection.updateOne({token: tokenReceived},{$set:{status:"expired", exitMoment: Date.now()}})
            res.status(401).send("Session expired")
            return
        }

        if(session.status !== "valid"){
            res.status(401).send("Session invalid")
            return
        }

        await sessionsCollection.updateOne({token: tokenReceived},{$set: {exitMoment: Date.now()}})

        next()
    }catch(err){
        res.status(500).send({message: err})
        return
    }


}