import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [securityAnswer, setSecurityAnswer] = useState("");
    const navigate = useNavigate();

    const validCredentials = {
        email: "test@gmail.com",
        password: "123",
        securityQuestion: "What is your favorite color?",
        securityAnswer: "blue",
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://13.51.175.33:8080/api/auth/login",{
                email,
                password
            });
            const {token} = response.data;
            localStorage.setItem('token',token);
            console.log("User logged in successfully: ", response.data);
            alert("User Logged in successfully!");
            navigate("/dashboard");
        }catch(error){
            console.error("Error during login:", error);
            alert("An error occured.Please try again later");
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (email === validCredentials.email && securityAnswer.toLowerCase() === validCredentials.securityAnswer.toLowerCase()) {
            alert("Password reset link has been sent to your email.");
            setShowForgotPassword(false);
        } else {
            alert("Incorrect answer to the security question.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Log In</h2>
                {showForgotPassword ? (
                    <form onSubmit={handleForgotPassword}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Security Question</label>
                            <p>{validCredentials.securityQuestion}</p>
                            <input
                                type="text"
                                placeholder="Answer"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
                        >
                            Reset Password
                        </button>
                        <p className="text-sm text-gray-500 text-center mt-4 cursor-pointer" onClick={() => setShowForgotPassword(false)}>
                            Back to Login
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
                        >
                            Login
                        </button>
                        <p className="text-sm text-gray-500 text-center mt-4 cursor-pointer" onClick={() => setShowForgotPassword(true)}>
                            Forgot Password?
                        </p>
                    </form>
                )}
                <p className="text-sm text-gray-500 text-center mt-4">
                    Don't have an account?{" "}
                    <span
                        className="text-teal-500 cursor-pointer hover:underline"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;