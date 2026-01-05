import { HttpError } from "../errors/HttpError"
import { CreateExerciseAttributes, ExerciseRepository, FindParams } from "../repositories/ExerciseRepository"

export class ExerciseService {
    constructor(private readonly exerciseRepository: ExerciseRepository) { }

    async getAllWithPagination(params: FindParams) {
        const { name, page = 1, pageSize = 10 } = params
        const limit = Number(pageSize)

        const exercises = await this.exerciseRepository.getExercises({ name, page, pageSize, sortBy: params.sortBy, order: params.order })
        const total = await this.exerciseRepository.count({ name })

        return {
            exercises,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async getExercise(id: number) {
        const exercise = await this.exerciseRepository.getExerciseById(id)
        if (!exercise) throw new HttpError(404, "Exercise not found")
        return exercise
    }

    async createExercise(attributes: CreateExerciseAttributes) {
        return this.exerciseRepository.createExercise(attributes)
    }

    async updateExercise(id: number, attributes: Partial<CreateExerciseAttributes>) {
        return this.exerciseRepository.updatedExercise(id, attributes)
    }

    async deleteExercise(id: number) {
        return this.exerciseRepository.deleteExercise(id)
    }
}