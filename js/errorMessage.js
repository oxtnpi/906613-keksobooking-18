'use strict';
(function () {

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('.main');
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

  window.errorMessage = {
    show: function (message) {
      renderError(message);
    }
  };
})();
