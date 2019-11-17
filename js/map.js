'use strict';
(function () {
  var pinList = document.querySelector('.map__pins');
  var clear = function () {
    var maplist = pinList.children;
    var pinsCount = maplist.length;
    for (var e = pinsCount - 1; e >= 2; e--) {
      maplist.item(e).remove();
    }
  };

  var fillMap = function (data) {
    window.map.clear();
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < data.length; k++) {
      fragment.appendChild(window.pin.render(data[k]));
    }
    pinList.appendChild(fragment);
  };

  window.map = {
    clear: clear,
    fillMap: fillMap,
    mapElement: document.querySelector('.map'),
    removeClassMapFaded: function () {
      this.mapElement.classList.remove('map--faded');
    },
    addsClassMapFaded: function () {
      this.mapElement.classList.add('map--faded');
    }
  };
})();
