import type { Request, Response } from "express";
import * as userService from "../services/user.js";
import { z } from "zod";


const userSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string()
});

const updateUserSchema = z.object({
    newName: z.string().min(2),
    newEmail: z.email()
});

export async function getAllUser(req:Request, res:Response){
    const user = await userService.getAllUser()
    return res.status(200).json(user)
}

export async function createUser(req:Request, res:Response){
    const parseResult = userSchema.safeParse(req.body);

    if(!parseResult.success){
        res.status(400).json({error: parseResult})
        return
    }

    const user = await userService.createUser(parseResult.data)
    return res.status(200).json(user);
}


export async function updateUser(req: Request, res: Response){
    
    const { id } = req.params;

    const parseResult = updateUserSchema.safeParse(req.body);

    if(!parseResult.success){
        res.status(400).json({error: parseResult});
        return
    }

    const { newName, newEmail } = parseResult.data

    const updateUser = await userService.updateUser(Number(id), newName, newEmail)
    return res.status(200).json(updateUser)
}