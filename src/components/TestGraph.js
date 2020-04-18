import React, { Component } from 'react'
import {select} from 'd3'
class TestGraph extends Component {
    componentDidMount() {
        var data = {};

        this.width = 800;
        this.height = 600;

        var svg = select(this.refs.canvas2)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('overflow', 'visible') // uncomment to see when your objects are sitting right out of frame. 
            .style('border', '1px solid black');

        this.drawBullseye(svg, data)
    }
    drawBullseye(svg, data) {

        

    }
    render() { return <div ref="canvas2"></div> }
}
export default TestGraph
