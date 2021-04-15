// show cart
(function() {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');
  cartInfo.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  })
})();

// add item to the cart
(function() {
  const cartBtn = document.querySelectorAll('.store-item-icon');
  cartBtn.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      if (event.target.parentElement.classList.contains('store-item-icon')) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf('img') + 3;
        let partPath = fullPath.slice(pos);

        const item = {};
        item.img = `img-cart${partPath}`;
        let cartBody = event.target.parentElement.parentElement.nextElementSibling;
        let name = cartBody.querySelector('.store-item-name').innerText;
        item.name = name;
        let price = cartBody.querySelector('#store-item-price').innerText;
        item.price = price;
        
        const createCartItem = document.createElement('div');
        createCartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
        createCartItem.innerHTML = `
          <img src=${item.img} alt="" class="img-fluid rounded-circle" id="item-img">
          <div class="item-text">
            <p class="cart-item-title font-weight-bold mb-0">${item.name}</p>
            <span>$</span>
            <span class="cart-item-price mb-0">${item.price}</span>
          </div>
          <a href="#" class="cart-item-remove">
            <i class="fas fa-trash"></i>
          </a>
        `;
        const cart = document.querySelector('#cart');
        const cartTotalContainer = document.querySelector('.cart-total-container');
        cart.insertBefore(createCartItem, cartTotalContainer);
        showTotals();
      }
    })
  })
  /* show total */
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(item => {
      total.push(parseFloat(item.textContent));
    })
    const totalMoney = total.reduce(function(total, item) {
      total += item;
      return total;
    }, 0);
    const totalFinal = totalMoney.toFixed(2);
    document.querySelector('.cart-total').innerHTML = totalFinal;
    document.querySelector('.item-total').innerHTML = totalFinal;
    document.querySelector('#item-count').innerHTML = total.length;
  }
})();


// display cakes from data
import cakesData from './modules/data.js';
const itemsContainer = document.querySelector('#store-items');

document.addEventListener('DOMContentLoaded', () => {
  let html = '';
  cakesData.forEach(cake => {
    html += `
      <!-- single item -->
      <div class="col-10 mx-auto col-sm-6 col-lg-4 mt-5 store-item" data-item=${cake.type}>
        <div class="card single-item">
          <div href="#" class="img-container d-block">
            <img src=${cake.img} alt=${cake.name} class="card-img-top store-img">
            <!-- Button trigger modal -->
            <span class="store-item-icon" data-toggle="modal" data-target="#exampleModal">
              <i class="fas fa-shopping-cart"></i>
            </span>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-text d-flex justify-content-between text-capitalize">
              <h5 class="store-item-name">${cake.name}</h5>
              <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">${cake.price}</strong></h5>
            </div>
          </div>
        </div>
      </div>
      <!-- end of single item -->
    `
  });
  itemsContainer.innerHTML = html;
})

