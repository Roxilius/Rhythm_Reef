import CartItem from "@/components/CartItem";
import { getCart } from "@/service/cartService";
import { CartType } from "@/types";
import { useEffect, useState } from "react";

const CartPage = () => {

    const [cart, setCart] = useState<CartType | null>(null);

    const formatRupiah = (amount: number): string => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const fetchCart = async () => {
        const res = await getCart();
        setCart(res.data);
    };
    useEffect(() => {
        fetchCart();
    }, []);
    return (
        <main className="min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Keranjang Anda</h1>
                <div className="mb-4">
                    {cart?.cartItems.map((item) => (
                        <CartItem fetchCart={fetchCart} key={item.id} amount={item.amount} id={item.id} product={item.product} qty={item.qty} />
                    ))}
                </div>
                <div className="flex justify-between items-center border-t border-gray-300 pt-4">
                    <h2 className="text-xl font-semibold">Total: Rp. {formatRupiah(cart?.totalAmount ?? 0)}</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Lanjutkan ke Pembayaran
                    </button>
                </div>
            </div>
        </main>
    );
}

export default CartPage;