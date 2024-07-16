const data_file_path = "./db/data.csv";

// axis fontsize
const Y_LABEL_FONT_SIZE = "24px";
const X_LABEL_FONT_SIZE = "18px";

// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// Create
var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

function getFormatedDate(date) {
  var options = { year: "numeric", month: "long", day: "numeric" };

  return date.toLocaleDateString("de-DE", options);
}

function getFormatedTime(date) {
  return date.toLocaleTimeString("de-DE");
}

/**
 * Build a tooltip on given datapoint
 */
/**
 *
 * @param data chart data
 * @param x datapoint on svg
 * @param y datapoint on svg
 * @param svg chart
 * @param temperature tooltip content
 */
function makeTooltip(data, x, y, svg, temperature = true) {
  // Circle size is size to
  const circleSize = 3;
  const circleHoverRadius = 8;
  const circleSizeHover = 8;
  const circleColor = "#FFFFFF";

  function getTooltipHTML(d) {
    const temp_or_humi = temperature ? "<br> Temperatura: " + d.temperature + "°" : "<br> Humedad: " + d.humidity + "%";
    return getFormatedDate(d.date) + " / " + getFormatedTime(d.date) + temp_or_humi;
  }

  const circleShown = svg
    .selectAll("dot")
    .data(data)
    // Appends circle
    .enter()
    .append("circle")
    .attr("r", circleSize)
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", function (d) {
      return y(temperature ? d.temperature : d.humidity);
    })
    .attr("fill", circleColor);

  svg
    .selectAll("dot")
    .data(data)
    // Appends circle
    .enter()
    .append("circle")
    .attr("r", circleHoverRadius)
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", function (d) {
      return y(temperature ? d.temperature : d.humidity);
    })
    .attr("viewBox", `0 0 960 500`)
    .style("opacity", 0)
    .on("mouseover", function (event, d) {
      circleShown.transition().duration("100").attr("r", circleSizeHover);
      //Makes div appear
      div.transition().duration(200).style("opacity", 1);
      div
        .html(getTooltipHTML(d))
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px")
        .style("font-size", "16px")
        .style("width", "250px")
        .style("padding", "2rem 0");
    })
    .on("mouseout", function (event, d) {
      circleShown.transition().duration("200").attr("r", circleSize);
      //makes div disappear
      div.transition().duration("200").style("opacity", 0);
    });
}

/**
 * Draw teperature graph
 *
 * @param data chart data
 */
function createTemperatureGraph(data) {
  const color = "#D02225";

  // Set x
  var x = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    ) // This is what is written on the Axis
    .range([0, width]); // This is where the axis is placed

  // Set y
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d.temperature;
      })
    ]) // This is what is written on the Axis
    .range([height, 0]); // This is where the axis is placed

  // define the line
  var line = d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.temperature);
    });

  // Create SVG then set the range, then insert the graph
  const svg = createSVG("graph_temperature", "Temperatura");

  // LINIE Add the valueline path.
  svg.append("path").data([data]).attr("class", "line").style("stroke", color).attr("d", line);

  makeTooltip(data, x, y, svg);

  drawAxisAndGrid(x, y, svg, data);
}

/**
 * Draw humidity graph
 *
 * @param data chart data
 */
function createHumidityGraph(data) {
  const color = "steelblue";

  // set the  ranges
  var x = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    ) // This is what is written on the Axis
    .range([0, width]); // This is where the axis is placed

  var y = d3
    .scaleLinear()
    .domain([0, 100]) // This is what is written on the Axis
    .range([height, 0]); // This is where the axis is placed

  // define the line
  var line = d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.humidity);
    });

  // Create SVG then set the range, then insert the graph
  const svg = createSVG("graph_humidity", "Humedad");

  // LINIE Add the valueline path.
  svg.append("path").data([data]).attr("class", "line").style("stroke", color).attr("d", line);

  makeTooltip(data, x, y, svg, false);

  drawAxisAndGrid(x, y, svg, data);
}

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
function createSVG(id, title) {
  const _refCharts = d3.select("#charts").append("div").attr("class", "chart");

  if (title) {
    _refCharts.append("h1").attr("class", "chart-h1").text(title);
  }

  const content = _refCharts.append("div").attr("id", "content-chart");

  return content
    .append("svg")
    .attr("id", id)
    .attr("viewBox", `0 0 960 500`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function addLogs(data) {
  const div = document.getElementById("logs");
  div.innerHTML = JSON.stringify(data);
}

function drawAxisAndGrid(xAxis, yAxis, svg, data) {
  addGrid(width, height, svg);

  // Draw the x Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .style("font-size", X_LABEL_FONT_SIZE)
    .call(d3.axisBottom(xAxis));

  // Draw the y Axis
  svg.append("g").style("font-size", Y_LABEL_FONT_SIZE).call(d3.axisLeft(yAxis));
}

//Read the data from file
d3.csv(data_file_path, function (d) {
  return {
    date: new Date(d.date),
    temperature: +d.dht11_temperature,
    humidity: +d.dht11_humidity
  };
}).then(function (data) {
  addLogs(data);
  createTemperatureGraph(data);
  createHumidityGraph(data);
});
