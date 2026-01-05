import { User } from "@prisma/client";
import { prisma } from "../../database";
import { CreateUserAttributes, FindUserParams, getUserTraning, UserRepository, UserWhereParams } from "../UserRepository";


export class UserPrismaRepository implements UserRepository {
    getUsers(params: FindUserParams): Promise<User[]> {
        return prisma.user.findMany({
            where: {
                name: {
                    contains: params.where?.name?.like,
                    equals: params.where?.name?.equals,
                    mode: params.where?.name?.mode
                },
                role: params.where?.role
            },
            orderBy: { [params.sortBy ?? "name"]: params.order },
            skip: params.offset,
            take: params.limit
        })
    }

    count(params: UserWhereParams): Promise<number> {
        return prisma.user.count({
            where: {
                name: {
                    contains: params.name?.like,
                    equals: params.name?.equals,
                    mode: params.name?.mode
                },
                role: params.role
            }
        })
    }

    async getUserById(id: number): Promise<getUserTraning | undefined> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return undefined;
        }

        const exercises = await prisma.workout.findMany({
            where: { createdForId: id },
            include: {
                exercises: {
                    include: {
                        exercise: true
                    }
                }
            }
        });

        return {
            user,
            exercises
        };
    }

    createUser(attributes: CreateUserAttributes): Promise<User> {
        return prisma.user.create({
            data: {
                name: attributes.name,
                email: attributes.email,
                password: attributes.password,
                role: attributes.role
            }
        })
    }

    updatedUser(id: number, attributes: Partial<CreateUserAttributes>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: {
                name: attributes?.name,
                email: attributes?.email,
                password: attributes?.password,
                role: attributes?.role
            }
        })
    }
    
    deleteUser(id: number): Promise<User> {
        return prisma.user.delete({
            where:{ id }
        })
    }

}

