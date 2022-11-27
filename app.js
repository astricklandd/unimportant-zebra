require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const app = express()
const { MongoClient, ServerApiVersion, ListIndexesCursor } = require('mongodb');
const { resourceLimits } = require('node:worker_threads');
const uri = "mongodb+srv://dev-papa:yes123@dev-lab-papa.6opbmby.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

kayaksAvailbale = ""; 
collection2 = "";
renters = "";

async function main(){
  try {
      // Connect to the MongoDB cluster
        client.connect();
        const collection = client.db("OAC").collection("Kayaks");
        const collection2 = client.db("OAC").collection("renters");
        // count for inventory ibfi
        const kayaksInventory= await collection.countDocuments();
        const renterNum = await collection2.countDocuments();
        //Print this(below) on both pages(admin.ejs and index.ejs)
        kayaksAvailable = (kayaksInventory-renterNum);
        console.log('connected');
          // console.log('console log closed');
      
      let posts = await collection.find().toArray();
      let renterInfo = await collection2.find().toArray();

   
      return posts; 
    
  } catch (e) {
      console.error(e);
  } finally {

  }
}

async function goodName(){
  try {
      // Connect to the MongoDB cluster
        client.connect();
        const collection2 = client.db("OAC").collection("renters");
        // count for inventory ibfi
        const renterNum = await collection2.countDocuments();
        console.log('connected in renters');
          // console.log('console log closed');
        let renterInfo = await collection2.find().toArray();

      return renterInfo; 
    
  } catch (e) {
      console.error(e);
  } finally {

  }
}


app.get('/', async (req, res) => {
try{

  const result = await main().catch(console.error);
  // console.log("results: ", result); 
  // console.log("get / result name: ", result.name); 

  if(!result) return false; 

  res.render('index', { 
    kayaks: result,
    // renters: result
  })
 

} catch (e) {
  console.error(e);
} finally {
  //  client.close();
}
});

app.get('/admin', async (req, res) => {
  try{
  
    const result = await main().catch(console.error);
    // console.log("results: ", result); 
    // console.log("get / result name: ", result.name); 
  
    if(!result) return false; 
  
    res.render('admin', { 
      kayaks: result,
      // renters: result
    })
   
  
  } catch (e) {
    console.error(e);
  } finally {
    //  client.close();
  }
  });


app.post('/result', async (req, res) => {

  try {
    console.log("req.body: ", req.body.name) 
    client.connect; 
    const collection = client.db("OAC").collection("Kayaks");
    await collection.insertOne( { name : req.body.name } );
      
    res.redirect('/admin');
  }
  catch(e){
    console.log(e)
  }
  finally{
    // client.close
  
  }
}),

app.post('/deleteKayaks/:id', async (req, res) => 
// returns to the index page when adding or deleting from admin
// can't delete kayak if it's blank (maybe because it's looking for a name that is not there?)
{

  console.log('req.params.name', req.params.id);
  try {
    client.connect; 
    const collection = client.db("OAC").collection("Kayaks");
    await collection.findOneAndDelete( 
        {
          "_id": ObjectId(req.params.id)
       } )
      
        //that extra ObjectId(req.params.id)


        //res.redirect('/');
    
      } catch(e){
        console.log(e)
      }
      finally{
        // client.close
      
        res.redirect('/admin');
      }
    })

app.post('/updateKayaks/:name', async (req, res) => 
{

  console.log('req.params.name', req.params.name);
  try {
    client.connect; 
    const collection = client.db("OAC").collection("Kayaks");
    await collection.findOneAndUpdate( 
        { name : req.params.name },
        {
          $set: {
            name: 'Kayak rented',
            }
        } 
        
        )
      
        res.redirect('/');
    
      } catch(e){
        console.log(e)
      }
      finally{
        // client.close
      
      }
    }),


app.get('/renters', async (req, res) => {
    try{
      const result = await goodName().catch(console.error);
      // console.log("results: ", result); 
      // console.log("get / result name: ", result.name); 
    
      if(!result) return false; 
    
      res.render('index', { 
        renters: result,      
      })
    
    } catch (e) {
      console.error(e);
    } finally {
      //  client.close();
    }
    });

app.post('/result2', async (req, res) => {

      try {
        console.log("req.body: ", req.body.name) 
        client.connect; 
        const collection = client.db("OAC").collection("renters");
        await collection.insertOne( { name : req.body.name2  , lNum : req.body.num2, phoneNum : req.body.phoneNum  , dateRent : req.body.date } );
          
        res.redirect('/');
      }
      catch(e){
        console.log(e)
      }
      finally{
        // client.close
      
      }
    }), //this adds a renter 
    

app.post('/deleteRenters/:name', async (req, res) => 
    {
    
      console.log('req.params.name', req.params.id);
      try {
        client.connect; 
        const collection2 = client.db("OAC").collection("renters");
        await collection2.findOneAndDelete( 
            { name : req.params.name } )
          
            // res.redirect('/');
        
          } catch(e){
            console.log(e)
          }
          finally{
            // client.close
          
          }
        })

    

app.listen(PORT, console.log(`server is running on port: ${PORT}` ));

