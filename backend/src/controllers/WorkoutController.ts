import { Handler } from "express";
import { CreateWorkoutRequestSchema, GetWorkoutRequestSchema, UpdateWorkoutRequestSchema } from "../schema/WorkoutRequestSchema";
import { WorkoutService } from "../service/WorkoutService";

export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService) { }

    getWorkouts: Handler = async (req, res, next) => {
        try {
            const params = GetWorkoutRequestSchema.parse(req.query)
            const result = await this.workoutService.getAllWithPagination(params as any)
            res.json(result)
        } catch (error) { next(error) }
    }

    getWorkout: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const result = await this.workoutService.getWorkout(id)
            res.json(result)
        } catch (error) { next(error) }
    }

    createWorkout: Handler = async (req, res, next) => {
        try {
            const attributes = CreateWorkoutRequestSchema.parse(req.body)
            const newWorkout = await this.workoutService.createWorkout(attributes)
            res.json(newWorkout)
        } catch (error) { next(error) }
    }

    updateWorkout: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const attributes = UpdateWorkoutRequestSchema.parse(req.body)
            const updated = await this.workoutService.updateWorkout(id, attributes)
            res.json(updated)
        } catch (error) { next(error) }
    }

    deleteWorkout: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const removed = await this.workoutService.deleteWorkout(id)
            res.json(removed)
        } catch (error) { next(error) }
    }
}