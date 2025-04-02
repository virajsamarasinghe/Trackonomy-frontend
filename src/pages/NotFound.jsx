import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="mb-6 text-lg text-gray-700">Page not found.</p>
            <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">Go Home</Link>
        </div>
    );
};

export default NotFound;