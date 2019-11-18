'use strict';
(function () {
  var TYPE_VALUE_BUNGALO = 'Бунгало';
  var TYPE_VALUE_FLAT = 'Квартира';
  var TYPE_VALUE_HOUSE = 'Дом';
  var TYPE_VALUE_PALACE = 'Дворец';
  var MIN_LENGTH = 0;

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var filterscontainer = document.querySelector('.map__filters-container');
  var openedCard;

  var closeCard = function () {
    if (openedCard) {
      openedCard.remove();
      openedCard = undefined;
      window.pin.closeActive();
    }
  };

  var render = function (data) {
    var cardElement = cardTemplate.cloneNode(true);

    if (openedCard === undefined) {
      openedCard = cardElement;
    } else {
      closeCard();
    }
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    var houseType;
    switch (data.offer.type) {
      case window.validate.TYPE_FLAT:
        houseType = TYPE_VALUE_FLAT;
        break;
      case window.validate.TYPE_BUNGALO:
        houseType = TYPE_VALUE_BUNGALO;
        break;
      case window.validate.TYPE_HOUSE:
        houseType = TYPE_VALUE_HOUSE;
        break;
      case window.validate.TYPE_PALACE:
        houseType = TYPE_VALUE_PALACE;
        break;
    }
    cardElement.querySelector('.popup__type').textContent = houseType;
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    var features = cardElement.querySelector('.popup__features');
    if (data.offer.features.length === MIN_LENGTH) {
      cardElement.removeChild(features);
    } else {
      var feature = cardElement.querySelector('.popup__feature');
      var featureEmpty = '';
      var featureTemplate = feature.cloneNode();
      features.innerHTML = featureEmpty;
      data.offer.features.forEach(function (it) {
        var newFeature = featureTemplate.cloneNode();
        newFeature.classList.add('popup__feature--' + it);
        features.appendChild(newFeature);
      });
    }


    var popupPhotos = cardElement.querySelector('.popup__photos');
    if (data.offer.photos.length === MIN_LENGTH) {
      cardElement.removeChild(popupPhotos);
    } else {
      var popupPhoto = cardElement.querySelector('.popup__photo');
      var photoTemplate = popupPhoto.cloneNode();
      popupPhotos.removeChild(popupPhoto);
      data.offer.photos.forEach(function (item) {
        var newPhoto = photoTemplate.cloneNode();
        newPhoto.src = item;
        popupPhotos.appendChild(newPhoto);
      });
    }


    var closeButton = cardElement.querySelector('.popup__close');
    closeButton.addEventListener('click', closeCard);

    var closeOnEscape = function (evt) {
      if (evt.key === 'Escape') {
        closeCard();
        document.removeEventListener('keydown', closeOnEscape);
      }
    };
    document.addEventListener('keydown', closeOnEscape);

    return cardElement;
  };

  var add = function (arr) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(window.card.render(arr));
    window.map.element.insertBefore(fragment, filterscontainer);
  };

  window.card = {
    close: closeCard,
    render: render,
    add: add
  };

})();
