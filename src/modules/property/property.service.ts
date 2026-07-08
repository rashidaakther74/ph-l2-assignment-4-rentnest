import { prisma } from "../../lib/prisma";
import { ICreateProperty } from "./property.interface";

const createPropertyIntoDB = async (
    payload: ICreateProperty,
    landlordId: string
) => {
    const result = await prisma.property.create({
        data: {
            ...payload,
            landlordId,
        },
    });

    return result;
};

const getAllPropertiesFromDB = async () => {
    const result = await prisma.property.findMany({
        include: {
            category: true,
            landlord:{
                omit: {
                    password: true,
                },

            } 
        },
    });

    return result;
};

const getSinglePropertyFromDB = async (id: string) => {
    const result = await prisma.property.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            landlord: {
                omit: {
                    password: true,
                },
            },
        },
    });

    return result;
};

const getAllPropertiesForAdminFromDB = async () => {
    const result = await prisma.property.findMany({
        include: {
            category: true,
            landlord: {
                omit: {
                    password: true,
                },
            },
        },
    });

    return result;
};

const updatePropertyIntoDB = async (
    id: string,
    payload: ICreateProperty
) => {
    const result = await prisma.property.update({
        where: {
            id,
        },
        data: payload,
    });

    return result;
};

const deletePropertyIntoDB = async (id: string) => {
    const result = await prisma.property.delete({
        where: {
            id,
        },
    });

    return result;
};

export const propertyService = {
    createPropertyIntoDB,
    getAllPropertiesFromDB,
    getSinglePropertyFromDB,
    updatePropertyIntoDB,
    deletePropertyIntoDB,
    getAllPropertiesForAdminFromDB
};