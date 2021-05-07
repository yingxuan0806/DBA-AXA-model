am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    
    // Add data
    chart.data = [ {
      "country": "Balance Sheet contribution",
      "litres": 20.671
    }, {
      "country": "Income Sheet contribution",
      "litres": -0.955,
      "color": "#B43757"
    },{
      "country":"Unique Revenue",
      "litres": 0.456
    },{
      "country":"Unique Earning",
      "litres": 1.101
    }];
  
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    pieSeries.slices.template.propertyFields.url = "url";
    //pieSeries.slices.template.urlTarget = "_blank";
    
  
    var slice = pieSeries.slices.template;
    slice.states.getKey("hover").properties.scale = 1.1;
      
  })
  
  