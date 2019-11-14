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

  window.form = {
    disableAll: function () {
      adForm.classList.add('ad-form--disabled');
      disableForm(mapFilterList);
      disableForm([mapFeatures]);
      disableForm([adFormHeader]);
      disableForm(adFormElements);
    },
    enableAll: function () {
      adForm.classList.remove('ad-form--disabled');
      enableForm(mapFilterList);
      enableForm([mapFeatures]);
      enableForm([adFormHeader]);
      enableForm(adFormElements);
    }
  };
  window.form.disableAll();

})();

