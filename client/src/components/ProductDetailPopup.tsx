import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AlertProps, ProductDetailPopupProps } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { addToCart } from '@/service/cartService';
import AlertPopup from './AlertPopup';

const ProductDetailPopup: React.FC<ProductDetailPopupProps> = ({ onClose, product }) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
        }).format(value);
    };
    const [alertPopup, setAlertPopup] = useState<AlertProps>({} as AlertProps);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

    const closeAlert = () => {
        setIsAlertVisible(false);
        setAlertPopup(prevAlert => ({ ...prevAlert, [alertPopup.message]: '' }));
    };

    const onAddCart = async () => {
        const res = await addToCart(product.id, 1);
        if (res.success) {
            setAlertPopup({
                message: res.message,
                type: res.success,
                onClose: closeAlert
            })
        } else {
            setAlertPopup({
                message: res.message,
                type: res.success,
                onClose: closeAlert
            })
        }
        setIsAlertVisible(true);
        console.log(res)
    };
    const auth = useAuth();
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <motion.div
                    className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full mx-4 sm:mx-6"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-black">{product.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>
                    <img
                        src={`data:image/jpeg;base64,${product.image}`}
                        alt={product.name}
                        className="m-auto sm:h-64 md:h-72 lg:h-80 object-cover rounded-md mb-4"
                    />
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                        Harga: Rp {formatCurrency(product.price)}
                    </p>
                    <p className={`mt-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </p>
                    {
                        auth.isAuthenticated &&
                        <div onClick={onAddCart} className="mt-6 bg-monokromatik-7 text-white py-2 px-4 rounded-lg hover:bg-monokromatik-2 transition w-full md:w-auto">
                            Add to Cart
                        </div>
                    }
                </motion.div>
            </div>
            {isAlertVisible && (
                <AlertPopup message={alertPopup.message} type={alertPopup.type} onClose={closeAlert} />
            )}
        </>
    );
};

export default ProductDetailPopup;
