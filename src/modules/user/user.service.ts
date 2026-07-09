import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { IUpdateUserStatus, IUserRegister } from "./user.interface";


const registerUserIntoDB = async (payload: IUserRegister) => {
   
    const { name, email, password, role } = payload;
    console.log("Prisma.user:", prisma.user);


    if (role === "ADMIN") {
        throw new Error("Admin registration is not allowed");
    } 
    
    const isUserExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (isUserExist) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_rounds)
    );

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
        },
        omit: {
            password: true,
        },
    });

    return user;
};

const getMeFromDB = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        omit: {
            password: true,
        },
    });

    return user;
};

const getAllUsersFromDB = async () => {
    const result = await prisma.user.findMany({
        omit: {
            password: true,
        },
    });

    return result;
};

const updateUserStatusIntoDB = async (
    id: string,
    payload: IUpdateUserStatus
) => {
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: {
            status: payload.status,
        },
        omit: {
            password: true,
        },
    });

    return result;
};


export const userService = {
    registerUserIntoDB,
    getMeFromDB,
    getAllUsersFromDB,
    updateUserStatusIntoDB
};
