import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateTodo(todo: string, id: number) {
    return await prisma.todo.update({
        data: {
            title: todo
        },
        where: {
            id
        }
    })
}