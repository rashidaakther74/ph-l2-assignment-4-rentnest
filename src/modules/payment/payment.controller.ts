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

export const paymentController = {
    createPayment,
};