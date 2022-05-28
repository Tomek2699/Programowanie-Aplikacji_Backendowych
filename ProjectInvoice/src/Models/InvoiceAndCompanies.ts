export class InvoiceAndCompanies{
    NoInvoice: String
    StartDate: Date
    FinishDateDelivery: Date
    PaymentDate: Date
    PaymentWay: String
    OurCompany: String
    OurCompanyCompanyName: String
    OurCompanyAddress: String
    OurCompanyNIP: Number
    OurCompanyPhoneNumber: Number
    OurCompanyBankName: String
    OurCompanyBankAccountNumber: Number
    ForeignCompany: String
    ForeignCompanyCompanyName: String
    ForeignCompanyAddress: String
    ForeignCompanyNIP: Number
    ForeignCompanyPhoneNumber: Number
    ForeignCompanyBankName: String
    ForeignCompanyBankAccountNumber: Number

    constructor(NoInvoice: String,
                StartDate: Date,
                FinishDateDelivery: Date,
                PaymentDate: Date,
                PaymentWay: String,
                OurCompany: String,
                OurCompanyCompanyName: String,
                OurCompanyAddress: String,
                OurCompanyNIP: Number,
                OurCompanyPhoneNumber: Number,
                OurCompanyBankName: String,
                OurCompanyBankAccountNumber: Number,
                ForeignCompany: String,
                ForeignCompanyCompanyName: String,
                ForeignCompanyAddress: String,
                ForeignCompanyNIP: Number,
                ForeignCompanyPhoneNumber: Number,
                ForeignCompanyBankName: String,
                ForeignCompanyBankAccountNumber: Number)
        {
            this.NoInvoice = NoInvoice
            this.StartDate = StartDate
            this.FinishDateDelivery = FinishDateDelivery
            this.PaymentDate = PaymentDate
            this.PaymentWay = PaymentWay
            this.OurCompany = OurCompany
            this.OurCompanyCompanyName = OurCompanyCompanyName
            this.OurCompanyAddress = OurCompanyAddress
            this.OurCompanyNIP = OurCompanyNIP
            this.OurCompanyPhoneNumber = OurCompanyPhoneNumber
            this.OurCompanyBankName = OurCompanyBankName
            this.OurCompanyBankAccountNumber = OurCompanyBankAccountNumber
            this.ForeignCompany = ForeignCompany
            this.ForeignCompanyBankName = OurCompanyBankName
            this.ForeignCompanyCompanyName = ForeignCompanyCompanyName
            this.ForeignCompanyAddress = ForeignCompanyAddress
            this.ForeignCompanyNIP = ForeignCompanyNIP
            this.ForeignCompanyPhoneNumber = ForeignCompanyPhoneNumber
            this.ForeignCompanyBankName = ForeignCompanyBankName
            this.ForeignCompanyBankAccountNumber = ForeignCompanyBankAccountNumber
        }
}