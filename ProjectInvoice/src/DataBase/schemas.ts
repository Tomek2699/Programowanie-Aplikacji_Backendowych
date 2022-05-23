import mongoose from "mongoose";

const ourCompanySchema = new mongoose.Schema({
    OurCompanyUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    CompanyName: {type: String},
    Address: {type: String},
    NIP: {type: Number},
    PhoneNumber: {type: Number},
    BankName: {type: String},
    BankAccountNumber: {type: Number},
})


const foreignCompanySchema = new mongoose.Schema({
    ForeignCompanyUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    CompanyName: {type: String},
    Address: {type: String},
    NIP: {type: Number},
    PhoneNumber: {type: Number},
    BankName: {type: String},
    BankAccountNumber: {type: Number},
})

const commoditySchema = new mongoose.Schema({
    CommodityUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    Name: {type: String},
    Amount: {type: Number},
    Unit: {type: String},
    PriceNetto: {type: Number},
    ValueNetto: {type: Number},
    VAT: {type: Number},
    AmountVat: {type: Number},
    AmountBrutto: {type: Number},
})

const invoiceSchema = new mongoose.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    NoInvoice: {type: String},
    StartDate: {type: Date, default: Date.now()},
    FinishDateDelivery: {type: Date, default: Date.now()},
    PaymentDate: {type: Date, default: Date.now()},
    PaymentWay: {type: String},
    OurCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'OurCompany'},
    ForeignCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'ForeignCompany'},
    Commodities: [commoditySchema],
},
{
    timestamps: true
})

const OurCompany = mongoose.model('OurCompany', ourCompanySchema)
const ForeignCompany = mongoose.model('ForeignCompany', foreignCompanySchema)
const Commodity = mongoose.model('Commodity', commoditySchema)
const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = {OurCompany, ForeignCompany, Commodity, Invoice}