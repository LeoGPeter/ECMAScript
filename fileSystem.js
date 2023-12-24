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
        return JSON.parse(respuesta);
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if(!respuesta3.find((product) => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta3.find((product) => product.id === id));
        }
    };

    deleteProductsById = async () => {
        let respuesta3 = await this.readProducts();
        let productfilter = respuesta3.filter((products) => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productfilter));
        console.log("Producto eliminado");
    };

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        let productomodificado = [{...producto, id}, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productomodificado));
    };
}

const productos = new ProductManager();

// productos.addProduct("titutlo1", "descripcion1", 2500, "img1", "asd123", 3);
// productos.addProduct("titutlo2", "descripcion2", 4000, "img2", "asd456", 8);
// productos.addProduct("titutlo3", "descripcion3", 5500, "img3", "asd678",6);

// productos.getProducts()

// productos.getProductsById(4)

// productos.deleteProductsById(1)

productos.updateProducts({
    title: 'titutlo1',
  description: 'descripcion1',
  price: 6000,
  img: 'img1',
  code: 'asd123',
  stock: 3,
  id: 1
})

