function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => 
        sampleobject.id == sample);
      var result= resultsarray[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });

    });
}

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples= data.samples;
      var resultsarray= samples.filter(sampleobject => 
          sampleobject.id == sample);
      var result= resultsarray[0]
    
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      var values = result.sample_values;

      
      var LayoutBubble = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
        };
    
        var DataBubble = [ 
        {
          x: ids,
          y: values,
          text: labels,
          mode: "markers",
          marker: {
            color: ids,
            size: values,
            }
        }
      ];
    
      Plotly.newPlot("bubble", DataBubble, LayoutBubble);

var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"

    }
  ];

  var dataBar = [bar_data];

  
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
  Plotly.newPlot("bar", dataBar, layoutBar);
});
}
 
function init () {
    let selectname = d3.select("#set1Dataset"); 
    d3.json("samples.json").them ((data) => {
        let nameSample = data.names; 
        nameSample.forEach((sample) => {
            selectname
            .append("option")
            .property("value", sample)
            .text(sample)
        });


const Sampleorigin = nameSample[0];
buildCharts(Sampleorigin);
buildMetadata(Sampleorigin);
});
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
    }

init();


