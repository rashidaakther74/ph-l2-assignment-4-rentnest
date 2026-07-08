import { prisma } from "../../lib/prisma";
import { ICreateRentalRequest, IUpdateRentalRequest } from "./rental.interface";

const createRentalRequestIntoDB = async (
    payload: ICreateRentalRequest,
    tenantId: string
) => {
    const result = await prisma.rentalRequest.create({
        data: {
            propertyId: payload.propertyId,
            tenantId,
        },
    });

    return result;
};

const getMyRentalRequestsFromDB = async (tenantId: string) => {
    const result = await prisma.rentalRequest.findMany({
        where: {
            tenantId,
        },
        include: {
            property: true,
        },
    });

    return result;
};

const getSingleRentalRequestFromDB = async (id: string) => {
    const result = await prisma.rentalRequest.findUnique({
        where: {
            id,
        },
        include: {
            property: true,
        },
    });

    return result;
};

const getLandlordRentalRequestsFromDB = async (landlordId: string) => {
    const result = await prisma.rentalRequest.findMany({
        where: {
            property: {
                landlordId,
            },
        },
        include: {
            property: true,
            tenant: {
                omit: {
                    password: true,
                },
            },
        },
    });

    return result;
};

const getAllRentalRequestsForAdminFromDB = async () => {
    const result = await prisma.rentalRequest.findMany({
        include: {
            tenant: {
                omit: {
                    password: true,
                },
            },
            property: {
                include: {
                    category: true,
                    landlord: {
                        omit: {
                            password: true,
                        },
                    },
                },
            },
        },
    });

    return result;
};

const updateRentalRequestStatusIntoDB = async (
    id: string,
    payload: IUpdateRentalRequest
) => {
    const result = await prisma.rentalRequest.update({
        where: {
            id,
        },
        data: {
            status: payload.status,
        },
    });

    return result;
};

export const rentalService = {
    createRentalRequestIntoDB,
    getMyRentalRequestsFromDB,
    getSingleRentalRequestFromDB,
    getLandlordRentalRequestsFromDB,
    updateRentalRequestStatusIntoDB,
    getAllRentalRequestsForAdminFromDB
};