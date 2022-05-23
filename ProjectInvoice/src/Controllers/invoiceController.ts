import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {InvoiceService} from '../services/invoiceService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
const auth = require("../Middleware/authentication")

const invoiceService = new InvoiceService()

router.post('/addInvoice/:ourCompanyId/:foreignCompanyId', auth, async (req: Request, res: Response) => 
{

    const {NoInvoice, StartDate, FinishDateDelivery, PaymentDate, PaymentWay} = req.body;
    try
    {
        const ourCompanyId:any = req.params.ourCompanyId
        const foreignCompanyId:any = req.params.foreignCompanyId
        const userId = req.headers.userId
        let invoiceId = await invoiceService.AddInvoice(userId, ourCompanyId, foreignCompanyId, NoInvoice, StartDate, FinishDateDelivery, PaymentDate, PaymentWay);
        res.status(200).send(`Udało się dodać fakturę o ID: ${invoiceId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało Ci się dodać nowej faktury");
    }
})

router.get('/getAll', async (req: Request, res: Response) =>
{
    let invoices = await invoiceService.GetInvoices()
    res.status(200).send(invoices)
})

module.exports = router;