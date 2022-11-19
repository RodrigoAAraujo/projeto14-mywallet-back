import {v4 as uuidV4} from 'uuid'
import { sessionsCollection, usersCollection } from '../database/db.js'

export async function SignIn(req, res){
    const user = req.body   
    const token = uuidV4()

    try{
        const userExist = await usersCollection.findOne({email: user.email})
        await sessionsCollection.insertOne({
            token,
            userId: userExist._id
        })

        delete userExist.password

        res.status(200),send(userExist, token)
        return
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}
export async function SignUp(req,res){

} 