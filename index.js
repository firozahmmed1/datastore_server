const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<battery>:<rqWf7l5guuB7wNPG>@cluster0.uucv7dt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const bdata = client.db('batteryDB').collection('data')

     app.post('/newdata', async(req,res)=>{
        const body = req.body
        const result = await bdata.insertOne(body)
        res.send(result)
     })
          
     app.get('/alldata', async(req,res)=>{
           const result =await bdata.find({}).sort({_id:-1}).limit(1).toArray()
           res.send(result)
          })  
     app.get('/abz', async(req,res)=>{
      const newd=await bdata.find({}).toArray()
      res.send(newd)
     })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req,res)=>{
    res.send('Hello')
})

app.listen(port, ()=>{
    console.log(`Running app on port ${port}`)
})