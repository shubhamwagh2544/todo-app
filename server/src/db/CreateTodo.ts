import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createTodo(id: number, todo: string) {
    return await prisma.todo.create({
        data: {
            id,
            title: todo
        }
    })
}