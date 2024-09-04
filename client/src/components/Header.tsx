import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Guitar, House, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { CircleUserRound, ShoppingCart } from 'lucide-react';
import CartPopup from './CartPopup';
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = ({ onOpenPopup }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const auth = useAuth();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const [isCartOpen, setCartOpen] = useState(false);
    const toggleCartPopup = () => {
        setCartOpen(!isCartOpen);
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-l from-monokromatik-3 to-monokromatik-6 text-white shadow-md p-4 sticky top-0 z-10 flex justify-between items-center"
        >
            <Link to={'/'} className="hover:text-gray-300 text-2xl font-bold">Rhythm Reef</Link>
            <nav className="hidden md:flex space-x-6">
                <Link to={'/'} className="hover:text-gray-300 m-auto flex"><House />Home</Link>
                <Link to={'/products'} className="hover:text-gray-300 m-auto flex"><Guitar />Products</Link>
                {
                    auth.isAuthenticated && (
                        <ShoppingCart onClick={toggleCartPopup} className='hover:text-gray-300 cursor-pointer' />
                    )
                }
                {
                    !auth.isAuthenticated ? (
                        <div onClick={onOpenPopup} className='hover:text-gray-300 cursor-pointer flex'>
                            <CircleUserRound  />Profile
                        </div>
                    ) : (
                        <Link to={'/profile'} className='flex'>
                            <CircleUserRound className='hover:text-gray-300 cursor-pointer' />
                            Profile
                        </Link>
                    )
                }
            </nav>
            <div className="md:hidden">
                <button onClick={toggleMenu} aria-label="Toggle menu">
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
            {isOpen && (
                <motion.nav
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 py-4 z-20 md:hidden"
                >
                    <motion.div
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to={'/'} className="hover:text-gray-300 m-auto flex"><House />Home</Link>
                    </motion.div>
                    <motion.div
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to={'/products'} className="hover:text-gray-300 m-auto flex"><Guitar />Products</Link>
                    </motion.div>
                    <motion.div
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        {
                            auth.isAuthenticated && (
                                <ShoppingCart onClick={toggleCartPopup} className='hover:text-gray-300 cursor-pointer' />
                            )
                        }
                    </motion.div>
                    <motion.div
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        {
                            !auth.isAuthenticated ? (
                                <div onClick={onOpenPopup} className='hover:text-gray-300 cursor-pointer flex'>
                                    <CircleUserRound  />Profile
                                </div>
                            ) : (
                                <Link to={'/profile'} className='flex'>
                                    <CircleUserRound className='hover:text-gray-300 cursor-pointer' />
                                    Profile
                                </Link>
                            )
                        }
                    </motion.div>
                </motion.nav>
            )}
            {
                isCartOpen && (
                    <CartPopup
                        isOpen={isCartOpen}
                        onClose={() => setCartOpen(false)}
                    />
                )
            }
        </motion.header>
    );
}

export default Header;
