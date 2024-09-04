import { CartItemProps } from '@/types';
import React, { useState } from 'react';

const CartItem: React.FC<CartItemProps> = ({ id, qty, amount, product, onQuantityChange, onDelete }) => {
    const [localQuantity, setLocalQuantity] = useState(qty);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        onQuantityChange(product.id, (newQuantity - localQuantity));
        setLocalQuantity(newQuantity);
    };

    const formatToIDR = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);
    };

    return (
        <div className="flex flex-col md:flex-row items-center border-b py-2 gap-3">
            <img 
                src={`data:image/png;base64,${product.image}`} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md mr-4" 
            />
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-semibold">{product.name}</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
                <input
                    type="number"
                    min="1"
                    value={localQuantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center border rounded"
                />
                <span className="text-center md:ml-4">{formatToIDR(amount)}</span>
                <button
                    onClick={() => onDelete(id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete item"
                >
                    <span className="material-icons">delete</span>
                </button>
            </div>
        </div>
    );
}

export default CartItem;
