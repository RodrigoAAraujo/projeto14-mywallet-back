import joi from "joi";

export const MovimentationSchema = joi.object({
    date: joi.string().required(),
    value: joi.string().min(2).required(),
    description: joi.string().required().min(3),
    type: joi.string().required()
})