import { ICategoryResponse } from "./category.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    name:string;
    description: string;
    price: number;
    imagePath: string;
}

export interface IProductResponse {
    id: number;
    category: ICategoryResponse;
    name:string;
    description: string;
    price: number;
    imagePath: string;
}