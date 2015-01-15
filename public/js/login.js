var loginBtn = document.getElementsByClassName('js-logInBtn')[0];
var signInBtn = document.getElementsByClassName('js-signInBtn')[0];
loginBtn.onclick = showAccount;
signInBtn.onclick= showAccount;

function showAccount(e) {
  var submitBtn = document.getElementsByClassName('js-submitBtn')[0];
  submitBtn.innerHTML = e.currentTarget.innerHTML;
  var theOtherBtn = document.getElementsByClassName('js-theOtherAction')[0];
  var mobile = document.getElementsByClassName('js-mobile')[0];
  if(e.currentTarget.innerHTML=="註冊") {
    theOtherBtn.innerHTML = "想要登入";
    mobile.classList.remove('hide');
    forgotPasswordBtn.classList.add('hide');
  }else {
    mobile.classList.add('hide');
    forgotPasswordBtn.classList.remove('hide');
    theOtherBtn.innerHTML = "現在註冊";
  }
  // var container = document.getElementsByClassName('js-container')[0];
  var header = document.getElementsByClassName('js-header')[0];
  // var footer = document.getElementsByClassName('js-footer')[0];
  var account = document.getElementsByClassName('js-account')[0];
  // container.classList.add('hide');
  header.classList.add('hide');
  // footer.classList.add('hide');
  account.classList.add('show');
}

var closeBtn = document.getElementsByClassName('js-closeBtn')[0];
closeBtn.onclick = function() {
  // var container = document.getElementsByClassName('js-container')[0];
  var header = document.getElementsByClassName('js-header')[0];
  // var footer = document.getElementsByClassName('js-footer')[0];
  var account = document.getElementsByClassName('js-account')[0];
  // container.classList.remove('hide');
  header.classList.remove('hide');
  // footer.classList.remove('hide');
  account.classList.remove('show');
}

var forgotPasswordBtn = document.getElementsByClassName('js-forgotPassword')[0];
var hasForgot = true;
forgotPasswordBtn.onclick = function() {
  var password = document.getElementsByClassName('js-password')[0];
  var submitBtn = document.getElementsByClassName('js-submitBtn')[0];
  if(hasForgot) {
    hasForgot=false;
    password.classList.add('hide');
    submitBtn.innerHTML = "寄送密碼";
    forgotPasswordBtn.innerHTML = "重新登入";
  }else {
    hasForgot=true;
    password.classList.remove('hide');
    submitBtn.innerHTML = "登入";
    forgotPasswordBtn.innerHTML = "忘記密碼?";
  }
}

var theOtherActionBtn = document.getElementsByClassName('js-theOtherAction')[0];
theOtherActionBtn.onclick = function(e) {

  var mobile = document.getElementsByClassName('js-mobile')[0];
  var submitBtn = document.getElementsByClassName('js-submitBtn')[0];


  if(e.currentTarget.innerHTML=="想要登入") {
    mobile.classList.add('hide');
    theOtherActionBtn.innerHTML = "現在註冊";
    submitBtn.innerHTML = "登入";
    forgotPasswordBtn.classList.remove('hide');
  } else {
    mobile.classList.remove('hide');
    theOtherActionBtn.innerHTML = "想要登入";
    submitBtn.innerHTML = "註冊";
    forgotPasswordBtn.classList.add('hide');
  }

}
