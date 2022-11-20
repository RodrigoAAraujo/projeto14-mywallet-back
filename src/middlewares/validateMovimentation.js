import { MovimentationSchema } from "../models/walletSchemas.js"

export function validateMovimentation(req,res,next){
    const body = req.body

    const {error} = MovimentationSchema.validate(body)

    if(error){
        res.status(400).send(error.details.map(detail => detail.message))
        return
    }

    next()
} 