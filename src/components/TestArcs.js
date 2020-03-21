import React, { Component } from 'react'
import * as d3 from 'd3'
import arcData from './map-arcs.json'

class TestArcs extends Component {
    componentDidMount() {

        // http://stackoverflow.com/a/929107
        // https://en.wikipedia.org/wiki/Polar_coordinate_system
        // first is position clockwise, aka angular coordinate, polar angle, or azimuth. range from 0 - 359
        // second is ring (range 0 to 1), aka Radial Coordinate.
        // third is node size radius (center to edge)
        var reMap = function(oldValue) {
            var oldMin = 0,
                oldMax = -359,
                newMin = 0,
                newMax = (Math.PI * 2),
                newValue = (((oldValue - 90 - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;   
            return newValue;
        }

        var latLong = true

        // Add an event listener to the button created in the html part
        d3.select("#buttonLat").on("click", ()=> {console.log("eventLong"); latLong = true });
        d3.select("#buttonLong").on("click", () => {console.log("eventLong"); latLong = false });

        const canvasHeight = 600
        const canvasWidth = 800
        
        const svgCanvas = d3.select(this.refs.canvas)
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .style('border', '1px solid black')
            .style('overflow', 'visible') // uncomment to see when your objects are sitting right out of frame. 
            
        svgCanvas.append("circle")
            .attr("cx", canvasWidth/2)
            .attr("cy", canvasHeight/2)
            .attr("r", Math.min(canvasWidth, canvasHeight) /2.5)
            .attr("stroke", "black")
            .attr("fill", "none")

        
        // console.log(Object.values(arcData.Continents))
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        // var latLong = false;

        // define arc used for country objects.
        var countryArc = d3.arc()
            .innerRadius(function(d, i) {
                return d.radius;
            })
            .outerRadius(function(d, i) {
                return d.radius;
            });

        var arcs = svgCanvas.append("g")
            .attr('className', 'countryLabels')
            .attr("transform", "translate("+canvasWidth/2+","+canvasHeight/2+")")
            .selectAll("g")
            .data(Object.values(arcData.Continents))
            .attr("fill", "none")
            .enter().append('g')
            .attr("stroke-width", 4);

        // Draw the arc path into each arc's group
        arcs.append("path")
            .attr('stroke', function(d, i) {
                return color(i)
            })
            .attr("d", function(d, i) { 
                var r = Math.min(canvasWidth, canvasHeight)/(2.45 - 0.05*i);
                var start = reMap((latLong)? d.Minlatitude: d.Minlongitude);
                var end =   reMap((latLong)? d.Maxlatitude: d.Maxlongitude);
                return countryArc({startAngle:start, endAngle:end, radius:r}) 
            });
        
        // Add the country name label to each arc's group
        arcs.append('text')
            .text(function(d) {return d.Continent})
            .attr('transform', function(d) {
                var start = reMap(d.Minlongitude);
                var end = reMap(d.Maxlongitude);
                var th = (start + (end - start)/2);
                var r = Math.min(canvasWidth, canvasHeight)/2.4 + 50;
                return 'translate('+ (r*Math.sin(th) - 10 ) +','+ -1*r*Math.cos(th) +')'
            })
            .attr("text-anchor", function(d) {
                // are we past the center?
                return (d.endAngle + d.startAngle)/2 > Math.PI ?
                    "end" : "start";
            })
            .attr('stroke', (d,i) => color(i) )
            .attr('stroke-width', 1);

        // this.drawBarChart(static_list)
        // this.drawNetworkGraph(data)
    }
    drawNetworkGraph(data)  {
        const canvasHeight = 600
        const canvasWidth = 800
        // var radius = Math.min(canvasWidth, canvasHeight) / 2.5 - 50; // radius of the whole chart

        // var r = d3.scaleLinear()
        //     .domain([0, 1])
        //     .range([0, radius]);
        
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        // var line = d3.lineRadial()
        //     .radius(function(d) {
        //         return r(d.radius);
        //     })
        //     .angle(function(d) {
        //         return -d.angle + Math.PI / 2;
        //     });
        
        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(canvasWidth / 2, canvasHeight / 2));

        const svgCanvas = d3.select(this.refs.canvas)
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .style('border', '1px solid black')
            .style('overflow', 'visible') // uncomment to see when your objects are sitting right out of frame. 

        svgCanvas.append("circle")
            .attr("cx", canvasWidth/2)
            .attr("cy", canvasHeight/2)
            .attr("r", Math.min(canvasWidth, canvasHeight) /2.5)
            .attr("stroke", "black")
            .attr("fill", "none")


        var graphGroup = svgCanvas.append("g")
            .attr("fill", "none")
            .attr("stroke-width", 4);      

        var link = graphGroup.append('g')
            .attr('className', 'forcelinks')
            .selectAll("graphlinks")
            .data(data.links)
            .enter()
            .append("line")
              .attr("class", "link");

        var node = graphGroup.append("g")
              .attr("class", "nodes")
            .selectAll("graphnodes")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr('r', function(d) {
                return d.noder;
            })
            .attr('fill',function(d,i){
                return color(i);
            }).on("click", function(d){
                console.log(d);
                //return tooltip.style("visibility", "visible");
            })
            // .call(d3.drag()
            //     .on("start", dragstarted)
            //     .on("drag", dragged)
            //     .on("end", dragended));
      
        node.append("text")
            .text(function(d) {
              return d.id;
            })
            .attr('x', 6)
            .attr('y', 3);

        simulation
            .nodes(data.nodes)
            .on("tick", tick);

        // simulation.force("link").links(data.links);
        
        // graphGroup.selectAll('point')
        //     .enter().append("text")
        //     .attr('transform', function(d) {
        //         var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
        //         return 'translate(' + coors + ')'
        //     })
        //     .text(function(d) { 
        //         return d.label; 
        //     });

        function tick() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
            }
              

        // var edgeGroup = svgCanvas.append("g")
        //     .attr('className', 'asRelations')
        //     .attr("transform", "translate("+canvasWidth/2+","+canvasHeight/2+")")
        //     .selectAll('g')
        //     .data(data.edges)
        //     .enter().append('g')

        // // Initialize the links
        // const links = edgeGroup.append("line")
        //     .attr("className", "links")
        //     .attr("stroke","#999")
        //     .attr("stroke-width","2px")
        //     .style("opacity", 0.8)
        //     .attr("id", function(d) { 
        //         console.log(d.source, '->', d.target)
        //         return "line"+d.source+d.target
        //     })
        //     .attr("className", "links")
        //     .attr('marker-end','url(#arrowhead)')
        //     //The marker-end attribute defines the arrowhead or 
        //     //      polymarker that will be drawn at the final vertex of the given shape.

        // Plot the Arcs with country names. Create a container group then split by data.countries add the objects.
        var arcs = svgCanvas.append("g")
            .attr('className', 'countryLabels')
            .attr("transform", "translate("+canvasWidth/2+","+canvasHeight/2+")")
            .selectAll("g")
            .data(data.countries)
            .attr("fill", "none")
            .enter().append('g')
            .attr("stroke-width", 4);

        // define arc used for country.
        var countryArc = d3.arc()
            .innerRadius(function(d, i) {
                return d.radius;
            })
            .outerRadius(function(d, i) {
                return d.radius;
            });

        // Draw the arc path into each arc's group
        var arcPaths = arcs.append("path")
            .attr('stroke', function(d) {
                return d.color
            })
            .attr("d", function(d) {
                var r = Math.min(canvasWidth, canvasHeight)/d.radius
                return countryArc({startAngle:d.start, endAngle:d.end, radius:r}) 
            });
        
        // Add the country name label to each arc's group
        var arcLabels = arcs.append('text')
            .text(function(d) {return d.label})
            .attr('transform', function(d) {
                var th = (d.start + (d.end - d.start)/2);
                var r = Math.min(canvasWidth, canvasHeight)/d.radius + 50;
                return 'translate('+ (r*Math.sin(th) - 10 ) +','+ -1*r*Math.cos(th) +')'
            })
            .attr("text-anchor", function(d) {
                // are we past the center?
                return (d.endAngle + d.startAngle)/2 > Math.PI ?
                    "end" : "start";
            });
        console.log(arcLabels, arcPaths)
    }

    // drawBarChart(data)  {
    //    const canvasHeight = 600
    //    const canvasWidth = 800
    //    const scale = 20
    //    const svgCanvas = d3.select(this.refs.canvas)
    //        .append('svg')
    //        .attr('width', canvasWidth)
    //        .attr('height', canvasHeight)
    //        .style('border', '1px solid black')
    //     svgCanvas.selectAll('rect')
    //         .data(data).enter()
    //             .append('rect')
    //             .attr('width', 40)
    //             .attr('height', (datapoint) => datapoint * scale)
    //             .attr('fill', 'orange')
    //             .attr('x', (datapoint, iteration) => iteration * 45)
    //             .attr('y', (datapoint) => canvasHeight - datapoint * scale)
    //     svgCanvas.selectAll('text')
    //         .data(data).enter()
    //             .append('text')
    //             .attr('x', (dataPoint, i) => i * 45 + 10)
    //             .attr('y', (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
    //             .text(dataPoint => dataPoint)
    // }
    render() { return <div ref="canvas"></div> }
}
export default TestArcs


// function cartesian2Polar(x, y){
//     distance = Math.sqrt(x*x + y*y)
//     radians = Math.atan2(y,x) //This takes y first
//     polarCoor = { r:distance, theta:radians }
//     return polarCoor
//     // degrees = radians * (180/Math.PI)
// }