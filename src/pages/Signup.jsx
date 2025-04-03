import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try{
            const response = await axios.post("http://13.51.175.33:5000/api/auth/signup",{
                name,
                email,
                password,
            });
            console.log("User registed successfully: ", response.data);
            alert("Account created successfully!");
            navigate("/login");
        }catch(error){
            console.error("Error during registration: ", error.response?.data || error.message);
            alert("Error during registration");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Create an Account</h2>
                <form onSubmit={handleSignup}>
                <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Enter your name"
                            />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Enter your email"
                            />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Enter your password"
                            />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Confirm your password"
                            />
                    </div>
                    <button
                        //type="submit"
                        onClick={handleSignup}
                        className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
                        >
                            Sign Up
                        </button>
                </form>
                <p className="text-sm text-gray-500 text-center mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-teal-500 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;