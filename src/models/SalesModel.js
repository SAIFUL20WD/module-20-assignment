const {Schema, model} = require("mongoose");

const SalesSchema = new Schema({
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    },
    {versionKey: false}
);
  
const SalesModel = model('sales', SalesSchema);

module.exports = SalesModel;