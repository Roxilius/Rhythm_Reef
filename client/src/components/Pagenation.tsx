import { PaginationProps } from '@/types';
import React from 'react';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`px-3 py-1 mx-1 rounded ${currentPage === i ? 'bg-monokromatik-4 text-white' : 'bg-monokromatik-2 text-white'
                        }`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="m-1 bottom-0 flex justify-center items-center">
            <button
                className="px-3 py-1 mx-1 rounded bg-monokromatik-4 text-white hover:bg-monokromatik-5 focus:outline-none focus:ring-2 focus:ring-monokromatik-6"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {renderPageButtons()}
            <button
                className="px-3 py-1 mx-1 rounded bg-monokromatik-4 text-white hover:bg-monokromatik-5 focus:outline-none focus:ring-2 focus:ring-monokromatik-6"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
