'use strict';
(function () {
  var TITLE_MAX_LENGTH = '100';
  var PRICE_MAX = '1000000';
  var PRICE_MIN = '0';
  var PRICE_TYPE_FLAT_MIN = '1000';
  var PRICE_TYPE_HOUSE_MIN = '5000';
  var PRICE_TYPE_PALACE_MIN = '10000';
  var TYPE_BUNGALO = 'bungalo';
  var TYPE_FLAT = 'flat';
  var TYPE_HOUSE = 'house';
  var TYPE_PALACE = 'palace';
  var ROOM_MAX_VALUE = 3;
  var ROOM_MEDIUM_VALUE = 2;
  var ROOM_MIN_VALUE = 1;
  var ROOM_EMPTY_VALUE = 0;
  var TITLE_MIN_LENGTH = '30';

  var roomNumber = document.querySelector('#room_number');
  var capasity = document.querySelector('#capacity');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var houseTypes = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  window.validate = {
    address: document.querySelector('#address'),
    TYPE_BUNGALO: 'bungalo',
    TYPE_FLAT: 'flat',
    TYPE_HOUSE: 'house',
    TYPE_PALACE: 'palace',
  };

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

    title.required = true;
    title.minLength = TITLE_MIN_LENGTH;
    title.maxLength = TITLE_MAX_LENGTH;

    price.required = true;
    price.max = PRICE_MAX;

    switch (houseTypes.value) {
      case TYPE_BUNGALO:
        price.min = PRICE_MIN;
        price.placeholder = PRICE_MIN;
        break;
      case TYPE_FLAT:
        price.min = PRICE_TYPE_FLAT_MIN;
        price.placeholder = PRICE_TYPE_FLAT_MIN;
        break;
      case TYPE_HOUSE:
        price.min = PRICE_TYPE_HOUSE_MIN;
        price.placeholder = PRICE_TYPE_HOUSE_MIN;
        break;
      case TYPE_PALACE:
        price.min = PRICE_TYPE_PALACE_MIN;
        price.placeholder = PRICE_TYPE_PALACE_MIN;
        break;
    }

    window.validate.address.readOnly = true;
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
  houseTypes.onchange = validateCapasity;
})();
