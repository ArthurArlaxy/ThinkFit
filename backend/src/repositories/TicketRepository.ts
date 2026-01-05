import { Ticket } from "@prisma/client"

export interface FindParams {
    page?: number
    pageSize?: number
    title?: string
    type?: "payment" | "training" | "question"
    status?: "open" | "in_progress" | "solved"
    priority?: "low" | "medium" | "high"
}

export interface CreateTicketAttributes{
    title: string
    description: string
    type?: "payment" | "training" | "question"
    createdById: number
    assignedToId?: number
    priority?: "low" | "medium" | "high"
}

export interface TicketRepository{
    getTickets: (params: FindParams) => Promise<Ticket[]>
    count: (params: Partial<FindParams>) => Promise<number>
    getTicketById: (id: number) => Promise<Ticket | null>
    createTicket: (attributes: CreateTicketAttributes) => Promise<Ticket>
    updatedTicket: (id: number, attributes: Partial<CreateTicketAttributes>) => Promise<Ticket>
    deleteTicket: (id: number) => Promise<Ticket>
}