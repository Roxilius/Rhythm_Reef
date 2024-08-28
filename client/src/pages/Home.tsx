/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Form } from "@/components/Form";
import { logout as logoutService } from "@/service/authService";
import { useNavigate } from "react-router-dom";
import { getAllProducts, productsTest, ProductsType, SearchType } from "@/service/ProductService";
import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import CategorySection from "@/components/Category";
import Populer from "@/components/Populer";
// import { UpdateFollower } from "react-mouse-follower";

const Home = () => {

    const [search, setSearch] = useState<SearchType>({
        name: '',
        category: '',
        page: 1,
        sortBy: '',
        sortOrder: '',
        minPrice: '',
        maxPrice: ''
    });
    const [products, setProducts] = useState<ProductsType | null>(null);

    useEffect(() => {
        setProducts(productsTest);
        // const fetchProducts = async () => {
        //     const data = await getAllProducts(search);
        //     setProducts(data);
        // };
        // fetchProducts();
    }, [search]);

    const navigate = useNavigate();
    const handleLogout = () => {
        logoutService();
        navigate('/');
    };
    return (
        <main className="flex flex-col gap-10 overflow-x-hidden bg-gray-900 text-white">
            <Slider />
            <div className="w-4/5 m-auto p-3">
                <Populer />
                <CategorySection />
            </div>
        </main>
    );
}

export default Home;