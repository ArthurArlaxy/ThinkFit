import { HttpError } from "../errors/HttpError"
import { CreateExerciseSetAttributes, ExerciseSetRepository, FindParams } from "../repositories/ExerciseSetRepository"

export class ExerciseSetService {
    constructor(private readonly exerciseSetRepository: ExerciseSetRepository) { }

    async getAllWithPagination(params: FindParams) {
        const { workoutId, page = 1, pageSize = 10 } = params
        const limit = Number(pageSize)

        const sets = await this.exerciseSetRepository.getExerciseSets({ workoutId, page, pageSize, sortBy: params.sortBy, order: params.order })
        const total = await this.exerciseSetRepository.count({ workoutId })

        return {
            sets,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async getExerciseSet(id: number) {
        const set = await this.exerciseSetRepository.getExerciseSetById(id)
        if (!set) throw new HttpError(404, "ExerciseSet not found")
        return set
    }

    async createExerciseSet(attributes: CreateExerciseSetAttributes) {
        return this.exerciseSetRepository.createExerciseSet(attributes)
    }

    async updateExerciseSet(id: number, attributes: Partial<CreateExerciseSetAttributes>) {
        return this.exerciseSetRepository.updatedExerciseSet(id, attributes)
    }

    async deleteExerciseSet(id: number) {
        return this.exerciseSetRepository.deleteExerciseSet(id)
    }
}