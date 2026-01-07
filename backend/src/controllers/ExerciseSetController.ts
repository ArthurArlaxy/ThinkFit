import { Handler } from "express";
import { CreateExerciseSetRequestSchema, GetExerciseSetRequestSchema, UpdateExerciseSetRequestSchema } from "../schema/ExerciseSetRequestSchema";
import { ExerciseSetService } from "../service/ExerciseSetService";

export class ExerciseSetController {
    constructor(private readonly exerciseSetService: ExerciseSetService) { }

    getExerciseSets: Handler = async (req, res, next) => {
        try {
            const params = GetExerciseSetRequestSchema.parse(req.query)
            const mapped = { name: params.name, page: params.page, pageSize: params.pageSize }
            const result = await this.exerciseSetService.getAllWithPagination(mapped)
            res.json(result)
        } catch (error) { next(error) }
    }

    getExerciseSet: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const result = await this.exerciseSetService.getExerciseSet(id)
            res.json(result)
        } catch (error) { next(error) }
    }

    createExerciseSet: Handler = async (req, res, next) => {
        try {
            const attributes = CreateExerciseSetRequestSchema.parse(req.body)
            const created = await this.exerciseSetService.createExerciseSet(attributes)
            res.json(created)
        } catch (error) { next(error) }
    }

    updateExerciseSet: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const attributes = UpdateExerciseSetRequestSchema.parse(req.body)
            const updated = await this.exerciseSetService.updateExerciseSet(id, attributes)
            res.json(updated)
        } catch (error) { next(error) }
    }

    deleteExerciseSet: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const removed = await this.exerciseSetService.deleteExerciseSet(id)
            res.json(removed)
        } catch (error) { next(error) }
    }
}