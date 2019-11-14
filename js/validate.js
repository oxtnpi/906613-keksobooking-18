'use strict';
(function () {
  var roomNumber = document.querySelector('#room_number');
  var capasity = document.querySelector('#capacity');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var houseType = document.querySelector('#type');
  var address = document.querySelector('#address');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var ROOM_MAX_VALUE = 3;
  var ROOM_MEDIUM_VALUE = 2;
  var ROOM_MIN_VALUE = 1;
  var ROOM_EMPTY_VALUE = 0;

  var validateCapasity = function () {
    if (parseInt(roomNumber.value, 10) > ROOM_MAX_VALUE) {
      if (parseInt(capasity.value, 10) === ROOM_EMPTY_VALUE) {
        capasity.setCustomValidity('');
      } else {
        capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «не для гостей»');
      }
    }
    if (parseInt(roomNumber.value, 10) === ROOM_MIN_VALUE) {
      if (parseInt(capasity.value, 10) === ROOM_MIN_VALUE) {
        capasity.setCustomValidity('');
      } else {
        capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 1 гостя»');
      }
    }
    if (parseInt(roomNumber.value, 10) === ROOM_MEDIUM_VALUE) {
      if (parseInt(capasity.value, 10) <= ROOM_MEDIUM_VALUE && parseInt(capasity.value, 10) !== ROOM_EMPTY_VALUE) {
        capasity.setCustomValidity('');
      } else {
        capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 2 гостей» или «для 1 гостя»');
      }
    }
    if (parseInt(roomNumber.value, 10) === ROOM_MAX_VALUE) {
      if (parseInt(capasity.value, 10) <= ROOM_MAX_VALUE && parseInt(capasity.value, 10) !== ROOM_EMPTY_VALUE) {
        capasity.setCustomValidity('');
      } else {
        capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      }
    }

    title.required = 'true';
    title.minLength = '30';
    title.maxLength = '100';

    price.required = 'true';
    price.max = '1000000';

    switch (houseType.value) {
      case 'bungalo':
        price.min = '0';
        price.placeholder = '0';
        break;
      case 'flat':
        price.min = '1000';
        price.placeholder = '1000';
        break;
      case 'house':
        price.min = '5000';
        price.placeholder = '5000';
        break;
      case 'palace':
        price.min = '10000';
        price.placeholder = '10000';
        break;
    }

    address.readOnly = 'true';
  };

  validateCapasity();

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
  roomNumber.onchange = validateCapasity;
  capasity.onchange = validateCapasity;
  houseType.onchange = validateCapasity;
})();
