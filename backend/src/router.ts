import express from "express"
import { userController, workoutController, exerciseController, exerciseSetController, chatController, messageController, ticketController, authController } from "./container"
import { AuthMiddleware } from "./middlewares/AuthMiddleware"

export const router = express.Router()

// Users
router.get("/users", userController.getUsers )
router.post("/users", userController.createUser)
router.get("/users/:id", userController.getUser)
router.put("/users/:id", userController.updateUser)
router.delete("/users/:id", userController.deleteUser)

// Workouts
router.get("/workouts", workoutController.getWorkouts)
router.post("/workouts", workoutController.createWorkout)
router.get("/workouts/:id", workoutController.getWorkout)
router.put("/workouts/:id", workoutController.updateWorkout)
router.delete("/workouts/:id", workoutController.deleteWorkout)

// Exercises
router.get("/exercises", exerciseController.getExercises)
router.post("/exercises", exerciseController.createExercise)
router.get("/exercises/:id", exerciseController.getExercise)
router.put("/exercises/:id", exerciseController.updateExercise)
router.delete("/exercises/:id", exerciseController.deleteExercise)

// Exercise Sets
router.get("/exercise-sets", exerciseSetController.getExerciseSets)
router.post("/exercise-sets", exerciseSetController.createExerciseSet)
router.get("/exercise-sets/:id", exerciseSetController.getExerciseSet)
router.put("/exercise-sets/:id", exerciseSetController.updateExerciseSet)
router.delete("/exercise-sets/:id", exerciseSetController.deleteExerciseSet)

// Chats
router.get("/chats", chatController.getChats)
router.post("/chats", AuthMiddleware, chatController.createChat)
router.get("/chats/:id", chatController.getChat)
router.get("/users/:userId/chats", AuthMiddleware, chatController.getUserChats)
router.put("/chats/:id", chatController.updateChat)
router.delete("/chats/:id", chatController.deleteChat)

// Messages
router.get("/messages", messageController.getMessages)
router.post("/messages", AuthMiddleware, messageController.createMessage)
router.get("/messages/:id", messageController.getMessage)
router.put("/messages/:id", messageController.updateMessage)
router.delete("/messages/:id", messageController.deleteMessage)

// Auth
router.post("/auth/login", authController.login)

// Tickets
router.get("/tickets", ticketController.getTickets)
router.post("/tickets", ticketController.createTicket)
router.get("/tickets/:id", ticketController.getTicket)
router.put("/tickets/:id", ticketController.updateTicket)
router.delete("/tickets/:id", ticketController.deleteTicket)

