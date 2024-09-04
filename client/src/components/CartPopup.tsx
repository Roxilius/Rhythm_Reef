import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import CartItem from './CartItem';
import { CartPopupProps, CartType } from '@/types';
import { addToCart, deleteCartItem, getCart } from '../service/cartService';

const CartPopup: React.FC<CartPopupProps> = ({ isOpen, onClose }) => {
    const [cart, setCart] = useState<CartType>({} as CartType);
    const fetchCartData = async () => {
        const cartData = await getCart();
        setCart(cartData);
    };
    
    useEffect(() => {
        fetchCartData();
    }, []);

    const handleQuantityChange = async (id: string, newQuantity: number) => {
        await addToCart(id, newQuantity);
        await fetchCartData();
    };

    const handleDelete = async (id: string) => {
        await deleteCartItem(id);
        await fetchCartData();
    };

    const formatToIDR = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 right-0 mt-16 mr-1 bg-white text-black shadow-lg rounded-lg overflow-hidden z-30 ${isOpen ? 'block' : 'hidden'} w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg`}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Cart</h2>
                <button onClick={onClose} aria-label="Close popup">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <div className="p-4 max-h-64 overflow-y-auto">
                {Array.isArray(cart.cartItems) && cart.cartItems.length > 0 ? (
                    cart.cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            qty={item.qty}
                            amount={item.amount}
                            product={item.product}
                            onQuantityChange={handleQuantityChange}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div className="p-4 flex justify-between items-center border-t">
                <span>Total:</span>
                <span>{formatToIDR(cart.totalAmount)}</span>
            </div>
        </motion.div>
    );
};

export default CartPopup;
