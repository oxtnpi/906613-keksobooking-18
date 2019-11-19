'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapSection = document.querySelector('.map');
  var PIN_WIDTH = 40;
  var NEEDLE_WIDTH = PIN_WIDTH / 2;
  var PIN_HEIGHT = 44;
  var MIN_X = 0;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var DEFAULT_LEFT = '570px';
  var DEFAULT_TOP = '375px';

  var addAddressValue = function (pinWidth, pinHeight) {
    var leftValue = Math.round(parseInt(mapPinMain.style.left, 10));
    var topValue = Math.round(parseInt(mapPinMain.style.top, 10));
    window.address.value = (leftValue + pinWidth) + ', ' + (topValue + pinHeight);
  };
  addAddressValue(0, 0);

  var start = function () {
    mapPinMain.style.left = DEFAULT_LEFT;
    mapPinMain.style.top = DEFAULT_TOP;
    addAddressValue(0, 0);
  };

  window.mainPin = {
    start: start
  };

  var activate = function () {
    window.map.removeClassMapFaded();
    window.form.enableAll();
    window.data.request();
  };

  mapPinMain.addEventListener('mousedown', activate);

  var activateOnEnter = function (evt) {
    if (evt.key === 'Enter') {
      window.form.enableAll();
      mapPinMain.removeEventListener('keydown', activateOnEnter);
    }
  };

  mapPinMain.addEventListener('keydown', activateOnEnter);

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
      var shifts = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var endCoords = {
        y: mapPinMain.offsetTop - shifts.y,
        x: mapPinMain.offsetLeft - shifts.x
      };

      if (endCoords.x >= MIN_X - NEEDLE_WIDTH && endCoords.x <= mapSection.offsetWidth - NEEDLE_WIDTH) {
        mapPinMain.style.left = endCoords.x + 'px';
      }

      if (endCoords.y >= MIN_Y - PIN_HEIGHT && endCoords.y <= MAX_Y - PIN_HEIGHT) {
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
