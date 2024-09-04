/* eslint-disable prefer-const */
import ProductCard from "@/components/ProductCard";
import { getAllProducts, getProduct, getProductsPage } from "@/service/productService";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Pagination from "@/components/Pagenation";
import { ProductsType, ProductType, TermsType } from "@/types";
import ProductDetailPopup from "@/components/ProductDetailPopup";
import { Filter } from "lucide-react";

const Products: React.FC = () => {
    document.title = 'Products';
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const [category] = useState<string | null>(localStorage.getItem('category'));
    const [terms, setTerms] = useState<TermsType>({
        name: '',
        category: category ? category : '',
        page: 1,
        sortBy: '',
        sortOrder: '',
        minPrice: '',
        maxPrice: '',
        sort: ''
    });

    const [products, setProducts] = useState<ProductsType>([] as ProductsType);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setTerms((prevTerms) => ({
            ...prevTerms,
            page: page
        }));
    };

    useEffect(() => {
        const fetchProductsEndPages = async () => {
            const data = await getAllProducts(terms);
            setProducts(data);
            localStorage.removeItem('category')
            setTotalPages(await getProductsPage());
        };
        fetchProductsEndPages();
    }, [terms]);

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const { name, value } = e.target;
        if (name === "sort") {
            setTerms(prevTerms => ({
                ...prevTerms,
                sort: value,
                sortBy: value.includes('price') ? 'price' : 'name',
                sortOrder:
                value === "lowPrice" ? "asc" :
                value === "highPrice" ? "desc" :
                value === "a-z" ? "asc" :
                value === "z-a" ? "desc" : "",
            }));
        } else {
            setTerms((prevTerms) => ({
                ...prevTerms,
                [name]: value,
            }));
        }
    };

    const [range, setRange] = useState({
        minPrice: '',
        maxPrice: ''
    })
    const handleRangeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;
        setRange((prevRange) => ({
            ...prevRange,
            [name]: formatRupiah(value)
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setTerms((prevTerms) => ({
            ...prevTerms,
            minPrice: range.minPrice.replace(/[^,\d]/g, '').replace(',', '.'),
            maxPrice: range.maxPrice.replace(/[^,\d]/g, '').replace(',', '.')
        }));
    };

    const formatRupiah = (value: string): string => {
        let saldo_string = value.replace(/[^,\d]/g, '');
        let split = saldo_string.split(',');
        let sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        let ribuan = split[0].substr(sisa).match(/\d{3}/g);
        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
        return 'Rp. ' + (rupiah || '');
    };

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

    // const [showFilter, setShowFilter] = useState(false);

    // const toggleFilter = () => {
    //     setShowFilter(!showFilter);
    // };
    const categories = ['', 'Electric', 'Acoustic', 'Classical'];

    return (
        <main className={`relative flex justify-center p-6 gap-2 overflow-x-hidden text-black`}>
            <section className="flex p-5 ">
                <motion.aside
                    // initial={showFilter ? { opacity: 0 } : { x: '-100%' }}
                    // animate={showFilter ? { opacity: 1 } : { x: '0%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className={`w-2/12 flex-col flex gap-5`}
                >
                    <div className="flex font-bold">
                        <Filter /> Filter
                    </div>
                    <motion.form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="category" className="font-bold">Category</label>
                            {categories.map(category => (
                                <div key={category} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id={category}
                                        name="category"
                                        value={category}
                                        checked={terms.category === category}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor={category} className="text-gray-700">
                                        {category == '' ? 'All' : category}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className="flex flex-col">
                            <label htmlFor="sort" className="font-bold">Sort</label>
                            <select
                                id="sort"
                                name="sort"
                                value={terms.sort}
                                onChange={handleChange}
                                className="w-max text-center p-1 outline-1 outline outline-monokromatik-1 rounded-lg"
                            >
                                <option value="">Sort By</option>
                                <option value="lowPrice">{`Low -> High`}</option>
                                <option value="highPrice">{`High -> Low`}</option>
                                <option value="a-z">{`A -> Z`}</option>
                                <option value="z-a">{`Z -> A`}</option>
                            </select>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg shadow-md">
                            <label htmlFor="range" className="font-bold mb-3 text-center">Batas Harga</label>
                            <div className="flex flex-col items-center justify-between">
                                <input
                                    type="text"
                                    placeholder="Rp. MIN"
                                    name="minPrice"
                                    value={range.minPrice}
                                    onChange={handleRangeChange}
                                    className="border rounded-md py-2 px-3 w-full text-sm text-gray-700"
                                />
                                <span className="text-gray-500">—</span>
                                <input
                                    type="text"
                                    placeholder="Rp. MAX"
                                    name="maxPrice"
                                    value={range.maxPrice}
                                    onChange={handleRangeChange}
                                    className="border rounded-md py-2 px-3 w-full text-sm text-gray-700"
                                />
                            </div>
                            <button
                                className="bg-orange-600 text-white py-2 px-4 rounded-md w-full hover:bg-orange-700 transition"
                            >
                                TERAPKAN
                            </button>
                        </div>
                    </motion.form>
                </motion.aside>
                <motion.aside className="flex flex-col gap-3 w-full">
                    <motion.form
                        className="flex justify-center"
                    >
                        <input
                            type="search"
                            id="name"
                            name="name"
                            value={terms.name}
                            placeholder="Product Name"
                            onChange={handleChange}
                            className="w-full sm:w-3/4 lg:w-1/2 p-2 outline outline-monokromatik-7 outline-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-monokromatik-2"
                        />
                    </motion.form>
                    <hr />
                    <motion.aside
                        ref={ref}
                        initial="hidden"
                        animate={inView ? 'show' : 'hidden'}
                        exit="hidden"
                        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-5 gap-6"
                    >
                        {products.length > 0 && products.map((product) => (
                            <ProductCard
                                key={product.id}
                                item={product}
                                handleClick={() => onclickProduct(product.id)}
                            />
                        ))}
                    </motion.aside>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </motion.aside>
            </section>
            {
                isPopupOpen && <ProductDetailPopup product={product} onClose={handleClose} />
            }
        </main >
    )
};

export default Products;
