import { Handler } from "express";
import { CreateChatRequestSchema, GetChatRequestSchema, UpdateChatRequestSchema } from "../schema/ChatRequestSchema";
import { ChatService } from "../service/ChatService";
import { HttpError } from "../errors/HttpError";
import type { FindParams, CreateChatPrivateAttributes, CreateChatGroupAttributes } from "../repositories/ChatRepository";

export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    getChats: Handler = async (req, res, next) => {
        try {
            const params = GetChatRequestSchema.parse(req.query)
            const mapped: FindParams = { name: params.name, page: params.page, pageSize: params.pageSize, type: params.type }
            const result = await this.chatService.getAllWithPagination(mapped)
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

    getUserChats: Handler = async (req, res, next) => {
        try {
            const params = GetChatRequestSchema.parse(req.query)
            const userId = Number(req.params.userId)
            const mapped = { userId, name: params.name, page: params.page, pageSize: params.pageSize, type: params.type }
            const result = await this.chatService.getAllUserChatWithPagination(mapped)
            res.json(result)
        } catch (error) { next(error) }
    }

    createChat: Handler = async (req: any, res, next) => {
        try {
            const attributes = CreateChatRequestSchema.parse(req.body)
            if (!req.user || !req.user.id) throw new HttpError(401, "Unauthorized")

            if (attributes.type === "private") {
                const attrs = attributes as unknown as { type: "private"; name: string; memberId: number }
                const withUser: CreateChatPrivateAttributes = { userId: req.user.id, name: attrs.name, type: "private", memberId: attrs.memberId }
                const created = await this.chatService.createChat(withUser)
                res.json(created)
                return
            }

            const attrs = attributes as unknown as { type: "group"; name: string; membersId: number[] }
            const withUser: CreateChatGroupAttributes = { userId: req.user.id, name: attrs.name, type: "group", membersId: attrs.membersId }
            const created = await this.chatService.createChat(withUser)
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