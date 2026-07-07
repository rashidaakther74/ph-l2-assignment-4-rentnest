import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { propertyService } from "./property.service";

const createProperty = catchAsync(async (req: Request, res: Response) => {
    const landlordId = req.user!.id;

    const result = await propertyService.createPropertyIntoDB(
        req.body,
        landlordId
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Property created successfully",
        data: result,
    });
});

const updateProperty = catchAsync(async (req: Request, res: Response) => {
    const landlordId = req.user!.id;
    const { id } = req.params;

    const result = await propertyService.updatePropertyIntoDB(
        id as string,
        req.body,
        landlordId
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Property updated successfully",
        data: result,
    });
});

export const propertyController = {
    createProperty,
    updateProperty
};