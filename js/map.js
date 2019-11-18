'use strict';
(function () {
  var START_COUNT = 1;
  var HIGH_COUNT = 2;
  var pinList = document.querySelector('.map__pins');
  var clear = function () {
    var mapPins = pinList.children;
    var pinsCount = mapPins.length;
    for (var e = pinsCount - START_COUNT; e >= HIGH_COUNT; e--) {
      mapPins.item(e).remove();
    }
    window.card.close();

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
    fill: fillMap,
    element: document.querySelector('.map'),
    removeClassMapFaded: function () {
      this.element.classList.remove('map--faded');
    },
    addsClassMapFaded: function () {
      this.element.classList.add('map--faded');
    }
  };
})();
