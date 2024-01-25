const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

MercadoPago.configure({
   sandBox: true, 
   access_token: "TEST-1510189163732585-012514-44aa0296a999ba77a4d0551f8a1a9719-1651419039"
});

app.get("/", (req, res)=>{
    res.send("OK");
});

app.get("/pagar",async (req, res)=>{

    var id = "" + Date.now();
    var emailDoPagador = "ale@gmail.com"; 


    var dados = {
        itens: [
            item ={
                id: id,
                title: "descrição qualquer",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            email: emailDoPagador
        },
        external_reference: id
    }
    try {
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        return res.redirect(pagamento.body.init-point);
    } catch (err) {
       return res.send(err.menssage); 
    }
    
});

app.listen(8080,(req, res) => {
    console.console.log(("Servidor rodando"));
})