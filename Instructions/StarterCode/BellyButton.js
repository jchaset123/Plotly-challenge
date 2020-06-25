 
var dropOp=[]
var samples = []
d3.json("./samples.json").then(function(sampleData){
    console.log(sampleData);
    samples = sampleData
    console.log(samples)
    dropOp = sampleData.names 
    demoInfo = sampleData.metadata
    console.log(dropOp)
    dropOp.forEach(function(d) {
        var x = d3.select("#selDataset");
        x.append("option").text(d).attr("value", d);
    })
    TTBar();
})

var button = d3.select("#selDataset");
button.on("change",TTBar)

function TTBar() {
    sample = d3.select("#selDataset").property("value");
    console.log("for example", sample)
    var values = []
    var labels = []
    var hover = []
    var index = dropOp.indexOf(sample)
    console.log('index', index)
    console.log(samples.samples[index])
    var numSamples = samples.samples[index].otu_ids.length
    console.log(`Length: ${numSamples}`)
    if(numSamples > 10) {   
        for(i=0; i<10;i++){
            //console log check before push
            //console.log(samples.samples[index].otu_ids[i])
            labels.push(samples.samples[index].otu_ids[i])
            //console.log(samples.samples[index].otu_labels[i])
            hover.push(samples.samples[index].otu_labels[i])
            //console.log(samples.samples[index].sample_values[i])
            values.push(samples.samples[index].sample_values[i])
            }}

    else {
        for(i=0; i<numSamples;i++){
            //console log check before push
            //console.log(samples.samples[index].otu_ids[i])
            labels.push(samples.samples[index].otu_ids[i])
            //console.log(samples.samples[index].otu_labels[i])
            hover.push(samples.samples[index].otu_labels[i])
            //console.log(samples.samples[index].sample_values[i])
            values.push(samples.samples[index].sample_values[i])
        }}

    console.log(`values: ${values}`)
    label = labels.map(d => d.toString())
    //console.log(`label: ${label}`)
    //console.log(`hover: ${hover}`)

    var otu_ids = sample;
    var otu_labels = label;
    var sample_values = hover;

    var bubbleData = [
        {
        x: label,
        y: values,
        text: hover,
        mode: "markers",
        marker: {
            size: values,
            color: labels,
            colorscale: "purple"
        }}]

    var bubbleLayout = {
        
        hovermode: "closests",
        xaxis: { title: "OTU ID"},
        yaxis: {}
        }

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    var data = [{
        x: values,
        y: label,
        type: 'bar',
        orientation: 'h',
        text: hover
    }]
    var layout ={
        yaxis: {
            type: 'category',
            autorange: 'reversed'
        }}

    Plotly.newPlot('bar',data,layout)

    demos = d3.select("#sample-metadata")
    Object.entries(demoInfo[index]).forEach(function([key,value]){
        demos.append("div").text(`${key.toString()}: ${value}`).style("text-align", "left")
    })
};