import { Message } from "@prisma/client"

export interface FindParams {
    page?: number
    pageSize?: number
    chatId?: number
    userId?: number
}

export interface CreateMessageAttributes{
    chatId: number
    userId: number
    content: string
}

export interface MessageRepository{
    getMessages: (params: FindParams) => Promise<Message[]>
    count: (params: Partial<FindParams>) => Promise<number>
    getMessageById: (id: number) => Promise<Message | null>
    createMessage: (attributes: CreateMessageAttributes) => Promise<Message>
    updatedMessage: (id: number, attributes: Partial<CreateMessageAttributes>) => Promise<Message>
    deleteMessage: (id: number) => Promise<Message>
}