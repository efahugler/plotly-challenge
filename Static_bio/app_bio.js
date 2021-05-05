
let idSelect = d3.select("#selDataset");
let demographicsTable = d3.select("#sample-metadata");

// select the bar chart div
let barChart = d3.select("#bar");

// select the bubble chart div
var bubbleChart = d3.select("bubble");

// create a function to initially populate dropdown menu with IDs and draw charts by default (using the first ID)
function init() {

    // reset any previous data
    resetData();

    // read in samples from JSON file
    d3.json("samples.json").then((data => {


        //  use a forEach to loop over each name in the array data.names to populate dropdowns with IDs
        data.names.forEach((name => {
            let option = idSelect.append("option");
            option.text(name);
        })); // close forEach

        // get the first ID from the list for initial charts as a default
        let initId = idSelect.property("value")

        // plot charts with initial ID
        plotCharts(initId);

    })); // close .then()

} // close init() function

function resetData() {



    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
    gaugeChart.html("");

};
// create a function to read JSON and plot charts
function plotCharts(id) {

    // read in the JSON data
    d3.json("samples.json").then((data => {

     

        // filter the metadata for the ID chosen
        var individualMetadata = data.metadata.filter(participant => participant.id == id)[0];

        // Iterate through each key and value in the metadata
        Object.entries(individualMetadata).forEach(([key, value]) => {

            var newList = demographicsTable.append("ul");
            newList.attr("class", "list-group list-group-flush");

            // append a li item to the unordered list tag
            var listItem = newList.append("li");

            // change the class attributes of the list item for styling
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");

            // add the key value pair from the metadata to the demographics list
            listItem.text(`${key}: ${value}`);

        }); // close forEach

       

        // filter the samples for the ID chosen
        var individualSample = data.samples.filter(sample => sample.id == id)[0];

        // create empty arrays to store sample data
        var otuIds = [];
        var otuLabels = [];
        var sampleValues = [];

        // Iterate through each key and value in the sample to retrieve data for plotting
        Object.entries(individualSample).forEach(([key, value]) => {

            switch (key) {
                case "otu_ids":
                    otuIds.push(value);
                    break;
                case "sample_values":
                    sampleValues.push(value);
                    break;
                case "otu_labels":
                    otuLabels.push(value);
                    break;
                    // case
                default:
                    break;
            } 

        }); 

        // slice and reverse the arrays to get the top 10 values, labels and IDs
        var topOtuIds = otuIds[0].slice(0, 10).reverse();
        var topOtuLabels = otuLabels[0].slice(0, 10).reverse();
        var topSampleValues = sampleValues[0].slice(0, 10).reverse();

        // use the map function to store the IDs with "OTU" for labelling y-axis
        var topOtuIdsFormatted = topOtuIds.map(otuID => "OTU " + otuID);

        // ----------------------------------
        // PLOT BAR CHART
        // ----------------------------------

        // create a trace
        var traceBar = {
            x: topSampleValues,
            y: topOtuIdsFormatted,
            text: topOtuLabels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgb(29,145,192)'
            }
        };

        // create the data array for plotting
        var dataBar = [traceBar];

        // define the plot layout
        var layoutBar = {
            height: 500,
            width: 600,
            font: {
                family: 'Quicksand'
            },
            hoverlabel: {
                font: {
                    family: 'Quicksand'
                }
            },
            title: {
                text: `<b>Top OTUs for Test Subject ${id}</b>`,
                font: {
                    size: 18,
                    color: 'rgb(34,94,168)'
                }
            },
            xaxis: {
                title: "<b>Sample values<b>",
                color: 'rgb(34,94,168)'
            },
            yaxis: {
                tickfont: { size: 14 }
            }
        }


        // plot the bar chart to the "bar" div
        Plotly.newPlot("bar", dataBar, layoutBar);

        // ----------------------------------
        // PLOT BUBBLE CHART
        // ----------------------------------

        // create trace
        var traceBub = {
            x: otuIds[0],
            y: sampleValues[0],
            text: otuLabels[0],
            mode: 'markers',
            marker: {
                size: sampleValues[0],
                color: otuIds[0],
                colorscale: 'YlGnBu'
            }
        };

        // create the data array for the plot
        var dataBub = [traceBub];

        // define the plot layout
        var layoutBub = {
            font: {
                family: 'Quicksand'
            },
            hoverlabel: {
                font: {
                    family: 'Quicksand'
                }
            },
            xaxis: {
                title: "<b>OTU Id</b>",
                color: 'rgb(34,94,168)'
            },
            yaxis: {
                title: "<b>Sample Values</b>",
                color: 'rgb(34,94,168)'
            },
            showlegend: false,
        };

        // plot the bubble chat to the appropriate div
        Plotly.newPlot('bubble', dataBub, layoutBub);
    })); // close



    };

        function newchange (id) {
            resetData();
            plotCharts(id);

        }

    init(); 