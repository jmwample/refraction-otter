import React, {Component } from 'react'
import * as d3 from 'd3'
class ConeSizeHist extends Component {
    componentDidMount() {
        const static_list = [ 2, 4, 2, 6, 8 ]
        const data = this.props.histData

        console.log(data)        
        this.drawBarChart(static_list)
    }

    drawBarChart(data)  {
       const canvasHeight = 600
       const canvasWidth = 800
       const scale = 20
       const svgCanvas = d3.select(this.refs.canvas)
           .append('svg')
           .attr('width', canvasWidth)
           .attr('height', canvasHeight)
           .style('border', '1px solid black')
        svgCanvas.selectAll('rect')
            .data(data).enter()
                .append('rect')
                .attr('width', 40)
                .attr('height', (datapoint) => datapoint * scale)
                .attr('fill', 'orange')
                .attr('x', (datapoint, iteration) => iteration * 45)
                .attr('y', (datapoint) => canvasHeight - datapoint * scale)
        svgCanvas.selectAll('text')
            .data(data).enter()
                .append('text')
                .attr('x', (dataPoint, i) => i * 45 + 10)
                .attr('y', (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
                .text(dataPoint => dataPoint)
    }
    render() { return <div ref="canvas"></div> }
}
export default ConeSizeHist;



// function cartesian2Polar(x, y){
//     distance = Math.sqrt(x*x + y*y)
//     radians = Math.atan2(y,x) //This takes y first
//     polarCoor = { r:distance, theta:radians }
//     return polarCoor
//     // degrees = radians * (180/Math.PI)
// }