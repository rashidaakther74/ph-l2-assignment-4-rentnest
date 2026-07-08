import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.user!.id;

    const result = await reviewService.createReviewIntoDB(
        req.body,
        tenantId
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Review created successfully",
        data: result,
    });
});

export const reviewController = {
    createReview,
};