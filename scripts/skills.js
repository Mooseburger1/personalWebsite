


 /*
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {

  var width = 1000;
  var height = 500;


  var tooltip = floatingTooltip('Skills', 240);


  var center = { x: width / 2, y: height / 2 };

  var catCenters = {
    language: { x: width / 4, y: height / 2 },
    library: { x: width / 3, y: height / 2 },
    tech: { x: 2 * width / 4, y: height / 2 },
    cloud: { x: 2 * width / 3, y: height / 2 },
    skill: { x: 2 * width /2, y: height / 2 }
  };


  var Categories = {
    language: 20,
    library: 200,
    tech:400,
    cloud: 600,
    skill: 800
    
  };


  var forceStrength = 0.03;


  var svg = null;
  var bubbles = null;
  var nodes = [];

  function charge(d) {
    return -Math.pow(30, 2.0) * forceStrength;
  }

  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);


  simulation.stop();


  var fillColor = d3.scaleOrdinal()
    .domain(['language', 'library', 'tech', 'cloud', 'skill'])
    .range(['purple', 'gray', 'white', 'blue', 'green']);

  var strokeColor = function(d){
    
    if(d === 'tech'){ return '#808080';}
    else{return '#f7fbff';}
  };

  function createNodes(rawData) {

                          var myNodes = rawData.map(function (d) {
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


    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  var chart = function chart(selector, rawData) {

    nodes = createNodes(rawData);

  
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    var defs = svg.append('svg:defs');

      defs.selectAll(null)
          .data(nodes)
          .enter()
          .append('svg:pattern')
          .attr('id', function(d){return d.name;})
          // .attr('viewBox', '0 0 200 200')
          .attr('height', 23)
          .attr('width', 14)
          .append('rect')
          .attr('height', 23)
          .attr('width', 14)
          .attr('fill', 'white')


      defs.selectAll('pattern')
          .data(nodes)
          .append('svg:image')
          .attr('xlink:href', function(d){return d.img;})
          .attr('height', 23)
          .attr('width', 14)
          .attr('x', 0)
          .attr('y', 0)
    

    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.name; });
      

    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 39)
      .attr('stroke', function (d) { return strokeColor(d.cat); })
      .attr('stroke-width', 2)
      .attr('fill', function(d){return "url(#" + d.name + ")"; })
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);


    bubbles = bubbles.merge(bubblesE);

    // bubbles.transition()
    //   .duration(2000)
    //   .attr('r', 30)
    //   .attr('fill', function(d){return "url(#" + d.name + ")"; });



    simulation.nodes(nodes);

    // Set initial layout to single group.
    groupBubbles();

    return bubbles;
  };


  function ticked() {
    bubbles
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; });
  }


  function sidePos(d) {
    console.log(catCenters[d.cat], d.cat);return catCenters[d.cat].x;
  }



  function groupBubbles() {
    hideYearTitles();


    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));


    simulation.alpha(1).restart();
  }


  function splitBubbles() {
    showYearTitles();


    simulation.force('x', d3.forceX().strength(forceStrength).x(sidePos));


    simulation.alpha(1).restart();
  }


  function hideYearTitles() {
    svg.selectAll('.sides').remove();
  }

  
  function sizeByDeath(){
    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.totalDeathsRadius; });
     


    simulation.alpha(1).restart();
  }

  function sizeByMilDeath(){
    bubbles.transition()
      .duration(2000)
      .attr('r', function(d) {return d.milDeathsRad})
    


    simulation.alpha(1).restart();
  }

  function sizeByCivDeath(){
    bubbles.transition()
      .duration(2000)
      .attr('r', function(d){ return d.civDeathsRad})
      simulation.alpha(1).restart();}

  
  function sizeByPercent(){
    bubbles.transition()
           .duration(2000)
           .attr('r', function(d){ return d.percentDeathsRad})
           simulation.alpha(1).restart();}
   
  function showYearTitles() {

    var yearsData = d3.keys(Categories);
    var years = svg.selectAll('.sides')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'sides')
      .attr("z-index", "999")
      .attr("fill", "gray")
      .attr("font-weight", "bolder")
      .attr("font-size", "30")
      .attr('x', function (d) { return Categories[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }


  function showDetail(d) {

    d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Skill: </span><span class="value">' +
                  d.name +
                  '</span><br/>' +
                  '<span class="name">Experience: </span><span class="value">' +
                  addCommas(d.exp) +
                  '</span><br/>' +
                  '<span class="name">Rank: </span><span class="value">' +
                  addCommas(d.rank) +
                  '</span><br/>' +
                  '<span class="name">Category: </span><span class="value">' +
                  addCommas(d.cat) +
                  '</span>';

    tooltip.showTooltip(content, d3.event);
  }


  function hideDetail(d) {

    d3.select(this)
      .attr('stroke', strokeColor(d.side));

    tooltip.hideTooltip();
  }

 
  chart.toggleDisplay = function (displayName) {
    if (displayName === 'side') {
      console.log(simulation)
      d3.select("#forceText p").remove()
      d3.select("#forceText").append("p").attr("class", "introduction").text("There were two primary powers in WW2 - the Axis Powers and the Allies. The Axis Power formed on September 27, 1940 when Japan, German, and Italy signed the Tripartite Pact. The Allied Powers were mainly made up of Great Britain, France, Soviet Union, and China. The Soviets actually started off helping Germany only to join the Allied forces in 1941")
      splitBubbles();
    } else if(displayName ==='deaths'){
      d3.select("#forceText p").remove()
      d3.select("#forceText").append("p").attr("class", "introduction").text("Total deaths per country is still widely debated today, but even the low end estimates still reveal WWII to be the deadliest war in History. Russia and China suffered the most with estimates reaching into 20 million deaths. On the Axis powers, Germany saw the most deceased with estimates reaching almost 8 million")
      sizeByDeath();
    }else if(displayName=='milDeaths'){
      d3.select("#forceText p").remove()
      d3.select("#forceText").append("p").attr("class", "introduction").text("Out of the 20+ million deaths the Russians saw, a little over 50% was from their military. The most intense fighting came on the Eastern Front when Germany invaded Russia. This brings no surprise as to why both these countries top the list for the amount military personnel lost")
      sizeByMilDeath();
    }else if(displayName=='civDeaths'){
      d3.select("#forceText p").remove()
      d3.select("#forceText").append("p").attr("class", "introduction").text("Civilians were hardly spared as fighting crossed over country lines. Again, Russia and China experienced the worst effects. China suffered many atrocities at the hands of the Japanese Empire that are rarely discussed in the context of WWII")
      sizeByCivDeath()
    }else if(displayName=='percentage'){
      d3.select("#forceText p").remove()
      d3.select("#forceText").append("p").attr("class", "introduction").text("In the afermath, 8 different countries lost >10% of their total population. Poland tops the chart here at an estimated 17%. With their high Jewish population in combination with the atrocities of the Holocaust, this is a sad, but unsurprising statistic.")
      sizeByPercent()
    }else {
      d3.select("#forceText p").remove()
      d3.select("#forceText").append("p").attr("class", "introduction").text("World War II Involved 50+ countries, 3 continents and is the most destructive war in history. It redrew country lines, created new ones, abolished empires and ushered in a new era of warfare.")
      groupBubbles();
      bubbles.transition()
           .duration(2000)
           .attr('r', 30)

           simulation.alpha(1).restart();
    }
  };

  return chart;
}

var myBubbleChart = bubbleChart();

function display(error, data) {
  if (error) {
    console.log(error);
  }

  myBubbleChart('#vis', data);
}

function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {

      d3.selectAll('.button').classed('active', false);

      var button = d3.select(this);

      button.classed('active', true);

      var buttonId = button.attr('id');

      myBubbleChart.toggleDisplay(buttonId);
    });
}

function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

// Load the data.
d3.csv('data/skills.csv', display);


setupButtons();

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
