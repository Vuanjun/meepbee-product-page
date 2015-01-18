var cashFlowAction = document.querySelector('.js-cashFlow-action')
var cashFlowActionChilds = cashFlowAction.childNodes;

for (var i = 0; i < cashFlowActionChilds.length; i++) {
  cashFlowActionChilds[i].addEventListener('click', choose);
}

var logisticsAction = document.querySelector('.js-logistics-action')
var logisticsActionChilds = logisticsAction.childNodes;

for (var i = 0; i < logisticsActionChilds.length; i++) {
  logisticsActionChilds[i].addEventListener('click', choose);
}

function choose(e) {

  var parent = e.currentTarget.parentNode;

  var patt = new RegExp('isChosen');

  for (var i = 0; i < parent.childNodes.length; i++) {
    if (patt.test(parent.childNodes[i].className)) {
      parent.childNodes[i].classList.remove('isChosen');
    }
  }
  e.target.classList.add('isChosen');
  calculate();
}

var paymentSummaryCofrimBtn = document.querySelector('.js-payment-confirmBtn')
var paymentDetailIsOpen = false;

paymentSummaryCofrimBtn.onclick = function () {

  var paymentSummary = document.querySelector('.js-payment-summary');
  var recipientInfo = document.querySelector('.js-recipientInfo');

  if (!paymentDetailIsOpen) {
    paymentDetailIsOpen = true;
    paymentSummaryCofrimBtn.innerHTML = "關閉資訊";
    if (window.innerWidth >= 1024) paymentSummaryCofrimBtn.style.marginBottom = "2.5em";
    paymentSummary.style.display = "block";
    recipientInfo.style.display = "initial";
  } else {
    paymentDetailIsOpen = false;
    paymentSummaryCofrimBtn.innerHTML = "計算價錢";
    if (window.innerWidth >= 1024) paymentSummaryCofrimBtn.style.marginBottom = "1.5em";
    paymentSummary.style.display = "none";
    recipientInfo.style.display = "none";
  }

}


var plusBtn = document.querySelector('.js-plus-btn');
var minusBtn = document.querySelector('.js-minus-btn');

plusBtn.addEventListener('click', increaseNo);
minusBtn.addEventListener('click', decreaseNo);


function increaseNo(e) {
  var productInfo = JSON.parse(document.querySelector('script[data-frames="app_data"]').innerHTML)
  var quantityCap = productInfo.quantity;
  var quantity = document.querySelector('.product__payment__quantityBox__actionSet__figure');
  if ((+quantity.innerHTML + 1) <= quantityCap) {
    quantity.innerHTML = +quantity.innerHTML + 1;
  }
  calculate();
}

function decreaseNo(e) {
  var qtyDOM = document.querySelector('.product__payment__quantityBox__actionSet__figure');
  var qty = +qtyDOM.innerHTML
  if (qty <= 1) {
    return false;
  } else {
    qtyDOM.innerHTML = qty - 1;
  }
  calculate();
}

function calculate() {
  var quantity = +document.querySelector('.product__payment__quantityBox__actionSet__figure').innerHTML
  var productPrice = +document.querySelector('.js-product-price').innerHTML.replace(/\D/, '');
  var logisticsFee = document.querySelector('.prodcut__payment__logistics__actionSet__btn.isChosen');
  logisticsFee ? logisticsFee = +logisticsFee.getAttribute('data-fee') : logisticsFee = 0
  var logisticsCost = document.querySelector('.js-logistics-cost');
  logisticsCost.innerHTML = logisticsFee;
  var totalCost = document.querySelector('.js-total-cost');
  totalCost.innerHTML = quantity * productPrice + logisticsFee;
}
