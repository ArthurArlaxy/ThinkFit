import { Handler } from "express";
import { CreateExerciseRequestSchema, GetExerciseRequestSchema, UpdateExerciseRequestSchema } from "../schema/ExerciseRequestSchema";
import { ExerciseService } from "../service/ExerciseService";

export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) { }

    getExercises: Handler = async (req, res, next) => {
        try {
            const params = GetExerciseRequestSchema.parse(req.query)
            const mapped = { name: params.name, page: params.page, pageSize: params.pageSize, sortBy: params.sortBy, order: params.order }
            const result = await this.exerciseService.getAllWithPagination(mapped)
            res.json(result)
        } catch (error) { next(error) }
    }

    getExercise: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const result = await this.exerciseService.getExercise(id)
            res.json(result)
        } catch (error) { next(error) }
    }

    createExercise: Handler = async (req, res, next) => {
        try {
            const attributes = CreateExerciseRequestSchema.parse(req.body)
            const created = await this.exerciseService.createExercise(attributes)
            res.json(created)
        } catch (error) { next(error) }
    }

    updateExercise: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const attributes = UpdateExerciseRequestSchema.parse(req.body)
            const updated = await this.exerciseService.updateExercise(id, attributes)
            res.json(updated)
        } catch (error) { next(error) }
    }

    deleteExercise: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const removed = await this.exerciseService.deleteExercise(id)
            res.json(removed)
        } catch (error) { next(error) }
    }
}