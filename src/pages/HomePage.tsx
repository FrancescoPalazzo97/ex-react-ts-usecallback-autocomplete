import { useState, useEffect, useCallback } from "react"
import ListItem from "../components/ListItem";
import ProductDetails from "../components/ProductDetails";
import { guardType, debounce } from "../lib";
import type { Product } from "../types";
const API_URL: string = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);

    const getProducts = useCallback(debounce(async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Errore durante il fetch!');
            const data: unknown = await res.json();
            if (guardType.isProductArray(data)) {
                setProducts(data);
                return
            }
            throw new Error('Dati del fetch non conformi!');
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Errore: ${e}`);
            } else {
                console.error('Errore non definito');
            }
        }
    }, 500), []);

    const getProductDetails = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`);
            if (!res.ok) throw new Error('Errore durante il fetch!');
            const data: unknown = await res.json();
            if (guardType.isProduct(data)) {
                setProductDetails(data);
                return;
            }
            throw new Error('Dati del fetch non conformi!');
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Errore: ${e}`);
            } else {
                console.error('Errore non definito');
            }
        }
    }

    const handleDetailsClick = (id: number) => {
        getProductDetails(id);
        setShow(false);
    }

    useEffect(() => {
        if (search.trim().length === 0) {
            setProducts([]);
            setShow(false);
        } else {
            getProducts(`${API_URL}/products?search=${search}`);
            setShow(true);
        }

    }, [search]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    }

    return (
        <main>
            <div className="max-w-[1400px] mx-auto">
                <div className="relative max-w-1/2 mx-auto my-8">
                    <input
                        type='text'
                        placeholder="Cerca..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full bg-gray-300 rounded-md px-4 py-2 placeholder:text-gray-700 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                    {show &&
                        <div className="absolute top-10 inset-x-0">
                            <ul className="bg-gray-300 text-gray-800">
                                {products.map(p => (
                                    <ListItem key={p.id} product={p} setProduct={handleDetailsClick} />
                                ))}
                            </ul>
                        </div>
                    }
                </div>
                {productDetails &&
                    <ProductDetails product={productDetails} />
                }
            </div>
        </main>
    )
}

export default HomePage
