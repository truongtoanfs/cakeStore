// Using Jquery
import cakesData from './modules/data.js';
$(document).ready(function() {
  // display cakes form data
  let cakesHTML = '';
  $(cakesData).each(function(index, cake) {
    cakesHTML += `
      <!-- single item -->
      <div class="col-10 mx-auto col-sm-6 col-lg-4 my-5">
        <div class="card single-item">
          <div class="card-header position-relative overflow-hidden p-0">
            <a href="./pages/products.html" class="img-container d-block reset-a">
              <img src="${cake.img}" alt="${cake.name}" class="card-img-top store__img">
            </a>
            <span class="store__item-icon" data-toggle="modal" data-target="#storeModal">
              <i class="fas fa-shopping-cart"></i>
            </span>
            <div class="modal fade reset-a hover" id="storeModal" tabindex="-1" aria-labelledby="storeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-width" role="document">
                <div class="modal-content">
                  <button type="button" class="close close--modal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-5">
                        <img src="http://product.hstatic.net/200000164551/product/12_26b0a63311da4409819b83b0748610c3_large.png" alt="cake" class="img-fluid" />
                      </div>
                      <div class="col-7 font-roboto">
                        <h2 class="modal-order__title">${cake.name}</h2>
                        <div class="modal-order__price">
                          <span class="modal-order__price-new">150,000₫</span>
                          <span class="modal-order__price-old">190,000₫</span>
                        </div>
                        <div class="modal-order__option d-flex">
                          <label class="modal-order__option-label">Size:</label>
                          <ul class="list-unstyled d-flex mb-0">
                            <li>
                              <label>
                                <input checked type="radio" name="size" value="18cm"/>
                                <span class="modal-order__option-value">18cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="radio" name="size" value="20cm"/>
                                <span class="modal-order__option-value">20cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="radio" name="size" value="22cm"/>
                                <span class="modal-order__option-value">22cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="radio" name="size" value="24cm"/>
                                <span class="modal-order__option-value">24cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="radio" name="size" value="26cm"/>
                                <span class="modal-order__option-value">26cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="radio" name="size" value="30cm"/>
                                <span class="modal-order__option-value">30cm</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div class="modal-order__option d-flex">
                          <label class="modal-order__option-label">cream:</label>
                          <ul class="list-unstyled d-flex mb-0">
                            <li>
                              <label>
                                <input type="radio" name="screem" value="Vani"/>
                                <span class="modal-order__option-value">Vani</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input checked type="radio" name="screem" value="Chocolate"/>
                                <span class="modal-order__option-value">Chocolate</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="radio" name="screem" value="Capuchino"/>
                                <span class="modal-order__option-value">Capuchino</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div class="modal-order__option d-flex">
                          <label class="modal-order__option-label">Amount:</label>
                          <div class="input-group input-group-sm">
                            <div class="input-group-prepend modal-order__amount-control--prev">
                              <button class="modal-order__amount-control btn rounded-0" type="button"><strong>−</strong></button>
                            </div>
                            <input type="number" min="1" max="10" value="1" class="form-control text-center modal-order__amount-input">
                            <div class="input-group-append modal-order__amount-control--next">
                              <button class="modal-order__amount-control btn rounded-0" type="button"><strong>+</strong></button>
                            </div>
                          </div>
                        </div>
                        <button class="d-block modal-order__cart mt-3">Add to cart</button>
                        <a href="#" class="d-inline-block modal-order__link mt-1">Detail</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-text d-flex justify-content-between text-capitalize">
              <h5 class="store__item-name"><a href="#" class="reset-a">${cake.name}</a></h5>
              <h5 class="store__item-value">$ <strong id="store__item-price" class="font-weight-bold">${cake.price}</strong></h5>
            </div>
          </div>
        </div>
      </div>
    `
  });
  $('#store-items').html(cakesHTML);

  // setup input spinner
  $('.modal-order__amount-control--prev').click(function() {
    updateAmount(this, -1);
  });

  $('.modal-order__amount-control--next').click(function() {
    updateAmount(this, 1);
  });

  function updateAmount(btn, value) {
    const inputElm = $(btn).parent().children('.modal-order__amount-input')[0];
    const currentValue = inputElm.value * 1;//convert to number date
    const newValue = currentValue + value;
    
    inputElm.value = newValue < 1 || newValue > 10 ? currentValue : newValue;
  }
});


/* 
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
  //show total
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

 */

