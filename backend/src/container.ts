import { UserController } from "./controllers/ClientController";
import { UserPrismaRepository } from "./repositories/prisma/UserPrisma";
import { UserService } from "./service/UserService";

// instancia do PrismaRepository
export const userRepository = new UserPrismaRepository()

// instancia do Serviço
export const userService = new UserService(userRepository)

// instancia do Controller
export const userController = new UserController(userService)