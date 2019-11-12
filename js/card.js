'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var filterscontainer = document.querySelector('.map__filters-container');


  window.card = {
    render: function (data) {
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = data.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = data.offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests;
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      cardElement.querySelector('.popup__features').textContent = data.offer.features;
      cardElement.querySelector('.popup__description').textContent = data.offer.description;
      cardElement.querySelector('.popup__photos').src = data.offer.photos;
      cardElement.querySelector('.popup__avatar').src = data.author.avatar;

      return cardElement;
    },
    add: function (data) {
      var fragment = document.createDocumentFragment();

      fragment.appendChild(window.card.render(data));
      window.map.mapElement.insertBefore(fragment, filterscontainer);
    }
  };
  window.card.add(window.data.generateOffers()[0]);

})();
