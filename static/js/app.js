const samples  = "https://brus041.github.io/Web_Visualization_Challenge/samples.json"
d3.json(samples).then(function(data) {
    console.log(data);
    console.log(data.metadata[0].gender)
  });

// set up initial plot with 940 as id 
function init() {
    // initialize initial plot manually as it will change based on user selection
        dat = [{
            type: 'bar',
            x : [40, 40, 47, 50, 51, 71, 78, 113, 126, 163],
            y : ["OTU 1977", "OTU 2318", "OTU 189", "OTU 352", "OTU 1189", "OTU 41", "OTU 2264", "OTU 482", "OTU 2859", "OTU 1167"],
            orientation: 'h',
            
        }];
        
        Plotly.newPlot("bar", dat);
        d3.json(samples).then(function(data) {
            
          
        var trace1 = {
            x: data.samples[0].otu_ids ,
            y: data.samples[0].sample_values,
            mode: 'markers',
            marker: {
              color: data.samples[0].otu_ids,
              
              size: data.samples[0].sample_values
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'OTU Bubble Chart',
            showlegend: false,
            height: 600,
            width: 1500
          };
          
          Plotly.newPlot('bubble', data, layout);
        });
  }
  
d3.json(samples).then(function(data) {
    // create array for all ids
    ids = []
    for (let i = 0; i < data.samples.length; i++) {
        ids.push(data.samples[i].id)
    }    
  });

d3.selectAll("#selDataset").on("change", optionChanged);
  
function optionChanged(){
    var dropdownMenu = d3.select("#selDataset");
    var id = dropdownMenu.property("value");

// use  id to select that portion of json data 
// use x as sample_values, y as the names 
d3.json(samples).then(function(data) {
    for (let i = 0; i < data.samples.length; i++) {
        if (id === data.samples[i].id){


            var dem = d3.select("#sample-metadata")
            var row = dem.append("li")
            row.text('ID: '+ data.metadata[i].id);
            row.text('Ethnicity: '+ data.metadata[i].ethnicity);
            row.text('Age: '+ data.metadata[i].age);
            row.text('Gender: '+ data.metadata[i].gender);
            row.text('Location: '+ data.metadata[i].location);
            row.text('BB Type: '+ data.metadata[i].bbtype);
            row.text('Wfreq: '+ data.metadata[i].wfreq);
    
            // ************************create horizonal barchart************************
            var xs = data.samples[i].sample_values.slice(0,10);
            var sorted = xs.sort(function sortFunction(a, b) {
                return b - a;
              });
              
        
            var x0 = sorted.reverse();
            var y0 = data.samples[i].otu_ids.slice(0,10).reverse();
            
            var label = []
            for (let i = 0; i < y0.length; i++) {
                label.push("OTU " + y0[i])
            }
            dat = [{
                type: 'bar',
                x : x0,
                y : label,
                orientation: 'h',
                labels: label
            }];
            
            Plotly.newPlot("bar", dat);

            // *********************create bubbble chart********************
            
            var trace1 = {
                x: data.samples[i].otu_ids ,
                y: data.samples[i].sample_values,
                mode: 'markers',
                marker: {
                  color: data.samples[i].otu_ids,
                  
                  size: data.samples[i].sample_values
                }
              };
              
              var data = [trace1];
              
              var layout = {
                title: 'OTU Bubble Chart',
                showlegend: false,
                height: 600,
                width: 1500
              };
              
              Plotly.newPlot('bubble', data, layout);

              // *********************display metadata for chosen id********************
            // var dem = d3.select("#sample-metadata")
            // dem.text('ID: '+ data.metadata[i].id);
            // dem.text('Ethnicity: '+ data.metadata[i].ethnicity);
            // dem.text('Age: '+ data.metadata[i].age);
            // dem.text('Gender: '+ data.metadata[i].gender);
            // dem.text('Location: '+ data.metadata[i].location);
            // dem.text('BB Type: '+ data.metadata[i].bbtype);
            // dem.text('Wfreq: '+ data.metadata[i].wfreq);

        }
        
    }
  });
}


// display plot
init()
