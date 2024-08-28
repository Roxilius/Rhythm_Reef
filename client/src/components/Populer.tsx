import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import ProductCard from "./ProductCard";
import { productsTest, ProductsType } from "@/service/ProductService";

const Populer: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });
    const [products, setProducts] = useState<ProductsType | null>(null);
    useEffect(() => {
        setProducts(productsTest);
        
    },[products]);
    return (
        // <AnimatePresence>
        <>
            <h1 className="text-center text-3xl font-bold mb-6 text-white">Populer Product</h1>
            <motion.section
                ref={ref}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                exit="hidden"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-10"
                variants={{
                    hidden: {
                        opacity: 0,
                        y: 50,
                        transition: { duration: 0.5, ease: 'easeInOut' }
                    },
                    show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.2 }
                    }
                }}
            >
                {products && products.map(item => (
                    <motion.div
                        key={item.id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                    >
                        <ProductCard item={item} />
                    </motion.div>
                ))}
            </motion.section>
        {/* </AnimatePresence> */}
        </>
    );
}

export default Populer;