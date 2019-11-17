'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterList = mapFilters.querySelectorAll('.map__filter');
  var mapFeatures = mapFilters.querySelector('.map__features');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');

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

  window.form = {
    disableAll: disableAll,
    enableAll: enableAll
  };

  disableAll();

  var onSuccess = function () {
    window.message.showSuccess();
    window.form.disableAll();
    window.map.addsClassMapFaded();
    window.map.clear();
    adForm.reset();
  };

  var onFail = function (err) {
    window.message.showError(err);
  };
  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSuccess, onFail);
    evt.preventDefault();
  });
})();

