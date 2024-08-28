import { motion } from 'framer-motion'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
    onOpenPopup: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenPopup }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const auth = useAuth();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 text-white shadow-md p-4 sticky top-0 z-10 flex justify-between items-center"
        >
            <h1 className="text-2xl font-bold">Rhythm Reef</h1>
            <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-gray-300">Home</a>
                <a href="#" className="hover:text-gray-300">About</a>
                <a href="#" className="hover:text-gray-300">Services</a>
                {
                    !auth.isAuthenticated? (
                        <button onClick={onOpenPopup} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
                            Login / Register
                        </button>
                    ) : (
                        <button onClick={auth.logout} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
                            Logout
                        </button>
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
                    <motion.a
                        href="#"
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        Home
                    </motion.a>
                    <motion.a
                        href="#"
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        About
                    </motion.a>
                    <motion.a
                        href="#"
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        Services
                    </motion.a>
                    <motion.a
                        href="#"
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        Contact
                    </motion.a>
                </motion.nav>
            )}
        </motion.header>
    );
}

export default Header;