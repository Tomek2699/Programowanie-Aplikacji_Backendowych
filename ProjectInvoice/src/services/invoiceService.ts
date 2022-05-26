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
                UserId:_userId,
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

    async GetInvoiceById(invoiceId:any)
    {
        try
        {
            let invoice = await Invoice.findById(invoiceId)
            return invoice
        }
        catch(error)
        {
            throw error
        }
    }

    async GetByUserId(userId:any)
    {
        let invoices = await Invoice.find({ UserId:userId })
        return invoices
    }

    async DeleteInvoice(id:any)
    {
        try
        {
            await Invoice.findByIdAndRemove(id)
        }
        catch(error)
        {
            throw error
        }
    }

    async EditInvoice(_idInvoice:any, _ourCompanyId:any, _foreignCompanyId:any, _noInvoice:string, _startDate:Date, _finishDateDelivery:Date, _paymentDate:Date, _paymentWay:string) 
    {
        try 
        {
            let invoice = await Invoice.findById(_idInvoice)
            if(_noInvoice != null)
            {
                invoice.NoInvoice = _noInvoice
            }
            if(_startDate != null)
            {
                invoice.StartDate = _startDate
            }
            if(_finishDateDelivery != null)
            {
                invoice.FinishDateDelivery = _finishDateDelivery
            }
            if(_paymentDate != null)
            {
                invoice.PaymentDate = _paymentDate
            }
            if(_paymentWay != null)
            {
                invoice.PaymentWay = _paymentWay
            }
            if(_ourCompanyId != null)
            {
                invoice.OurCompany = _ourCompanyId
            }
            if(_foreignCompanyId != null)
            {
                invoice.ForeignCompany = _foreignCompanyId
            }

            await Invoice.findByIdAndUpdate(_idInvoice, invoice)
            console.log(invoice)
        } 
        catch (error) {
            throw error
        }
          
    }

}