import mongoose from "mongoose";
import { dbmain } from "../DataBase/DataBaseContext";
import { CommoditiesSum } from "../Models/CommoditiesSum"
import { InvoiceAndCompanies } from "../Models/InvoiceAndCompanies"
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

    async GetInvoices(UserId:any)
    {
        try
        {
            let invoices = await Invoice.find({UserId: UserId})
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

    async GetInvoicesByOurCompanyId(ourCompanyId:any)
    {
        try
        {
            let invoice = await Invoice.find({OurCompany: ourCompanyId})
            return invoice
        }
        catch(error)
        {
            throw error
        }
    }

    async GetInvoicesByForeignCompanyId(foreignCompanyId:any)
    {
        try
        {
            let invoice = await Invoice.find({ForeignCompany: foreignCompanyId})
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
        } 
        catch (error) {
            throw error
        }
          
    }

    async GetInvoiceDescription(invoiceId:any)
    {
        let invoice = await Invoice.findById(invoiceId)
        let ourCompany = await OurCompany.findById(invoice.OurCompany)
        let foreignCompany = await ForeignCompany.findById(invoice.ForeignCompany)

        const model = new InvoiceAndCompanies(
            invoice.NoInvoice,
            invoice.StartDate,
            invoice.FinishDateDelivery,
            invoice.PaymentDate,
            invoice.PaymentWay,
            "Własna firma",
            ourCompany.CompanyName,
            ourCompany.Address,
            ourCompany.NIP,
            ourCompany.PhoneNumber,
            ourCompany.BankName,
            ourCompany.BankAccountNumber,
            "Obca firma",
            foreignCompany.CompanyName,
            foreignCompany.Address,
            foreignCompany.NIP,
            foreignCompany.PhoneNumber,
            foreignCompany.BankName,
            foreignCompany.BankAccountNumbeturn
        )

        return model
    }

    async GetSumOfCommodities(invoiceId:any)
    {
        let PriceNetto: Array<Number> = new Array<Number>()
        let ValueNetto: Array<Number> = new Array<Number>()
        let AmountBrutto: Array<Number> = new Array<Number>()
        let sumPriceNetto: Number = 0
        let sumValueNetto: Number = 0
        let sumAmountBrutto: Number = 0
        let invoice = await Invoice.findById(invoiceId)

        invoice.Commodities.forEach((element: any) => {
            PriceNetto.push(element.PriceNetto)
        });

        invoice.Commodities.forEach((element: any) => {
            ValueNetto.push(element.ValueNetto)
        });

        invoice.Commodities.forEach((element: any) => {
            AmountBrutto.push(element.AmountBrutto)
        });

        PriceNetto.forEach(x => {
            sumPriceNetto = +sumPriceNetto + +x
        })

        ValueNetto.forEach(x => {
            sumValueNetto = +sumValueNetto + +x
        })

        AmountBrutto.forEach(x => {
            sumAmountBrutto = +sumAmountBrutto + +x
        })

        const model = new CommoditiesSum(
            sumPriceNetto,
            sumValueNetto,
            sumAmountBrutto
        )

        return model

    }

}