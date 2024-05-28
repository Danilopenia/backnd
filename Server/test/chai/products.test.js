import {expect} from "chai"
import "dotenv/config.js"
import Product from "../../src/data/mongo/models/product.model.js"



describe(
    "testeando modelo productos", 
    ()=>{
        const model = new Product ()
        const data = { title: "shirt", price: 100, stock: 20}
        let id;
        it(
            "la creacion de un producto requiere un objeto con la propiedad 'title'", ()=>{
                expect(data).to.have.property("title")
            } 
        );
        it(
            "la creacion de un producto no necesita un objeto con la propiedad 'poster",
            ()=>{
                expect(data).to.not.have.property("poster")
            }
        );
        it(
            "la funcion creadora de un producto, devuelve un objeto con la propiedad '_id'", 
            async()=>{
                const one = await Product.create(data)
                id = one._id
                expect(one).to.be.an("object")
            }
        )
        it(
            "la funcion creadora de un producto, devuelve un objeto con la propiedad '_id'", 
            async()=>{
                const one = await Product.create(data)
                id = one._id
                expect(one).to.have.property("_id")
            }
        )
        it(
            "la funcion para leer productos debe devolver un objeto con las propiedades 'prev', 'next' y 'products'",
            async()=>{
                const all = await Product.read({limit:2, page:2, sort:2, lean:true})
               expect(all).to.have.property("prev").and.to.have.property("next").and.to.have.property("products")
            }
        );
        it(
            "la funcion para leer productos debe devolver un array de productos en la propiedad 'products'",
            async()=>{
                const all = await Product.paginate({limit:2, page:2, sort:2, lean:true});
                expect(Array.isArray(all.products)).to.be.equals(true)
            }
        )
        it(
            "la funcion para actualizar un producto debe devolver un product actualizada",
            async()=>{
                const before = await Product.findById(id)
                const one = await Product.findByIdAndUpdate(id, {title: "muñeco"})
                expect(one.title).not.to.be.equals(before.title)
            }
        )
        it(
            "la funcion para eliminar un producto debe eliminar un producto",
            async()=>{
                const one = await Product.findByIdAndDelete(id)
                const after = await Product.findById(id)
                expect(after).to.be.equals(null)
            }
        )
    }
)