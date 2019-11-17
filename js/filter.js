'use strict';
(function () {
  var type = 'any';
  var price = 'any';
  var rooms = 'any';
  var guests = 'any';
  var priceFilter = document.querySelector('#housing-price');
  var priceCompare = function (priceRange, priceValue) {
    switch (priceRange) {
      case 'middle':
        return priceValue >= 10000 && price <= 50000;
      case 'low':
        return priceValue < 10000;
      case 'high':
        return priceValue > 50000;
      default:
        return true;
    }
  };
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var wifiFilter = document.querySelector('#filter-wifi');
  var dishwasherFilter = document.querySelector('#filter-dishwasher');
  var parkingFilter = document.querySelector('#filter-parking');
  var washerFilter = document.querySelector('#filter-washer');
  var elevatorFilter = document.querySelector('#filter-elevator');
  var conditionerFilter = document.querySelector('#filter-conditioner');
  var typeFilter = document.querySelector('#housing-type');


  var applyFilter = function () {
    var getRightValue = function (item) {
      if (type !== 'any' && item.offer.type !== type) {
        return false;
      }
      if (price !== 'any' && !priceCompare(price, item.offer.price)) {
        return false;
      }
      if (rooms !== 'any' && item.offer.rooms !== parseInt(rooms, 10)) {
        return false;
      }
      if (guests !== 'any' && item.offer.guests !== parseInt(guests, 10)) {
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
    var filteredData = window.data.getData().filter(getRightValue).slice(0, 5);
    window.map.fillMap(filteredData);
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
  window.filter = {
    applyFilter: applyFilter,
  };
})();
