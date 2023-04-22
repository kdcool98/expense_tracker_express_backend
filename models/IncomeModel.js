const mongoose = require('mongoose');


const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 50,
      required: [true, "Please enter a valid title"],
      trim: true,
    },
    amount: {
      type: Number,
      min: [1, "Minimum amount is 1"],
      required: true,
    },
    type: {
      type: String,
      default: "Income",
      enum: ["Expense", "Income"],
    },
    date: {
      type: Date,
      required: [true, "Invalid Date"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      required: [
        true,
        "Please add a category, it will help in segregating the expenses.",
      ],
    },
    description: {
      type: String,
      trim: true,
      required: [
        true,
        "Adding a description helps to recall the income in Future.",
      ],
      maxLength: 100,
    },
  },
  {
    timestamps: true, // will add the created and updated at fields with values
  }
);


module.exports = mongoose.model("Income", IncomeSchema)