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

const idSchema = z.object({
    id: z.coerce.number().positive().int()
})

export async function getAllUser(req: Request, res: Response) {
    const user = await userService.getAllUser()
    return res.status(200).json(user)
}

export async function createUser(req: Request, res: Response) {
    const parseResult = userSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).json({ error: parseResult })
        return
    }

    const user = await userService.createUser(parseResult.data)
    return res.status(200).json(user);
}


export async function updateUser(req: Request, res: Response) {

    const { id } = req.params;

    const parseResult = updateUserSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).json({ error: parseResult.error });
        return;
    }

    const { newName, newEmail } = parseResult.data;

    const updateUser = await userService.updateUser(Number(id), newName, newEmail);
    return res.status(200).json(updateUser);
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const parseResult = idSchema.safeParse(req.params);

    if (!parseResult.success) {
        res.status(400).json({ error: parseResult.error });
    }

    const deleteUser = await userService.deleteUser(Number(id));
    return res.status(200).json(deleteUser);
}

export async function createPostForUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const { title, body, subtitle } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: "Title and body are required!" })
    };

    const post = await userService.createPostForUser(userId, {title, body, subtitle});
    return res.status(201).json(post);

}