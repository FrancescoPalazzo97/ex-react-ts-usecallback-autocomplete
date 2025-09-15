import { useState, useEffect } from "react"

const HomePage = () => {
    const [search, setSearch] = useState('');

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
            </div>
        </main>
    )
}

export default HomePage
