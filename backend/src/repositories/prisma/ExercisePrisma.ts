import { Exercise } from "@prisma/client"
import { prisma } from "../../database"
import { CreateExerciseAttributes, ExerciseRepository, FindParams } from "../ExerciseRepository"

export class ExercisePrismaRepository implements ExerciseRepository {
    getExercises(params: FindParams): Promise<Exercise[]> {
        return prisma.exercise.findMany({
            where: {
                name: params.name ? { contains: params.name, mode: "insensitive" } : undefined
            },
            orderBy: { [params.sortBy ?? "name"]: params.order },
            skip: params.page && params.pageSize ? (params.page - 1) * params.pageSize : undefined,
            take: params.pageSize
        })
    }

    count(params: Partial<FindParams>): Promise<number> {
        return prisma.exercise.count({
            where: {
                name: params.name ? { contains: params.name, mode: "insensitive" } : undefined
            }
        })
    }

    getExerciseById(id: number): Promise<Exercise | null> {
        return prisma.exercise.findUnique({ where: { id } })
    }

    createExercise(attributes: CreateExerciseAttributes): Promise<Exercise> {
        return prisma.exercise.create({ data: attributes })
    }

    updatedExercise(id: number, attributes: Partial<CreateExerciseAttributes>): Promise<Exercise> {
        return prisma.exercise.update({ where: { id }, data: attributes })
    }

    deleteExercise(id: number): Promise<Exercise> {
        return prisma.exercise.delete({ where: { id } })
    }
}