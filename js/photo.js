'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_SIZE = '100%';

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarSRC = avatarPreview.src;

  var imgChooser = document.querySelector('#images');
  var imgContainer = document.querySelector('.ad-form__photo');


  var loadPhoto = function (list, item) {
    var file = list.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        item.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    loadPhoto(avatarChooser, avatarPreview);
  });

  imgChooser.addEventListener('change', function () {
    var newImage = document.createElement('img');
    newImage.style.width = IMAGE_SIZE;
    imgContainer.appendChild(newImage);
    loadPhoto(imgChooser, newImage);
  });
  var clearPhoto = function () {
    var emptyContainer = '';
    avatarPreview.src = avatarSRC;
    imgContainer.innerHTML = emptyContainer;
  };

  window.photo = {
    clear: clearPhoto
  };
})();
