import { Chat, User, Message, Prisma } from "@prisma/client"

export type ChatWithRelations = Prisma.ChatGetPayload<{ include: { users: { include: { user: true } }, message: true } }>

export interface FindParams {
    page?: number
    pageSize?: number
    name?: string
    type?: "group" | "private"
} 

export interface FindUserChatsParams {
    userId:number
    page?: number
    pageSize?: number
    name?: string
    type?: "group" | "private"
}

export interface CreateChatPrivateAttributes{
    userId: number
    name: string
    type: "private"
    memberId: number
}

export interface CreateChatGroupAttributes{
    userId: number
    name: string
    type: "group"
    membersId: number[]
}

export type CreateChatAttributes = CreateChatPrivateAttributes | CreateChatGroupAttributes

export type ChatUserRelation = {
    userId: number
    chatId: number
    isAdmin: boolean
    user?: User
}

export interface ChatRepository{
    getChats: (params: FindParams) => Promise<Chat[]>
    getUserChats: (params:  FindUserChatsParams) => Promise<Chat[]>
    count: (params: Partial<FindUserChatsParams>) => Promise<number>
    getChatById: (id: number) => Promise<Chat | null>
    createChat: (attributes: CreateChatAttributes) => Promise<Chat>
    updatedChat: (id: number, attributes: Partial<CreateChatGroupAttributes>) => Promise<Chat>
    deleteChat: (id: number) => Promise<Chat>
}  