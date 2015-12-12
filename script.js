// Variables
var width = 1000,
    thumbnailHeight = 50,
    thumbnailWidth = 50,
    thumbnailMinimumWidth = 5;
    dataset = [],
    numberOfPhotos = 20;

// TODO
// Set up an x axis
var scale = d3.fisheye.scale(d3.scale.linear)
                    .domain([0, numberOfPhotos])
                    .range([0, width - thumbnailMinimumWidth])

// Place one image on each x axis tick
// Expand and contract the axis, which handles the image rendering

// Fisheye stuff
var xFisheye = d3.fisheye.scale(d3.scale.identity).domain([0, width]).focus(width / 2);

// Set up array
for (var i = 0; i < numberOfPhotos; i++) {
  string = 'images/photo-' + i + '.jpg';
  dataset.push(string);
}

// Set up list
var svg = d3.select('#list').append('svg')
      .attr('width', width)
      .attr('height', thumbnailHeight)
      .attr('fill', 'red')

// Display thumbnails
var thumbnail = svg.selectAll('image')
  .data(dataset)
  .enter()
  .append('svg:image')
    .attr('class', 'thumbnail')
    .attr('width', function(d, i) { return getWidth(i); })
    .attr('height', thumbnailHeight)
    .attr('x', function(d, i) { return scale(i) })
    .attr('preserveAspectRatio', 'xMinYMin slice')
    .attr('xlink:href', function(d) { return d });

svg.on('mousemove', function () {
  var mouse = d3.mouse(this);
  scale.distortion(2.5).focus(mouse[0]);
  thumbnail.call(position)
})

function getWidth(i) {
  if (i === (numberOfPhotos - 1)) {
    return thumbnailMinimumWidth
  } else {
    return scale(i + 1) - scale(i);
  }
}

function position(thumb) {
  thumb .attr('x', function(d, i) { return scale(i) })
        .attr('width', function(d , i) { return getWidth(i) })
}



// (function chart4() {
//
//   // Various accessors that specify the four dimensions of data to visualize.
//   function x(d) { return d.income; }
//   function y(d) { return d.lifeExpectancy; }
//   function radius(d) { return d.population; }
//   function color(d) { return d.region; }
//
//   // Chart dimensions.
//   var margin = {top: 5.5, right: 19.5, bottom: 12.5, left: 39.5},
//       width = 960,
//       height = 500 - margin.top - margin.bottom;
//
//   // Various scales and distortions.
//   var xScale = d3.fisheye.scale(d3.scale.log).domain([300, 1e5]).range([0, width]),
//       yScale = d3.fisheye.scale(d3.scale.linear).domain([20, 90]).range([height, 0]),
//       radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
//       colorScale = d3.scale.category10().domain(["Sub-Saharan Africa", "South Asia", "Middle East & North Africa", "America", "Europe & Central Asia", "East Asia & Pacific"]);
//
//   // The x & y axes.
//   var xAxis = d3.svg.axis().orient("bottom").scale(xScale).tickFormat(d3.format(",d")).tickSize(-height),
//       yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(-width);
//
//   // Create the SVG container and set the origin.
//   var svg = d3.select("#chart4").append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   // Add a background rect for mousemove.
//   svg.append("rect")
//       .attr("class", "background")
//       .attr("width", width)
//       .attr("height", height);
//
//   // Add the x-axis.
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);
//
//   // Add the y-axis.
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis);
//
//   // Add an x-axis label.
//   svg.append("text")
//       .attr("class", "x label")
//       .attr("text-anchor", "end")
//       .attr("x", width - 6)
//       .attr("y", height - 6)
//       .text("income per capita, inflation-adjusted (dollars)");
//
//   // Add a y-axis label.
//   svg.append("text")
//       .attr("class", "y label")
//       .attr("text-anchor", "end")
//       .attr("x", -6)
//       .attr("y", 6)
//       .attr("dy", ".75em")
//       .attr("transform", "rotate(-90)")
//       .text("life expectancy (years)");
//
//   // Load the data.
//   d3.json("nations.json", function(nations) {
//
//     // Add a dot per nation. Initialize the data at 1800, and set the colors.
//     var dot = svg.append("g")
//         .attr("class", "dots")
//       .selectAll(".dot")
//         .data(nations)
//       .enter().append("circle")
//         .attr("class", "dot")
//         .style("fill", function(d) { return colorScale(color(d)); })
//         .call(position)
//         .sort(function(a, b) { return radius(b) - radius(a); });
//
//     // Add a title.
//     dot.append("title")
//         .text(function(d) { return d.name; });
//
//     // Positions the dots based on data.
//     function position(dot) {
//       dot .attr("cx", function(d) { return xScale(x(d)); })
//           .attr("cy", function(d) { return yScale(y(d)); })
//           .attr("r", function(d) { return radiusScale(radius(d)); });
//     }
//
//     svg.on("mousemove", function() {
//       var mouse = d3.mouse(this);
//       xScale.distortion(2.5).focus(mouse[0]);
//       yScale.distortion(2.5).focus(mouse[1]);
//
//       dot.call(position);
//       svg.select(".x.axis").call(xAxis);
//       svg.select(".y.axis").call(yAxis);
//     });
//   });
// })();
