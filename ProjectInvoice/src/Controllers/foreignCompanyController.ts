import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {ForeignCompanyService} from '../services/foreignCompanyService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
const auth = require("../Middleware/authentication")

const foreignCompanyService = new ForeignCompanyService()

router.post('/addForeignCompany', auth, async (req: Request, res: Response) => {

    const {Name, Address, Nip, PhoneNumber, BankName, BankAccountNumber} = req.body;
    try
    {
        const userId = req.headers.userId
        let invoiceId = await foreignCompanyService.AddForeignCompany(userId, Name, Address, Nip, PhoneNumber, BankName, BankAccountNumber);
        res.status(200).send(`Udało się dodać obcą firmę firmę o ID: ${invoiceId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało Ci się dodać nowej firmy");
    }
})


router.get('/getAll', async (req: Request, res: Response) =>
{
    let foreignCompanies = await foreignCompanyService.GetForeignCompanies()
    res.status(200).send(foreignCompanies)
})

router.get('/getById/:foreignCompanyId', async (req: Request, res: Response) =>
{
    let foreignCompany = await foreignCompanyService.GetForeignCompanyById(req.params.foreignCompanyId)
    res.status(200).send(foreignCompany)
})

router.get('/getByUserID/:userId', async (req: Request, res: Response) => {

    const userId:any = req.params.userId
    let foreignCompanies = await foreignCompanyService.GetByUserId(userId)
    res.status(200).send(foreignCompanies)
})

module.exports = router;