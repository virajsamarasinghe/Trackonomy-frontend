import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <nav className="bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg">
            <div className="flex justify-between items-center p-4">
                {/* Logo */}
                <div>
                    <Link to="/" className="text-3xl font-bold hover:text-gray-200">Trackonomy</Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-6 text-xl">
                    <Link to="/dashboard" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition">Dashboard</Link>
                    <Link to="/transactions" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition">Transactions</Link>
                    <Link to="/budget" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition">Budget</Link>
                    <Link to="/financial-report" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition">Financial Report</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                        />
                    </svg>
                </button>

                {/* Logout Button */}
                <div className="hidden md:block">
                    <Link to="/login" className="hover:bg-red-600 hover:text-blue-600 px-4 py-2 rounded transition">Logout</Link>
                </div>
            </div>

            {/* Mobile Links */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-600 ">
                    <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-white hover:bg-purple-700"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/transactions"
                        className="block px-4 py-2 text-white hover:bg-purple-700"
                    >
                        Transactions
                    </Link>
                    <Link
                        to="/budget"
                        className="block px-4 py-2 text-white hover:bg-purple-700"
                    >
                        Budget
                    </Link>
                    <Link
                        to="/financial-report"
                        className="block px-4 py-2 text-white hover:bg-purple-700"
                    >
                        Financial Report
                    </Link>
                    <Link
                        to="/login"
                        className="block px-4 py-2 text-white hover:bg-purple-700"
                    >
                        Logout
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;