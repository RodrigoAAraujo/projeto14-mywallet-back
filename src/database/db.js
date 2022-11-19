import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)

try{
    await mongoClient.connect()
}catch(err){
    console.log({message: err})
}

const db = mongoClient.db("My_Wallet")
export const usersCollection = db.collection("users")
export const balanceCollection = db.collection("balances")
export const sessionsCollection = db.collection("sessions")
