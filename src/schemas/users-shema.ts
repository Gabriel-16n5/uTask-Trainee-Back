import Joi from "joi";
import User from "../protocols/user-protocol";

export const userSchema = Joi.object<User>({
email: Joi.string().email().required(),
name: Joi.string().required(),
password: Joi.string().required()
})

export const updateUserSchema = Joi.object<User>({
    userId: Joi.number().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
    })

    export const loginSchema = Joi.object<User>({
        email: Joi.string().email().required(),
        password: Joi.string().required()
        })