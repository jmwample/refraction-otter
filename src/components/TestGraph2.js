


import React, { Component } from 'react'
import  * as d3 from 'd3'
import * as data1 from "./test-data.json"

class TestGraph2 extends Component {
    componentDidMount() {


        var width = 600;
        var height = 400;

        var c10 = d3.scaleOrdinal(d3.schemeCategory10);
        
        data1.nodes.forEach(d => {
            var cartesian = polar2Cartesian(d.r, deg2Rad(d.t));
            d.x = cartesian.x;
            d.y = cartesian.y;
        });
        
        var svg = d3.select(this.refs.canvas2)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style('overflow', 'visible') // uncomment to see when your objects are sitting right out of frame. 
            .style('border', '1px solid black')

        var drag = d3.drag()
        .on("drag", function(d, i) {

            // this is not ideal, we are moving the center of the circle to the 
            // exact location of the mouse, but the mouse gives us an event location 
            // relative to the group which I cannot figure out how to get otherwise.  
            var groupLocation = d3.mouse(this)
            d.x = groupLocation[0] + d3.event.dx
            d.y = groupLocation[1] + d3.event.dy

            d3.select(this).attr("cx", d.x).attr("cy", d.y);
            links.each(function(l, li) {
            if (l.source.index === i) {
                d3.select(this).attr("x1", d.x).attr("y1", d.y);
            } else if (l.target.index === i) {
                d3.select(this).attr("x2", d.x).attr("y2", d.y);
            }
            });
        });

        var net = svg.append("g")
            .attr("transform", "translate("+width/2+","+height/2+")")

        var links = net.selectAll("link")
            .data(data1.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("x1", function(l) {
                // console.log(l);
                var sourceNode = data1.nodes.filter(function(d, i) {
                    return i === l.source.index
                })[0];
                d3.select(this).attr("y1", sourceNode.y);
                return sourceNode.x
            })
            .attr("x2", function(l) {
                var targetNode = data1.nodes.filter(function(d, i) {
                    return i === l.target.index
                })[0];
                d3.select(this).attr("y2", targetNode.y);
                return targetNode.x
            })
            .attr("fill", "none")
            .attr("stroke", "black");

        net.selectAll("node")
            .data(data1.nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("cx", function(d) {
                return d.x
            })
            .attr("cy", function(d) {
                return d.y
            })
            .attr("r", 15)
            .attr("fill", function(d, i) {
                return c10(i);
            })
            .on("click",  function(d){
                console.log(d);
                //return tooltip.style("visibility", "visible");)
            })
            .call(drag);

    }
    render() { return <div ref="canvas2"></div> }
}
export default TestGraph2

function deg2Rad(t){
    return t * -1 * Math.PI / 180
}

function polar2Cartesian(r, t){
    var x = Math.cos(t)*r
    var y = Math.sin(t)*r
    var cart = {x:x, y:y}
    return cart
}

// var links = svg.selectAll("link")
// .data(data.links)
// .enter()
// .append("line")
// .attr("class", "link")
// .attr("x1", function(l){
//     var sourceNode = data.nodes.filter(function(d, i) {
//         return i === l.source
//     })[0];

//     console.log(sourceNode);
//     var cartesian = polar2Cartesian(sourceNode.r, sourceNode.t);

//     d3.select(this).attr("y1", cartesian.y);
//     return cartesian.x
// })
// .attr("x2", function(l) {
//     var targetNode = data.nodes.filter(function(d, i) {
//         return i === l.target
//     })[0];

//     var cartesian = polar2Cartesian(targetNode.r, targetNode.t);

//     d3.select(this).attr("y2", cartesian.y);
//     return cartesian.x
// })
// .attr("fill", "none")
// .attr("stroke", "white");
