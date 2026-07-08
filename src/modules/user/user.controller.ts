import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService} from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"


const registerUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {
            user,
        },
    });
});

const getMe = catchAsync(async (req, res) => {

    const profile = await userService.getMeFromDB(req.user?.id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile retrieved successfully",
        data: profile,
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUsersFromDB();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully",
        data: result,
    });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await userService.updateUserStatusIntoDB(
        id as string,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User status updated successfully",
        data: result,
    });
});

export const userController = {
    registerUser,
    getMe,
    getAllUsers,
    updateUserStatus
};