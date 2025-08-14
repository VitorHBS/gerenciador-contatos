import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma.js"

export const createUser = async (data: Prisma.UserCreateInput) => {
    const result = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email
        }
    })
    return result
}