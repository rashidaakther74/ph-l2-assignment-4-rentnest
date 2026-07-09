import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode =
        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    const message =
        error.message || "Something went wrong";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};

export default globalErrorHandler;