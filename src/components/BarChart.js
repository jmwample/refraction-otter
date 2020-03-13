import React, { Component } from 'react'
import * as d3 from 'd3'
class BarChart extends Component {
    componentDidMount() {
        // const static_list = [ 2, 4, 2, 6, 8 ]

        // http://stackoverflow.com/a/929107
        var reMap = function(oldValue) {
            var oldMin = 0,
                oldMax = -359,
                newMin = 0,
                newMax = (Math.PI * 2),
                newValue = (((oldValue - 90 - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;   
            return newValue;
        }
        
        // https://en.wikipedia.org/wiki/Polar_coordinate_system
        // first is position clockwise, aka angular coordinate, polar angle, or azimuth. range from 0 - 359
        // second is ring (range 0 to 1), aka Radial Coordinate.
        // third is node size radius (center to edge)
        var data = {
            "dots" : [
                [reMap(25), 1, 40, 'label 1'],
                [reMap(105), 0.8, 10, 'label 2'],
                [reMap(266), 1, 8, 'label 3'],
                [reMap(8), 0.2, 22, 'label 4'],
                [reMap(189), 1, 28, 'label 5'],
                [reMap(350), 0.6, 15, 'label 6'],
                [reMap(119), 0.4, 24, 'label 7'],
                [reMap(305), 0.8, 31, 'label 8']
            ],
            // [ lightgreen, lightblue, LightCoral, gainsboro, moccasin, pink]
            "countries": [
                {"start": 0, "end":(Math.PI/2), "label":"Africa", "color": "lightgreen", "radius": 2.35},
                {"start": (Math.PI/2), "end":(Math.PI), "label":"Asia", "color": "lightblue", "radius": 2.4},
                {"start": (Math.PI), "end":(2*Math.PI), "label":"Europe", "color": "LightCoral", "radius": 2.3},
                {"start": (3*Math.PI/2), "end":(2*Math.PI), "label":"North America", "color": "moccasin", "radius": 2.4}
            ]
        };

        // const graph = {
        //     "nodes": [
        //     {"id": "1", "group": 1},
        //     {"id": "2", "group": 2},
        //     {"id": "4", "group": 3},
        //     {"id": "8", "group": 4},
        //     {"id": "16", "group": 5},
        //     {"id": "11", "group": 1},
        //     {"id": "12", "group": 2},
        //     {"id": "14", "group": 3},
        //     {"id": "18", "group": 4},
        //     {"id": "116", "group": 5}
        //     ],
        //     "links": [
        //     {"source": "1", "target": "2", "value": 1},
        //     {"source": "2", "target": "4", "value": 1},
        //     {"source": "4", "target": "8", "value": 1},
        //     {"source": "4", "target": "8", "value": 1},
        //     {"source": "8", "target": "16", "value": 1},
        //     {"source": "16", "target": "1", "value": 1}
        //     ]
        // }

        // this.drawBarChart(static_list)
        this.drawNetworkGraph(data)
    }
    drawNetworkGraph(data)  {
        const canvasHeight = 600
        const canvasWidth = 800
        var radius = Math.min(canvasWidth, canvasHeight) / 2.5 - 50; // radius of the whole chart

        var r = d3.scaleLinear()
            .domain([0, 1])
            .range([0, radius]);
        
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var line = d3.lineRadial()
            .radius(function(d) {
                return r(d[1]);
            })
            .angle(function(d) {
                return -d[0] + Math.PI / 2;
            });

        const svgCanvas = d3.select(this.refs.canvas)
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .style('border', '1px solid black')
            // .style('overflow', 'visible') // uncomment to see when your objects are sitting right out of frame. 


        svgCanvas.append("circle")
            .attr("cx", canvasWidth/2)
            .attr("cy", canvasHeight/2)
            .attr("r", Math.min(canvasWidth, canvasHeight) /2.5)
            .attr("stroke", "black")
            .attr("fill", "none")

        var nodeGroup = svgCanvas.append("g")
            .attr("transform", "translate("+canvasWidth/2+","+canvasHeight/2+")")
            .attr("fill", "none")
            .attr("stroke-width", 4);      

        nodeGroup.selectAll('point')
            .data(data.dots)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('transform', function(d) {
                //console.log(d);
                var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
                return 'translate(' + coors + ')'
            })
            .attr('r', function(d) {
                return d[2];
            })
            .attr('fill',function(d,i){
                return color(i);
            }).on("click", function(d){
                console.log(d);
                //return tooltip.style("visibility", "visible");
            });

        nodeGroup.selectAll('point')
            .enter().append("text")
            .attr('transform', function(d) {
                var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
                return 'translate(' + coors + ')'
            })
            .text(function(d) { 
                return d[3]; 
            });


        // Plot the Arcs with country names. Create a container group then split by data.countries add the objects.
        var arcs = svgCanvas.append("g")
            .attr('class', 'countryLabels')
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
                var r = Math.min(canvasWidth, canvasHeight)/d.radius ;
                return 'translate('+ r*Math.sin(th) +','+ -1*r*Math.cos(th) +')'
            })

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
export default BarChart