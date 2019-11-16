'use strict';
(function () {
  var savedData = null;
  // Отдает копию сохраненных данных
  var getData = function () {
    if (savedData === null) {
      return [];
    }
    return savedData.slice();
  };

  var onSuccess = function (data) {
    savedData = data;
    window.filter.applyFilter(getData());
  };
  var requestData = function () {
    window.backend.load(onSuccess, window.message.showError);
  };
  window.data = {
    getData: getData,
    requestData: requestData,
  };
})();
