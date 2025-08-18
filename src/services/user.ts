import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma.js";

export const createUser = async (data: Prisma.UserCreateInput) => {

    const prismaData: any = {
        name: data.name,
        email: data.email
    };
    if(data.phone !== undefined){     //contornando o problema de telefone nulo
        prismaData.phone = data.phone
    }

    const result = await prisma.user.create({
        data: prismaData
    })
    return result
}

export const getAllUser = async () => {
    const result = await prisma.user.findMany({})
    return result
}

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

export const deleteUser = async (userId: number) => {
    const result = await prisma.user.delete({
        where: {
            id: userId
        }
    })
    return result
}