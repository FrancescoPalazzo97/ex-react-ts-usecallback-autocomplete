import type { Product } from "../types"

type ProductDetailsProps = {
    product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    return (
        <div className='bg-gray-100 text-gray-900 border p-4'>
            <div>
                <img src={product.image} alt={`${product.name}'s image`} />
            </div>
            <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>
        </div>
    )
}

export default ProductDetails
