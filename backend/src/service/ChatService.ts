import { HttpError } from "../errors/HttpError"
import { ChatRepository, CreateChatAttributes, FindParams } from "../repositories/ChatRepository"

export class ChatService {
    constructor(private readonly chatRepository: ChatRepository) { }

    async getAllWithPagination(params: FindParams) {
        const { name, page = 1, pageSize = 10 } = params
        const limit = Number(pageSize)

        const chats = await this.chatRepository.getChats({ name, page, pageSize, type: params.type })
        const total = await this.chatRepository.count({ name, type: params.type })

        return {
            chats,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async getChat(id: number) {
        const chat = await this.chatRepository.getChatById(id)
        if (!chat) throw new HttpError(404, "Chat not found")
        return chat
    }

    async createChat(attributes: CreateChatAttributes) {
        return this.chatRepository.createChat(attributes)
    }

    async updateChat(id: number, attributes: Partial<CreateChatAttributes>) {
        return this.chatRepository.updatedChat(id, attributes)
    }

    async deleteChat(id: number) {
        return this.chatRepository.deleteChat(id)
    }
}