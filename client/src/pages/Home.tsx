import Slider from "@/components/Slider";
import CategorySection from "@/components/Category";
import Populer from "@/components/Populer";
const Home = () => {
    document.title = 'Home'
    return (
        <main className="flex flex-col gap-10 overflow-x-hidden text-white">
            <div className="w-full">
                <Slider />
            </div>
            <div className="w-full max-w-6xl m-auto p-3 sm:p-6 lg:p-8">
                <Populer />
                <CategorySection />
            </div>
        </main>
    );
}

export default Home;