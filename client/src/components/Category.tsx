import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { CategoryCardProps } from '@/types';

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, description, animation }) => {
    return (
        <motion.div
            className="relative w-full h-64 bg-cover bg-center rounded-xl shadow-lg"
            style={{ backgroundImage: `url(${image})` }}
            initial="hidden"
            animate="visible"
            variants={animation}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold">{title}</h3>
                <p className="text-white text-sm">{description}</p>
            </div>
        </motion.div>
    );
};

const CategorySection: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    const categories = [
        {
            image: 'https://awsimages.detik.net.id/community/media/visual/2024/02/14/gitar-elektrik-1.jpeg?w=1200',
            title: 'Electric Guitars',
            description: 'See Product',
            animation: {
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0, transition: { duration: 1 } },
            },
        },
        {
            image: 'https://ceklist.id/wp-content/uploads/2020/02/Gitar-Akustik-yang-Bagus.jpg',
            title: 'Acoustic Guitars',
            description: 'See Product',
            animation: {
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0, transition: { duration: 1 } },
            },
        },
        {
            image: 'https://static5.depositphotos.com/1005942/513/i/450/depositphotos_5135771-stock-photo-playing-guitar.jpg',
            title: 'Classical Guitars',
            description: 'See Product',
            animation: {
                hidden: { opacity: 0, y: -100 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            },
        },
    ];

    return (
        <>
            <h1 className="text-center text-3xl font-bold mb-6 text-black">CATEGORY</h1>
            <div ref={ref} className={`w-4/5 m-auto overflow-hidden grid grid-cols-2 gap-4 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
                    transition={{ duration: 1 }}
                    className="col-span-2"
                >
                    <Link to={'/products'} onClick={() => {
                        localStorage.setItem('category', 'Classical')
                    }}>
                        <CategoryCard
                            image={categories[2].image}
                            title={categories[2].title}
                            description={categories[2].description}
                            animation={categories[2].animation}
                        />
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                >
                    <Link to={'/products'} onClick={() => {
                        localStorage.setItem('category', 'Acoustic')
                    }}>
                        <CategoryCard
                            image={categories[1].image}
                            title={categories[1].title}
                            description={categories[1].description}
                            animation={categories[1].animation}
                        />
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                    transition={{ duration: 1 }}
                >
                    <Link to={'/products'} onClick={() => {
                        localStorage.setItem('category', 'Electric')
                    }}>
                        <CategoryCard
                            image={categories[0].image}
                            title={categories[0].title}
                            description={categories[0].description}
                            animation={categories[0].animation}
                        />
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default CategorySection;
