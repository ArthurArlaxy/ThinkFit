import { User } from "@prisma/client";
import { prisma } from "../../database";
import {  FindUserParams, UserRepository, UserWhereParams } from "../UserRepository";

export class UserPrismaRepository implements UserRepository{
    getUsers(params: FindUserParams): Promise<User[]>{
        return prisma.user.findMany({
            where:{
                name:{
                    contains: params.where?.name?.like,
                    equals: params.where?.name?.equals,
                    mode: params.where?.name?.mode
                },
                role: params.where?.role
            },
            orderBy: {[params.sortBy ?? "name"]: params.order},
            skip: params.offset,
            take: params.limit
        })
    }

    count(params: UserWhereParams): Promise<number>{
        return prisma.user.count({
            where:{
                name:{
                    contains: params.name?.like,
                    equals: params.name?.equals,
                    mode: params.name?.mode
                },
                role: params.role
            }
        })
    }

    // getUserById(id: number): Promise<User>{

    // }

    // createUser(Attributes: CreateUserAttributes): Promise<User>{

    // }

    // updatedUser(id: number, Attributes: Partial<CreateUserAttributes>): Promise<User>{

    // }

    // deleteUser(id: number): Promise<User>{

    // }

    
}