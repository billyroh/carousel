angular.module('carousel', [])
  .run(function($rootScope) {
    $rootScope.images = []
    numberOfPhotos = 20
    for(var index = 1; index <= numberOfPhotos; index++) {
      $rootScope.images.push("images/photo-" + index + ".jpg")
    }
  })
