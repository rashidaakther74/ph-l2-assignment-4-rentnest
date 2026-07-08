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

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
    const result = await propertyService.getAllPropertiesFromDB();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Properties retrieved successfully",
        data: result,
    });
});

const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await propertyService.getSinglePropertyFromDB(id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Property retrieved successfully",
        data: result,
    });
});

const getAllPropertiesForAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const result = await propertyService.getAllPropertiesForAdminFromDB();

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Properties retrieved successfully",
            data: result,
        });
    }
);

const updateProperty = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await propertyService.updatePropertyIntoDB(
        id as string,
        req.body,
      
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Property updated successfully",
        data: result,
    });
});

const deleteProperty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await propertyService.deletePropertyIntoDB(id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Property deleted successfully",
        data: result,
    });
});

export const propertyController = {
    createProperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
    getAllPropertiesForAdmin
};