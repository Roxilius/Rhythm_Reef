import { CartItemProps } from '@/types';
import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { addToCart, deleteCartItem } from '@/service/cartService';
const CartItem: React.FC<CartItemProps> = ({ id, qty, amount, product, fetchCart }) => {
    const [localQuantity, setLocalQuantity] = useState(qty);

    const handleQuantityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        await addToCart(product.id, (newQuantity - localQuantity));
        setLocalQuantity(newQuantity);
        fetchCart()
    };
    
    const handleDelete = async (id: string) => {
        await deleteCartItem(id);
        fetchCart()
    };

    const formatRupiah = (amount: number): string => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <motion.div
            className="flex items-center justify-between p-4 border-b border-gray-300"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
        >
            <img src={`data:image/png;base64,${product.image}`} alt={product.name} className="w-16 h-16 rounded" />
            <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>Rp. {formatRupiah(amount)}</p>
            </div>
            <div className="flex items-center">
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <input
                        type="number"
                        min="1"
                        value={localQuantity}
                        onChange={handleQuantityChange}
                        className="w-16 text-center border rounded"
                    />
                    <button
                        onClick={() => handleDelete(id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete item"
                    >
                        <span className="material-icons">delete</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default CartItem;
