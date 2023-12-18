class ProductManager {
    constructor(){
        this.products = [];
    }

    static id = 0

    addProduct(title, description, price, img, code, stock){
        ProductManager.id++
        this.products.push({title, description, price, img, code, stock, id: ProductManager.id});
    }

    getProduct(){
        return this.products;
    }

    exist(id){
        return this.products.find((producto) => producto.id === id);
    }

    getProductById(id){
    !this.exist(id) ? console.log("Not Found") : console.log(this.exist(id));
    }
}

const productos = new ProductManager

console.log(productos.getProduct())

productos.addProduct('titulo1', 'descripcion1', 5000, "img1", "asd123", 10 );
productos.addProduct('titulo2', 'descripcion2', 7000, "img2", "asd456", 7 );


productos.getProductById(1)
productos.getProductById(2)
productos.getProductById(3)

