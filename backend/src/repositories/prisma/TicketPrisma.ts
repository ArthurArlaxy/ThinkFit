import { Ticket } from "@prisma/client"
import { prisma } from "../../database"
import { CreateTicketAttributes, FindParams, TicketRepository } from "../TicketRepository"

export class TicketPrismaRepository implements TicketRepository {
    getTickets(params: FindParams): Promise<Ticket[]> {
        return prisma.ticket.findMany({
            where: {
                title: params.title ? { contains: params.title, mode: "insensitive" } : undefined,
                type: params.type,
                status: params.status,
                priority: params.priority
            },
            skip: params.page && params.pageSize ? (params.page - 1) * params.pageSize : undefined,
            take: params.pageSize
        })
    }

    count(params: Partial<FindParams>): Promise<number> {
        return prisma.ticket.count({ where: { title: params.title ? { contains: params.title, mode: "insensitive" } : undefined, type: params.type, status: params.status, priority: params.priority } })
    }

    getTicketById(id: number): Promise<Ticket | null> {
        return prisma.ticket.findUnique({ where: { id } })
    }

    createTicket(attributes: CreateTicketAttributes): Promise<Ticket> {
        return prisma.ticket.create({ data: attributes })
    }

    updatedTicket(id: number, attributes: Partial<CreateTicketAttributes>): Promise<Ticket> {
        return prisma.ticket.update({ where: { id }, data: attributes })
    }

    deleteTicket(id: number): Promise<Ticket> {
        return prisma.ticket.delete({ where: { id } })
    }
}