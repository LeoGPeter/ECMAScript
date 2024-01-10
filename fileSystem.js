import {promises as fs} from "fs"

class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
       let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        id = parseInt(id);
        if(!respuesta3.find((product) => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta3.find((product) => product.id === id));
        }
    };

    deleteProductsById = async (id) => {
            let respuesta3 = await this.readProducts();
            let productfilter = respuesta3.filter(products => products.id != id);
            await fs.writeFile(this.patch, JSON.stringify(productfilter));
            console.log("Producto eliminado");
    };

    updateProduct = async ({id, ...updatedFields}) => {
        let products = await this.readProducts();
        const index = products.findIndex(product => product.id === id);
    
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            await fs.writeFile(this.patch, JSON.stringify(products));
            console.log("Producto actualizado");
        } else {
            console.log("Producto no encontrado");
        }
    };
}

const productos = new ProductManager();

//  productos.addProduct("titutlo1", "descripcion1", 2500, "img1", "asd123", 3);
//  productos.addProduct("titutlo2", "descripcion2", 4000, "img2", "asd456", 8);
//  productos.addProduct("titutlo3", "descripcion3", 5500, "img3", "asd678",6);

//  productos.getProducts()

//  productos.getProductsById(4)

//  productos.deleteProductsById(1)

productos.updateProduct({
  price: 9800,
  stock: 15,
  id:1
  
})

