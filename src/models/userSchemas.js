import joi from "joi";

export const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required()
})

export const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().required(),
    password: joi.string().min(6).required()
})