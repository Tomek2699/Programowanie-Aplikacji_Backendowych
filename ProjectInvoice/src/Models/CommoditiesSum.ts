export class CommoditiesSum
{
    SumPriceNetto: Number
    SumValueNetto: Number
    SumAmountBrutto: Number

    constructor(SumPriceNetto: Number,
                SumValueNetto: Number,
                SumAmountBrutto: Number)
    {
        this.SumPriceNetto = SumPriceNetto,
        this.SumValueNetto = SumValueNetto,
        this.SumAmountBrutto = SumAmountBrutto
    }
}