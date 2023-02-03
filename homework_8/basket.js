'use strict';

const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.baskeTotal');
const basketTotalValueEl = document.querySelector('.baskeTotalValue');
const cartIconCountEl = document.querySelector('.cartIconWrap');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

let basket = {};

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket).reduce((acc, product) => 
    acc + product.price * product.count, 0);
}

function renderProductInBasket(pId) {
    const basketRowEl = basketEl.querySelector(
        `.basketRow[data-id='${productId}']`
    );
    if (!basketRowEl) {
        renderProductInBasket(pId);
        return;
    };

    const prod = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl.querySelector('.productTotalRow').textContent = (
        product.price * product.count
    )

};

function addToBasket (id, name, price) {
    if (!(id in basket)) {
        basket[id] = {id: id, name: name, price: price, coint: 0}
    }
    basket[id].count += 1
    cartIconCountEl.textContent = getTotalBasketCount().tostring();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
};


document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToBasket')) {
        return;
    };

    const featuredItemEl = event.target.closest('.featuredItem');
    const id = featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = featuredItemEl.dataset.price;
    addToBasket(id, name, price)
});


function renderNewProductInBasket(pId) {
    const productRow = `
    <div class='basketRow' data-id='${productId}'>
        <div>${basket.productId.name}</div>
        <div>
            <span class = 'productCount'>${basket[productId].count}</span>
        </div>
        <div>${basket.productId.price}</div>
        <div>
            <span class = 'productTotalRow'>
                ${basket[productId].count * basket[productId].price}
            </span>
        </div>
    </div>
    `
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}