import fs from 'fs/promises';

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
        return product;
    }

    async updateProduct(id, updatedFields) {
        let products = await this.getProducts();
        const index = products.findIndex(prod => prod.id === parseInt(id));
        if (index === -1) return null;
        products[index] = { ...products[index], ...updatedFields };
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        const newProducts = products.filter(prod => prod.id !== parseInt(id));
        if (products.length === newProducts.length) return null;
        await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2));
        return true;
    }
}

export default ProductManager;
