import { Handler } from "express";
import { CreateMessageRequestSchema, GetMessageRequestSchema, UpdateMessageRequestSchema } from "../schema/MessageRequestSchema";
import { MessageService } from "../service/MessageService";

export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    getMessages: Handler = async (req, res, next) => {
        try {
            const params = GetMessageRequestSchema.parse(req.query)
            const result = await this.messageService.getAllWithPagination(params as any)
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

    createMessage: Handler = async (req, res, next) => {
        try {
            const attributes = CreateMessageRequestSchema.parse(req.body)
            const created = await this.messageService.createMessage(attributes)
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