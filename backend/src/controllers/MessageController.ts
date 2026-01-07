import { Handler } from "express";
import { CreateMessageRequestSchema, GetMessageRequestSchema, UpdateMessageRequestSchema } from "../schema/MessageRequestSchema";
import { MessageService } from "../service/MessageService";
import { HttpError } from "../errors/HttpError";
import type { CreateMessageAttributes, FindParams as MessageFindParams } from "../repositories/MessageRepository";

export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    getMessages: Handler = async (req, res, next) => {
        try {
            const params = GetMessageRequestSchema.parse(req.query)
            const mapped: MessageFindParams = { chatId: params.chatId, userId: params.userId, page: params.page, pageSize: params.pageSize }
            const result = await this.messageService.getAllWithPagination(mapped)
            res.json(result)
        } catch (error) { next(error) }
    }

    getMessage: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const result = await this.messageService.getMessage(id)
            res.json(result)
        } catch (error) { next(error) }
    }

    createMessage: Handler = async (req: any, res, next) => {
        try {
            const attributes = CreateMessageRequestSchema.parse(req.body)
            if (!req.user || !req.user.id) throw new HttpError(401, "Unauthorized")
            const withUser: CreateMessageAttributes = { chatId: attributes.chatId, content: attributes.content, userId: req.user.id }
            const created = await this.messageService.createMessage(withUser)
            res.json(created)
        } catch (error) { next(error) }
    }

    updateMessage: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const attributes = UpdateMessageRequestSchema.parse(req.body)
            const updated = await this.messageService.updateMessage(id, attributes)
            res.json(updated)
        } catch (error) { next(error) }
    }

    deleteMessage: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const removed = await this.messageService.deleteMessage(id)
            res.json(removed)
        } catch (error) { next(error) }
    }
}