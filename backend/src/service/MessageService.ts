import { HttpError } from "../errors/HttpError"
import { CreateMessageAttributes, FindParams, MessageRepository } from "../repositories/MessageRepository"

export class MessageService {
    constructor(private readonly messageRepository: MessageRepository) { }

    async getAllWithPagination(params: FindParams) {
        const { chatId, userId, page = 1, pageSize = 10 } = params
        const limit = Number(pageSize)

        const messages = await this.messageRepository.getMessages({ chatId, userId, page, pageSize })
        const total = await this.messageRepository.count({ chatId, userId })

        return {
            messages,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async getMessage(id: number) {
        const message = await this.messageRepository.getMessageById(id)
        if (!message) throw new HttpError(404, "Message not found")
        return message
    }

    async createMessage(attributes: CreateMessageAttributes) {
        return this.messageRepository.createMessage(attributes)
    }

    async updateMessage(id: number, attributes: Partial<CreateMessageAttributes>) {
        return this.messageRepository.updatedMessage(id, attributes)
    }

    async deleteMessage(id: number) {
        return this.messageRepository.deleteMessage(id)
    }
}