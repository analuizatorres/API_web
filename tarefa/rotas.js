const express = require("express");
const  mongoose  = require("mongoose");
const app = express();
require('dotenv/config');
const alimentos = require('./Model/alimentos')

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get("/api/foods", async (req, res) => {
    const alimento = await alimentos.find();
    res.json(alimento);
  });

app.get("/api/foods/:id", async(req,res)=>{

    const alimento = await alimentos.findById(req.params.id);
    res.json(alimento);

});

mongoose.connect(process.ENV.DB_CONNECTION, ()=>{console.log('Connected to DataBase')})

app.post("/api/foods", async (req,res)=>{
    console.log(req.body) // Imprimir corpo da requisição

    const alimento = new alimentos({
        id: req.body.id,
            
        name: req.body.name,
            
        category: req.body.category,
            
        quantity: req.body.quantity,
            
        expirationDate: req.body.expirationDate,
            
        price: req.body.price,
            
    });

    await alimento.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message: err});
        console.log(err)
    });
});

app.put("/api/foods/:id"), async(req,res)=>{
    const updatedfood = await alimentos.updateOne(
        {_id: req.params.id}, 
        {$set: {name: req.body.name}});
    res.json(updatedfood);
}

app.delete("/api/foods/:id", async(req,res)=>{

    const removedfood = await alimentos.remove({_id: req.params.id});
    res.json(removedfood);
});


app.listen(3000, ()=>{console.log("Server is running")});