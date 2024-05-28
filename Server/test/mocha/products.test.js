import assert from "assert"
import "dotenv/config.js"
import dao from "../../src/data/index.factory.js"
import Product from "../../src/data/mongo/models/product.model.js"
//const { Product } = dao
import dao from "../../src/data/index.factory.js"
const { Product } = dao;

describe (
    "Testeando modelo productos",
    ()=> {
        const model = new Product ()
        const data = { title: "shirt", price: 100, stock: 20}
        let id
        it(
            "la creacion de un producto requiere un objeto con la propiedad 'title'",
            ()=>{
                assert.ok(data.title)
            }
        )
        it(
            "la creacion de un producto no necesita un objeto con la propiedad 'poster",
            ()=>{
                assert.strictEqual(data.poster, undefined)
            }
        )
        it(
            "la funcion creadora de un producto, devuelve un objeto con la propiedad '_id'",
            async()=>{
                const one = await Product.create(data)
                id = one._id
                assert.ok(one._id)

            }
        )
        it(
            "la funcion creadora de un producto, devuelve un objeto",
            async()=>{
                const one = await Product.create(data)
                assert.strictEqual(typeof one, "object")
            }
        )
        it(
            "la funcion para leer productos debe devolver un objeto con las propiedades 'prev', 'next' y 'products'",
            async()=>{
                const all = await Product.read({limit:2, page:2, sort:2, lean:true})
                assert.ok(paginate.prev)
                assert.ok(paginate.next)
                assert.ok(paginate.products)
            }
        )
        it(
            "la funcion para leer productos debe devolver un array de productos en la propiedad 'products'",
            async()=>{
                const all = await Product.paginate({limit:2, page:2, sort:2, lean:true})
                assert.strictEqual(Array.isArray(all.products), true)
            }
        )
        it(
            "la funcion para actualizar un producto debe devolver un product actualizada",
            async()=>{
                const before = await Product.findById(id)
                const one = await Product.findByIdAndUpdate(id, {title: "muñeco"})
                assert.strictEqual(before.title !== one.title, true)
            }
        )
        it(
            "la funcion para eliminar un producto debe eliminar un producto",
            async()=>{
                const one = await Product.findByIdAndDelete(id)
                const after = await Product.findById(id)
                assert.strictEqual(after, null)
 
            }
        )
    }
)