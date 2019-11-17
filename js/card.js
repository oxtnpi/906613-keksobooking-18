'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var filterscontainer = document.querySelector('.map__filters-container');

  var openedCard;

  window.card = {
    render: function (data) {
      var cardElement = cardTemplate.cloneNode(true);
      var deleteCard = function () {
        openedCard.remove();
        openedCard = undefined;
      };
      if (openedCard === undefined) {
        openedCard = cardElement;
      } else {
        deleteCard();
        openedCard = cardElement;
      }
      cardElement.querySelector('.popup__title').textContent = data.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

      var houseType;
      switch (data.offer.type) {
        case 'flat':
          houseType = 'Квартира';
          break;
        case 'bungalo':
          houseType = 'Бунгало';
          break;
        case 'house':
          houseType = 'Дом';
          break;
        case 'palace':
          houseType = 'Дворец';
          break;
      }
      cardElement.querySelector('.popup__type').textContent = houseType;
      cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests;
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      cardElement.querySelector('.popup__features').textContent = data.offer.features;
      cardElement.querySelector('.popup__description').textContent = data.offer.description;
      cardElement.querySelector('.popup__avatar').src = data.author.avatar;
      var popupPhotos = cardElement.querySelector('.popup__photos');
      var popupPhoto = cardElement.querySelector('.popup__photo');
      var photoTemplate = popupPhoto.cloneNode();
      popupPhotos.removeChild(popupPhoto);
      data.offer.photos.forEach(function (item) {
        var newPhoto = photoTemplate.cloneNode();
        newPhoto.src = item;
        popupPhotos.appendChild(newPhoto);
      });

      var closeButton = cardElement.querySelector('.popup__close');
      closeButton.addEventListener('click', deleteCard);

      var closeOnEscape = function (evt) {
        if (evt.key === 'Escape') {
          deleteCard();
          document.removeEventListener('keydown', closeOnEscape);
        }
      };
      document.addEventListener('keydown', closeOnEscape);


      return cardElement;
    },
    add: function (data) {
      var fragment = document.createDocumentFragment();

      fragment.appendChild(window.card.render(data));
      window.map.mapElement.insertBefore(fragment, filterscontainer);
    }
  };
})();
