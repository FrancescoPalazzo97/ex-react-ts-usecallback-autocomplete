import { memo } from "react"
import type { Product } from "../types"

type ListItemProps = {
    product: Product
    setProduct: (id: number) => Promise<void>
}

const ListItem = memo(({ product, setProduct }: ListItemProps) => {
    return (
        <li
            className="px-2 py-3 border border-gray-800 hover:bg-gray-500 hover:text-gray-950 cursor-pointer"
            onClick={() => setProduct(product.id)}
        >
            {product.name}
        </li>
    )
})

export default ListItem
