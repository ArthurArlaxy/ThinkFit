import { Handler } from "express";
import { CreateTicketRequestSchema, GetTicketRequestSchema, UpdateTicketRequestSchema } from "../schema/TicketRequestSchema";
import { TicketService } from "../service/TicketService";

export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    getTickets: Handler = async (req, res, next) => {
        try {
            const params = GetTicketRequestSchema.parse(req.query)
            const mapped = { title: params.title, page: params.page, pageSize: params.pageSize, type: params.type, status: params.status }
            const result = await this.ticketService.getAllWithPagination(mapped)
            res.json(result)
        } catch (error) { next(error) }
    }

    getTicket: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const result = await this.ticketService.getTicket(id)
            res.json(result)
        } catch (error) { next(error) }
    }

    createTicket: Handler = async (req, res, next) => {
        try {
            const attributes = CreateTicketRequestSchema.parse(req.body)
            const created = await this.ticketService.createTicket(attributes)
            res.json(created)
        } catch (error) { next(error) }
    }

    updateTicket: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const attributes = UpdateTicketRequestSchema.parse(req.body)
            const updated = await this.ticketService.updateTicket(id, attributes)
            res.json(updated)
        } catch (error) { next(error) }
    }

    deleteTicket: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const removed = await this.ticketService.deleteTicket(id)
            res.json(removed)
        } catch (error) { next(error) }
    }
}