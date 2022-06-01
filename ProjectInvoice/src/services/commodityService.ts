import mongoose from "mongoose";
import { dbmain } from "../DataBase/DataBaseContext";
const {OurCompany, ForeignCompany, Commodity, Invoice} = require('../DataBase/schemas')

export class CommodityService
{
    async AddCommodity(_invoiceId:any, _userId:any, _name:string, _amount:number, _unit:string, _priceNetto:number, _valueNetto:number, _vat:number, _amountVat:number, _amountBrutto:number)
    {
        try
        {
            let invoice = await Invoice.findById(_invoiceId)
            const newCommodity = new Commodity({
                UserId: _userId,
                Name: _name,
                Amount: _amount,
                Unit: _unit,
                PriceNetto: _priceNetto,
                ValueNetto: _valueNetto,
                VAT: _vat,
                AmountVAT: _amountVat,
                AmountBrutto: _amountBrutto
            })

            invoice.Commodities.push(newCommodity)
            await invoice.save()
            return newCommodity.id
        }
        catch(error)
        {
            throw error
        }
    }

    async GetCommodities(_invoiceId:any)
    {
        try
        {
            let invoice = await Invoice.findById(_invoiceId)
            return invoice.Commodities
        }
        catch(error)
        {
            throw error
        }
    }

    async DeleteCommodity(commodityId:any, userId:string)
    {
        try {
            await Invoice.collection.updateMany({}, {
                $pull: {
                    Commodity: {
                        '_id': commodityId,
                        'UserId': userId
                    }
                }
            })
            console.log(commodityId, userId)
        } 
        catch (error) 
        {
            throw error
        }
    }
}