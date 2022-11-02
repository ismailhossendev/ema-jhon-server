const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD

const uri = `mongodb+srv://${user}:${password}@cluster0.odx3u2z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async() =>{
    const collection = client.db("emajohn").collection("products");

    try{
        app.get('/products',async(req,res)=>{
            const size = parseInt(req.query.size);
            const page = parseInt(req.query.page);
            const query = {}
            const cursor = collection.find(query);
            const count = await cursor.count();
            const products = await cursor.skip(page * size).limit(size).toArray();

            res.send({products,count})
        })
    }
    finally{

    }
}
run().catch(e =>{
    console.log(e);
})


app.listen(port,()=>{
    console.log('server is running ');
})