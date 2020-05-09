var height = 800
var width = 1000

var svg = d3.select('#skills')
            .append('svg')
            .attr('width', width)
            .attr('height', height);


var defs = svg.insert('svg:defs').data(['end']);

var tooltip = floatingTooltip('Skills', 240);


d3.csv('data/skills.csv', function(d){

    var data = processData(d);

    //////////////// force graph intialization /////////////////
    var forceStrength = 0.1;

    function charge(d){
        return -Math.pow(60, 2.0) * forceStrength
    }

    var simulation = d3.forceSimulation()
                       .nodes(d3.values(data))
                       .velocityDecay(0.2)
                       .force('x', d3.forceX().strength(forceStrength).x(width / 2))
                       .force('y', d3.forceY().strength(forceStrength).y(height / 2))
                       .force('charge', d3.forceManyBody().strength(charge))
                       .on('tick', ticked);

    simulation.stop()
    /////////////////////////////////////////////////////////////

    ////////////// needed funcions //////////////////////////////
    function group(){
        simulation.force('x', d3.forceX().strength(forceStrength).x(width/2));
        simulation.alpha(1).restart();
    }


    function ticked(){
        nodeEnter
        .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")"; })
    }
    //////////////////////////////////////////////////////////////


    

    var node = svg.selectAll('g.node')
                  .data(data, function(d){return d.name;});

    var nodeEnter = node.enter()
                        .append('svg:g')
                        .attr('class', 'node')
                        .on('mouseover', showDetail)
                        .on('mouseout', hideDetail)

        nodeEnter.append('svg:circle')
                 .attr('r', 0)
                 .style('fill', 'white')
                 .style('stroke', 'steelblue')
                 .style('stroke-width', 4)
                 

    var images = nodeEnter.append('svg:image')
                          .attr('xlink:href', function(d){return d.img;})
                          .attr('x', function(d){return -25})
                          .attr('y', function(d){return -25})
                          .attr('height', 50)
                          .attr('width', 50)
                          .style('opacity', 0);


        nodeEnter.selectAll('circle')
                 .transition()
                 .duration(2000)
                 .attr('r', 50)

        nodeEnter.selectAll('image')
              .transition()
              .duration(2000)
              .style('opacity', 1)

    group();


})





function processData(rawData){
    var data = rawData.map(function(d){
        return {
            name: d.name,
            exp: +d.exp,
            rank: +d.rank,
            img: d.img,
            cat: d.category,
            x: Math.random() * 900,
            y: Math.random() * 800
          };
    });

    data.sort(function (a, b) { return b.value - a.value; });

    return data;

}

function showDetail(d) {

    d3.select(this).attr('stroke', 'black').attr('r', 70);

    var content = '<span class="name">Skill: </span><span class="value">' +
                    d.name +
                    '</span><br/>' +
                    '<span class="name">Experience: </span><span class="value">' +
                    d.exp +
                    ' years</span><br/>' +
                    '<span class="name">Rank: </span><span class="value">' +
                    d.rank +
                    '</span><br/>' +
                    '<span class="name">Category: </span><span class="value">' +
                    d.cat +
                    '</span>';

    tooltip.showTooltip(content, d3.event);
    }



function hideDetail(d) {

    d3.select(this)
      .attr('stroke', 'red');

    tooltip.hideTooltip();
  }


  function floatingTooltip(tooltipId, width) {

    var tt = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .attr('id', tooltipId)
      .style('pointer-events', 'none');
  
    if (width) {
      tt.style('width', width);
    }
  
    hideTooltip();
  
    function showTooltip(content, event) {
      tt.style('opacity', 1.0)
        .html(content);
  
      updatePosition(event);
    }
  
    function hideTooltip() {
      tt.style('opacity', 0.0);
    }
  
    function updatePosition(event) {
      var xOffset = 20;
      var yOffset = 10;
  
      var ttw = tt.style('width');
      var tth = tt.style('height');
  
      var wscrY = window.scrollY;
      var wscrX = window.scrollX;
  
      var curX = (document.all) ? event.clientX + wscrX : event.pageX;
      var curY = (document.all) ? event.clientY + wscrY : event.pageY;
      var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
                   curX - ttw - xOffset * 2 : curX + xOffset;
  
      if (ttleft < wscrX + xOffset) {
        ttleft = wscrX + xOffset;
      }
  
      var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
                  curY - tth - yOffset * 2 : curY + yOffset;
  
      if (tttop < wscrY + yOffset) {
        tttop = curY + yOffset;
      }
  
      tt
        .style('top', tttop + 'px')
        .style('left', ttleft + 'px');
    }
  
    return {
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      updatePosition: updatePosition
    };
  }
  