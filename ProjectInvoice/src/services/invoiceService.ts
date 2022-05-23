import mongoose from "mongoose";
import { dbmain } from "../DataBase/DataBaseContext";
const {OurCompany, ForeignCompany, Commodity, Invoice} = require('../DataBase/schemas')

export class InvoiceService 
{
    async AddInvoice(_userId:any, _ourCompanyId:any, _foreignCompanyId:any, _noInvoice:string, _startDate:Date, _finishDateDelivery:Date, _paymentDate:Date, _paymentWay:string)
    {
        try
        {
            const newInvoice = new Invoice({
                UserID:_userId,
                NoInvoice: _noInvoice,
                StartDate: _startDate,
                FinishDateDelivery: _finishDateDelivery,
                PaymentDate: _paymentDate,
                PaymentWay: _paymentWay,
                OurCompany: _ourCompanyId,
                ForeignCompany: _foreignCompanyId
            })

            await newInvoice.save();       
            return newInvoice.id;
        }
        catch(error)
        {
            throw error
        }
    }

    async GetInvoices()
    {
        try
        {
            let invoices = await Invoice.find()
            return invoices
        }
        catch(error)
        {
            throw error
        }
    }
}