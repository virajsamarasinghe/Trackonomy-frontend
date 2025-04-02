
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CSVLink } from "react-csv"; // Import CSVLink for CSV export

ChartJS.register(ArcElement, Tooltip, Legend);

const FinancialReport = () => {
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [budgetTransactions, setBudgetTransactions] = useState([]);
    const [budgets, setBudgets] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [activeTab, setActiveTab] = useState("transactions");

    useEffect(() => {
        const fetchTransactions = () => {
            const savedIncomeTransactions = JSON.parse(localStorage.getItem("incomeTransactions")) || [];
            const savedExpenseTransactions = JSON.parse(localStorage.getItem("expenseTransactions")) || [];
            const savedBudgets = JSON.parse(localStorage.getItem("budgets")) || {};
            const savedBudgetTransactions = JSON.parse(localStorage.getItem("budgetTransactions")) || [];

            setIncomeTransactions(savedIncomeTransactions);
            setExpenseTransactions(savedExpenseTransactions);
            setBudgets(savedBudgets);
            setBudgetTransactions(savedBudgetTransactions);
        };

        fetchTransactions();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const filteredIncomeTransactions = incomeTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === selectedMonth && transactionDate.getFullYear() === selectedYear;
    });

    const filteredExpenseTransactions = expenseTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === selectedMonth && transactionDate.getFullYear() === selectedYear;
    });

    const filteredBudgetTransactions = budgetTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === selectedMonth && transactionDate.getFullYear() === selectedYear;
    });

    const totalIncome = filteredIncomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenses = filteredExpenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const budget = budgets[selectedMonth] || 0;
    const totalSpentFromBudget = filteredBudgetTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const balance = budget - totalSpentFromBudget;

    // Data for Pie Charts
    const incomeData = {
        labels: ['Expenses', 'Income'],
        datasets: [
            {
                data: [totalExpenses, totalIncome],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            },
        ],
    };

    const budgetData = {
        labels: ['Total Budget Expenses', 'Budget'],
        datasets: [
            {
                data: [totalSpentFromBudget, budget],
                backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            },
        ],
    };

    // Prepare CSV data
    const csvData = [
        ["Type", "Description", "Amount", "Date", "Category"],
        ...filteredIncomeTransactions.map(transaction => ["Income", transaction.description, formatCurrency(transaction.amount), transaction.date, transaction.category]),
        ...filteredExpenseTransactions.map(transaction => ["Expense", transaction.description, formatCurrency(transaction.amount), transaction.date, transaction.category]),
        ...filteredBudgetTransactions.map(transaction => ["Budget Expense", transaction.description, formatCurrency(transaction.amount), transaction.date, transaction.category]),
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen financial-report-background"> {/* Apply the background class here */}
            <h1 className="text-3xl font-bold mb-6">Financial Report</h1>

            {/* Tab Navigation */}
            <div className="mb-4">
                <button
                    onClick={() => setActiveTab("transactions")}
                    className={`px-4 py-2 rounded ${activeTab === "transactions" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Income/Expense Transactions
                </button>
                <button
                    onClick={() => setActiveTab("budget")}
                    className={`px-4 py-2 rounded ${activeTab === "budget" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Budget Planner
                </button>
                <CSVLink
                    data={csvData}
                    filename={"financial_report.csv"}
                    className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    Generate Financial Report
                </CSVLink>
            </div>

            {/* Month and Year Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Month:</label>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className="p-2 border rounded-lg">
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
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="p-2 border rounded-lg"
                    placeholder="Enter Year"
                />
            </div>

            {/* Conditional Rendering Based on Active Tab */}
            {activeTab === "transactions" ? (
                <>
                    {/* Summary Cards for Transactions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        <div className="bg-green-100 p-4 rounded shadow text-center">
                            <h2 className="text-lg font-bold">Total Income</h2>
                            <p className="text-2xl font-semibold">{formatCurrency(totalIncome)}</p>
                        </div>
                        <div className="bg-red-100 p-4 rounded shadow text-center">
                            <h2 className="text-lg font-bold">Total Expenses</h2>
                            <p className="text-2xl font-semibold">{formatCurrency(totalExpenses)}</p>
                        </div>
                    </div>

                    {/* Pie Chart for Income vs Expenses */}
                    <h2 className="text-xl font-bold mb-4">Income vs Expenses</h2>
                    <div className="mb-8">
                        <Pie data={incomeData} options={{ responsive: true, maintainAspectRatio: false }} width={400} height={400} />
                    </div>

                    {/* Income Transactions List */}
                    <h2 className="text-xl font-bold mb-4">Income Transactions</h2>
                    <ul className="divide-y divide-gray-200 mb-6">
                        {filteredIncomeTransactions.map(transaction => (
                            <li key={transaction.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{transaction.description}</p>
                                    <p className="text-sm text-gray-500">{transaction.date}</p>
                                    <p className="text-sm text-gray-500">Category: {transaction.category}</p>
                                </div>
                                <p className="text-lg font-semibold text-green-500">+{formatCurrency(transaction.amount)}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Expense Transactions List */}
                    <h2 className="text-xl font-bold mb-4">Expense Transactions</h2>
                    <ul className="divide-y divide-gray-200 mb-6">
                        {filteredExpenseTransactions.map(transaction => (
                            <li key={transaction.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{transaction.description}</p>
                                    <p className="text-sm text-gray-500">{transaction.date}</p>
                                    <p className="text-sm text-gray-500">Category: {transaction.category}</p>
                                </div>
                                <p className="text-lg font-semibold text-red-500">-{formatCurrency(transaction.amount)}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    {/* Summary Cards for Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        <div className="bg-blue-100 p-4 rounded shadow text-center">
                            <h2 className="text-lg font-bold">Budget</h2>
                            <p className="text-2xl font-semibold">{formatCurrency(budget)}</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded shadow text-center">
                            <h2 className="text-lg font-bold">Total Budget Expenses</h2>
                            <p className="text-2xl font-semibold">{formatCurrency(totalSpentFromBudget)}</p>
                        </div>
                    </div>

                    {/* Pie Chart for Budget vs Total Budget Expenses */}
                    <h2 className="text-xl font-bold mb-4">Budget vs Total Budget Expenses</h2>
                    <div className="mb-8">
                        <Pie data={budgetData} options={{ responsive: true, maintainAspectRatio: false }} width={400} height={400} />
                    </div>

                    {/* Budget Transactions List */}
                    <h2 className="text-xl font-bold mb-4">Budget Transactions</h2>
                    <ul className="divide-y divide-gray-200 mb-6">
                        {filteredBudgetTransactions.map(transaction => (
                            <li key={transaction.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{transaction.description}</p>
                                    <p className="text-sm text-gray-500">{transaction.date}</p>
                                    <p className="text-sm text-gray-500">Category: {transaction.category}</p>
                                </div>
                                <p className="text-lg font-semibold">{formatCurrency(transaction.amount)}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default FinancialReport;
