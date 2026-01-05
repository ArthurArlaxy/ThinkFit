import { Handler } from "express";
import { CreateChatRequestSchema, GetChatRequestSchema, UpdateChatRequestSchema } from "../schema/ChatRequestSchema";
import { ChatService } from "../service/ChatService";

export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    getChats: Handler = async (req, res, next) => {
        try {
            const params = GetChatRequestSchema.parse(req.query)
            const result = await this.chatService.getAllWithPagination(params as any)
            res.json(result)
        } catch (error) { next(error) }
    }

    getChat: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const result = await this.chatService.getChat(id)
            res.json(result)
        } catch (error) { next(error) }
    }

    createChat: Handler = async (req, res, next) => {
        try {
            const attributes = CreateChatRequestSchema.parse(req.body)
            const created = await this.chatService.createChat(attributes)
            res.json(created)
        } catch (error) { next(error) }
    }

    updateChat: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const attributes = UpdateChatRequestSchema.parse(req.body)
            const updated = await this.chatService.updateChat(id, attributes)
            res.json(updated)
        } catch (error) { next(error) }
    }

    deleteChat: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const removed = await this.chatService.deleteChat(id)
            res.json(removed)
        } catch (error) { next(error) }
    }
}