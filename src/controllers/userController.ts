import type { Request, Response } from "express";
import * as userService from "../services/user.js";

import { userSchema, updateUserSchema } from "../schemas/userSchema.js";
import { postSchema } from "../schemas/postSchema.js";
import { commentSchema } from "../schemas/commentSchema.js";
import { idSchema } from "../schemas/commonSchema.js";


/*  -------------------------- Listagem -------------------------- */
export async function getAllUser(req: Request, res: Response) {
    const user = await userService.getAllUser()
    return res.status(200).json(user)
}

export async function getAllPost(req: Request, res: Response) {
    const post = await userService.getAllPost();
    return res.status(200).json(post);
}

export async function getUserById(req: Request, res: Response) {
    const userId = Number(req.params.id);

    const user = await userService.getUserById(userId);
    return res.status(200).json(user);
}

/*  -------------------------- Criação -------------------------- */
export async function createUser(req: Request, res: Response) {
    const parseResult = userSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).json({ error: parseResult })
        return
    }

    const user = await userService.createUser(parseResult.data)
    return res.status(201).json(user);
}

export async function createPostForUser(req: Request, res: Response) {
    const userId = Number(req.params.id);

    const parseResult = postSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error });
    }


    const createPost = await userService.createPostForUser(userId, parseResult.data);
    return res.status(201).json(createPost);

}


export async function createCommmentForUser(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const postId = Number(req.params.postId);

    const parseResult = commentSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error });
    }

    const createComment = await userService.createCommmentForUser(userId, postId, parseResult.data.body)
    return res.status(201).json(createComment);
}




/*  -------------------------- Atualização -------------------------- */
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



/*  -------------------------- Exclusão -------------------------- */
export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const parseResult = idSchema.safeParse(req.params);

    if (!parseResult.success) {
        res.status(400).json({ error: parseResult.error });
    }

    const deleteUser = await userService.deleteUser(Number(id));
    return res.status(204).json(deleteUser);
}

export async function deletePost(req: Request, res: Response) {
    const { postId } = req.params;

    const parseResult = idSchema.safeParse({ id: postId });

    if (!parseResult.success) {
        res.status(400).json({ error: parseResult.error });
    }

    const deleted = await userService.deletePost(Number(postId));
    return res.status(204).json(deleted);
}


