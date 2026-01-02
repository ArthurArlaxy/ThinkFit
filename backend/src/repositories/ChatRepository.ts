import { Chat } from "@prisma/client"

export interface FindParams {
    page?: number
    pageSize?: number
    name?: string
    type?: "group" | "private"
}

export interface CreateChatAttributes{
    name: string
    type: "group" | "private"
}

export interface ChatRepository{
    getChats: (params: FindParams) => Promise<Chat[]>
    count: (params: Partial<FindParams>) => Promise<number>
    getChatById: (id: number) => Promise<Chat | null>
    createChat: (attributes: CreateChatAttributes) => Promise<Chat>
    updatedChat: (id: number, attributes: Partial<CreateChatAttributes>) => Promise<Chat>
    deleteChat: (id: number) => Promise<Chat>
}