export interface ICreateRentalRequest {
    propertyId: string;
}

export interface IUpdateRentalRequest {
    status: "APPROVED" | "REJECTED";
}