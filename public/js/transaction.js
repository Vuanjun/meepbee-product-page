var cashFlowAction = document.getElementsByClassName('js-cashFlow-action')[0]
var cashFlowActionChilds = cashFlowAction.childNodes;
var atmBtn = cashFlowActionChilds[1];
var payOnArrivalBtn = cashFlowActionChilds[1];
var payInPersonBtn = cashFlowActionChilds[2];

for(var i = 0; i<cashFlowActionChilds.length; i++) {
  cashFlowActionChilds[i].addEventListener('click', choose);
}

var logisticsAction = document.getElementsByClassName('js-logistics-action')[0]
var logisticsActionChilds = logisticsAction.childNodes;
var atmBtn = logisticsActionChilds[1];
var payOnArrivalBtn = logisticsActionChilds[1];
var payInPersonBtn = logisticsActionChilds[2];

for(var i = 0; i<logisticsActionChilds.length; i++) {
  logisticsActionChilds[i].addEventListener('click', choose);
}

function choose(e) {

  var patt = new RegExp('isChosen');

  for(var i = 0; i<e.path[1].childNodes.length; i ++) {
    if(patt.test(e.path[1].childNodes[i].className)) {
      e.path[1].childNodes[i].classList.remove('isChosen');
    }
  }

  e.path[0].classList.add('isChosen');
}

var paymentSummaryCofrimBtn = document.getElementsByClassName('js-payment-confirmBtn')[0]
var paymentDetailIsOpen = false;

paymentSummaryCofrimBtn.onclick = function() {

  var paymentSummary = document.getElementsByClassName('js-payment-summary')[0];
  var recipientInfo = document.getElementsByClassName('js-recipientInfo')[0];

  if(!paymentDetailIsOpen) {
    paymentDetailIsOpen = true;
    paymentSummaryCofrimBtn.innerHTML = "關閉資訊";
    paymentSummary.style.display="block";
    recipientInfo.style.display="block";
  } else {
    paymentDetailIsOpen = false;
    paymentSummaryCofrimBtn.innerHTML = "計算價錢";
    paymentSummary.style.display="none";
    recipientInfo.style.display="none";
  }

}
