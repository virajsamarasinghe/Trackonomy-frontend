import React, { useState, useEffect } from "react";

const Budget = () => {
    const [budgets, setBudgets] = useState({});
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [budgetTransactions, setBudgetTransactions] = useState([]); // Renamed from transactions
    const [newBudgetExpense, setNewBudgetExpense] = useState({
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "Food",
    });
    const [isCustomExpense, setIsCustomExpense] = useState(false);
    const [editMessage, setEditMessage] = useState(null); // For edit notifications

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(value);
    };

    useEffect(() => {
        const savedBudgetTransactions = JSON.parse(localStorage.getItem("budgetTransactions")) || []; // Renamed from transactions
        setBudgetTransactions(savedBudgetTransactions);
        const savedBudgets = JSON.parse(localStorage.getItem("budgets")) || {};
        setBudgets(savedBudgets);
    }, []);

    const handleBudgetChange = (e) => {
        const newBudget = e.target.value;
        setBudgets((prev) => {
            const updatedBudgets = { ...prev, [month]: newBudget };
            localStorage.setItem("budgets", JSON.stringify(updatedBudgets)); // Save to local storage
            return updatedBudgets;
        });
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleBudgetExpenseChange = (e) => { // Renamed from handleExpenseChange
        const { name, value } = e.target;
        setNewBudgetExpense((prev) => ({ ...prev, [name]: value }));
        if (name === "category" && value === "Other") {
            setIsCustomExpense(true);
        } else {
            setIsCustomExpense(false);
        }
    };

    const handleAddBudgetExpense = (e) => { // Renamed from handleAddExpense
        e.preventDefault();
        if (!newBudgetExpense.description || !newBudgetExpense.amount) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedBudgetExpense = {
            id: budgetTransactions.length + 1,
            ...newBudgetExpense,
            amount: parseFloat(newBudgetExpense.amount),
            date: new Date(newBudgetExpense.date).toISOString().split("T")[0],
        };

        const updatedBudgetTransactions = [...budgetTransactions, updatedBudgetExpense]; // Renamed from transactions
        setBudgetTransactions(updatedBudgetTransactions);
        localStorage.setItem("budgetTransactions", JSON.stringify(updatedBudgetTransactions)); // Renamed from transactions

        setNewBudgetExpense({
            description: "",
            amount: "",
            date: new Date().toISOString().split("T")[0],
            category: "Food",
        });
        setIsCustomExpense(false);

        // Update and hide edit message
        setEditMessage("Transaction updated successfully!");
        setTimeout(() => setEditMessage(null), 3000);
    };

    const handleDeleteBudgetTransaction = (id) => { // Renamed from handleDeleteTransaction
        const updatedBudgetTransactions = budgetTransactions.filter(transaction => transaction.id !== id); // Renamed from transactions
        setBudgetTransactions(updatedBudgetTransactions);
        localStorage.setItem("budgetTransactions", JSON.stringify(updatedBudgetTransactions)); // Renamed from transactions
    };

    const handleEditBudgetTransaction = (id) => { // Renamed from handleEditTransaction
        const transactionToEdit = budgetTransactions.find(transaction => transaction.id === id); // Renamed from transactions

        // Move transaction details to Add Expense form
        setNewBudgetExpense(transactionToEdit); // Renamed from newExpense

        // Remove the transaction from the list
        const updatedBudgetTransactions = budgetTransactions.filter(transaction => transaction.id !== id); // Renamed from transactions
        setBudgetTransactions(updatedBudgetTransactions);
        localStorage.setItem("budgetTransactions", JSON.stringify(updatedBudgetTransactions)); // Renamed from transactions

        // Show edit message
        setEditMessage("Please check the 'Add Expense' form for editing the transaction.");
    };

    const filteredBudgetTransactions = budgetTransactions.filter(transaction => { // Renamed from transactions
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === parseInt(month) && transactionDate.getFullYear() === parseInt(year);
    });

    const totalSpent = filteredBudgetTransactions.reduce((acc, transaction) => acc + transaction.amount, 0); // Renamed from transactions
    const budget = budgets[month] || 0;
    const balance = budget - totalSpent;

    const handleReset = () => {
        const updatedBudgets = { ...budgets };
        delete updatedBudgets[month];
        setBudgets(updatedBudgets);
        localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

        const updatedBudgetTransactions = budgetTransactions.filter(transaction => { // Renamed from transactions
            const transactionDate = new Date(transaction.date);
            return !(transactionDate.getMonth() === parseInt(month) && transactionDate.getFullYear() === parseInt(year));
        });
        setBudgetTransactions(updatedBudgetTransactions);
        localStorage.setItem("budgetTransactions", JSON.stringify(updatedBudgetTransactions)); // Renamed from transactions
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Budget Planner</h1>

            {/* Month and Year Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Month:</label>
                <select value={month} onChange={handleMonthChange} className="p-2 border rounded-lg">
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Year:</label>
                <input
                    type="number"
                    value={year}
                    onChange={handleYearChange}
                    className="p-2 border rounded-lg"
                    placeholder="Enter Year"
                />
            </div>

            {/* Budget Input */}
            <div className="bg-blue-100 p-4 rounded shadow mb-4">
                <h2 className="text-lg font-bold">Monthly Budget</h2>
                <input 
                    type="number"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="p-2 border rounded-lg"
                />
                <p className="text-xl">Budget: {formatCurrency(budget)}</p>
                <p className="text-sm text-gray-700">Spent: {formatCurrency(totalSpent)}</p>
                <p className="text-sm text-gray-700">Balance: {formatCurrency(balance)}</p>
            </div>

            {/* Add Expense Form */}
            <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
            <form onSubmit={handleAddBudgetExpense} className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={newBudgetExpense.description}
                        onChange={handleBudgetExpenseChange}
                        className="p-2 border rounded-lg"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        name="amount"
                        value={newBudgetExpense.amount}
                        onChange={handleBudgetExpenseChange}
                        className="p-2 border rounded-lg"
                    />
                    <select
                        name="category"
                        value={newBudgetExpense.category}
                        onChange={handleBudgetExpenseChange}
                        className="p-2 border rounded-lg"
                    >
                        <option value="Food">Food</option>
                        <option value="Bills">Bills</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <input
                    type="date"
                    name="date"
                    value={newBudgetExpense.date}
                    onChange={handleBudgetExpenseChange}
                    className="p-2 border rounded-lg mt-4"
                />
                <button
                    type="submit"
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Add Expense
                </button>
            </form>
            {/* Edit Message Display */}
            {editMessage && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-lg">
                    {editMessage}
                </div>
            )}

            {/* Budget Transactions List */}
            <h2 className="text-lg font-bold mb-2">
                Budget Transactions for {new Date(0, month).toLocaleString('default', { month: 'long' })} {year}
            </h2>
            <ul className="space-y-2">
                {filteredBudgetTransactions.map((transaction) => (
                    <li key={transaction.id} className="p-2 border rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                            <p className="text-sm text-gray-500">Category: {transaction.category}</p> {/* Display category */}
                        </div>
                        <p className={`text-lg font-semibold ${transaction.category === "Income" ? "text-green-500" : "text-red-500"}`}>
                            {transaction.category === "Income" ? "+" : "-"}${Math.abs(transaction.amount)}
                        </p>
                        <button onClick={() => handleEditBudgetTransaction(transaction.id)} className="ml-4 text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => handleDeleteBudgetTransaction(transaction.id)} className="ml-2 text-red-500 hover:underline">Delete</button>
                    </li>
                ))}
            </ul>

            {/* Reset Button */}
            <button
                onClick={handleReset}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
                Reset Budget and Transactions for {new Date(0, month).toLocaleString('default', { month: 'long' })} {year}
            </button>
        </div>
    );
};

export default Budget;