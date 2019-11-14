'use strict';
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKING_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PRICE_BOUNDS = [100, 99999];
  var ROOMS_GUESTS_BOUNDS = [1, 3];
  var OFFERS_COUNT = 8;
  var SHUFFLE_COEFFICIENT = 0.5;
  var MAP_OFFSET = 50;
  var MAP_Y_BOUNDS = [130, 630];
  var clientWidth = window.map.mapElement.clientWidth;

  function shuffle(array) {
    return array.sort(function () {
      return Math.random() - SHUFFLE_COEFFICIENT;
    });
  }

  var getRandomInBounds = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomFromArray = function (arr) {
    return arr[getRandomInBounds(0, arr.length - 1)];
  };

  var getRandomArrayFromArray = function (arr) {
    var result = [];
    var suffledArr = shuffle(arr);
    for (var j = 0; j < getRandomInBounds(1, arr.length); j++) {
      result.push(suffledArr[j]);
    }
    return result;
  };


  var generateAvatar = function (j) {
    return {
      avatar: 'img/avatars/user' + '0' + j + '.png'
    };
  };


  var generateLocation = function () {
    return {
      x: getRandomInBounds(MAP_OFFSET, clientWidth - MAP_OFFSET),
      y: getRandomInBounds(MAP_Y_BOUNDS[0], MAP_Y_BOUNDS[1])
    };
  };

  var generateOffer = function (location) {
    return {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: getRandomInBounds(PRICE_BOUNDS[0], PRICE_BOUNDS[1]),
      type: getRandomFromArray(TYPES),
      rooms: getRandomInBounds(ROOMS_GUESTS_BOUNDS[0], ROOMS_GUESTS_BOUNDS[1]),
      guests: getRandomInBounds(ROOMS_GUESTS_BOUNDS[0], ROOMS_GUESTS_BOUNDS[1]),
      checkin: getRandomFromArray(CHECKING_TIMES),
      checkout: getRandomFromArray(CHECKING_TIMES),
      features: getRandomArrayFromArray(FEATURES),
      description: 'Описание',
      photos: getRandomArrayFromArray(PHOTOS)
    };
  };

  window.data = {

    generateOffers: function () {
      var result = [];
      for (var i = 1; i <= OFFERS_COUNT; i++) {
        var author = generateAvatar(i);
        var location = generateLocation();
        var offer = generateOffer(location);

        result.push({
          author: author,
          offer: offer,
          location: location
        });
      }
      return result;
    }
  };


})();
