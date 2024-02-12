import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function deleteTodo(id: number) {
    return await prisma.todo.delete({
        where: {
            id
        }
    })
}