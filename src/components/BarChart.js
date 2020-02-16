import React, { Component } from 'react'
import * as d3 from 'd3'
class BarChart extends Component {
    componentDidMount() {
        const data = [ 2, 4, 2, 6, 8 ]
        this.drawBarChart(data)
    }
    drawBarChart(data)  {
        const canvasHeight = 600
        const canvasWidth = 800
        // const scale = 20
        const svgCanvas = d3.select(this.refs.canvas)
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .style('border', '1px solid black')

        // svgCanvas.selectAll('rect')
        //     .data(data).enter()
        //         .append('rect')
        //         .attr('width', 40)
        //         .attr('height', (datapoint) => datapoint * scale)
        //         .attr('fill', 'orange')
        //         .attr('x', (datapoint, iteration) => iteration * 45)
        //         .attr('y', (datapoint) => canvasHeight - datapoint * scale)
        // svgCanvas.selectAll('text')
        //     .data(data).enter()
        //         .append('text')
        //         .attr('x', (dataPoint, i) => i * 45 + 10)
        //         .attr('y', (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
        //         .text(dataPoint => dataPoint)

        svgCanvas.append("circle")
            .attr("cx", canvasWidth/2)
            .attr("cy", canvasHeight/2)
            .attr("r", canvasHeight/2.5)
            .attr("stroke", "black")
            .attr("fill", "none")

        var arc1 = d3.arc()
            .innerRadius(canvasHeight/2.4)
            .outerRadius(canvasHeight/2.4);

        var arc2 = d3.arc()
            .innerRadius(canvasHeight/2.3)
            .outerRadius(canvasHeight/2.3);
            
        var arcGroup = svgCanvas.append("g")
            .attr("transform", "translate("+canvasWidth/2+","+canvasHeight/2+")")
            .attr("fill", "none")
            .attr("stroke-width", 4);

        arcGroup.append("path")
            .attr("stroke", "lightgreen")
            .attr("d", arc1({startAngle:0, endAngle:(Math.PI/2)}));
        arcGroup.append("path")
            .attr("stroke", "lightblue")
            .attr("d", arc1({startAngle:(Math.PI/2), endAngle:(Math.PI)}));
        arcGroup.append("path")
            .attr("stroke", "LightCoral")
            .attr("d", arc2({startAngle:(Math.PI), endAngle:(2*Math.PI)}));
        arcGroup.append("path")
            .attr("stroke", "moccasin")
            .attr("d", arc1({startAngle:(3*Math.PI/2), endAngle:(2*Math.PI)}));

        // [ lightgreen, lightblue, LightCoral, gainsboro, moccasin, pink]

        var arcLabels =svgCanvas.append("g")
            .attr("transform", "translate("+canvasWidth/2+","+canvasHeight/2+")")

        arcLabels.append("circle")
            .attr("r", 3)
    }
    render() { return <div ref="canvas"></div> }
}
export default BarChart