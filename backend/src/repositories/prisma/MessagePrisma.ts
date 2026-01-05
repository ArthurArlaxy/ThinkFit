import { Message } from "@prisma/client"
import { prisma } from "../../database"
import { CreateMessageAttributes, FindParams, MessageRepository } from "../MessageRepository"

export class MessagePrismaRepository implements MessageRepository {
    getMessages(params: FindParams): Promise<Message[]> {
        return prisma.message.findMany({
            where: {
                chatId: params.chatId,
                userId: params.userId
            },
            skip: params.page && params.pageSize ? (params.page - 1) * params.pageSize : undefined,
            take: params.pageSize
        })
    }

    count(params: Partial<FindParams>): Promise<number> {
        return prisma.message.count({ where: { chatId: params.chatId, userId: params.userId } })
    }

    getMessageById(id: number): Promise<Message | null> {
        return prisma.message.findUnique({ where: { id } })
    }

    createMessage(attributes: CreateMessageAttributes): Promise<Message> {
        return prisma.message.create({ data: attributes })
    }

    updatedMessage(id: number, attributes: Partial<CreateMessageAttributes>): Promise<Message> {
        return prisma.message.update({ where: { id }, data: attributes })
    }

    deleteMessage(id: number): Promise<Message> {
        return prisma.message.delete({ where: { id } })
    }
}