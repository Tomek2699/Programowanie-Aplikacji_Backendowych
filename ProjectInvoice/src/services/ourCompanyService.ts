import mongoose from "mongoose";
import { dbmain } from "../DataBase/DataBaseContext";
const {OurCompany, ForeignCompany, Commodity, Invoice} = require('../DataBase/schemas')

export class OurCompanyService
{
    async AddOurCompany(_userId:any, _name:string, _address:string, _nip:number, _phoneNumber:Number, _bankName:string, _bankAccountNumber:Number)
    {
        try
        {
            const newOurCompany = new OurCompany({
                UserID:_userId,
                CompanyName: _name,
                Address: _address,
                NIP: _nip,
                PhoneNumber: _phoneNumber,
                BankName: _bankName,
                BankAccountNumber: _bankAccountNumber
            })

            await newOurCompany.save()            
            return newOurCompany.id
        }
        catch(error)
        {
            throw error
        }
    }

    async GetOurCompanies()
    {
        try
        {
            let ourCompanies = await OurCompany.find()
            return ourCompanies
        }
        catch(error)
        {
            throw error
        }
    }

    async GetOurCompanyById(ourCompanyId:any)
    {
        try
        {
            let ourCompany = await OurCompany.findById(ourCompanyId)
            return ourCompany
        }
        catch(error)
        {
            throw error
        }
    }

    async GetByUserId(userId:any)
    {
        let ourCompanies = await OurCompany.find({ UserId:userId })
        return ourCompanies
    }
}