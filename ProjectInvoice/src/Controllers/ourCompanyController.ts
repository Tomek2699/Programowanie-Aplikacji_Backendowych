import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {OurCompanyService} from '../services/ourCompanyService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
const auth = require("../Middleware/authentication")

const ourCompanyService = new OurCompanyService()

router.post('/addOurCompany', auth, async (req: Request, res: Response) => {

    const {Name, Address, Nip, PhoneNumber, BankName, BankAccountNumber} = req.body;
    try
    {
        const userId = req.headers.userId
        let invoiceId = await ourCompanyService.AddOurCompany(userId, Name, Address, Nip, PhoneNumber, BankName, BankAccountNumber);
        res.status(200).send(`Udało się dodać swoją firmę o ID: ${invoiceId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało Ci się dodać nowej firmy");
    }
})

router.get('/getAll', async (req: Request, res: Response) =>
{
    let ourCompanies = await ourCompanyService.GetOurCompanies()
    res.status(200).send(ourCompanies)
})

router.get('/getById/:ourCompanyId', async (req: Request, res: Response) =>
{
    let ourCompany = await ourCompanyService.GetOurCompanyById(req.params.ourCompanyId)
    res.status(200).send(ourCompany)
})

router.get('/getByUserID/:userId', async (req: Request, res: Response) => {

    const userId:any = req.params.userId
    let ourCompanies = await ourCompanyService.GetByUserId(userId)
    res.status(200).send(ourCompanies)
})


module.exports = router;