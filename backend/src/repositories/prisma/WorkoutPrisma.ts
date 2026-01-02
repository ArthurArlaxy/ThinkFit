import { Workout } from "@prisma/client"
import { prisma } from "../../database"
import { CreateWorkoutAttributes, FindParams, WorkoutRepository } from "../WorkoutRepository"

export class WorkoutPrismaRepository implements WorkoutRepository {
    getWorkouts(params: FindParams): Promise<Workout[]> {
        return prisma.workout.findMany({
            where: {
                name: params.name
                    ? { contains: params.name, mode: "insensitive" }
                    : undefined
            },
            orderBy: { [params.sortBy ?? "name"]: params.order },
            skip: params.page && params.pageSize ? (params.page - 1) * params.pageSize : undefined,
            take: params.pageSize
        })
    }

    count(params: Partial<FindParams>): Promise<number> {
        return prisma.workout.count({
            where: {
                name: params.name ? { contains: params.name, mode: "insensitive" } : undefined
            }
        })
    }

    getWorkoutById(id: number): Promise<Workout | null> {
        const workout = prisma.workout.findUnique({ where: { id } })

        return workout
    }

    createWorkout(attributes: CreateWorkoutAttributes): Promise<Workout> {
        return prisma.workout.create({ data: attributes })
    }

    updatedWorkout(id: number, attributes: Partial<CreateWorkoutAttributes>): Promise<Workout> {
        return prisma.workout.update({ where: { id }, data: attributes })
    }

    deleteWorkout(id: number): Promise<Workout> {
        return prisma.workout.delete({ where: { id } })
    }
}