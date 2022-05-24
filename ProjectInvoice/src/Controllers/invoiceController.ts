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
        const userId = req.headers.userId
        const ourCompanyId:any = req.params.ourCompanyId
        const foreignCompanyId:any = req.params.foreignCompanyId
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

router.get('/getById/:invoiceId', async (req: Request, res: Response) =>
{
    let invoice = await invoiceService.GetInvoiceById(req.params.invoiceId)
    res.status(200).send(invoice)
})

router.get('/getByUserID/:userId', async (req: Request, res: Response) => {

    const userId:any = req.params.userId
    let invoices = await invoiceService.GetByUserId(userId)
    res.status(200).send(invoices)
})

router.delete('/deleteInvoice/:id', auth, async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let invoice = await invoiceService.GetInvoiceById(id)
        if(!invoice)
        {
            res.status(400).send("Faktura nie istenieje!");
        }
        const invoiceUserId = invoice.UserId
        const tokenUserId = req.headers.userId
        if(invoiceUserId == tokenUserId)
        {
            invoiceService.DeleteInvoice(id)
            res.status(200).send("Udało Ci się usunąć fakturę");
        }
        else
        {
            res.status(400).send("Nie jesteś właścicielem faktury");
        }
    }
    catch(error)
    {
        throw error
    }
})

module.exports = router;