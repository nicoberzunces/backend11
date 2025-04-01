import { Router } from 'express';
import Cart from '../models/Cart.js';

const router = Router();

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
        if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado en el carrito' });

        cart.products.splice(productIndex, 1);
        await cart.save();
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findById(req.params.cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
        if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado en el carrito' });

        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.json({ message: 'Cantidad del producto actualizada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        res.json({ message: 'Carrito eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
