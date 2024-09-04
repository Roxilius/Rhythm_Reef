import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { sliderVariants, slides } from "@/animated/Slider";

const Banner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [isDragging]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };
    return (
        <motion.section
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] w-full">
                {/* <AnimatePresence  initial={false} mode="wait"> */}
                    <motion.div
                        key={slides[currentIndex].image}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={sliderVariants}
                        transition={{ duration: 0.5 }}
                        className="absolute top-0 left-0 w-full h-full"
                    >
                        <motion.img
                            src={slides[currentIndex].image}
                            alt={`Slide ${currentIndex}`}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(_event, info) => {
                                setIsDragging(false);
                                if (info.offset.x < -50) {
                                    handleNext();
                                } else if (info.offset.x > 50) {
                                    handlePrev();
                                }
                            }}
                            className="w-full h-full object-cover cursor-grab"
                        />
                        <motion.div className="overflow-hidden w-1/2 flex flex-col md:flex-row absolute top-5 left-0 bottom-0 md:left-12 items-center p-4">
                            <motion.div
                                className="text-white"
                                initial={{ x: -250, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className={`text-2xl md:text-4xl font-bold mt-2 ${currentIndex != 0 ? 'text-orange-500' : 'text-slate-200'} `}>{slides[currentIndex].product.name}</h1>
                                <p className={`text-sm md:text-md mt-4 ${currentIndex != 0 ? 'text-yellow-400' : 'text-red-200'} `}>{slides[currentIndex].product.description}</p>
                            </motion.div>
                            <motion.img
                                src={slides[currentIndex].product.image}
                                alt="Product"
                                width={200}
                                className="mt-4 md:mt-0 ml-0 md:ml-4"
                                initial={{ y: 250, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                exit={{y: 250, opacity: 0}}
                                whileHover={{
                                    rotate: 10,
                                    y: [0, -5, 5, 0],
                                    transition: {
                                        y: {
                                            duration: 2,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                        }
                                    },
                                }}
                            />
                        </motion.div>
                    </motion.div>
                {/* </AnimatePresence> */}
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-12 h-2 md:h-2 ${index === currentIndex ? 'bg-monokromatik-7' : 'bg-monokromatik-2'} rounded-full cursor-pointer`}
                    />
                ))}
            </div>
        </motion.section>

    );
}

export default Banner;