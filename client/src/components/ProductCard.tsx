import { ProductCardProps } from "@/service/ProductService";
import React from "react";
import { motion } from 'framer-motion'


const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    return (
        <motion.div
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >z
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                <p className="text-gray-400 mt-2">{item.description}</p>
            </div>
        </motion.div>
    );
}

export default ProductCard;