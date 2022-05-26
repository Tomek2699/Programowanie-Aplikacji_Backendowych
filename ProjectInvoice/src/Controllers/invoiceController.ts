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

router.get('/getAll', auth, async (req: Request, res: Response) =>
{
    let invoices = await invoiceService.GetInvoices()
    res.status(200).send(invoices)
})

router.get('/getById/:invoiceId', auth, async (req: Request, res: Response) =>
{
    try
    {
        let invoice = await invoiceService.GetInvoiceById(req.params.invoiceId)
        if(!invoice)
        {
            res.status(400).send("Faktura nie istenieje!");
        }
        else
        {
            res.status(200).send(invoice)
        }   
    }
    catch(error)
    {
        throw error
    }

})

router.get('/getByUserID', auth, async (req: Request, res: Response) => {

    const userId:any = req.headers.userId
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
        else
        {
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
        
    }
    catch(error)
    {
        throw error
    }
})

router.put('/editInvoice/:id', async (req: Request, res: Response) => {

    const id:any = req.params.id
    const {NoInvoice, StartDate, FinishDateDelivery, PaymentDate, PaymentWay, OurCompanyId, ForeignCompanyId} = req.body;
    
    await invoiceService.EditInvoice(id, OurCompanyId, ForeignCompanyId, NoInvoice, StartDate, FinishDateDelivery, PaymentDate, PaymentWay)
    res.status(200).send("Udało Ci się edytować fakturę!");
})

module.exports = router;