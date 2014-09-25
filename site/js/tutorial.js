(function myFunction() {


var theData = [ 1, 2, 3, 72 ];

var circle = [40, 20, 10];

var spaceCircles = [30, 70, 110];


var jsonCircles = [
  {
   "x_axis": 30,
   "y_axis": 30,
   "radius": 20,
   "color" : "green"
  }, {
   "x_axis": 70,
   "y_axis": 70,
   "radius": 20,
   "color" : "purple"
  }, {
   "x_axis": 110,
   "y_axis": 100,
   "radius": 20,
   "color" : "red"
}];

var jsonRectangles = [
   { "x_axis": 10, "y_axis": 10, "height": 20, "width":20, "color" : "green" },
   { "x_axis": 160, "y_axis": 40, "height": 20, "width":20, "color" : "purple" },
   { "x_axis": 70, "y_axis": 70, "height": 20, "width":20, "color" : "red" }];
   
 var max_x = 0;
 var max_y = 0;
 
 for (var i = 0; i < jsonRectangles.length; i++) {
	var temp_x, temp_y;
	// To get the farthest right hand point, we need to add the x-coordinate and the width
    var temp_x = jsonRectangles[i].x_axis + jsonRectangles[i].width;
	// To get the farthest bottom point, we need to add the y-coordinate and the height
	var temp_y = jsonRectangles[i].y_axis + jsonRectangles[i].height;
	  if ( temp_x >= max_x ) {
		max_x = temp_x;
	  }

  /**
  * If the temporary y-coordinate is bigger than the max_y,
  * make the max_y equal to the temp_y
  * otherwise, do nothing.
  */
	if ( temp_y >= max_y ) {
		max_y = temp_y;
	}
 
 };

   var svgContainer = d3.select("body").append("svg")
	.attr("width", max_x + 20)
	.attr("height", max_y + 20);
	
  var rectangles = svgContainer.selectAll("rect")
	.data(jsonRectangles)
	.enter()
	.append("rect");
	
  var rectangleAttributes = rectangles
	.attr("x", function (d) { return d.x_axis; })
	.attr("y", function (d) { return d.y_axis; })
	.attr("height", function (d) { return d.height; })
	.attr("width", function (d) { return d.width; })
	.style("fill", function (d) { return d.color; })



/*
var svgContainer = d3.select("body").append("svg")
	.attr("width", 200)
	.attr("height", 200)
	.style("border", "1px solid black");

var circles = svgContainer.selectAll("circle")
  .data(jsonCircles)
  .enter()
  .append("circle");
  
var circleAttributes = circles
  .attr("cx", function(d) { return d.x_axis;})
  .attr("cy", function(d) { return d.y_axis; })
  .attr("r", function(d) { return d.radius; })
  .style("fill", function(d) { return d.color; });  
*/  

var p = d3.select("body").selectAll("p")
  .data(theData)
  
  /*The D3.js Enter Method returns the virtual enter selection from the Data Operator. 
  This method only works on the Data Operator because the Data Operator is the only one that 
  returns three virtual selections.
  */
  .enter() //However, it is important to note that this reference (empty selection) only allows chaining of append, insert and select operators to be used on it.
  .append("p") //For each placeholder element created in the previous step, a p element is inserted.
  .text( function (d, i) {
		var tempvalue = d + 2;
		return "i = " + i + ", d = "+ d;
	}); 
	
	//The Text Operator sets the textContent of the node to the specified value on all selected elements.
  
  //What is also true of the Text Operator is that if the value passed to it (the Text Operator) is a function, then the function is evaluated for each element in order. 
  //And the functions result is used to set each element's text context.

  //Which in our case means, that instead of setting "Hello" as the text value, the function goes through each element, gets the __data__ property and returns it to the Text Operator, 
  //so that it can set that result as the text content for the element.
  
  //You can see that the variable d is available for use in the anonymous function. 
  //This variable is provided to us by D3.js and it refers to the current __data__ attribute for the specific element being processed.

  //The are two other variables provided to us by D3.js - this and i.

  //this refers to the current DOM element being evaluated.
  
  //i refers to the index of the current HTML element being evaluated in the selected elements selection. 
  //Remember that all the data is processed at once and in sequential order. Note - i starts at 0. This means in our data set
  
  console.log(p);
  
})();

//__GENERAL NOTES__

/*
Which means that it's important to make sure that the .data() operator receives an array of data, 
regardless of what is inside of the array.

D3.js has built in functionality to load in the following types of external resources:

an XMLHttpRequest
a text file
a JSON blob
an HTML document fragment
an XML document fragment
a comma-separated values (CSV) file
a tab-separated values (TSV) file

***

Which means that our line does not take up space - so we don't actually see anything.

To fix this, make sure to give the line:

.attribute("stroke-width", NUMBER), where NUMBER is how wide the line is in units
.attribute("stroke", "COLOR"), where COLOR is a color to used to color the line


1) SVG Straight Line in D3.js are - x1, y1, x2, y2, stroke-width and stroke.

2) Notice that the important attributes we need to draw an SVG Ellipse in D3.js are - cx, cy, rx and ry.

3) Notice that the important attributes we need to draw an SVG Rectangle in D3.js are - x, y, width and height.

4) Notice that the important attributes we need to draw an SVG Circle in D3.js are - cx, cy and r.

***
This attribute, d, contains a series of commands and parameters in the SVG Path Mini-Language.

The instructions are defined in case-senstive terms of moveto (set a new current point), lineto (draw a straight line), curveto (draw a curve using a cubic Bézier), 
arc (elliptical or circular arc) and closepath (close the current shape by drawing a line to the last moveto).

Note - our letters (M, L) are capitalized which means that we were using absolute positioning within our SVG Viewing window. 
If we use lower case commands, then we will be using relative positioning.

step-after - alternate between horizontal and vertical segments, as in a step function.  - PROBABLY WHAT I NEED


*** Scales ***

We take an interval (called Domain by D3.js) and transform it into a new interval (called Range by D3.js).

*/