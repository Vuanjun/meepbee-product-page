var loginBtn = document.getElementsByClassName('js-login-btn')[0];
loginBtn.onclick = function() {
  var container = document.getElementsByClassName('js-container')[0];
  var header = document.getElementsByClassName('js-header')[0];
  var footer = document.getElementsByClassName('js-footer')[0];
  var login = document.getElementsByClassName('js-login')[0];
  container.classList.add('hide');
  header.classList.add('hide');
  footer.classList.add('hide');
  login.classList.add('show');
}
var closeBtn = document.getElementsByClassName('js-closeBtn')[0];
closeBtn.onclick = function() {
  var container = document.getElementsByClassName('js-container')[0];
  var header = document.getElementsByClassName('js-header')[0];
  var footer = document.getElementsByClassName('js-footer')[0];
  var login = document.getElementsByClassName('js-login')[0];
  container.classList.remove('hide');
  header.classList.remove('hide');
  footer.classList.remove('hide');
  login.classList.remove('show');
}

