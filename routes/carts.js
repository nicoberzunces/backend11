import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const result = await cartManager.addProductToCart(cid, pid);
    if (!result) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(result);
});

export default router;
