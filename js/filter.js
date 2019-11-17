'use strict';
(function () {
  var FILTER_DEFAULT_VALUE = 'any';
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var PRICE_TYPE_LOW = 'low';
  var PRICE_TYPE_MIDDLE = 'middle';
  var PRICE_TYPE_HIGH = 'high';
  var PINS_COUNT = 5;

  var type = FILTER_DEFAULT_VALUE;
  var price = FILTER_DEFAULT_VALUE;
  var rooms = FILTER_DEFAULT_VALUE;
  var guests = FILTER_DEFAULT_VALUE;

  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var wifiFilter = document.querySelector('#filter-wifi');
  var dishwasherFilter = document.querySelector('#filter-dishwasher');
  var parkingFilter = document.querySelector('#filter-parking');
  var washerFilter = document.querySelector('#filter-washer');
  var elevatorFilter = document.querySelector('#filter-elevator');
  var conditionerFilter = document.querySelector('#filter-conditioner');
  var typeFilter = document.querySelector('#housing-type');

  var priceCompare = function (priceRange, priceValue) {
    switch (priceRange) {
      case PRICE_TYPE_MIDDLE:
        return priceValue >= LOW_PRICE && priceValue <= HIGH_PRICE;
      case PRICE_TYPE_LOW:
        return priceValue < LOW_PRICE;
      case PRICE_TYPE_HIGH:
        return priceValue > HIGH_PRICE;
      default:
        return true;
    }
  };

  var applyFilter = function () {
    var getRightValue = function (item) {
      if (!item.offer) {
        return false;
      }
      if (type !== FILTER_DEFAULT_VALUE && item.offer.type !== type) {
        return false;
      }
      if (price !== FILTER_DEFAULT_VALUE && !priceCompare(price, item.offer.price)) {
        return false;
      }
      if (rooms !== FILTER_DEFAULT_VALUE && item.offer.rooms !== parseInt(rooms, 10)) {
        return false;
      }
      if (guests !== FILTER_DEFAULT_VALUE && item.offer.guests !== parseInt(guests, 10)) {
        return false;
      }
      if (wifiFilter.checked && !item.offer.features.includes(wifiFilter.value)) {
        return false;
      }
      if (dishwasherFilter.checked && !item.offer.features.includes(dishwasherFilter.value)) {
        return false;
      }
      if (parkingFilter.checked && !item.offer.features.includes(parkingFilter.value)) {
        return false;
      }
      if (washerFilter.checked && !item.offer.features.includes(washerFilter.value)) {
        return false;
      }
      if (elevatorFilter.checked && !item.offer.features.includes(elevatorFilter.value)) {
        return false;
      }
      if (conditionerFilter.checked && !item.offer.features.includes(conditionerFilter.value)) {
        return false;
      }
      return true;
    };
    var filteredData = window.data.get().filter(getRightValue).slice(0, PINS_COUNT);
    window.map.fill(filteredData);
  };

  priceFilter.addEventListener('change', window.utils.debounce(function (evt) {
    price = evt.target.value;
    applyFilter();
  }));
  roomsFilter.addEventListener('change', window.utils.debounce(function (evt) {
    rooms = evt.target.value;
    applyFilter();
  }));

  guestsFilter.addEventListener('change', window.utils.debounce(function (evt) {
    guests = evt.target.value;
    applyFilter();
  }));

  wifiFilter.addEventListener('change', window.utils.debounce(applyFilter));
  dishwasherFilter.addEventListener('change', window.utils.debounce(applyFilter));
  parkingFilter.addEventListener('change', window.utils.debounce(applyFilter));
  washerFilter.addEventListener('change', window.utils.debounce(applyFilter));
  elevatorFilter.addEventListener('change', window.utils.debounce(applyFilter));
  conditionerFilter.addEventListener('change', window.utils.debounce(applyFilter));
  typeFilter.addEventListener('change', window.utils.debounce(function (evt) {
    type = evt.target.value;
    applyFilter();
  }));

  var resetFilter = function () {
    type = FILTER_DEFAULT_VALUE;
    typeFilter.value = type;
    price = FILTER_DEFAULT_VALUE;
    priceFilter.value = price;
    rooms = FILTER_DEFAULT_VALUE;
    roomsFilter.value = rooms;
    guests = FILTER_DEFAULT_VALUE;
    guestsFilter.value = guests;
    wifiFilter.checked = false;
    dishwasherFilter.checked = false;
    parkingFilter.checked = false;
    washerFilter.checked = false;
    elevatorFilter.checked = false;
    conditionerFilter.checked = false;
  };

  window.filter = {
    apply: applyFilter,
    reset: resetFilter
  };
})();
