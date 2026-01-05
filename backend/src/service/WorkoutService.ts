import { HttpError } from "../errors/HttpError"
import { CreateWorkoutAttributes, FindParams, WorkoutRepository } from "../repositories/WorkoutRepository"

export class WorkoutService {
    constructor(private readonly workoutRepository: WorkoutRepository) { }

    async getAllWithPagination(params: FindParams) {
        const { name, page = 1, pageSize = 10 } = params
        const limit = Number(pageSize)
        const offset = (Number(page) - 1) * limit

        const workouts = await this.workoutRepository.getWorkouts({ name, page, pageSize, sortBy: params.sortBy, order: params.order })
        const total = await this.workoutRepository.count({ name })

        return {
            workouts,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async getWorkout(id: number) {
        const workout = await this.workoutRepository.getWorkoutById(id)
        if (!workout) throw new HttpError(404, "Workout not found")
        return workout
    }

    async createWorkout(attributes: CreateWorkoutAttributes) {
        return this.workoutRepository.createWorkout(attributes)
    }

    async updateWorkout(id: number, attributes: Partial<CreateWorkoutAttributes>) {
        return this.workoutRepository.updatedWorkout(id, attributes)
    }

    async deleteWorkout(id: number) {
        return this.workoutRepository.deleteWorkout(id)
    }
}