'use strict';
(function () {

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

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
    errorButton.addEventListener('click', function () {
      main.removeChild(errorConteiner);
    });
  };

  var renderSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    main.appendChild(successElement);
    var successConteiner = document.querySelector('.success');

    var deleteOnEscape = function (evt) {
      if (evt.key === 'Escape') {
        main.removeChild(successConteiner);
        document.removeEventListener('keydown', deleteOnEscape);
      }
    };
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
