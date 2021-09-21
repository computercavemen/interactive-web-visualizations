const sample = "./samples.json"
function bar_chart(sample_value) {

  d3.json(sample).then(function (data) {

    var d1 = data.samples.filter(sample => sample.id == sample_value)[0]
    var d2 = d1.sample_values
    var labels = d1.otu_ids

    slicedD2 = d2.slice(0, 10);
    slicedLabels = labels.slice(0, 10);
    slicedLabels = slicedLabels.map(L => "otu" + L)
    slicedD2.reverse();

    var trace1 = {
      x: slicedD2,
      y: slicedLabels,
      type: "bar",
      orientation: "h",
    };

    let traceData = [trace1];

    Plotly.newPlot("bar", traceData)
  });
}

//   Bubble Chart

function bubble_chart(sample_value){
  d3.json("samples.json").then(function(data){

  var d1 = data.samples.filter(sample => sample.id == sample_value)[0]
  var d2 = d1.sample_values
  var labels = d1.otu_ids
  var hover = d1.otu_labels

  var trace2 = {
      x: labels,
      y: d2,
      mode: 'markers',
      text: hover,
      marker: {
      color: labels,
      opacity: [1, 0.8, 0.6, 0.4],
      size: d2
      }
  };
  
  let bubbledata = [trace2];
  
  var layout = {
      // title: 'Marker Size and Color',
      // showlegend: true,
      height: 600,
      width: 600
  };
  
  Plotly.newPlot('bubble', bubbledata, layout);
      })
  }



function init() {
  d3.json(sample).then(function (data) {
    let s1 = data.samples

    let drop = d3.select("#selDataset");

    for (i = 0; i < s1.length; i++) {
      var li2 = drop.append("option").text(`${s1[i].id}`);
      li2.property("value", s1[i].id)
    }
    bar_chart(s1[0].id)
    bubble_chart(s1[0].id)
    build_metadata(s1[0].id)
  })
}
init()

function optionChanged(sample_value) {
  bar_chart(sample_value)
  build_metadata(sample_value)
  bubble_chart(sample_value)
}


function build_metadata(sample_value) {
  d3.json("samples.json").then((data) => {
    var metadata= data.metadata;
    var array= metadata.filter(sample => sample.id == sample_value);
    var result= array[0]
    var selectsample = d3.select("#sample-metadata");
    selectsample.html("");
    Object.entries(result).forEach(([a, b]) => {
    selectsample.append("h5").text(`${a}: ${b}`);
  });
});
}
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var data = [];

//   if (dataset == 'us') {
//       data = us;
//   }
//   else if (dataset == 'uk') {
//       data = uk;
//   }
//   else if (dataset == 'canada') {
//       data = canada;
//   }
//   // Call function to update the chart
//   updatePlotly(data);

// // Create an array of each country's numbers
// var us = Object.values(data.us);
// var uk = Object.values(data.uk);
// var canada = Object.values(data.canada);

// // Create an array of music provider labels
// var labels = Object.keys(data.us);

// // Display the default plot
// function init() {
//   var data = [{
//     values: us,
//     labels: labels,
//     type: "bar"
//   }];

//   var layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot("bar", data, layout);
// }

// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);


// function build_charts(sample){
//     // pass in sample data
// //     // Sort the data by Greek search results descending
//   var sample_point = d3.select("940");  
//   let sample_values = data.sort((a, b) => b.sample_values - a.sample_values);

    // Slice the first 10 objects for plotting
    // slicedData = sortedByGreekSearch.slice(0, 10);

    // // Reverse the array to accommodate Plotly's defaults
    // reversedData = slicedData.reverse();

    // Trace1 for the Greek Data
    // let trace1 = {
    // x: reversedData.map(object => object.greekSearchResults),
    // y: reversedData.map(object => object.greekName),
    // text: reversedData.map(object => object.greekName),
    // name: "Greek",
    // type: "bar",
    // orientation: "h"
    // };

    // // Data array
    // // `data` has already been defined, so we must choose a new name here:
    // let traceData = [trace1];

    // // Apply a title to the layout
    // let layout = {
    // title: "Greek gods search results",
    // margin: {
    //     l: 100,
    //     r: 100,
    //     t: 100,
    //     b: 100
    // }
    // };

    // // Render the plot to the div tag with id "plot"
    // // Note that we use `traceData` here, not `data`
    // Plotly.newPlot("plot", traceData, layout);


// }
// function start_up(){
//     // loading the drop down data
//     build_charts("940")
//     build_metadata("940")
// }
// function optionChanged(sample){
//     build_charts(sample)
//     build_metadata(sample)
// }

// function build_metadata(sample){

// }
// start_up()