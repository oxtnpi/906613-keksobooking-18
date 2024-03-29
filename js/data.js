'use strict';
(function () {
  var savedData = null;

  var getData = function () {
    if (savedData === null) {
      return [];
    }
    return savedData.slice();
  };

  var onSuccess = function (data) {
    savedData = data;
    window.filter.apply(getData());
  };
  var requestData = function () {
    window.backend.load(onSuccess, window.message.error);
  };
  window.data = {
    get: getData,
    request: requestData,
  };
})();
