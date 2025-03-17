import fs from 'fs/promises';
import { io } from '../app.js';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(prod => prod.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));

        // Notificar a WebSocket
        io.emit('newProduct', product);

        return product;
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        const newProducts = products.filter(prod => prod.id !== parseInt(id));
        if (products.length === newProducts.length) return null;
        await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2));

        // Notificar a WebSocket
        io.emit('deleteProduct', id);

        return true;
    }
}

export default ProductManager;
