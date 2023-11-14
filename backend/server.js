const express = require("express")
const { open } = require("sqlite")
const sqlite3 = require("sqlite3")
const cors = require("cors")
const path = require("path")

const dbPath = path.join(__dirname, "productData.db")

const app = express()

app.use(cors())
app.use(express.json())

let db = null

const InitializeDbAndServer = async () => {
    try{
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database,
        });

        app.listen(3001, () => 
            console.log("server running at http://localhost:3001/")
        )
    }catch(error){
        console.log(`DB error : ${error.message}`);
        process.exit(1);
    }
};

InitializeDbAndServer()

app.post("/postNew", async (request,response) => {
   const {id,title,price,description,category,image,sold,dateOfSale} = request.body
   const Query = `INSERT INTO products(id, title, price, description, category, image, sold, date_of_sale)
   VALUES(
    '${id}',
    '${title}',
    '${price}',
    '${description}',
    '${category}',
    '${image}',
    '${sold}',
    '${dateOfSale}'
   )`
   console.log(id,title,price,description,category,image,sold,dateOfSale)
   try{
        await db.run(Query)
        response.status(200).send({message:"Product added successfully"})
   }catch(e){
        response.status(400).send({message:`DB error at ${e.message}`})
   }
   
})

app.get("/get", async (request,response) => {
    const sqlQuery = `SELECT * FROM product;`;
    try{
        const data = await db.all(sqlQuery)
        response.status(200).send(data)
    }catch(error){
        response.status(400).send({message: "Response not fetxh"})
    }
    
})

app.get("/getdata", async (request,response) => {
    const {search,month,limit,offset} = request.query
    const GetQuery = `
            SELECT * FROM products
            WHERE 
                title LIKE '%${search}%' OR
                price LIKE '%${search}%' OR
                description LIKE '%${search}%' AND
                strftime('%m',date_of_sale) = '${month}'
            ORDER BY id ASC
            LIMIT '${limit}'
            OFFSET '${offset}'
            ;`;
    try{        
        const result = await db.all(GetQuery)
        response.status(200).send(result)
    }catch(e){
        response.status(400).send({message:`DB Error at ${e.message}`})
        
    }
    

})

app.get("/getStatic", async (request,response) => {
    const {month} = request.query
    const SqlQuery = `SELECT SUM(price) as price, COUNT(CASE sold WHEN "false" THEN 1 ELSE NULL END) as sold_count,COUNT(CASE sold WHEN "true" THEN 1 ELSE NULL END) as not_sold_count FROM products WHERE strftime('%m',date_of_sale) = '${month}'`;
    try{
        const result = await db.all(SqlQuery)
        response.status(200).send(result)
    }catch(e){
        response.status(400).send({message:`Server Error at ${e.message}`})

    }
    
    
})