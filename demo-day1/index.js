// const express = require ('express');
// const app = express();

// app.listen(3000, ()=> {
//     console.log("Server is running on port 3000")
// });
// ---------------------------------------------------------

const express = require ('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session  = require('express-session')


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views', __dirname +'/views');
app.use(express.static('static'));
app.use(session({secret: "abcd",resave: false}))

const adm={
    username: 'tonkatsuadmin',
    password: 'tontonsu123'
}

const pool = mysql.createPool({
    connectionLimit:30,
    host:'localhost',
    user:'root',
    password:'Mysql2020andmoji',
    database:'tonkatsushop'
})

app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart =[];
    }
        next();
});

app.get("/home",(req,res)=> {
        pool.getConnection((err,connection)=>{
            if(err){
                res.send("error");
                return;
            }
            
            connection.query("SELECT * FROM products",(err,results)=>{
                // res.json(results);
                res.render("projectweb_p1",{products : results}) ;
            })
        })
})  

// app.get("/api/orders", (req,res)=> {
//     pool.getConnection((err,connection)=>{
//         if(err){
//             res.send("error")
//             return
//         }
//         connection.query(`SELECT * FROM orders`,(err2,results2)=>{
//             res.json(results2)
//         })
//     })    
// })
app.get("/api/products",(req,res)=> {
    pool.getConnection((err,connection)=>{
        if(err){
            res.send("error");
            return;
        }
        connection.query("SELECT * FROM products",(err,results)=>{
             res.json(results);

            //  console.log(results)
        })
    })  
})

app.get("/api/orders",(req,res)=> {
    pool.getConnection((err,connection)=>{
        if(err){
            res.send("error");
            return;
        }
        connection.query("SELECT * FROM orders",(err,results)=>{
             res.json(results);

            //  console.log(results)
        })
    })  
})


app.delete("/api/products/:productId",(req,res)=>{
    const id =req.params.productId;
    pool.query(`DELETE FROM products WHERE id=${id}`, (err,result)=>{
        if(err){
            res.send("error");
        }else{
            res.send("Product deleted");
        }
    })
})

app.post("/api/orders", (req,res)=>{
    const sql = `INSERT INTO orders (id,name,size_meat,size_rice, sidedish, amount, price) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
                pool.query(sql, [

                    req.body.id,
                    req.body.name,
                    req.body.size_meat,
                    req.body.size_rice,
                    req.body.sidedish,
                    req.body.amount,
                    req.body.price
                    
                ])
                res.render("projectweb_p1");
})
app.post("/api/products",(req,res)=>{

    const sql = `INSERT INTO products (id, name_products, price, imagefile, imagefile_big, stock) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    pool.query(sql,[
        req.body.id,
        req.body.name_products,
        req.body.price,
        req.body.imagefile,
        req.body.imagefile_big,
        req.body.stock,  
    ],(err,result)=>{
        if(err){
            console.error(err.message);
            res.send("error");
        }else{
            res.send("ok add success");
        }
    })

})

app.get("/products/:productsId",(req,res)=>{
    let id = req.params.productsId;
    pool.getConnection((err,connection)=>{
        if(err){
            res.send("error");
            return;
        }
        connection.query(`SELECT * FROM products WHERE id=${id}`,(err,results)=>{
                // res.json(results);
            products = results[0];
        
                // connection.query(`SELECT * FROM products WHERE id<>${id} LIMIT 4`,(err2,results2)=>{
                    
                    res.render("projecweb_p2",{p : products,id}) ;
                })
         })
    })


app.get("/login",(req,res)=> {
    
    res.render("login",{error:""});
})

app.post("/login",(req,res)=>{
    const {username,password}=req.body ;//req.body.username -> username/req.body.password->password
    
    if(username == adm.username && password == adm.password){
        req.session.isLoggedIn = true;
        res.render("admin")
    }else{
        res.render("login",{error : "Invalid Username or Password"})
        
    }
 })

app.get("/admin",(req,res)=> {

    if(req.session.isLoggedIn){
        res.render("admin"); 
    }else{
        res.render("login" , {error: "( ◉ ʖ̯ ◉)"})
    }
    
    
})

app.get("/myorders",(req,res)=>{

    res.render("adminviewordes",{error:""})

})

app.get("/mycart",(req,res)=>{

    res.render("cart",{cart : req.session.cart})

})

app.post("/p2",(req,res)=>{
   var {id,name,size_meat,size_rice,sidedish,price,amount}=req.body;
   if(!size_meat||!size_rice||!sidedish){
        if(!size_meat){
            size_meat="m"
        }if(!size_rice){
            size_rice="normal"
        }if(!sidedish){
            sidedish="no"
        }
        console.log(id)
    console.log(name)
    console.log(size_meat)
    console.log(size_rice)
    console.log(sidedish)
    console.log(price)
    console.log(amount)
   }
   if(!id||!name||!size_meat||!size_rice||!sidedish||!price||!amount){
    res.send("error")
   }
   req.session.cart.push({id,name,size_meat,size_rice,sidedish,price,amount})
   res.render("cart",{cart : req.session.cart})
   console.log(req.session.cart)

})


app.delete("/deleteItem",(req,res)=>{
    const orderNoToDelete = req.body.orderNo;
    console.log(req.session.cart);
    console.log(orderNoToDelete);
    req.session.cart = req.session.cart.filter(item => item.orderNo == orderNoToDelete);
    // console.log("lol"+req.session.cart);
    console.log(req.session.cart);
    // console.log(orderNoToDelete);
    // req.session.cart = localStorage.clear();
    res.send("deleted");
});



app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
});


