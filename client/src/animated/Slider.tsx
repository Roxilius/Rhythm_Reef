import { Variants } from "framer-motion";
import slider1 from '../assets/slider1.jpg'
import slider2 from '../assets/slider2.webp'
import vintage from '../assets/VINTAGE.png'
import fender from '../assets/fender.png'

interface Product {
    name: string,
    image: string,
    description: string
}

export interface Slide {
    image: string;
    product: Product;
}

export const slides: Slide[] = [
    {
        image: slider1,
        product: {
            name: 'FENDER LIMTED EDITION',
            image: fender,
            description: 'Sleek silver sparkle finish, powerful Vintage-style'
        }
    },
    {
        image: slider2,
        product: {
            name: 'EPIPHONE ES-335 VINTAGE',
            image: vintage,
            description: 'Iconic Sound, Time Less Style, Powerful Vintage Style'
        }
    },
];

export const sliderVariants: Variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};