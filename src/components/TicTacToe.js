import React, { Component } from 'react'
import * as d3 from 'd3'

class TicTacToe extends Component {

    componentDidMount() {
        const canvasHeight = 600;
        const canvasWidth = 800;
        const border = 120;

        const grid = [
            {x1:-0.5, y1:-1.0/6.0, x2:0.5, y2:-1.0/6.0},   // --
            {x1:-0.5, y1: 1.0/6.0, x2:0.5, y2: 1.0/6.0},   // --
            {x1:-1.0/6.0, y1:-0.5, x2:-1.0/6.0, y2:0.5},   // |
            {x1: 1.0/6.0, y1:-0.5, x2: 1.0/6.0, y2:0.5},   // |
        ]

        // var gameState = {
        //     state:  [[0,0,0],[0,0,0],[0,0,0]],
        //     player1: {
        //         home: [],
        //         color: 'black',
        //     },
        //     player2: {
        //         home: [],
        //         color: 'red',
        //     }
        // };

        const svgCanvas = d3.select(this.refs.canvas)
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .style('border', '1px solid black')
            .style('overflow', 'visible') // uncomment to see when your objects are sitting right out of frame. 

        svgCanvas.append('g')
            .attr('class', 'grid')
            .attr('stroke', 'black')
            .attr('transform', 'translate('+(canvasWidth/2)+','+(canvasHeight/2)+')')
            .selectAll('.gridlines')
            .data(grid)
            .enter()
            .append('line')
            .attr('class', 'gridlines')
            .attr('x1', (d)=> d.x1 * (canvasHeight-border))
            .attr('y1', (d)=> d.y1 * (canvasHeight-border))
            .attr('x2', (d)=> d.x2 * (canvasHeight-border))
            .attr('y2', (d)=> d.y2 * (canvasHeight-border))

        var drag = d3.drag()
            .subject(function (d) { return d; })
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);

        function dragstarted(d) {
            d3.event.sourceEvent.stopPropagation();
            d3.select(this).classed("dragging", true);
        }

        function dragged(d) {
            d3.select(this).attr("cx",  d3.event.x).attr("cy", d3.event.y);
        }

        function dragended(d) {
            d3.select(this).classed("dragging", false);
        }

        svgCanvas.append('g')
            .attr('stroke','red')
            .attr('fill', 'red')
            .attr('transform', 'translate('+((canvasWidth-canvasHeight)/3)+','+(canvasHeight/2)+')')
            .selectAll('.p1-piece')
            .data([-1, 0, 1])
            .enter()
            .append('circle')
            .attr('class', 'p1-piece')
            .attr('class','piece')
            .attr('cx', 0).attr('cy',0)
            .attr('r', 50)
            .attr('transform', (d) => 'translate( 0,'+(130*d)+')')
            .on('click', function(d,i){
                console.log("Clicked Player-1 Piece-"+i)
            })
        
        svgCanvas.append('g')
            .attr('stroke','black')
            .attr('fill', 'black')
            .attr('transform', 'translate('+(canvasWidth-(canvasWidth-canvasHeight)/3)+','+(canvasHeight/2)+')')
            .selectAll('.p2-piece')
            .data([-1, 0, 1])
            .enter()
            .append('circle')
            .attr('class', 'p2-piece')
            .attr('class','piece')
            .attr('cx', 0).attr('cy',0)
            .attr('r', 50)
            .attr('transform', (d) => 'translate( 0,'+(130*d)+')')
            .on('click', function(d,i){
                console.log("Clicked Player-2 Piece-"+i)
            })
        
        svgCanvas.selectAll('circle')
            .call(drag)

        // //Create the drag and drop behavior to set for the objects crated
        // var drag = d3.behavior.drag()
        //     .origin(function(d) { return d; })
        //     .on("dragstart", dragstarted)
        //     .on("drag", dragged);
        
        // //Called when drag event starts. It stop the propagation of the click event
        // function dragstarted(d){
        //     d3.event.sourceEvent.stopPropagation();
        // }
        
        // //Called when the drag event occurs (object should be moved)
        // function dragged(d){
        //     d.x = d3.event.x;
        //     d.y = d3.event.y;
        //     //Translate the object on the actual moved point
        //     d3.select(this).attr({
        //         transform: "translate(" + d.x + "," + d.y + ")"
        //     });
        // }

        // //Set the drag behavior on the objects having the "draggable" class and set their position on the viewport (by the "node_data" matrix)		
		// svgCanvas.selectAll(".draggable").call(drag)

    }
    render() { return <div ref="canvas"></div> }
}
export default TicTacToe
