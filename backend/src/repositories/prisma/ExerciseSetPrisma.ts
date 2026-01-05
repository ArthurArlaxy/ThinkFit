import { ExerciseSet } from "@prisma/client"
import { prisma } from "../../database"
import { CreateExerciseSetAttributes, ExerciseSetRepository, FindParams } from "../ExerciseSetRepository"

export class ExerciseSetPrismaRepository implements ExerciseSetRepository {
    getExerciseSets(params: FindParams): Promise<ExerciseSet[]> {
        return prisma.exerciseSet.findMany({
            where: {
                workoutId: params.workoutId
            },
            orderBy: { [params.sortBy ?? "order"]: params.order },
            skip: params.page && params.pageSize ? (params.page - 1) * params.pageSize : undefined,
            take: params.pageSize
        })
    }

    count(params: Partial<FindParams>): Promise<number> {
        return prisma.exerciseSet.count({
            where: {
                workoutId: params.workoutId
            }
        })
    }

    getExerciseSetById(id: number): Promise<ExerciseSet | null> {
        return prisma.exerciseSet.findUnique({ where: { id } })
    }

    createExerciseSet(attributes: CreateExerciseSetAttributes): Promise<ExerciseSet> {
        return prisma.exerciseSet.create({ data: attributes })
    }

    updatedExerciseSet(id: number, attributes: Partial<CreateExerciseSetAttributes>): Promise<ExerciseSet> {
        return prisma.exerciseSet.update({ where: { id }, data: attributes })
    }

    deleteExerciseSet(id: number): Promise<ExerciseSet> {
        return prisma.exerciseSet.delete({ where: { id } })
    }
}