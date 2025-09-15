import { memo } from "react"
import type { Product } from "../types"

type ListItemProps = {
    product: Product
}

const ListItem = memo(({ product }: ListItemProps) => {
    return (
        <li>{product.name}</li>
    )
})

export default ListItem
