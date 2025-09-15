import { useState, useEffect, useCallback } from "react"
import ListItem from "../components/ListItem";
import { guardType, debounce } from "../lib";
import type { Product } from "../types";
const API_URL: string = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');

    const getProducts = useCallback(debounce(async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Errore durante il fetch!');
        const data: unknown = await res.json();
        if (guardType.isProductArray(data)) {
            setProducts(data);
            return
        }
        throw new Error('Dati del fetch non conformi!');
    }, 500), []);

    useEffect(() => {
        if (search.trim().length > 0) {
            try {
                getProducts(`${API_URL}/products?search=${search}`);
            } catch (e) {
                if (e instanceof Error) {
                    console.error(`Errore: ${e}`);
                } else {
                    console.error('Errore non definito');
                }
            }
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
                    <div className="absolute top-10 inset-x-0">
                        <ul>
                            {products.map(p => (
                                <ListItem key={p.id} product={p} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default HomePage
