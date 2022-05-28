import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {ForeignCompanyService} from '../services/foreignCompanyService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
const auth = require("../Middleware/authentication")

const foreignCompanyService = new ForeignCompanyService()

router.post('/add', auth, async (req: Request, res: Response) => {

    const {CompanyName, Address, Nip, PhoneNumber, BankName, BankAccountNumber} = req.body;
    try
    {
        const userId = req.headers.userId
        let invoiceId = await foreignCompanyService.AddForeignCompany(userId, CompanyName, Address, Nip, PhoneNumber, BankName, BankAccountNumber);
        res.status(200).send(`Udało się dodać obcą firmę firmę o ID: ${invoiceId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało Ci się dodać nowej firmy");
    }
})


router.get('/getAll', auth, async (req: Request, res: Response) =>
{
    const UserId = req.headers.userId
    let foreignCompanies = await foreignCompanyService.GetForeignCompanies(UserId)
    res.status(200).send(foreignCompanies)
})

router.get('/getById/:foreignCompanyId', auth, async (req: Request, res: Response) =>
{
    let foreignCompany = await foreignCompanyService.GetForeignCompanyById(req.params.foreignCompanyId)
    if(!foreignCompany)
    {
        res.status(400).send("Firma nie istenieje!");
    }
    else
    {
        const invoiceUserId = foreignCompany.UserId
        const tokenUserId = req.headers.userId
        if(invoiceUserId == tokenUserId)
        {
            res.status(200).send(foreignCompany)
        }
        else
        {
            res.status(400).send("Nie jesteś właścicielem faktury");
        }
    }  
})

router.get('/getByUserID', auth, async (req: Request, res: Response) => {

    const userId:any = req.headers.userId
    let foreignCompanies = await foreignCompanyService.GetByUserId(userId)
    res.status(200).send(foreignCompanies)
})

router.delete('/delete/:id', auth, async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let foreignCompany = await foreignCompanyService.GetForeignCompanyById(id)
        if(!foreignCompany)
        {
            res.status(400).send("Firma nie istenieje!");
        }
        else
        {
            const foreignCompanyUserId = foreignCompany.ForeignCompanyUserId
            const tokenUserId = req.headers.userId
            if(foreignCompanyUserId == tokenUserId)
            {
                foreignCompanyService.DeleteForeignCompany(id)
                res.status(200).send("Udało Ci się usunąć obcą firmę");
            }
            else
            {
                res.status(400).send("Nie jesteś właścicielem obcej firmy");
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
    
    await foreignCompanyService.EditForeignCompany(id, CompanyName, Address, Nip, PhoneNumber, BankName, BankAccountNumber)
    res.status(200).send("Udało Ci się edytować obcą firmę!");
})

module.exports = router;