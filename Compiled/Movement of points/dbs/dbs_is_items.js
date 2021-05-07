(function (d3) {

    function render(data) {
    
    // Define Margins
    var margin = {top: 20, right: 10, bottom: 20, left: 40};
    var marginOverview = {top: 30, right: 10, bottom: 20, left: 40};
    var selectorHeight = 40;
    var width = 1200 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var heightOverview = 80 - marginOverview.top - marginOverview.bottom;
  
    // Create the scrolling condition and length
    var maxLength = d3.max(data.map(function(d) {return d.Item.length; }));
    var barWidth = maxLength * 7; // can change
    var numBars = Math.round(width/barWidth);
    var isScrollDisplayed = barWidth * data.length > width;
  
    console.log(isScrollDisplayed);
  
    // Legend Boundaries
    var legendx = 40;
    var legendy = 9;
    var circledim = 7;
    var legendItemMargin = {top: 20, right: 0, bottom: 0, left: 20}
  
    // Scaling x and y axis
    var xScale = d3.scaleBand()
        .domain(data.slice(0, numBars).map(function(d) { return d.Item; }))
        .range([0, width])
        .padding(1);
    
    var yScale = d3.scaleLinear()
        .domain([7, -2])
        .range([0, height]);
  
    // Creat Chart
    var svg = d3.select('#graph-2').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom + selectorHeight);
    
    var diagram = svg.append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;
  
    // Adding Axes
    diagram.append('g')
            .attr('class', 'x axis')
        .style('font-size', '12px')
        .call(d3.axisBottom(xScale))
            .attr('transform', 'translate(0, ' + height + ')')
    
    diagram.append('g')
            .attr('class', 'y axis, y-axis')
        .call(d3.axisLeft(yScale).ticks(8));
    
        // Adding Gridlines
    // gridlines in x axis function
    function make_x_gridlines() {		
        return d3.axisBottom(xScale)
            .ticks(5)
        }
    // gridlines in y axis function
    function make_y_gridlines() {		
        return d3.axisLeft(yScale)
            .ticks(5)
    }   
      // add the X gridlines
    diagram.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines()
    .tickSize(-height)
    .tickFormat("")
  )

// add the Y gridlines
    diagram.append("g")			
        .attr("class", "grid")
    .call(make_y_gridlines()
    .tickSize(-width)
    .tickFormat("")
  )
    
    // Adding Legend Box
    diagram.append('g').append('rect')
            .attr('x', legendx)
            .attr('y', legendy)
            .attr('width', 280)
            .attr('height', legendItemMargin.top*3 + circledim)
        .style('fill', 'transparent')
        .style('stroke', 'black')
        .style('stroke-width', 2);
    
    diagram.append('g').append('circle')
            .attr('cx', legendx + legendItemMargin.left)
            .attr('cy', legendy + legendItemMargin.top)
            .attr('r', circledim)
        .style('fill', 'orange');
    
    diagram.append('g').append('text')
            .attr('class', 'legend-font')
            .attr('x', legendx + legendItemMargin.left*2)
            .attr('y', legendy + legendItemMargin.top)
            .attr('dy', ".35em")
        .text('Item Appraisal');
    
    diagram.append('g').append('circle')
            .attr('cx', legendx + legendItemMargin.left)
            .attr('cy', legendy + legendItemMargin.top*2 + circledim)
            .attr('r', circledim)
        .style('fill', 'red');
  
    diagram.append('g').append('text')
        .attr('class', 'legend-font')   
        .attr('x', legendx + legendItemMargin.left*2)
        .attr('y', legendy + legendItemMargin.top*2 + circledim)
        .attr('dy', ".35em")
    .text('Item Appraisal Country Adjusted')
  
    // Add Tooltip
    var div = d3.select('#graph-2').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
  
    // Add data into Chart
    var lines = diagram.append('g');
    var circle1 = diagram.append('g');
    var circle2 = diagram.append('g');
    var circle3 = diagram.append('g');

    // Coefficient Circles
    var c1 = circle1.selectAll('circle')
    .data(data.slice(0, numBars), function(d) { return d.Item; })
    .enter()
    .append('circle')
      .attr("cx", function(d) { return xScale(d.Item); })
      .attr('cy', function(d) { return yScale(d.Item_Coefficient); })
      .attr('r', 8)
      .attr('fill', 'orange')
    .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div .html("<u>" + d.Item + "</u></br>"  + '<strong>Coefficient</strong></br>' + d.Item_Coefficient + "</br>" + '<strong>Appraisal</strong></br>' + d.Item_Appraisal)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        })					
    .on("mouseout", function(d) {		
        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
    });

    // Hidden Coefficient Circle
    var c1_hidden = circle3.selectAll('circle')
    .data(data.slice(0, numBars), function(d) { return d.Item; })
    .enter()
    .append('circle')
      .attr("cx", function(d) { return xScale(d.Item); })
      .attr('cy', function(d) { return yScale(d.Item_Coefficient); })
      .attr('r', 8)
      .attr('fill', 'orange')
    .style('opacity', 0)
    .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div .html("<u>" + d.Item + "</u></br>"  + '<strong>Coefficient</strong></br>' + d.Item_Coefficient + "</br>" + '<strong>Appraisal</strong></br>' + d.Item_Appraisal)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        })					
    .on("mouseout", function(d) {		
        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
    });
    
    // Appraisal Circles
    var c2 = circle2.selectAll('circle')
    .data(data.slice(0, numBars), function(d) { return d.Item; })
    .enter()
    .append('circle')
      .attr("cx", function(d) { return xScale(d.Item); })
      .attr('cy', function(d) { return yScale(d.Item_Appraisal); })
      .attr('r', 8)
      .attr('fill', 'red')
    .style('opacity', 0)
    .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div .html("<u>" + d.Item + "</u></br>"  + '<strong>Coefficient</strong></br>' + d.Item_Coefficient + "</br>" + '<strong>Appraisal</strong></br>' + d.Item_Appraisal)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        })					
    .on("mouseout", function(d) {		
        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
    });

    // Lines
    var l = lines.selectAll('line')
      .data(data.slice(0, numBars), function(d) { return d.Industry; })
      .enter()
      .append('line')
        .attr('y1', function(d) { return yScale(d.Item_Coefficient); })
        .attr('y2', function(d) { return yScale(d.Item_Appraisal); })
        .attr('x1', function(d) { return xScale(d.Item); })
        .attr('x2', function(d) { return xScale(d.Item); })
        .attr('stroke', 'grey')
        .attr('stroke-width', '5px')
    .style('opacity', 0)
    .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div .html("<u>" + d.Item + "</u></br>"  + '<strong>Coefficient</strong></br>' + d.Item_Coefficient + "</br>" + '<strong>Appraisal</strong></br>' + d.Item_Appraisal)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
    
    // Animation
    d3.select("#reset2").on("click", function() {
        c1
            .transition()
            .attr("cx", function(d) { return xScale(d.Item); })
            .attr('cy', function(d) { return yScale(d.Item_Coefficient); })
            .duration(2000),
        c2
            .transition()
            .style('opacity', 0),
        c1_hidden
            .transition()
            .style('opacity', 0)
        l
            .transition()
            .style('opacity', 0)
    })
    
    d3.select("#start2").on("click", function() {
        c1
            .transition()
            .attr("cx", function(d) { return xScale(d.Item); })
            .attr('cy', function(d) { return yScale(d.Item_Appraisal); })
            .duration(2000)
        c2
            .transition()
            .style('opacity', 1)
            .delay(2000),
        c1_hidden
            .transition()
            .style('opacity', 0.6)
        l
            .transition()
            .style('opacity', 0.4)
            .delay(2000)
    })
  
    //-------------------Interactive Portion------------------------//
    if (isScrollDisplayed) {
        var xOverview = d3.scaleBand()
            .domain(data.map(function(d) { return d.Item; }))
            .range([0, width])
            .padding(1);
        var yOverview = d3.scaleLinear().range([0, heightOverview]);
        yOverview.domain(yScale.domain());
        
        // CREATE CLASS
        var subBars = diagram.selectAll('.subpoints')
            .data(data);
        
        subBars.enter().append("line")
            .classed('subpoints', true)
                .attr('y1', function(d) { return height + heightOverview + yOverview(d.Item_Coefficient); })
                .attr('y2', function(d) { return height + heightOverview + yOverview(d.Item_Appraisal); })
                .attr('x1', function(d) { return xOverview(d.Item); })
                .attr('x2', function(d) { return xOverview(d.Item); })
                .attr('stroke', 'grey')
                .attr('stroke-width', '2px');
  
        subBars.enter().append("circle")
            .classed('subpoints', true)
                .attr('r', 2)
                .attr('cx', function(d) { return xOverview(d.Item); })
                .attr('cy', function(d) { return height + heightOverview + yOverview(d.Item_Coefficient); })
            .style('fill', 'orange');
  
        subBars.enter().append("circle")
            .classed('subpoints', true)
                .attr('r', 2)
                .attr('cx', function(d) { return xOverview(d.Item); })
                .attr('cy', function(d) { return height + heightOverview + yOverview(d.Item_Appraisal); })
            .style('fill', 'red');
        
        var displayed = d3.scaleQuantize()
            .domain([0, width])
            .range(d3.range(data.length));
        
        diagram.append("rect")
                .attr("transform", "translate(0, " + (height + margin.bottom) + ")")
                .attr("class", "mover")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", selectorHeight)
                .attr("width", Math.round(parseFloat(numBars * width)/data.length))
                .attr("pointer-events", "all")
                .attr("cursor", "ew-resize")
            .call(d3.drag().on("drag", display));
        
        }
    function display() {
        var x = parseInt(d3.select(this).attr("x")),
        nx = x + d3.event.dx,
        w = parseInt(d3.select(this).attr('width')),
        f, nf, new_data, newdot2, newdot1, newdot3, newLine;
  
        if ( nx < 0 || nx + w > width ) return;
  
        d3.select(this).attr("x", nx);
  
        f = displayed(x);
        nf = displayed(nx);
  
        if ( f === nf ) return;
  
        new_data = data.slice(nf, nf + numBars);
        console.log(new_data);
        xScale.domain(new_data.map(function(d) { return d.Item; }));
        diagram.select(".x.axis").style('font-size', '12px').call(d3.axisBottom(xScale));
  
        newdot1 = circle1.selectAll('circle')
            .data(new_data, function(d) { return d.Item; });
        newdot1.attr('cx', function(d) { return xScale(d.Item); });
        
        newdot2 = circle2.selectAll('circle')
            .data(new_data, function(d) { return d.Item; });
        newdot2.attr('cx', function(d) { return xScale(d.Item); })
            .style('opacity', 0);

        newdot3 = circle3.selectAll('circle')
            .data(new_data, function(d) { return d.Item; });
        newdot3.attr('cx', function(d) { return xScale(d.Item); })
            .style('opacity', 0);

        newLine = lines.selectAll('line')
            .data(new_data, function(d) { return d.Item; });
        newLine.attr('x1', function(d) { return xScale(d.Item); });
        newLine.attr('x2', function(d) { return xScale(d.Item); });
        newLine.style('opacity', 0);


        var nl = newLine.enter()
        .append('line')
          .attr('y1', function(d) { return yScale(d.Item_Coefficient); })
          .attr('y2', function(d) { return yScale(d.Item_Appraisal); })
          .attr('x1', function(d) { return xScale(d.Item); })
          .attr('x2', function(d) { return xScale(d.Item); })
          .attr('stroke', 'grey')
          .attr('stroke-width', '5px')
        .style('opacity', 0)
        .on("mouseover", function(d) {		
          div.transition()		
              .duration(200)		
              .style("opacity", .9);		
          div .html("<u>" + d.Item + "</u></br>"  + '<strong>Coefficient</strong></br>' + d.Item_Coefficient + "</br>" + '<strong>Appraisal</strong></br>' + d.Item_Appraisal)	
              .style("left", (d3.event.pageX) + "px")		
              .style("top", (d3.event.pageY - 28) + "px");	
          })					
      .on("mouseout", function(d) {		
          div.transition()		
              .duration(500)		
              .style("opacity", 0);	
      });
        
        var nd1 = newdot1.enter()
        .append('circle')
          .attr("cx", function(d) { return xScale(d.Item); })
          .attr('cy', function(d) { return yScale(d.Item_Coefficient); })
          .attr('r', 8)
          .attr('fill', 'orange')
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div .html("<u>" + d.Item + "</u></br>"  + '<strong>Coefficient</strong></br>' + d.Item_Coefficient + "</br>" + '<strong>Appraisal</strong></br>' + d.Item_Appraisal)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);
        })

        var nd3 = newdot3.enter()
        .append('circle')
          .attr("cx", function(d) { return xScale(d.Item); })
          .attr('cy', function(d) { return yScale(d.Item_Coefficient); })
          .attr('r', 8)
          .attr('fill', 'orange')
        .style('opacity', 0)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div .html("<u>" + d.Item + "</u></br>"  + '<strong>Coefficient</strong></br>' + d.Item_Coefficient + "</br>" + '<strong>Appraisal</strong></br>' + d.Item_Appraisal)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);
        })
        
        var nd2 = newdot2.enter()
        .append('circle')
          .attr("cx", function(d) { return xScale(d.Item); })
          .attr('cy', function(d) { return yScale(d.Item_Appraisal); })
          .attr('r', 8)
          .attr('fill', 'red')
        .style('opacity', 0)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div .html("<u>" + d.Item + "</u></br>"  + '<strong>Coefficient</strong></br>' + d.Item_Coefficient + "</br>" + '<strong>Appraisal</strong></br>' + d.Item_Appraisal)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

        d3.select("#reset2").on("click", function() {
            nd1
                .transition()
                .attr("cx", function(d) { return xScale(d.Item); })
                .attr('cy', function(d) { return yScale(d.Item_Coefficient); })
                .duration(2000), 
            newdot1
                .transition()
                .attr("cx", function(d) { return xScale(d.Item); })
                .attr('cy', function(d) { return yScale(d.Item_Coefficient); })
                .duration(2000),
            nd3.transition()
                .style('opacity', 0),
            newdot3.transition()
                .style('opacity', 0),
            nd2.transition()
                .style('opacity', 0),
            newdot2.transition()
                .style('opacity', 0),
            newLine.transition()
                .style('opacity', 0),
            nl.transition()
                .style('opacity', 0)
        })

        d3.select("#start2").on("click", function() {
            nd1.transition()
                .attr("cx", function(d) { return xScale(d.Item); })
                .attr('cy', function(d) { return yScale(d.Item_Appraisal); })
                .duration(2000), 
            newdot1.transition()
                .attr("cx", function(d) { return xScale(d.Item); })
                .attr('cy', function(d) { return yScale(d.Item_Appraisal); })
                .duration(2000),
            nd3.transition()
                .style('opacity', 0.6),
            newdot3.transition()
                .style('opacity', 0.6),
            nd2.transition()
                .style('opacity', 0.6)
                .delay(2000),
            newdot2.transition()
                .style('opacity', 0.6)
                .delay(2000),
            newLine.transition()
                .style('opacity', 0.4)
                .delay(2000),
            nl.transition()
                .style('opacity', 0.4)
                .delay(2000)
        })
        
        nd1.exit().remove();
        nd2.exit().remove();
        nd3.exit().remove();
        newdot1.exit().remove();
        newdot2.exit().remove();
        newdot3.exit().remove();
        newLine.exit().remove();
  
  
    };
    
    
    }
    d3.csv('dbs_is_item.csv').then(data => {
        render(data);
        console.log(data);
    })
  }(d3));