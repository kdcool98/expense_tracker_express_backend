const mongoose = require("mongoose")

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title of your expense"],
        maxLength: 20,
        trim: true
    },
    date: {
        type: Date,
        required: [true, "Invalid Date"]
    },
    description: {
        type: String,
        required: [true, "Adding a description helps to recall the expense in Future."],
        maxLength: 100,
        trim: true
    },
    type: {
        type: String,
        enum: ["Income", "Expense"],
        default: "Expense"
    },
    category: {
        type: String,
        required: [true, "Please add a category, it will help in segregating the expenses."],
        maxLength: [15, "Max Length can be 15"],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is  mandatory and it cannot be less than 1"],
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Expense", ExpenseSchema)