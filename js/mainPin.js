'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapSection = document.querySelector('.map');
  var PIN_WIDTH = 40;
  var NEEDLE_WIDTH = PIN_WIDTH / 2;
  var PIN_HEIGHT = 44;
  var MIN_X = 1;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var addAddressValue = function (pinWidth, pinHeight) {
    var leftValue = Math.round(parseInt(mapPinMain.style.left, 10));
    var topValue = Math.round(parseInt(mapPinMain.style.top, 10));
    window.validate.address.value = (leftValue + pinWidth) + ', ' + (topValue + pinHeight);
  };
  addAddressValue(0, 0);

  mapPinMain.addEventListener('mousedown', function () {
    window.map.removeClassMapFaded();
    window.form.enableAll();


    window.backend.load(window.filter.applyFilter, window.errorMessage.show);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.form.enableAll();
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var endCoords = {
        y: mapPinMain.offsetTop - shift.y,
        x: mapPinMain.offsetLeft - shift.x
      };

      if (endCoords.x >= MIN_X - NEEDLE_WIDTH && endCoords.x < mapSection.offsetWidth - PIN_WIDTH) {
        mapPinMain.style.left = endCoords.x + 'px';
      }

      if (endCoords.y >= MIN_Y && endCoords.y <= MAX_Y) {
        mapPinMain.style.top = endCoords.y + 'px';
      }
      addAddressValue(NEEDLE_WIDTH, PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (onClickEvt) {
          onClickEvt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
