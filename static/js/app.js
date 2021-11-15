const samples  = "https://brus041.github.io/Web_Visualization_Challenge/samples.json"
d3.json(samples).then(function(data) {
    console.log(data);
  });

// set up initial plot with 940 as id 
function init() {
    dat = [{
        type: 'bar',
        x : [20, 14, 23],
        y : ['giraffes', 'orangutans', 'monkeys'],
        orientation: 'h',
        transforms: [
            {
              type: "sort",
              target: "x",
              order: "ascending"
            }
          ]
    }];
    
    Plotly.newPlot("bar", dat);
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
            var xs = data.samples[i].sample_values.slice(0,10);
            var sorted = xs.sort(function sortFunction(a, b) {
                return b - a;
              });
            var x = sorted.reverse();
            var y = data.samples[i].otu_ids.slice(0,10);

            Plotly.restyle("bar", "x", [x]);
            Plotly.restyle("bar", "y", [y]);
        }
    }
    // Plotly.restyle("bar", "x", [x]);
    // Plotly.restyle("bar", "y", [y]);

    

  });
}


// display plot
init()
