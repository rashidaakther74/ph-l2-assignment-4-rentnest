import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IUserLogin } from "./auth.interface";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";


const loginUser = async (payload: IUserLogin) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email,
        },
    });

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid password");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    );

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    );

    return {
        accessToken,
        refreshToken,
    };
};


export const authService = {
    loginUser,
};