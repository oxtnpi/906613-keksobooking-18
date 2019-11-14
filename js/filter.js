'use strict';
(function () {
  var typeFilter = document.querySelector('#housing-type');
  typeFilter.addEventListener('change', function (evt) {
    window.filter.type = evt.target.value;
    window.filter.applyFilter();
  });
  window.filter = {
    savedData: null,
    type: 'any',
    applyFilter: function (data) {
      if (data) {
        window.savedData = data.slice();
      }
      var getRightValue = function (item) {
        if (window.filter.type !== 'any') {
          return item.offer.type === window.filter.type;
        }
        return true;
      };
      var filteredData = window.savedData.filter(getRightValue).slice(0, 5);
      window.map.fillMap(filteredData);
    },
  };


})();
