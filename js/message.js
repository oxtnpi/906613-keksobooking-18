'use strict';
(function () {

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var deleteOnEscape = function (evt) {
    if (evt.key === 'Escape') {
      var successCont = main.querySelector('.success');
      if (successCont) {
        main.removeChild(successCont);
      }
      var errorCont = main.querySelector('.error');
      if (errorCont) {
        main.removeChild(errorCont);
      }
      document.removeEventListener('keydown', deleteOnEscape);
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
    document.addEventListener('keydown', deleteOnEscape);
    errorButton.addEventListener('click', function () {
      main.removeChild(errorConteiner);
    });
  };

  var renderSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    main.appendChild(successElement);
    document.addEventListener('keydown', deleteOnEscape);
  };

  window.message = {
    showError: function (message) {
      renderError(message);
    },
    showSuccess: function () {
      renderSuccess();
    }
  };
})();
