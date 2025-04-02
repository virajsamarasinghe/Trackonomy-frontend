import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [newIncome, setNewIncome] = useState({
        description: "",
        amount: "",
        category: "Income",
    });
    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: "",
        category: "Expenses",
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = { headers: { "x-auth-token": token } };
                
                const incomeRes = await axios.get("http://192.168.49.2:32001/api/transactions/income", config);
                const expenseRes = await axios.get("http://192.168.49.2:32001/api/transactions/expense", config);
                
                setIncomeTransactions(incomeRes.data);
                setExpenseTransactions(expenseRes.data);
            } catch (error) {
                console.error("Error fetching transactions", error);
            }
        };

        fetchTransactions();
    }, []);

    const handleAddIncome = async(e) => {
        e.preventDefault();
        if (!newIncome.description || !newIncome.amount) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const config = { headers: { "x-auth-token": token } };
            const response = await axios.post("http://192.168.49.2:32001/api/transactions/income", newIncome, config);
            setIncomeTransactions([...incomeTransactions, response.data]);
            setNewIncome({ description: "", amount: "", category: "Income" });
        } catch (error) {
            console.error("Error adding income", error);
        }
    };

    const handleAddExpense = async(e) => {
        e.preventDefault();
        if (!newExpense.description || !newExpense.amount) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const config = { headers: { "x-auth-token": token } };
            const response = await axios.post("http://192.168.49.2:32001/api/transactions/expense", newExpense, config);
            setExpenseTransactions([...expenseTransactions, response.data]);
            setNewExpense({ description: "", amount: "", category: "Expenses" });
        } catch (error) {
            console.error("Error adding expense", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold mb-6">Transactions</h1>

                <h2 className="text-2xl font-semibold mb-4">Add Income</h2>
                <form onSubmit={handleAddIncome} className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Description"
                            value={newIncome.description}
                            onChange={(e) => setNewIncome({...newIncome, description: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newIncome.amount}
                            onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <select
                            value={newIncome.category}
                            onChange={(e) => setNewIncome({...newIncome, category: e.target.value})}
                            className="p-2 border rounded-lg"
                        >
                            <option value="Income">Income</option>
                            <option value="Salary">Salary</option>
                            <option value="Bonus">Bonus</option>
                            <option value="Other Income">Other Income</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Add Income
                    </button>
                </form>

                <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
                <form onSubmit={handleAddExpense} className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Description"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <select
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                            className="p-2 border rounded-lg"
                        >
                            <option value="Expenses">Expenses</option>
                            <option value="Food">Food</option>
                            <option value="Bills">Bills</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other Expenses">Other Expenses</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Add Expense
                    </button>
                </form>

                <h2 className="text-2xl font-semibold mb-4">Income Transactions</h2>
                <ul className="space-y-4 mb-6">
                    {incomeTransactions.map((transaction) => (
                        <li key={transaction.id} className="p-4 rounded-lg shadow-md bg-green-100">
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-bold">{transaction.description}</span>
                                    <p className="text-sm text-gray-600">{transaction.category}</p>
                                    <p className="text-sm text-gray-400">{transaction.date}</p>
                                </div>
                                <span className="text-lg font-semibold">${transaction.amount}</span>
                            </div>
                            </li>
                    ))}
                </ul>

                <h2 className="text-2xl font-semibold mb-4">Expense Transactions</h2>
                <ul className="space-y-4 mb-6">
                    {expenseTransactions.map((transaction) => (
                        <li key={transaction.id} className="p-4 rounded-lg shadow-md bg-red-200">
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-bold">{transaction.description}</span>
                                    <p className="text-sm text-gray-600">{transaction.category}</p>
                                    <p className="text-sm text-gray-400">{transaction.date}</p>
                                </div>
                                <span className="text-lg font-semibold">${transaction.amount}</span>
                            </div>
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Transactions;