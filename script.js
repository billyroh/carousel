// Variables
var widthString = d3.select('#wrapper').style('width'),
    width = Number(widthString.substring(0, widthString.length - 2)),
    height = 50.
    scalingFactor = 2;

// Set up fisheye scale
var scale = d3.fisheye.scale(d3.scale.linear)
                    .domain([0, thumbnailSet.length])
                    .range([0, width])

// Set up list
var list = d3.select('#list')

// Display thumbnails
var thumbnail = list.selectAll('div')
  .data(thumbnailSet)
  .enter()
  .append('div')
    .attr('class', 'thumbnail')
    .style('width', function(d, i) { return scale(i + 1) - scale(i); })
    .style('height', height)
    .style('background-image', function(d) { return 'url(' + d + ')' })
    .on('mousemove', function(d, i) {
      d3.select('#preview').style('background-image', 'url(' + photoSet[i] +')');
    });

// Scale thumbnails
list.on('mousemove', function() { scaleThumbnailsDesktop(d3.mouse(this)[0]); });
list.on('touchmove', function() { scaleThumbnailsMobile(d3.touches(this)[0][0]); });

function scaleThumbnailsDesktop(coordinate) {
  scale.distortion(scalingFactor).focus(coordinate);
  thumbnail.style('width', function(d , i) {
    return scale(i + 1) - scale(i);
  });
}

function scaleThumbnailsMobile(coordinate) {
  var previewHasUpdated = false,
      margin = 1,
      totalWidth = 0;
  scale.distortion(scalingFactor).focus(coordinate);
  thumbnail.style('width', function(d , i) {
    // Get the thumbnail at the coordinate
    var currentWidth = scale(i + 1) - scale(i);
    totalWidth += currentWidth + margin;
    // Update #preview with the proper image
    if (totalWidth >= coordinate && !previewHasUpdated) {
      d3.select('#preview').style('background-image', 'url(' + photoSet[i - 1] +')');
      previewHasUpdated = true;
    }
    return currentWidth;
  });
}

// Show and hide list
function showThumbnails(bool) {
  if (bool === true) {
    list.attr('class', 'show');
  } else {
    list.attr('class', '');
  }
}
