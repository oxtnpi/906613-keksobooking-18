'use strict';
(function () {
  var type = 'any';

  var typeFilter = document.querySelector('#housing-type');
  typeFilter.addEventListener('change', function (evt) {
    type = evt.target.value;
    window.filter.applyFilter();
  });

  var applyFilter = function () {
    var getRightValue = function (item) {
      if (type !== 'any') {
        return item.offer.type === type;
      }
      return true;
    };
    var filteredData = window.data.getData().filter(getRightValue).slice(0, 5);
    window.map.fillMap(filteredData);
  };

  window.filter = {
    applyFilter: applyFilter,
  };
})();
