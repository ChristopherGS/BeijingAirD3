(function myFunction() {


d3.csv("js/Beijing_2013_HourlyPM2.5.csv", function(d) {
	//console.log(d);
	
//__CIRCLE
	
	var svg = d3.select("#svgCircleD3Data");
 
        var svgCircleCanvas = svg.append("svg:svg")
            .attr("width", 200)
            .attr("height", 200)
			
	var circleArray = [];
		
		for(var i = 0; i < d.length; i++) {
			var data = parseInt(d[i].Value);
			var date = new Date(d[i].Date);
			circleArray.push({data: data, x:i, y:data, date: date});
		}
		
	//console.log(circleArray);
	
var axisScale = d3.time.scale()
	.domain([circleArray.date])
	.range([0,200]);

var xAxis = d3.svg.axis()
	.scale(axisScale)
	.orient("bottom"); //doesn't seem to work
	
var xAxisGroup = svgCircleCanvas.append("g")
	.call(xAxis);
	
svgCircleCanvas.selectAll("circle")
	.data(circleArray)
	.enter()
    .append("circle")
    .attr("cx",function(circleArray) {return circleArray.x+"px";})
    .attr("cy",function(circleArray) {return circleArray.y+"px";})
    .attr("r","1px")
    .style("fill", "red");

	
	
	
	
//__LINE__	
	
	var pmiArray = [];
		
		for(var i = 0; i < d.length; i++) {
			var data = parseInt(d[i].Value);
			var date = new Date(d[i].Date);
			pmiArray.push({x:i, y:data});
		}
//console.log(typeof pmiArray[1].x);
//console.log(typeof pmiArray[1].y);
//console.log(pmiArray[1].y);
//console.log(pmiArray);



var container = d3.select("#svgpathD3data");
 
        var svgcanvas = container.append("svg:svg")
            .attr("width", 200)
            .attr("height", 200)
 
        // (2) Creating path using D3 path data generators
 
        // Specify the path points
        pathinfo = [{x:0, y:60},
                    {x:50, y:110},
                    {x:90, y:70},
                    {x:140, y:100}];
 
        // Specify the function for generating path data             
        var d3line2 = d3.svg.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;})
                        .interpolate("linear"); 
                        // "linear" for piecewise linear segments
 
        // Creating path using data in pathinfo and path data generator
        // d3line.
        svgcanvas.append("svg:path")
            .attr("d", d3line2(pmiArray))
            .style("stroke-width", 2)
            .style("stroke", "steelblue")
            .style("fill", "none");

}); //close the .csv function

})();