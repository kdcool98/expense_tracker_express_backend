const Expense = require("../models/ExpenseModel")

exports.addExpense = async (req, res) => {
    console.log(req.body);
    const { title, date, description, type, category, amount } = req.body;
    
    const expense = Expense({
        title, date, description, amount, type, category
    });

    try {
        await expense.save();
        console.log("expense added to mongo succesfully");
        return res.status(200).json({ "Expense": expense });
    } catch (error) {
        console.log("error while inserting expense : %s", error);
        return res.status(500).json({ "Error": error });
    }
};

exports.getExpenses = async (req, res) => {
    console.log(req.body);
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        return res.status(200).json(expenses);
    } catch (error) {
        console.log("Error while fetching the expenses form Mongo DB : ", error);
        return res.status(500).json({ "Error": error });
    }
}

exports.deleteExpense = async (req, res) => {
    console.log(req.params);
    const {id} = req.params;
    Expense.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ "message": "Deleted " + expense + " from Mongo DB" });
            console.log("Deleted expense with id : %s from Mongo DB", id);
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ "Error": error })
        });
}