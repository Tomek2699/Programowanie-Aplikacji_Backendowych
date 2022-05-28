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
                UserId: _userId,
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

    async GetOurCompanies(UserId:any)
    {
        try
        {
            let ourCompanies = await OurCompany.find({UserId: UserId})
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

    async DeleteOurCompany(id:any)
    {
        try
        {
            await OurCompany.findByIdAndRemove(id)
        }
        catch(error)
        {
            throw error
        }
    }

    async EditOurCompany(_idOurCompany:any,  _name:string, _address:string, _nip:number, _phoneNumber:Number, _bankName:string, _bankAccountNumber:Number) 
    {
        try 
        {
            let ourCompany = await OurCompany.findById(_idOurCompany)
            if(_name != null)
            {
                ourCompany.CompanyName = _name
            }
            if(_address != null)
            {
                ourCompany.Address = _address
            }
            if(_nip != null)
            {
                ourCompany.NIP = _nip
            }
            if(_phoneNumber != null)
            {
                ourCompany.PhoneNumber = _phoneNumber
            }
            if(_bankName != null)
            {
                ourCompany.BankName = _bankName
            }
            if(_bankAccountNumber != null)
            {
                ourCompany.BankAccountNumber = _bankAccountNumber
            }

            await OurCompany.findByIdAndUpdate(_idOurCompany, ourCompany)
        } 
        catch (error) {
            throw error
        }
          
    }
}