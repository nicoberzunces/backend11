import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = 'asc', query = '' } = req.query;
        const products = await Product.paginate(
            { $text: { $search: query } },
            {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: { price: sort === 'asc' ? 1 : -1 },
            }
        );
        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
