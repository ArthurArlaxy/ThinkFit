import { HttpError } from "../errors/HttpError"
import { CreateTicketAttributes, FindParams, TicketRepository } from "../repositories/TicketRepository"

export class TicketService {
    constructor(private readonly ticketRepository: TicketRepository) { }

    async getAllWithPagination(params: FindParams) {
        const { title, page = 1, pageSize = 10 } = params
        const limit = Number(pageSize)

        const tickets = await this.ticketRepository.getTickets({ title, page, pageSize, type: params.type, status: params.status, priority: params.priority })
        const total = await this.ticketRepository.count({ title, type: params.type, status: params.status, priority: params.priority })

        return {
            tickets,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async getTicket(id: number) {
        const ticket = await this.ticketRepository.getTicketById(id)
        if (!ticket) throw new HttpError(404, "Ticket not found")
        return ticket
    }

    async createTicket(attributes: CreateTicketAttributes) {
        return this.ticketRepository.createTicket(attributes)
    }

    async updateTicket(id: number, attributes: Partial<CreateTicketAttributes>) {
        return this.ticketRepository.updatedTicket(id, attributes)
    }

    async deleteTicket(id: number) {
        return this.ticketRepository.deleteTicket(id)
    }
}