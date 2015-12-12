// Variables
var width = window.innerWidth - 50,
    height = 75;

// Set up fisheye scale
var scale = d3.fisheye.scale(d3.scale.linear)
                    .domain([0, dataset.length])
                    .range([0, width])

// Set up list
var list = d3.select('#list')

// Display thumbnails
var thumbnail = list.selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
    .attr('class', 'thumbnail')
    .style('width', function(d, i) { return scale(i + 1) - scale(i); })
    .style('height', height)
    .style('background-image', function(d) { return 'url(' + d + ')' })
    .on('mouseover', function(d) {
      d3.select('#preview')
        .style('background-image', function() {
          return 'url(' + d + ')'
        });
    });

// Scale on mousemove
list.on('mousemove', function () {
  var mouse = d3.mouse(this);
  scale.distortion(2.5).focus(mouse[0]);
  thumbnail.call(position)
})

// Redraw and reposition thumbnails
function position(thumb) {
  thumb.style('width', function(d , i) { return scale(i + 1) - scale(i); })
}
