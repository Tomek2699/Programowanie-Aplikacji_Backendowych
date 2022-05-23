import mongoose from "mongoose";
import { dbmain } from "../DataBase/DataBaseContext";
const {OurCompany, ForeignCompany, Commodity, Invoice} = require('../DataBase/schemas')

export class ForeignCompanyService
{
    async AddForeignCompany(_userId:any, _name:string, _address:string, _nip:number, _phoneNumber:Number, _bankName:string, _bankAccountNumber:Number)
    {
        try
        {
            const newForeignCompany = new ForeignCompany({
                UserID:_userId,
                CompanyName: _name,
                Address: _address,
                NIP: _nip,
                PhoneNumber: _phoneNumber,
                BankName: _bankName,
                BankAccountNumber: _bankAccountNumber
            })

            await newForeignCompany.save()
            return newForeignCompany.id
        }
        catch(error)
        {
            throw error
        }
    }

    async GetForeignCompanies()
    {
        try
        {
            let foreignCompanies = await ForeignCompany.find()
            return foreignCompanies
        }
        catch(error)
        {
            throw error
        }
    }
}