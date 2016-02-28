// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
    
var sgv = function(){

//var expdata = d3.json("testdata/testdata_efp.json", function(data) {
d3.csv("testdata/testdata_efp.csv", function(error, data) {
var mapping = {
"BS_S1" : null, 
"BS_S2" : null, 
"BS_S3":null,
"BS_S4":null,
"BS_S5":null,
"M_S1": null,
"M_S2": null,
"M_S3": null,
"M_S4": null,
"M_S5": null,

}

data.forEach(function(d) {

	Object.keys(mapping).forEach(function(key) {
        	console.log(key);
    	
            if (d.tissue == key){
		mapping[key]= d.value;
		}
	    });
	})
	

console.log(mapping);
var z = d3.scale.linear()
.domain(
[ d3.min(data,function(d){return d.value})
 ,d3.max(data,function(d){return d.value})
]).range(["blue","yellow"]);
console.log(z);

var div_zma_select = d3.select("#zma");
var tissues = Object.keys(mapping); // ["M_S1", "M_S2", "M_S3", "M_S4", "M_S5", "BS_S1","BS_S2", "BS_S3", "BS_S4","BS_S5"];
d3.text("resources/svg/zma1.svg", function(error, externalSVG) {
         if (error) {console.log(error); return;}
        div_zma_select.html(externalSVG);
//var t="BS_S1";
tissues.forEach(function(t){ 
	var cpath = div_zma_select.select("svg").select("#layer1").select("path#"+t).attr("style", function(){console.log(mapping[t], z(mapping[t]));return "fill:"+z(mapping[t])})


});
//var BS1 =  paths
//	.data(data, function(d) { return d.tissue; });
//console.log(BS1);
//console.log(data);
	//.attr("style", function(d,i){
	//	console.log(d, "D",i);return "fill:#FF0000"
	//});
});

});
}
