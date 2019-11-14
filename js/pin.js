'use strict';
(function () {

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.pin = {
    renderPin: function (details) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = details.location.x + (pinElement.clientWidth / 2) + 'px';
      pinElement.style.top = details.location.y + pinElement.clientHeight + 'px';
      pinElement.querySelector('img').src = details.author.avatar;
      pinElement.querySelector('img').alt = details.offer.title;
      pinElement.addEventListener('click', function () {
        window.card.add(details);
      });
      return pinElement;
    }
  };

})();
