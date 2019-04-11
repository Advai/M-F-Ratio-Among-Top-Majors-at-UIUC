// d3.slopegraph.js and label offsetting adapted from https://bl.ocks.org/borgar/67a2173ef40f08129201
$(function() {
  d3.csv('cleaned_ACES_Majors.csv', parseRow, ready );
  d3.csv('cleaned_Business_Majors.csv', parseRow, ready2 );
  d3.csv('cleaned_LAS_Majors.csv', parseRow, ready1 );
  d3.csv( 'cleaned_Engineering_Majors.csv', parseRow, ready3 );
});

function parseRow ( d ) {
  return { 'Fall': +d.Fall,
           'MajorName': d.MajorName,
           'MFRatio': +d.MFRatio,
           'Total': d.Total,
           'Male': d.Male, 
           'Female': d.Female };
}

function ready ( data ) {

  var margin = { top: 70, right: 0, bottom: 40, left: 0 },
      width = 425 - margin.left - margin.right,
      height = 780 - margin.top - margin.bottom,

      y_dom  = d3.extent( data, d => d.MFRatio ).reverse()
      x_dom  = d3.extent( data, d => d.Fall )

      y = d3.scale.linear()
          .domain( y_dom )
          .range([ 0, height ]),
      x = d3.scale.linear()
          .domain( x_dom )
          .range([ 190, 370 ]),

      layout = d3.layout.slopegraph()( data )
          .j( 'MajorName' ).y( 'MFRatio' ).x( 'Fall' )
          .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),

      textAlign = m => {
        return (d, i) => i ? 'start' : 'end';
      },
      textMargin = m => {
        return (d, i) => i ? m * 1 : m * -1;
      };
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickValues([1, 2, 3, 4]);
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
     return "<strong>" + d.MajorName + "</strong><br><strong>Total: </strong>" + d.Total + "<br><strong>Male: </strong>" + d.Male + " <strong>Female: </strong>" + d.Female;
  });


  var svg = d3.select( '#chart' ).append( 'svg' )
      .attr( 'width', width + margin.left + margin.right )
      .attr( 'height', height + margin.top + margin.bottom )
    .append( 'g' )
      .attr( 'transform', `translate(${margin.left},${margin.top})` )
      .attr('fill', '#4b33ff');

  // svg.append("g")
  // .call(yAxis);
    //   var xAxis = d3.axisTop()
    // .scale(y)
    // .tickValues( [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] );

// d3.selectAll("g.stack").call(tip);
// d3.selectAll("g.stack").on('mouseover', tip.show)
//   .on('mouseout', tip.hide);
  svg.call(tip)

  svg.append( 'g' )
      .attr( 'class', 'years' )
      .selectAll( 'text' ).data( x_dom ).enter()
    .append( 'text' )
      .attr( 'x', x )
      .attr( 'dx', (d, i) => i ? 10 : -10 )
      .attr( 'y', height + 40 )
      .style( 'text-anchor', textAlign() )
      .text( String );

  svg.append('g')
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 100)
      .attr('dy', '2.71em')
      .style('text-anchor', 'end')
      .text("M / F Ratio");

  var line = d3.svg.line()
      .x( d => x( d.Fall ) )
      .y( d => y( d.y ) );

  var pairs = svg.append( 'g' )
      .attr( 'class', 'lines' )
      .selectAll( 'g' )
      .data( layout.pairs() ).enter()
    .append( 'g' );


  pairs.selectAll( '.MFRatio' )
      .data( d => d ).enter()
      .append( 'text' )
      .attr( 'class', 'MFRatio' )
      .attr( 'x', d => x( d.Fall ) )
      .attr( 'dy', '.32em' )
      .attr( 'dx', textMargin( 10 ) )
      .attr( 'y', d => y( d.y ) )
      .style( 'text-anchor', textAlign() )
      .text( d => d.MFRatio.toFixed( 2 ) )
      .on('mouseover', tip.show)
      .attr('fill', 'black')
      .on('mouseout', tip.hide);

  pairs.append( 'path' )
      .attr( 'd', line );
  svg.append( 'g' )
      .attr( 'class', 'desc' )
      .selectAll( 'text' )
      .data([ 'ACES'
            ]).enter()
    .append( 'text' )
      .attr( 'y', (d,i) => i * 20 )
      .attr( 'dy', '-1em' )
      .attr( 'x', 250 )
      .text( String );

};

function ready1( data ) {

var margin = { top: 70, right: 0, bottom: 40, left: 0 },
    width = 425 - margin.left - margin.right,
    height = 780 - margin.top - margin.bottom,

    y_dom  = d3.extent( data, d => d.MFRatio ).reverse()
    x_dom  = d3.extent( data, d => d.Fall )

    y = d3.scale.linear()
        .domain( y_dom )
        .range([ 0, height ]),
    x = d3.scale.linear()
        .domain( x_dom )
        .range([ 190, 370 ]),

    layout = d3.layout.slopegraph()( data )
        .j( 'MajorName' ).y( 'MFRatio' ).x( 'Fall' )
        .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),

    textAlign = m => {
      return (d, i) => i ? 'start' : 'end';
    },
    textMargin = m => {
      return (d, i) => i ? m * 1 : m * -1;
    };
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickValues([1, 2, 3, 4]);
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
     return "<strong>" + d.MajorName + "</strong><br><strong>Total: </strong>" + d.Total + "<br><strong>Male: </strong>" + d.Male + " <strong>Female: </strong>" + d.Female;
  });


var svg = d3.select( '#chart' ).append( 'svg' )
    .attr( 'width', width + margin.left + margin.right )
    .attr( 'height', height + margin.top + margin.bottom )
  .append( 'g' )
  .attr('fill', '#4b33ff')
    .attr( 'transform', `translate(${margin.left},${margin.top})` );
svg.call(tip)

svg.append( 'g' )
    .attr( 'class', 'years' )
    .selectAll( 'text' ).data( x_dom ).enter()
  .append( 'text' )
    .attr( 'x', x )
    .attr( 'dx', (d, i) => i ? 10 : -10 )
    .attr( 'y', height + 40 )
    .style( 'text-anchor', textAlign() )
    .text( String );

svg.append('g')
    .call(yAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 100)
    .attr('dy', '2.71em')
    .style('text-anchor', 'end')
    .text("M / F Ratio");

var line = d3.svg.line()
    .x( d => x( d.Fall ) )
    .y( d => y( d.y ) );

var pairs = svg.append( 'g' )
    .attr( 'class', 'lines' )
    .selectAll( 'g' )
    .data( layout.pairs() ).enter()
  .append( 'g' );


pairs.selectAll( '.MFRatio' )
    .data( d => d ).enter()
    .append( 'text' )
    .attr( 'class', 'MFRatio' )
    .attr( 'x', d => x( d.Fall ) )
    .attr( 'dy', '.32em' )
    .attr( 'dx', textMargin( 10 ) )
    .attr( 'y', d => y( d.y ) )
    .style( 'text-anchor', textAlign() )
    .text( d => d.MFRatio.toFixed( 2 ) )
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);;

pairs.append( 'path' )
    .attr( 'd', line );
svg.append( 'g' )
    .attr( 'class', 'desc' )
    .selectAll( 'text' )
    .data([ 'LAS'
          ]).enter()
  .append( 'text' )
    .attr( 'y', (d,i) => i * 20 )
    .attr( 'dy','-1em' )
    .attr( 'x', 270 )
    .text( String );

};
function ready2( data ) {

var margin = { top: 70, right: 0, bottom: 40, left: 0 },
    width = 425 - margin.left - margin.right,
    height = 780 - margin.top - margin.bottom,

    y_dom  = d3.extent( data, d => d.MFRatio ).reverse()
    x_dom  = d3.extent( data, d => d.Fall )

    y = d3.scale.linear()
        .domain( y_dom )
        .range([ 0, height ]),
    x = d3.scale.linear()
        .domain( x_dom )
        .range([ 190, 370 ]),

    layout = d3.layout.slopegraph()( data )
        .j( 'MajorName' ).y( 'MFRatio' ).x( 'Fall' )
        .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),

    textAlign = m => {
      return (d, i) => i ? 'start' : 'end';
    },
    textMargin = m => {
      return (d, i) => i ? m * 1 : m * -1;
    };
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickValues([1, 2, 3, 4]);
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
     return "<strong>" + d.MajorName + "</strong><br><strong>Total: </strong>" + d.Total + "<br><strong>Male: </strong>" + d.Male + " <strong>Female: </strong>" + d.Female;
  });

var svg = d3.select( '#chart' ).append( 'svg' )
    .attr( 'width', width + margin.left + margin.right )
    .attr( 'height', height + margin.top + margin.bottom )
  .append( 'g' )
  .attr('fill', '#4b33ff')
    .attr( 'transform', `translate(${margin.left},${margin.top})` );

svg.call(tip)

svg.append( 'g' )
    .attr( 'class', 'years' )
    .selectAll( 'text' ).data( x_dom ).enter()
  .append( 'text' )
    .attr( 'x', x )
    .attr( 'dx', (d, i) => i ? 10 : -10 )
    .attr( 'y', height + 40 )
    .style( 'text-anchor', textAlign() )
    .text( String );

svg.append('g')
    .call(yAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 100)
    .attr('dy', '2.71em')
    .style('text-anchor', 'end')
    .text("M / F Ratio");

var line = d3.svg.line()
    .x( d => x( d.Fall ) )
    .y( d => y( d.y ) );

var pairs = svg.append( 'g' )
    .attr( 'class', 'lines' )
    .selectAll( 'g' )
    .data( layout.pairs() ).enter()
  .append( 'g' );


pairs.selectAll( '.MFRatio' )
    .data( d => d ).enter()
    .append( 'text' )
    .attr( 'class', 'MFRatio' )
    .attr( 'x', d => x( d.Fall ) )
    .attr( 'dy', '.32em' )
    .attr( 'dx', textMargin( 10 ) )
    .attr( 'y', d => y( d.y ) )
    .style( 'text-anchor', textAlign() )
    .text( d => d.MFRatio.toFixed( 2 ) )
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);;

pairs.append( 'path' )
    .attr( 'd', line );
svg.append( 'g' )
    .attr( 'class', 'desc' )
    .selectAll( 'text' )
    .data([ 'Business'
          ]).enter()
  .append( 'text' )
    .attr( 'y', (d,i) => i * 20 )
    .attr( 'dy', '-1em' )
    .attr( 'x', 250 )
    .text( String );

};
function ready3 ( data ) {

var margin = { top: 70, right: 0, bottom: 40, left: 0 },
    width = 425 - margin.left - margin.right,
    height = 780 - margin.top - margin.bottom,

    y_dom  = d3.extent( data, d => d.MFRatio ).reverse()
    x_dom  = d3.extent( data, d => d.Fall )

    y = d3.scale.linear()
        .domain( y_dom )
        .range([ 0, height ]),
    x = d3.scale.linear()
        .domain( x_dom )
        .range([ 190, 370 ]),

    layout = d3.layout.slopegraph()( data )
        .j( 'MajorName' ).y( 'MFRatio' ).x( 'Fall' )
        .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),

    textAlign = m => {
      return (d, i) => i ? 'start' : 'end';
    },
    textMargin = m => {
      return (d, i) => i ? m * 1 : m * -1;
    };
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickValues([1, 2, 3, 4]);
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
     return "<strong>" + d.MajorName + "</strong><br><strong>Total: </strong>" + d.Total + "<br><strong>Male: </strong>" + d.Male + " <strong>Female: </strong>" + d.Female;
  });


var svg = d3.select( '#chart' ).append( 'svg' )
    .attr( 'width', width + margin.left + margin.right )
    .attr( 'height', height + margin.top + margin.bottom )
  .append( 'g' )
  .attr('fill', '#4b33ff')
    .attr( 'transform', `translate(${margin.left},${margin.top})` );

svg.call(tip)

svg.append( 'g' )
    .attr( 'class', 'years' )
    .selectAll( 'text' ).data( x_dom ).enter()
  .append( 'text' )
    .attr( 'x', x )
    .attr( 'dx', (d, i) => i ? 10 : -10 )
    .attr( 'y', height + 40 )
    .style( 'text-anchor', textAlign() )
    .text( String );

svg.append('g')
    .call(yAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 100)
    .attr('dy', '2.71em')
    .style('text-anchor', 'end')
    .text("M / F Ratio");

var line = d3.svg.line()
    .x( d => x( d.Fall ) )
    .y( d => y( d.y ) );

var pairs = svg.append( 'g' )
    .attr( 'class', 'lines' )
    .selectAll( 'g' )
    .data( layout.pairs() ).enter()
  .append( 'g' );

pairs.selectAll( '.MFRatio' )
    .data( d => d ).enter()
    .append( 'text' )
    .attr( 'class', 'MFRatio' )
    .attr( 'x', d => x( d.Fall ) )
    .attr( 'dy', '.32em' )
    .attr( 'dx', textMargin( 10 ) )
    .attr( 'y', d => y( d.y ) )
    .style( 'text-anchor', textAlign() )
    .text( d => d.MFRatio.toFixed( 2 ) )
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);;

pairs.append( 'path' )
    .attr( 'd', line );
svg.append( 'g' )
    .attr( 'class', 'desc' )
    .selectAll( 'text' )
    .data([ 'Engineering'
          ]).enter()
  .append( 'text' )
    .attr( 'y', (d,i) => i * 20 )
    .attr( 'dy', '-1em' )
    .attr( 'x', 240 )
    .text( String );

};
