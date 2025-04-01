import fs from 'fs/promises';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === parseInt(id));
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: carts.length ? carts[carts.length - 1].id + 1 : 1,
            products: []
        };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(cartId));
        if (cartIndex === -1) return null;

        const productIndex = carts[cartIndex].products.findIndex(p => p.id === parseInt(productId));
        if (productIndex !== -1) {
            carts[cartIndex].products[productIndex].quantity += 1;
        } else {
            carts[cartIndex].products.push({ id: parseInt(productId), quantity: 1 });
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return carts[cartIndex];
    }
}

export default CartManager;
