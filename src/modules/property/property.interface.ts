export interface ICreateProperty {
    title: string;
    description: string;
    location: string;
    price: number;
    amenities: string[];
    categoryId: string;
}

export interface IUpdateProperty {
    title?: string;
    description?: string;
    location?: string;
    price?: number;
    amenities?: string[];
    categoryId?: string;
}