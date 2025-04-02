import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col mdd:flex-row justify-between items-center">
                    {/* Logo and Description */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">Trackonomy</h2>
                        <p className="text-sm mt-2 text-gray-200">
                            Simplify your personal finance with Trackonomy. Your companion for managing income, expenses, and budgets.
                        </p>
                    </div>

                    {/* Navigation Links*/ }
                    <div className="flex gap-6 mb-4 md:mb-0">
                        <a href="/" className="hover:underline">
                            Home
                        </a>
                        <a href="/dashboard" className="hover:underline">
                            Dashboard
                        </a>
                        <a href="/transactions" className="hover:underline">
                            Transactions
                        </a>
                        <a href="/budget" className="hover:underline">
                            Budget
                        </a>
                    </div>

                    {/*Social Media Links */}
                    <div className="flex gap-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300 transition"
                        >
                            <i className="fab fa-facebook fa-lg"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300 transition"
                        >
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300 transition"
                        >
                            <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300 transition"
                        >
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                    </div>
                    </div>

                    {/* Bottom Line */}
                    <div className="mt-6 text-center text-sm text-gray-200">
                        © {new Date().getFullYear()} Trackonomy. All rights reserved.
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;