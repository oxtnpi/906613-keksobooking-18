'use strict';
(function () {
  var roomNumber = document.querySelector('#room_number');
  var capasity = document.querySelector('#capacity');
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

  };
  validateCapasity();
  roomNumber.onchange = validateCapasity;
  capasity.onchange = validateCapasity;
})();
