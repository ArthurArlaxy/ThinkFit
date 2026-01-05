import { Chat } from "@prisma/client"
import { prisma } from "../../database"
import { ChatRepository, CreateChatAttributes, FindParams } from "../ChatRepository"

export class ChatPrismaRepository implements ChatRepository {
    getChats(params: FindParams): Promise<Chat[]> {
        return prisma.chat.findMany({
            where: {
                name: params.name ? { contains: params.name, mode: "insensitive" } : undefined,
                type: params.type
            },
            skip: params.page && params.pageSize ? (params.page - 1) * params.pageSize : undefined,
            take: params.pageSize
        })
    }

    count(params: Partial<FindParams>): Promise<number> {
        return prisma.chat.count({ where: { name: params.name ? { contains: params.name, mode: "insensitive" } : undefined, type: params.type } })
    }

    getChatById(id: number): Promise<Chat | null> {
        return prisma.chat.findUnique({ where: { id } })
    }

    createChat(attributes: CreateChatAttributes): Promise<Chat> {
        return prisma.chat.create({ data: attributes })
    }

    updatedChat(id: number, attributes: Partial<CreateChatAttributes>): Promise<Chat> {
        return prisma.chat.update({ where: { id }, data: attributes })
    }

    deleteChat(id: number): Promise<Chat> {
        return prisma.chat.delete({ where: { id } })
    }
}