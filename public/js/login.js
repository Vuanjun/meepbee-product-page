var loginBtn = document.getElementsByClassName('js-logInBtn')[0];
var signInBtn = document.getElementsByClassName('js-signInBtn')[0];
loginBtn.onclick = showAccount;
signInBtn.onclick= showAccount;

function showAccount(e) {
  var submitBtn = document.getElementsByClassName('js-submitBtn')[0];
  submitBtn.innerHTML = e.currentTarget.innerHTML;
  var theOtherBtn = document.getElementsByClassName('js-theOtherAction')[0];
  var mobile = document.getElementsByClassName('js-mobile')[0];
  var email = document.getElementsByClassName('js-email')[0];

  if(e.currentTarget.innerHTML=="註冊") {
    email.classList.remove('hide');
    theOtherBtn.innerHTML = "想要登入";
    mobile.classList.remove('hide');
    forgotPasswordBtn.classList.add('hide');
  }else {
    email.classList.add('hide');
    mobile.classList.add('hide');
    forgotPasswordBtn.classList.remove('hide');
    theOtherBtn.innerHTML = "現在註冊";
  }
  var container = document.getElementsByClassName('js-container')[0];
  var header = document.getElementsByClassName('js-header')[0];
  var footer = document.getElementsByClassName('js-footer')[0];

  container.classList.add('hide');
  header.classList.add('hide');
  footer.classList.add('hide');
  var account = document.getElementsByClassName('js-account')[0];
  account.classList.add('show');
  fadeIn(account.firstChild);
}

var closeBtn = document.getElementsByClassName('js-closeBtn')[0];
closeBtn.onclick = function() {
  var container = document.getElementsByClassName('js-container')[0];
  var header = document.getElementsByClassName('js-header')[0];
  var footer = document.getElementsByClassName('js-footer')[0];
  var account = document.getElementsByClassName('js-account')[0];
  container.classList.remove('hide');
  header.classList.remove('hide');
  footer.classList.remove('hide');
  account.classList.remove('show');
  var grandsons = account.firstChild.childNodes;
  for(i = 0; i<grandsons.length; i++) {
    grandsons[i].classList.remove('hide');
  }
  var account = document.getElementsByClassName('js-account')[0];
  fadeIn(account.firstChild);
}

var forgotPasswordBtn = document.getElementsByClassName('js-forgotPassword')[0];
var hasForgot = true;
forgotPasswordBtn.onclick = function() {
  var password = document.getElementsByClassName('js-password')[0];
  var submitBtn = document.getElementsByClassName('js-submitBtn')[0];
  var username = document.getElementsByClassName('js-userName')[0];
  var email = document.getElementsByClassName('js-email')[0];

  if(hasForgot) {
    hasForgot=false;
    username.classList.add('hide');
    password.classList.add('hide');
    email.classList.remove('hide');
    submitBtn.innerHTML = "寄送密碼";
    forgotPasswordBtn.innerHTML = "想要登入";
  }else {
    hasForgot=true;
    username.classList.remove('hide');
    password.classList.remove('hide');
    email.classList.add('hide');
    submitBtn.innerHTML = "登入";
    forgotPasswordBtn.innerHTML = "忘記密碼?";
  }
  var account = document.getElementsByClassName('js-account')[0];
  fadeIn(account.firstChild);

}

var theOtherActionBtn = document.getElementsByClassName('js-theOtherAction')[0];
theOtherActionBtn.onclick = function(e) {

  var mobile = document.getElementsByClassName('js-mobile')[0];
  var submitBtn = document.getElementsByClassName('js-submitBtn')[0];
  var password = document.getElementsByClassName('js-password')[0];
  var username = document.getElementsByClassName('js-userName')[0];
  var email = document.getElementsByClassName('js-email')[0];

  password.classList.remove('hide');
  if(e.currentTarget.innerHTML=="想要登入") {
    mobile.classList.add('hide');
    email.classList.add('hide');
    username.classList.remove('hide');
    theOtherActionBtn.innerHTML = "現在註冊";
    submitBtn.innerHTML = "登入";
    forgotPasswordBtn.classList.remove('hide');
    hasForgot=true;
    forgotPasswordBtn.innerHTML = "忘記密碼?"
  } else {
    mobile.classList.remove('hide');
    email.classList.remove('hide');
    username.classList.remove('hide');
    theOtherActionBtn.innerHTML = "想要登入";
    submitBtn.innerHTML = "註冊";
    forgotPasswordBtn.classList.add('hide');
  }

  var account = document.getElementsByClassName('js-account')[0];
  fadeIn(account.firstChild);

}
