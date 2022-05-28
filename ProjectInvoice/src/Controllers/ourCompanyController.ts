import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {OurCompanyService} from '../services/ourCompanyService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
const auth = require("../Middleware/authentication")

const ourCompanyService = new OurCompanyService()

router.post('/add', auth, async (req: Request, res: Response) => {

    const {CompanyName, Address, Nip, PhoneNumber, BankName, BankAccountNumber} = req.body;
    try
    {
        const userId = req.headers.userId
        let ourCompanyId = await ourCompanyService.AddOurCompany(userId, CompanyName, Address, Nip, PhoneNumber, BankName, BankAccountNumber);
        res.status(200).send(`Udało się dodać swoją firmę o ID: ${ourCompanyId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało Ci się dodać nowej firmy");
    }
})

router.get('/getAll', auth, async (req: Request, res: Response) =>
{
    const UserId = req.headers.userId
    let ourCompanies = await ourCompanyService.GetOurCompanies(UserId)
    res.status(200).send(ourCompanies)
})

router.get('/getById/:ourCompanyId', auth, async (req: Request, res: Response) =>
{
    let ourCompany = await ourCompanyService.GetOurCompanyById(req.params.ourCompanyId)
    if(!ourCompany)
    {
        res.status(400).send("Firma nie istenieje!");
    }
    else
    {
        const invoiceUserId = ourCompany.UserId
        const tokenUserId = req.headers.userId
        if(invoiceUserId == tokenUserId)
        {
            res.status(200).send(ourCompany)
        }
        else
        {
            res.status(400).send("Nie jesteś właścicielem faktury");
        }
    }
    
})

router.get('/getByUserID', auth, async (req: Request, res: Response) => {

    const userId:any = req.headers.userId
    let ourCompanies = await ourCompanyService.GetByUserId(userId)
    res.status(200).send(ourCompanies)
})

router.delete('/delete/:id', auth, async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let ourCompany = await ourCompanyService.GetOurCompanyById(id)
        if(!ourCompany)
        {
            res.status(400).send("Firma nie istenieje!");
        }
        else
        {
            const ourCompanyUserId = ourCompany.OurCompanyUserId
            const tokenUserId = req.headers.userId
            if(ourCompanyUserId == tokenUserId)
            {
                ourCompanyService.DeleteOurCompany(id)
                res.status(200).send("Udało Ci się usunąć firmę");
            }
            else
            {
                res.status(400).send("Nie jesteś właścicielem firmy");
            }
        }
        
    }
    catch(error)
    {
        throw error
    }
})

router.put('/edit/:id', async (req: Request, res: Response) => {

    const id:any = req.params.id
    const {CompanyName, Address, Nip, PhoneNumber, BankName, BankAccountNumber} = req.body;
    
    await ourCompanyService.EditOurCompany(id, CompanyName, Address, Nip, PhoneNumber, BankName, BankAccountNumber)
    res.status(200).send("Udało Ci się edytować firmę!");
})


module.exports = router;