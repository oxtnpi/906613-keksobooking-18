'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKING_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var SHUFFLE_COEFFICIENT = 0.5;
var MAP_OFFSET = 50;
var MAP_Y_BOUNDS = [130, 630];
var PRICE_BOUNDS = [100, 30000];
var ROOMS_GUESTS_BOUNDS = [1, 7];
var OFFERS_COUNT = 8;

var map = document.querySelector('.map');
var removeClassMapFaded = function () {
  map.classList.remove('map--faded');
};

var pinList = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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
    x: getRandomInBounds(MAP_OFFSET, map.clientWidth - MAP_OFFSET),
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

var generateOffers = function () {
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
};


var renderPin = function (details) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = details.location.x + (pinElement.clientWidth / 2) + 'px';
  pinElement.style.top = details.location.y + pinElement.clientHeight + 'px';
  pinElement.querySelector('img').src = details.author.avatar;
  pinElement.querySelector('img').alt = details.offer.title;
  return pinElement;
};

var clearMap = function () {
  var maplist = pinList.children;
  for (var e = 2; e < maplist.length; e++) {
    maplist.item(e).remove();
  }
};

var fillMap = function (data) {
  clearMap();
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < data.length; k++) {
    fragment.appendChild(renderPin(data[k]));
  }
  pinList.appendChild(fragment);
};

var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var mapFilterList = mapFilters.querySelectorAll('.map__filter');
var mapFeatures = mapFilters.querySelector('.map__features');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElements = document.querySelectorAll('.ad-form__element');
var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('input[name = address]');
var PIN_WIDTH = 40;
var PIN_HEIGHT = 44;

var disableForm = function (list) {
  list.forEach(function (item) {
    item.setAttribute('disabled', 'true');
  });
};

var enableForm = function (list) {
  list.forEach(function (item) {
    item.removeAttribute('disabled');
  });
};

var disableAll = function () {
  adForm.classList.add('ad-form--disabled');
  disableForm(mapFilterList);
  disableForm([mapFeatures]);
  disableForm([adFormHeader]);
  disableForm(adFormElements);
};

var enableAll = function () {
  adForm.classList.remove('ad-form--disabled');
  enableForm(mapFilterList);
  enableForm([mapFeatures]);
  enableForm([adFormHeader]);
  enableForm(adFormElements);
};

disableAll();

var addAddressValue = function (pinWidth, pinHeight) {
  var leftValue = Math.round(parseInt(mapPinMain.style.left, 10));
  var topValue = Math.round(parseInt(mapPinMain.style.top, 10));
  addressInput.value = (leftValue + (pinWidth / 2)) + ', ' + (topValue + pinHeight);
};
addAddressValue(0, 0);

mapPinMain.addEventListener('mousedown', function () {
  removeClassMapFaded();
  enableAll();
  addAddressValue(PIN_WIDTH, PIN_HEIGHT);
  fillMap(generateOffers());
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    enableAll();
  }
});

var roomNumber = document.querySelector('#room_number');
var capasity = document.querySelector('#capacity');
var ROOM_MAX_VALUE = 3;
var ROOM_MEDIUM_VALUE = 2;
var ROOM_MIN_VALUE = 1;
var ROOM_EMPTY_VALUE = 0;
var validateCapasity = function () {

  if (parseInt(roomNumber.value, 10) > ROOM_MAX_VALUE) {
    if (parseInt(capasity.value, 10) === ROOM_EMPTY_VALUE) {
      capasity.setCustomValidity('');
    } else {
      capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «не для гостей»');
    }
  }
  if (parseInt(roomNumber.value, 10) === ROOM_MIN_VALUE) {
    if (parseInt(capasity.value, 10) === ROOM_MIN_VALUE) {
      capasity.setCustomValidity('');
    } else {
      capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 1 гостя»');
    }
  }
  if (parseInt(roomNumber.value, 10) === ROOM_MEDIUM_VALUE) {
    if (parseInt(capasity.value, 10) <= ROOM_MEDIUM_VALUE && parseInt(capasity.value, 10) !== ROOM_EMPTY_VALUE) {
      capasity.setCustomValidity('');
    } else {
      capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 2 гостей» или «для 1 гостя»');
    }
  }

  if (parseInt(roomNumber.value, 10) === ROOM_MAX_VALUE) {
    if (parseInt(capasity.value, 10) <= ROOM_MAX_VALUE && parseInt(capasity.value, 10) !== ROOM_EMPTY_VALUE) {
      capasity.setCustomValidity('');
    } else {
      capasity.setCustomValidity('Для выбранного колличества комнат, колличество гостей равно — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    }
  }

};
validateCapasity();
roomNumber.onchange = validateCapasity;
capasity.onchange = validateCapasity;
