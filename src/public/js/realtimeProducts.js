const socket = io();

const addProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();

    socket.emit('productAdded', product);
};

document.querySelector('.add-to-cart').addEventListener('click', function() {
    const productId = this.dataset.id;
    addProduct(productId);
});
