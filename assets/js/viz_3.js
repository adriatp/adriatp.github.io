// set the data
table = anychart.data.table();
table.addData(bitcoin);
  
// map the data
mapping = table.mapAs();
mapping.addField('open', 1);
mapping.addField('high', 2);
mapping.addField('low', 3);
mapping.addField('close', 4);

// chart type
chart = anychart.stock();

// set the series
var series = chart.plot(0).ohlc(mapping);
series.name("");

// set the container id
chart.container("canvas_viz_3");

// initiate drawing the chart
chart.draw();

