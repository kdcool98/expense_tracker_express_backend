const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    console.log(req.body);
    const { title, description, date, type, category, amount } = req.body;
    
    const income = Income({
      title,
      description,
      amount,
      date,
      category,
      type,
    });

        
    try {
        await income.save()
        res.status(200).json({ "message": income })
        console.log("Income inserted successfully")
    } catch (error) {
        console.log("Error while inserting document : %s", error)
        var errMsg = error.errors[Object.keys(error.errors)[0]].message;
        res.status(400).json({"message": errMsg})
    }
        
}

exports.getIncomes = async (req, res) => { 
    try {
        const incomes = await Income.find().sort({ createdAt: -1 })
        res.status(200).json(incomes)   	
        console.log("Incomes fetched successfully from Mongo DB")
    } catch (error) {
        console.log(error)
        res.status(500).json({"message": "Something went wrong"})
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    Income.findByIdAndDelete(id)
        .then((income) => { 
            res.status(200).json({ "message": income + " Deleted from DB" });
            console.log("Income with ID : %s, successfully deleted from the DB", id);
        })
        .catch((error) => { 
            console.log(error);
            res.status(500).json({ "message": "Something went wrong" });
        })
};