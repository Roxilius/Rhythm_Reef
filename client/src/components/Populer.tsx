import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import ProductCard from "./ProductCard";
import { getAllProducts, getProduct } from "@/service/productService";
import { ProductsType, ProductType, TermsType } from "@/types";
import ProductDetailPopup from "./ProductDetailPopup";

const Populer: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });
    const terms: TermsType = {
        name: '',
        category: '',
        page: 1,
        sortBy: '',
        sortOrder: '',
        minPrice: '',
        maxPrice: '',
        sort: ""
    };
    const [products, setProducts] = useState<ProductsType>();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts(terms);
            setProducts(data.slice(0, 4));
        };
        fetchProducts();
    });
    const [product, setProduct] = useState<ProductType>({} as ProductType);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const onclickProduct = async (id: string) => {
        const res = await getProduct(id);
        setProduct(res);
        setIsPopupOpen(true);
    }

    const handleClose = () => {
        setProduct({} as ProductType);
        setIsPopupOpen(false);
    }

    return (
        <>
            <h1 className="text-center text-3xl font-bold mb-6 text-black">Populer Product</h1>
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
                        <ProductCard item={item} handleClick={onclickProduct} />
                    </motion.div>
                ))}
            </motion.section>
            {
                isPopupOpen && <ProductDetailPopup product={product} onClose={handleClose} />
            }
        </>
    );
}

export default Populer;