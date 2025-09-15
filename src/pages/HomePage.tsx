import { useState, useEffect } from "react"
import guardType from "../lib/guardType";
import type { Product } from "../types";
const API_URL: string = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');

    const getProducts = async () => {
        const res = await fetch(`${API_URL}/products?search=${search}`);
        if (!res.ok) throw new Error('Errore durante il fetch!');
        const data: unknown = await res.json();
        if (guardType.isProductArray(data)) {
            setProducts(data);
            return
        }
        throw new Error('Dati del fetch non conformi!');
    }

    useEffect(() => {
        try {
            getProducts();
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Errore: ${e}`);
            } else {
                console.error('Errore non definito');
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
                </div>
                <div>
                    <ul>
                        {products.map(p => (
                            <li>
                                {p.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default HomePage
