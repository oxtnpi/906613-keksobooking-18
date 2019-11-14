'use strict';
(function () {
  window.validate = {
    roomNumber: document.querySelector('#room_number'),
    capasity: document.querySelector('#capacity'),
    title: document.querySelector('#title'),
    price: document.querySelector('#price'),
    houseType: document.querySelector('#type'),
    address: document.querySelector('#address'),
    timeIn: document.querySelector('#timein'),
    timeOut: document.querySelector('#timeout')
  };
  var ROOM_MAX_VALUE = 3;
  var ROOM_MEDIUM_VALUE = 2;
  var ROOM_MIN_VALUE = 1;
  var ROOM_EMPTY_VALUE = 0;

  var validateCapasity = function () {
    if (parseInt(window.validate.roomNumber.value, 10) > ROOM_MAX_VALUE) {
      if (parseInt(window.validate.capasity.value, 10) === ROOM_EMPTY_VALUE) {
        window.validate.capasity.setCustomValidity('');
      } else {
        window.validate.capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «не для гостей»');
      }
    }
    if (parseInt(window.validate.roomNumber.value, 10) === ROOM_MIN_VALUE) {
      if (parseInt(window.validate.capasity.value, 10) === ROOM_MIN_VALUE) {
        window.validate.capasity.setCustomValidity('');
      } else {
        window.validate.capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 1 гостя»');
      }
    }
    if (parseInt(window.validate.roomNumber.value, 10) === ROOM_MEDIUM_VALUE) {
      if (parseInt(window.validate.capasity.value, 10) <= ROOM_MEDIUM_VALUE && parseInt(window.validate.capasity.value, 10) !== ROOM_EMPTY_VALUE) {
        window.validate.capasity.setCustomValidity('');
      } else {
        window.validate.capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 2 гостей» или «для 1 гостя»');
      }
    }
    if (parseInt(window.validate.roomNumber.value, 10) === ROOM_MAX_VALUE) {
      if (parseInt(window.validate.capasity.value, 10) <= ROOM_MAX_VALUE && parseInt(window.validate.capasity.value, 10) !== ROOM_EMPTY_VALUE) {
        window.validate.capasity.setCustomValidity('');
      } else {
        window.validate.capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      }
    }

    window.validate.title.required = 'true';
    window.validate.title.minLength = '30';
    window.validate.title.maxLength = '100';

    window.validate.price.required = 'true';
    window.validate.price.max = '1000000';

    switch (window.validate.houseType.value) {
      case 'bungalo':
        window.validate.price.min = '0';
        window.validate.price.placeholder = '0';
        break;
      case 'flat':
        window.validate.price.min = '1000';
        window.validate.price.placeholder = '1000';
        break;
      case 'house':
        window.validate.price.min = '5000';
        window.validate.price.placeholder = '5000';
        break;
      case 'palace':
        window.validate.price.min = '10000';
        window.validate.price.placeholder = '10000';
        break;
    }

    window.validate.address.readOnly = 'true';
  };

  validateCapasity();

  window.validate.timeIn.addEventListener('change', function () {
    window.validate.timeOut.value = window.validate.timeIn.value;
  });
  window.validate.timeOut.addEventListener('change', function () {
    window.validate.timeIn.value = window.validate.timeOut.value;
  });
  window.validate.roomNumber.onchange = validateCapasity;
  window.validate.capasity.onchange = validateCapasity;
  window.validate.houseType.onchange = validateCapasity;
})();
