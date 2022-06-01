import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {CommodityService} from '../services/commodityService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
const auth = require("../Middleware/authentication")

const commodityService = new CommodityService()

router.post('/add/:invoiceId', auth, async (req: Request, res: Response) => 
{

    const {Name, Amount, Unit, PriceNetto, ValueNetto, VAT, AmountVat, AmountBrutto} = req.body;
    try
    {
        const userId = req.headers.userId
        const invoiceId = req.params.invoiceId
        let commodityId = await commodityService.AddCommodity(invoiceId, userId, Name, Amount, Unit, PriceNetto, ValueNetto, VAT, AmountVat, AmountBrutto);
        res.status(200).send(`Udało się dodać i przypisać przedmiot o ID: ${commodityId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało Ci się dodać nowego przedmiotu do faktury!");
    }
})

router.get('/getAll/:invoiceId', auth, async (req: Request, res: Response) =>
{
    const invoiceId = req.params.invoiceId
    let commodities = await commodityService.GetCommodities(invoiceId)
    res.status(200).send(commodities)
})

router.delete('/delete/:commodityId', auth, async (req: Request, res: Response) =>
{
    try 
    {
        const commodityId:any = req.params.commodityId
        const userId:any = req.headers.userId
        
        await commodityService.DeleteCommodity(commodityId, userId)
        res.status(200).send("Udało Ci się usunąć towar :D")
    } 
    catch (error) 
    {
        res.status(400).send(error)
    }
})

module.exports = router