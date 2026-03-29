import { Minus, Package, Plus, Search, ShoppingCart, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../../input'


const PRODUCT_IMAGE = "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop";
 

const ItemList = ({ cart, setCart }: any) => {
    const [search, setSearch] = useState("");

    const filteredCart = cart?.filter((i: any) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleQtyChange = (id: number, delta: number) => {
        setCart((prev: any) =>
            prev.map((i: any) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
        );
    };

    const handleRemove = (id: number) => {
        setCart((prev: any) => prev.filter((i: any) => i.id !== id));
    };

    return (
        <div className="md:col-span-3 bg-[#161619] border border-white/[0.07] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-base font-semibold">Cart</h2>
                    <span className="text-xs text-white/40 ml-1">({cart?.length})</span>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                <Input
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 text-white text-xs placeholder:text-white/30 h-9 focus-visible:ring-indigo-500/50"
                />
            </div>

            {/* Items */}
            <div className="divide-y divide-white/[0.06]">
                {filteredCart?.length === 0 ? (
                    <p className="py-8 text-center text-sm text-white/30">
                        No items found
                    </p>
                ) : (
                    filteredCart?.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4 py-3 group">
                            {/* Thumbnail */}
                            <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden border border-white/10">
                                <img
                                    src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q"
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                                <p className="text-indigo-400 text-sm font-medium mt-0.5">
                                    ${item.price.toFixed(2)}
                                </p>

                                {/* Qty Controls */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => handleQtyChange(item.id, -1)}
                                        className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <Minus className="w-3 h-3 text-white/70" />
                                    </button>
                                    <span className="text-xs text-white/80 w-4 text-center">{item.qty}</span>
                                    <button
                                        onClick={() => handleQtyChange(item.id, 1)}
                                        className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <Plus className="w-3 h-3 text-white/70" />
                                    </button>
                                </div>
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ItemList