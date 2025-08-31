import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma.js";




/*  -------------------------- Listagem -------------------------- */

export const getAllUser = async () => {
    const result = await prisma.user.findMany({})
    return result
}

export const getAllPost = async () => {
    const result = await prisma.post.findMany({
        include: {
            comments: {
                include: {
                    authorComment: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
    return result
}

export const getUserById = async (userId: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    return result;
}



/*  -------------------------- Criação -------------------------- */

export const createUser = async (data: Prisma.UserCreateInput) => {

    const prismaData: any = {
        name: data.name,
        email: data.email
    };
    if (data.phone !== undefined) {     //contornando o problema de telefone nulo
        prismaData.phone = data.phone
    }

    const result = await prisma.user.create({
        data: prismaData
    })
    return result
}

export const createPostForUser = async (userId: number, postData: { title: string, body: string, subtitle?: string | null | undefined }) => {


    const result = await prisma.post.create({
        data: {
            title: postData.title,
            body: postData.body,
            subtitle: postData.subtitle ?? null,
            author: { connect: { id: userId } }
        }
    })


    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
        throw new Error("Usuário não encontrado");
    }

    return result;
}

export const createCommmentForUser = async (userId: number, postId: number, body: string) => {
    const result = await prisma.comment.create({
        data: {
            authorComment: { connect: { id: userId } },
            authorPost: { connect: { id: postId } },
            body: body
        }
    })
    return result
}




/*  -------------------------- Atualização -------------------------- */

export const updateUser = async (userId: number, newName: string, newEmail: string) => {
    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name: newName,
            email: newEmail
        }
    })
    return result
}


/*  -------------------------- Exclusão -------------------------- */

export const deleteUser = async (userId: number) => {

    await prisma.post.deleteMany({
        where: { userId }
    })

    await prisma.comment.deleteMany({
        where: { userId }
    })

    const result = await prisma.user.delete({
        where: {
            id: userId
        }
    })
    return result
}

export const deletePost = async (postId: number) => {
    const result = await prisma.post.delete({
        where: {
            id: postId
        }
    })
    return result
}
