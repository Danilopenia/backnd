import express from "express";
import products from "./data/fs/products.fs.js";
import users from "./data/fs/users.fs.js";

const server = express();

const PORT = 8080;
const ready = ()=>console.log('server ready on port'+PORT);

server.use(express.urlencoded({extended: true }))

server.listen(PORT, ready);



server.get("/api/products", (req, res)=>{

try {
    const all = products.getProducts();
    if (Array.isArray(all)) {
       return res.status(200).json({
        success: true,
        message: all,
       }) ;  
    }else{
        return res.status(404).json({
            success:false,
            message: error.message
        })
    }
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    })
}
});

server.get("/api/products/:pid", (req,res)=>{
    const {pid}= req.params
    const one = products.getProductById(pid)
    return res.status(200).json(one)
})


server.get("/api/users", (req, res)=>{

    try {
        const all = users.getUser()
        if (Array.isArray(all)) {
           return res.status(200).json({
            success: true,
            message: all,
           }) ;  
        }else{
            return res.status(404).json({
                success:false,
                message: error.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
    });
    
    server.get("/api/users/:pid", (req,res)=>{
        const {pid}= req.params
        const one = users.getUserById(pid)
        return res.status(200).json(one)
    })





/*endpoints
const ruta = "/"
const funcionQueVALeer = (requerimientos, respuesta)=>{
    return respuesta.status(200).send("<h1> my first express </h1>")
//requerimentos
//respuesta
}
server.get(ruta, funcionQueVALeer);


const ruta2 = "/products"
const function2 = (req,res)=> {
    const all = ["aca", "todos","los", "productos"]
    return res.status(200).json(all)
}
server.get(ruta2, function2)

const rutaConParams1 = "/products/:pid"
const cbParams1 = (req, res)=>{
 const {pid} = req.params;
 console.log(params );
 return res.status(200).send("el id del producto es" + pid)
}
server.get(rutaConParams1, cbParams1);

const rutaConParams2 = "/api/products/:title/:category/:price/:stock"

const cbParams2 = (req, res)=> {
    const {title, category, price, stock} = req.params;
return res.status(200).json({
    title, 
    category,
});
};
server.get(rutaConParams2, cbParams2);*/