import type { Product } from "../types";

const verifyProduct = (data: unknown): boolean => {
    return (
        data !== null && typeof data === 'object'
        && 'id' in data && typeof data.id === 'number'
        && 'name' in data && typeof data.name === 'string'
        && 'image' in data && typeof data.image === 'string'
        && 'description' in data && typeof data.description === 'string'
        && 'brand' in data && typeof data.brand === 'string'
        && 'color' in data && typeof data.color === 'string'
        && 'connectivity' in data && typeof data.connectivity === 'string'
        && 'rating' in data && typeof data.rating === 'number'
        && 'wireless' in data && typeof data.wireless === 'boolean'
        && 'price' in data && typeof data.price === 'number'
    )
}

const isProduct = (data: unknown): data is Product => verifyProduct(data);

const isProductArray = (data: unknown): data is Product[] => {
    return (
        data !== null && Array.isArray(data)
        && data.every(d => verifyProduct(d))
    )
}

export default {
    isProductArray,
    isProduct
}