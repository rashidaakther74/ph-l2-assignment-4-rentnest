import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";

const createRentalRequest = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.user!.id;

    const result = await rentalService.createRentalRequestIntoDB(
        req.body,
        tenantId
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Rental request submitted successfully",
        data: result,
    });
});

const getMyRentalRequests = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.user!.id;

    const result = await rentalService.getMyRentalRequestsFromDB(tenantId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rental requests retrieved successfully",
        data: result,
    });
});

const getSingleRentalRequest = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await rentalService.getSingleRentalRequestFromDB(id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rental request retrieved successfully",
        data: result,
    });
});

const getLandlordRentalRequests = catchAsync(
    async (req: Request, res: Response) => {
        const landlordId = req.user!.id;

        const result = await rentalService.getLandlordRentalRequestsFromDB(
            landlordId
        );

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Landlord rental requests retrieved successfully",
            data: result,
        });
    }
);

const getAllRentalRequestsForAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await rentalService.getAllRentalRequestsForAdminFromDB();

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Rental requests retrieved successfully",
            data: result,
        });
    }
);

const updateRentalRequestStatus = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await rentalService.updateRentalRequestStatusIntoDB(
            id as string,
            req.body
        );

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Rental request status updated successfully",
            data: result,
        });
    }
);

export const rentalController = {
    createRentalRequest,
    getMyRentalRequests,
    getSingleRentalRequest,
    getLandlordRentalRequests,
    updateRentalRequestStatus,
    getAllRentalRequestsForAdmin
};