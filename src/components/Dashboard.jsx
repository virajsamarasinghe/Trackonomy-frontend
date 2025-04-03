import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [savings, setSavings] = useState(0);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const incomeCategories = ["Income","Salary","Bonus","Other Income"];
    //const expenseCategories = ["Expenses","Food","Entertainment","Bills","Other Expenses" ];

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = { headers: { "x-auth-token": token } };

                const incomeRes = await axios.get("http://localhost:8080/api/transactions/income", config);
                const expenseRes = await axios.get("http://localhost:8080/api/transactions/expense", config);

                const totalIncome = incomeRes.data.reduce((sum, txn) => sum + txn.amount, 0);
                const totalExpenses = expenseRes.data.reduce((sum, txn) => sum + txn.amount, 0);
                setIncome(totalIncome);
                setExpenses(totalExpenses);
                setSavings(totalIncome - totalExpenses);
                
                // Combine transactions and sort by date (latest first)
                const allTransactions = [...incomeRes.data, ...expenseRes.data].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setRecentTransactions(allTransactions.slice(0, 5));
            } catch (error) {
                console.error("Error fetching transactions", error);
            }
        };
        fetchTransactions();
    }, []);

    const chartData = {
        labels: ["Income", "Expenses", "Savings"],
        datasets: [
            {
                label: "Amount",
                data: [income, expenses, savings],
                backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Income</h2>
                    <p className="text-2xl font-semibold">${income}</p>
                </div>
                <div className="bg-red-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Expenses</h2>
                    <p className="text-2xl font-semibold">${expenses}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded shadow text-center">
                    <h2 className="text-lg font-bold">Savings</h2>
                    <p className="text-2xl font-semibold">${savings}</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded shadow mb-8">
                <h2 className="text-xl font-bold mb-4">Financial Overview</h2>
                <Bar data={chartData} />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                <ul className="divide-y divide-gray-200">
                    {recentTransactions.length === 0 ? (
                        <p className="text-gray-500">No recent transactions found.</p>
                    ) : (
                        recentTransactions.map((transaction) => (
                            <li
                                key={transaction._id}
                                className="py-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">{transaction.description}</p>
                                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                                </div>
                                <p
                                    className={`text-lg font-semibold ${
                                        incomeCategories.includes(transaction.category)
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {incomeCategories.includes(transaction.category)
                                        ? `+$${transaction.amount}` 
                                        : `-$${transaction.amount}`}
                                </p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
