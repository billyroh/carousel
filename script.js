angular.module('carousel', [])
  .run(function($rootScope) {
    numberOfPhotos = 20
    maxWidth = 50
    minWidth = 10
    $rootScope.images = []

    // Fill up the thumbnails
    for(var index = 0; index < numberOfPhotos; index++) {
      $rootScope.images.push("images/photo-" + index + ".jpg")
    }

    $rootScope.handleCursor = function(index, event) {
      this.updatePreview(index);
      this.useCoordinates(index, event);
    }

    // Update the preview with the proper image
    $rootScope.updatePreview = function(index) {
      preview = document.getElementById('preview')
      photoSource = 'images/photo-' + index + '.jpg'
      preview.style.backgroundImage = 'url("' + photoSource + '")'
    }

    $rootScope.useCoordinates = function(index, event) {
      cursorX = event.screenX
      element = document.getElementById('photo-' + index)
      element.style.width = maxWidth
      adjacentDepth = 3

      for (var adjacentIndex = 1; adjacentIndex <= adjacentDepth; adjacentIndex++) {
        if ((index - adjacentDepth) >= 0) {
          this.checkLeftElement(index, cursorX, adjacentIndex)
        }
        if ((index + adjacentDepth) <= numberOfPhotos - 1) {
          this.checkRightElement(index, cursorX, adjacentIndex)
        }
      }
    }

    $rootScope.checkLeftElement = function(index, cursorX, adjacentIndex) {
      // Select the left-adjacent element
      element = document.getElementById('photo-' + (index - adjacentIndex))

      // Calculate the distance between the cursor at the right edge of the element.
      distance = cursorX - element.getBoundingClientRect().right

      // Scale the element's width based on that distance.
      percentage = 1 - Math.abs(distance / maxWidth)
      desiredWidth =
      console.log("index: " + adjacentIndex)
      console.log("width: " + percentage * maxWidth)
      console.log("thing: " + Math.abs(distance / maxWidth))
      console.log("")
      if (percentage * maxWidth < minWidth) {
        element.style.width = minWidth
      } else {
        element.style.width = percentage * maxWidth
      }
    }

    $rootScope.checkRightElement = function(index, cursorX, adjacentIndex) {
      // Select the right-adjacent element
      element = document.getElementById('photo-' + (index + adjacentIndex))

      // Calculate the distance between the cursor at the left edge of the element.
      distance = element.getBoundingClientRect().left - cursorX

      // Scale the element's padding based on that distance.
      percentage = 1 - Math.abs(distance / maxWidth)
      if (percentage * maxWidth < minWidth) {
        element.style.width = minWidth
      } else {
        element.style.width = percentage * maxWidth
      }
    }

    $rootScope.handleMouseLeave = function(index) {
      return
    }
  })
