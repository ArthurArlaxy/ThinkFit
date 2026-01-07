import { UserController } from "./controllers/ClientController";
import { UserPrismaRepository } from "./repositories/prisma/UserPrisma";
import { UserService } from "./service/UserService";

import { WorkoutController } from "./controllers/WorkoutController";
import { WorkoutPrismaRepository } from "./repositories/prisma/WorkoutPrisma";
import { WorkoutService } from "./service/WorkoutService";

import { ExerciseController } from "./controllers/ExerciseController";
import { ExercisePrismaRepository } from "./repositories/prisma/ExercisePrisma";
import { ExerciseService } from "./service/ExerciseService";

import { ExerciseSetController } from "./controllers/ExerciseSetController";
import { ExerciseSetPrismaRepository } from "./repositories/prisma/ExerciseSetPrisma";
import { ExerciseSetService } from "./service/ExerciseSetService";

import { ChatController } from "./controllers/ChatController";
import { ChatPrismaRepository } from "./repositories/prisma/ChatPrisma";
import { ChatService } from "./service/ChatService";

import { MessageController } from "./controllers/MessageController";
import { MessagePrismaRepository } from "./repositories/prisma/MessagePrisma";
import { MessageService } from "./service/MessageService";

import { AuthController } from "./controllers/AuthController";
import { tokenService } from "./service/TokenService";

import { TicketController } from "./controllers/TicketController";
import { TicketPrismaRepository } from "./repositories/prisma/TicketPrisma";
import { TicketService } from "./service/TicketService";

// instancia do PrismaRepository
export const userRepository = new UserPrismaRepository()
export const workoutRepository = new WorkoutPrismaRepository()
export const exerciseRepository = new ExercisePrismaRepository()
export const exerciseSetRepository = new ExerciseSetPrismaRepository()
export const chatRepository = new ChatPrismaRepository()
export const messageRepository = new MessagePrismaRepository()
export const ticketRepository = new TicketPrismaRepository()

// instancia do Serviço
export const userService = new UserService(userRepository)
export const workoutService = new WorkoutService(workoutRepository)
export const exerciseService = new ExerciseService(exerciseRepository)
export const exerciseSetService = new ExerciseSetService(exerciseSetRepository)
export const chatService = new ChatService(chatRepository)
export const messageService = new MessageService(messageRepository)
export const ticketService = new TicketService(ticketRepository)

// instancia do Controller
export const userController = new UserController(userService)
export const workoutController = new WorkoutController(workoutService)
export const exerciseController = new ExerciseController(exerciseService)
export const exerciseSetController = new ExerciseSetController(exerciseSetService)
export const chatController = new ChatController(chatService)
export const messageController = new MessageController(messageService)
export const ticketController = new TicketController(ticketService)

// Auth
export const authController = new AuthController(userService)