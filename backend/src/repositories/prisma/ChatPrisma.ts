import { Chat } from "@prisma/client"
import { prisma } from "../../database"
import { ChatRepository, CreateChatGroupAttributes, CreateChatPrivateAttributes, FindParams, FindUserChatsParams, CreateChatAttributes } from "../ChatRepository"

export class ChatPrismaRepository implements ChatRepository {
    getChats(params: FindParams): Promise<Chat[]> {
        return prisma.chat.findMany({
            where: {
                name: params.name ? { contains: params.name, mode: "insensitive" } : undefined,
                type: params.type
            },
            skip: params.page && params.pageSize ? (params.page - 1) * params.pageSize : undefined,
            take: params.pageSize,
            orderBy: { updatedAt: "desc" }
        })
    }

    getUserChats(params: FindUserChatsParams): Promise<Chat[]> {
        return prisma.chat.findMany({
            where: {
                users: {
                    some: { userId: params.userId }
                },
                name: params.name ? { contains: params.name, mode: "insensitive" } : undefined,
                type: params.type
            },
            skip: params.page && params.pageSize ? (params.page - 1) * params.pageSize : undefined,
            take: params.pageSize,
            orderBy: { updatedAt: "desc" },
            include: {
                users: {
                    include: { user: true }
                },
                message: {
                    take: 1,
                    orderBy: { createdAt: "desc" }
                }
            }
        })
    }


    count(params: Partial<FindUserChatsParams>): Promise<number> {
        return prisma.chat.count({
            where: {
                users: {
                    some: { userId: params.userId }
                },
                name: params.name ? { contains: params.name, mode: "insensitive" } : undefined,
                type: params.type
            }
        })
    }

    getChatById(id: number): Promise<Chat | null> {
        return prisma.chat.findUnique({ where: { id }, include: { users: { include: { user: true } }, message: { orderBy: { createdAt: "desc" } } } })
    }

    async createChat(attributes: CreateChatAttributes): Promise<Chat> {
        if (attributes.type === "private") {
            // TypeScript faz narrowing com o campo `type` na união discriminada
            const typedAttributes = attributes
            // Verifica se já existe um chat privado entre os dois usuários
            const existing = await prisma.chat.findFirst({
                where: {
                    type: "private",
                    AND: [
                        { users: { some: { userId: typedAttributes.userId } } },
                        { users: { some: { userId: typedAttributes.memberId } } }
                    ]
                },
                include: { users: { include: { user: true } }, message: true }
            })
            if (existing) return existing as Chat

            // Cria novo chat e associa os dois usuários
            const chat = await prisma.chat.create({ data: { name: typedAttributes.name, type: typedAttributes.type } })
            await prisma.chatUser.createMany({ data: [
                { userId: typedAttributes.userId, chatId: chat.id, isAdmin: false },
                { userId: typedAttributes.memberId, chatId: chat.id, isAdmin: false }
            ] })
            const created = await prisma.chat.findUnique({ where: { id: chat.id }, include: { users: { include: { user: true } }, message: true } })
            if (!created) return { ...chat, users: [], message: [] } as Chat
            return created as Chat
        }

        // Grupo
        const typedAttributes = attributes as CreateChatGroupAttributes
        const chat = await prisma.chat.create({ data: { name: typedAttributes.name, type: typedAttributes.type } })
        const members = typedAttributes.membersId.map((id: number) => ({ userId: id, chatId: chat.id, isAdmin: false }))
        // adiciona o criador como admin
        members.push({ userId: typedAttributes.userId, chatId: chat.id, isAdmin: true })
        await prisma.chatUser.createMany({ data: members })
        const created = await prisma.chat.findUnique({ where: { id: chat.id }, include: { users: { include: { user: true } }, message: true } })
        if (!created) return { ...chat, users: [], message: [] } as Chat
        return created as Chat
    }

    updatedChat(id: number, attributes: Partial<CreateChatGroupAttributes>): Promise<Chat> {
        return prisma.chat.update({ where: { id }, data: attributes })
    }

    deleteChat(id: number): Promise<Chat> {
        return prisma.chat.delete({ where: { id } })
    }
}