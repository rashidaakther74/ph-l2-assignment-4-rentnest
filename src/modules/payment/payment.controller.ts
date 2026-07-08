import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const createPayment = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.user!.id;

    const result = await paymentService.createPaymentIntoDB(
        req.body,
        tenantId
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Payment session created successfully",
        data: result,
    });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
    const result = await paymentService.confirmPaymentIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment confirmed successfully",
        data: result,
    });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.user!.id;

    const result = await paymentService.getMyPaymentsFromDB(tenantId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payments retrieved successfully",
        data: result,
    });
});


const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.user!.id;
    const paymentId = req.params.id;

    const result = await paymentService.getSinglePaymentFromDB(
        paymentId as string,
        tenantId
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment retrieved successfully",
        data: result,
    });
});
export const paymentController = {
    createPayment,
    confirmPayment,
    getMyPayments,
    getSinglePayment
};