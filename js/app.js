import cakesData from './modules/data.js';
$(document).ready(function() {
  /* display cakes form data */
  let cakesHTML = '';
  $(cakesData).each(function(index, cake) {
    cakesHTML += `
      <!-- single item -->
      <div class="col-10 mx-auto col-sm-6 col-lg-4 my-5 store-item" data-name="${cake.name}" data-type="${cake.type}">
        <div class="card single-item">
          <div class="card-header position-relative overflow-hidden p-0">
            <a href="JavaScript:Void(0);" class="img-container d-block reset-a">
              <img src="${cake.img}" alt="${cake.name}" class="card-img-top store__img">
            </a>
            <span class="store__item-icon" data-toggle="modal" data-target="#${cake.id}">
              <i class="fas fa-shopping-cart"></i>
            </span>
            <div class="modal fade reset-a hover" id="${cake.id}" tabindex="-1" aria-labelledby="storeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-width" role="document">
                <div class="modal-content">
                  <button type="button" class="close close--modal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-5">
                        <img src="${cake.imgMedium}" alt="cake" class="img-fluid modal-order__img" />
                      </div>
                      <div class="col-7 font-roboto">
                        <h2 class="modal-order__title">${cake.name}</h2>
                        <div class="modal-order__price">
                          <span class="modal-order__price-new">$${cake.price}</span>
                        </div>
                        <div class="modal-order__option d-flex">
                          <label class="modal-order__option-label">Size:</label>
                          <ul class="list-unstyled d-flex mb-0">
                            <li>
                              <label>
                                <input checked class="modal-order__option-input" type="radio" name="size-${cake.id}" value="18cm"/>
                                <span class="modal-order__option-value">18cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input class="modal-order__option-input" type="radio" name="size-${cake.id}" value="20cm"/>
                                <span class="modal-order__option-value">20cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input class="modal-order__option-input" type="radio" name="size-${cake.id}" value="22cm"/>
                                <span class="modal-order__option-value">22cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input class="modal-order__option-input" type="radio" name="size-${cake.id}" value="24cm"/>
                                <span class="modal-order__option-value">24cm</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input class="modal-order__option-input" type="radio" name="size-${cake.id}" value="26cm"/>
                                <span class="modal-order__option-value">26cm</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div class="modal-order__option d-flex">
                          <label class="modal-order__option-label">cream:</label>
                          <ul class="list-unstyled d-flex mb-0">
                            <li>
                              <label>
                                <input checked class="modal-order__option-input" type="radio" name="screem-${cake.id}" value="Vani"/>
                                <span class="modal-order__option-value">Vani</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input class="modal-order__option-input" type="radio" name="screem-${cake.id}" value="Chocolate"/>
                                <span class="modal-order__option-value">Chocolate</span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input class="modal-order__option-input" type="radio" name="screem-${cake.id}" value="Capuchino"/>
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
                        <button class="d-block modal-order__cart mt-3" data-id="${cake.id}">Add to cart</button>
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
              <h5 class="store__item-name"><a href="JavaScript:Void(0);" class="reset-a">${cake.name}</a></h5>
              <h5 class="store__item-value">$ <strong class="font-weight-bold">${cake.price}</strong></h5>
            </div>
          </div>
        </div>
      </div>
    `
  });
  $('#store-items').html(cakesHTML);

  /* setup input spinner */
  function updateAmount(btn, value) {
    const inputElm = $(btn).parent().children('.modal-order__amount-input')[0];
    const currentValue = inputElm.value * 1;//convert to number date
    const newValue = currentValue + value;
    
    inputElm.value = newValue < 1 || newValue > 10 ? currentValue : newValue;
  }

  function checkInput(inputElm) {
    const currentValue = inputElm.value;
    const condition = currentValue === 'e' || currentValue === '' || currentValue === '0';
    inputElm.value = condition ? 1 : currentValue;
  }

  $('.modal-order__amount-control--prev').click(function() {
    updateAmount(this, -1);
  });
  $('.modal-order__amount-control--next').click(function() {
    updateAmount(this, 1);
  });
  $('.modal-order__amount-input').focusout(function() {
    checkInput(this);
  })

  /* filter in store */
  function filterStore(filterBtn) {
    const valueBtn = filterBtn.dataset.filter;
    // remove element is activing
    $('.filter-btn.active')[0].classList.remove('active');
    // add active class to filterBtn
    filterBtn.classList.add('active');
    // reset input field
    $('#search-item')[0].value = '';

    $('.store-item').each(function(index, storeItem) {
      const itemType = storeItem.dataset.type;
      if (valueBtn === 'all') {
        storeItem.classList.remove('d-none');
      } else {
        (itemType === valueBtn) ? storeItem.classList.remove('d-none') : storeItem.classList.add('d-none');
      }
    })
  }

  $('.filter-btn').click(function() {
    filterStore(this);
  })

  /* search in store */
  function searchStore() {
    const inputValue = $('#search-item')[0].value.trim();
    // remove element is activing
    $('.filter-btn.active')[0].classList.remove('active');
    // add active class to filterBtn
    $('.filter-btn[data-filter=all]')[0].classList.add('active');
    
    $('.store-item').each(function(index, item) {
      const cakeName = item.dataset.name.toLowerCase();

      cakeName.indexOf(inputValue.toLowerCase()) === -1 ? item.classList.add('d-none') : item.classList.remove('d-none');
    })
  }

  $('.store-search-icon').click(function() {
    searchStore();
  })

  $('#search-item').keypress(function(e) {
    if(e.key === 'Enter') {
      e.preventDefault();

      searchStore();
    }
  })
  

  /* handle cart */
  // open/close cart
  $('#cart-info').click(function(event) {
    event.stopPropagation();
    $('#cart-info').toggleClass('active');
    $('#cart').toggleClass('d-none');
  })
  // add items to cart
  function getData(addBtn) {
    const getId = addBtn.dataset.id;
    const modalElm = $(`#${getId}`);
    const getName =  modalElm.find('.modal-order__title').text();
    const getImage = modalElm.find('.modal-order__img').attr("src");
    const getPrice = modalElm.find('.modal-order__price-new').text();
    const getAmount = modalElm.find('.modal-order__amount-input').val();
    
    return {
      name: getName,
      img: getImage.replace('-md.', '-sm.'),
      price: getPrice,
      amount: getAmount
    };
  }

  function addToCart(cake) {
    //remove cart empty notify
    if ($('#cart').children().is('.cart-notify')) {
      $('.cart-notify').addClass('d-none');
    }

    const html = `
    <div class="cart-item align-items-center my-3 d-flex">
      <img src="${cake.img}" alt="cupcake" class="cart-item__img">
      <div class="item-text pl-1">
        <h3 class="cart-item__name mb-0">${cake.name}</h3>
        <p class="mb-0">Amount:<span class="cart-item__amount ml-1">${cake.amount}</span></p>
        <p class="mb-0">Price:<span class="cart-item__price ml-1">${cake.price}</span></p>
      </div>
    </div>
    `
    $(html).appendTo(".cart-items");
  }

  function updateCart(amount, price) {
    const currentAmount = $('#item-count').text() * 1;
    const currentPrice = $('#item-total').text() * 1;
    const itemAmount = amount * 1;
    const itemPrice = price.slice(1) * itemAmount;
    const newAmount = currentAmount + itemAmount;
    const newPrice = currentPrice + itemPrice;

    // update to icon cart
    $('#item-count').html(newAmount);
    $('#item-total').html(newPrice);
    // update to cart
    $('#cart-total').html(newPrice);
  }

  function closeModal(addBtn) {
    const idCart = addBtn.dataset.id;
    const closeElm = $(`#${idCart}`).find('.close--modal');
    closeElm.click();
  }

  $('.modal-order__cart').click(function() {
    const cakeData = getData(this);
    
    addToCart(cakeData);
    updateCart(cakeData.amount, cakeData.price);
    closeModal(this);
  });



  /* detect a click outside an element javascript */
  $(document).click((event) => {
    // 
    if (!$(event.target).closest('#cart').length) {
      $('#cart-info').removeClass('active');
      $('#cart').addClass('d-none');
    }        
  });

  // register service worker
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/service-worker.js", {
          scope: "/",
        });
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    } else {
      console.log('Service workers are not supported.');
    }
  }
  registerServiceWorker();
});
