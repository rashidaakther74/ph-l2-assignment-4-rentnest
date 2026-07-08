import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface";

const createReviewIntoDB = async (
    payload: ICreateReview,
    tenantId: string
) => {
    const result = await prisma.review.create({
        data: {
            rating: payload.rating,
            comment: payload.comment,
            propertyId: payload.propertyId,
            tenantId,
        },
    });

    return result;
};

export const reviewService = {
    createReviewIntoDB,
};