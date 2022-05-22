import mongoose from "mongoose";

var ourCompanySchema = new mongoose.Schema({
    OurCompanyUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    CompanyName: {type: String, required: true },
    Address: {type: String, required: true},
    NIP: {type: Number, required: true},
    PhoneNumber: {type: Number, min:[9, 'min length is 9'], max:[9, 'max length is 9']},
    BankName: {type: Number, required: true},
    BankAccountNumber: {type: Number, required: true},
})

var foreignCompanySchema = new mongoose.Schema({
    ForeignCompanyUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    CompanyName: {type: String, required: true },
    Address: {type: String, required: true},
    NIP: {type: Number, required: true},
    PhoneNumber: {type: Number, min:[9, 'min length is 9'], max:[9, 'max length is 9']},
    BankName: {type: Number, required: true},
    BankAccountNumber: {type: Number, required: true},
})

var commoditySchema = new mongoose.Schema({
    CommodityUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    Name: {type: String, required: true },
    Amount: {type: Number, required: true },
    Unit: {type: String, required: true },
    PriceNetto: {type: Number, required: true },
    ValueNetto: {type: Number, required: true },
    VAT: {type: Number, required: true },
    AmountVat: {type: Number, required: true },
    AmountBrutto: {type: Number, required: true },
})

const invoiceSchema = new mongoose.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    NoInvoice: {type: String, required: true},
    StartDate: {type: Date, required: true},
    FinishDateDelivery: {type: Date, required: true},
    PaymentDate: {type: Date, required: true},
    PaymentWay: {type: String, required: true},
    OurCompany: ourCompanySchema,
    ForeignCompany: foreignCompanySchema,
    Commodities: [commoditySchema],
})

const Invoice = mongoose.model('invoice', invoiceSchema)

module.exports = Invoice