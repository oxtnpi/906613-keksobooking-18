'use strict';
(function () {
  var pinList = document.querySelector('.map__pins');

  var clearMap = function () {
    var maplist = pinList.children;
    for (var e = 2; e < maplist.length; e++) {
      maplist.item(e).remove();
    }
  };

  window.map = {
    mapElement: document.querySelector('.map'),

    removeClassMapFaded: function () {
      this.mapElement.classList.remove('map--faded');
    },
    fillMap: function (data) {
      clearMap();
      var fragment = document.createDocumentFragment();
      for (var k = 0; k < data.length; k++) {
        fragment.appendChild(window.pin.renderPin(data[k]));
      }
      pinList.appendChild(fragment);
    }

  };

})();
