import { motion } from 'framer-motion'
import { ShoppingCart } from "lucide-react";
import { AlertProps, ProductCardProps } from "@/types";
import AlertPopup from './AlertPopup';
import { useState } from 'react';
import { addToCart } from '@/service/cartService';
import { useAuth } from '@/context/AuthContext';

const ProductCard: React.FC<ProductCardProps> = ({ item, handleClick }) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
        }).format(value);
    };

    const onHandleClick = () => {
        handleClick(item.id);
    }
    const [alertPopup, setAlertPopup] = useState<AlertProps>({} as AlertProps);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

    const closeAlert = () => {
        setIsAlertVisible(false);
        setAlertPopup(prevAlert => ({ ...prevAlert, [alertPopup.message]: '' }));
    };

    const onAddCart = async () => {
        const res = await addToCart(item.id, 1);
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
            <motion.div
                key={item.id}
                className="border-monokromatik-7 border-2 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-black cursor-pointer" onClick={onHandleClick}>{item.name}</h2>
                    <p className="font-bold text-black text-sm">
                        Rp. {formatCurrency(item.price)}
                    </p>
                    <p className={`font-semibold ${item.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {item.stock > 0 ? `In Stock : ${item.stock}` : 'Out of Stock'}
                    </p>
                </div>
                {
                    auth.isAuthenticated &&
                    <motion.div
                        onClick={onAddCart}
                        className="absolute top-4 right-4 bg-monokromatik-7 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ShoppingCart className="w-6 h-6" />
                    </motion.div>
                }
            </motion.div>
            {isAlertVisible && (
                <AlertPopup message={alertPopup.message} type={alertPopup.type} onClose={closeAlert} />
            )}
        </>
    );
}

export default ProductCard;