const express = require('express')  
const app = express()  
app.get('/', function (req, res) {  
  res.send("Calculatorrr")  
})  
app.listen(3000)
function calculate(operation: string, num1: number, num2: number) {
    if(operation == 'dodawanie')
    {
        return (num1+'+'+num2+'='+(num1+num2))
    }
    else if(operation == 'odejmowanie')
    {
        return (num1+'-'+num2+'='+(num1-num2))
    }
    else if(operation == 'mnozenie')
    {
        return (num1+'*'+num2+'='+(num1*num2))
    }
    else if(operation == 'dzielenie')
    {
        return (num1+'/'+num2+'='+(num1/num2))
    }
    else
    {
        return ('Podałeś złą komendę! Dostępne komendy to: dodawanie, odejmowanie, mnozenie, dzielenie')
    }
}
app.get('/:operation/:num1/:num2', function(req, res) {
    let operation = req.params.operation
    let num1 = parseInt(req.params.num1)
    let num2 = parseInt(req.params.num2)

    res.send(calculate(operation, num1, num2))

}) 