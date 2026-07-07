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


export const propertyService = {
    createPropertyIntoDB,
    updatePropertyIntoDB
};