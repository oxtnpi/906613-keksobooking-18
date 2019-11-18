'use strict';
(function () {

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var onClickClose = function () {
    var successCont = main.querySelector('.success');
    var errorCont = main.querySelector('.error');
    if (successCont) {
      successCont.addEventListener('click', function () {
        main.removeChild(successCont);
      }
      );
    }
    if (errorCont) {
      errorCont.addEventListener('click', function () {
        main.removeChild(errorCont);
      });
    }
  };

  var onEscapeClose = function (evt) {
    if (evt.key === 'Escape') {
      var successCont = main.querySelector('.success');
      if (successCont) {
        main.removeChild(successCont);
      }
      var errorCont = main.querySelector('.error');
      if (errorCont) {
        main.removeChild(errorCont);
      }
      document.removeEventListener('keydown', onEscapeClose);
    }
  };

  var renderError = function (err) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorText = document.querySelector('#error')
      .content
      .querySelector('.error__message');
    errorText.textContent = err;

    main.appendChild(errorElement);
    var errorConteiner = document.querySelector('.error');
    var errorButton = document.querySelector('.error__button');
    errorButton.focus();
    document.addEventListener('keydown', onEscapeClose);
    errorButton.addEventListener('click', function () {
      main.removeChild(errorConteiner);
    });
    onClickClose();
  };

  var renderSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    main.appendChild(successElement);
    document.addEventListener('keydown', onEscapeClose);
    onClickClose();
  };

  var showError = function (message) {
    renderError(message);
  };
  var showSuccess = function () {
    renderSuccess();
  };

  window.message = {
    error: showError,
    success: showSuccess
  };
})();
