import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
});

router.post('/', async (req, res) => {
    const product = await productManager.addProduct(req.body);
    res.status(201).json(product);
});

router.delete('/:pid', async (req, res) => {
    const result = await productManager.deleteProduct(req.params.pid);
    if (!result) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado con éxito' });
});

export default router;
