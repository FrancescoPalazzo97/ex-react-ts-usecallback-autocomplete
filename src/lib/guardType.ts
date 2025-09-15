import type { Product } from "../types";

const isProductArray = (data: unknown): data is Product[] => {
    return (
        data !== null && Array.isArray(data)
        && data.every(d => {
            return (
                d !== null && typeof d === 'object'
                && 'id' in d && typeof d.id === 'number'
                && 'name' in d && typeof d.name === 'string'
                && 'image' in d && typeof d.image === 'string'
                && 'description' in d && typeof d.description === 'string'
                && 'brand' in d && typeof d.brand === 'string'
                && 'color' in d && typeof d.color === 'string'
                && 'connectivity' in d && typeof d.connectivity === 'string'
                && 'rating' in d && typeof d.rating === 'number'
                && 'wireless' in d && typeof d.wireless === 'boolean'
                && 'price' in d && typeof d.price === 'number'
            )
        })
    )
}

export default {
    isProductArray
}