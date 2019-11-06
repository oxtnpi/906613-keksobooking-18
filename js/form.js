'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterList = mapFilters.querySelectorAll('.map__filter');
  var mapFeatures = mapFilters.querySelector('.map__features');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('input[name = address]');
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 44;

  var disableForm = function (list) {
    list.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
  };

  var enableForm = function (list) {
    list.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var disableAll = function () {
    adForm.classList.add('ad-form--disabled');
    disableForm(mapFilterList);
    disableForm([mapFeatures]);
    disableForm([adFormHeader]);
    disableForm(adFormElements);
  };

  var enableAll = function () {
    adForm.classList.remove('ad-form--disabled');
    enableForm(mapFilterList);
    enableForm([mapFeatures]);
    enableForm([adFormHeader]);
    enableForm(adFormElements);
  };

  disableAll();

  var addAddressValue = function (pinWidth, pinHeight) {
    var leftValue = Math.round(parseInt(mapPinMain.style.left, 10));
    var topValue = Math.round(parseInt(mapPinMain.style.top, 10));
    addressInput.value = (leftValue + (pinWidth / 2)) + ', ' + (topValue + pinHeight);
  };
  addAddressValue(0, 0);

  mapPinMain.addEventListener('mousedown', function () {
    window.map.removeClassMapFaded();
    enableAll();
    addAddressValue(PIN_WIDTH, PIN_HEIGHT);
    window.backend.load(window.map.fillMap, window.errorMessage.show);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      enableAll();
    }
  });

})();

