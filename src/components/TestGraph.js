import React, { Component } from 'react'
import {select} from 'd3'
class TestGraph extends Component {
    componentDidMount() {
        var data = {
            'rings':[
                {'fill':'red',   'size':2.5,  value:10},
                {'fill':'white', 'size':3.0,  value:20},
                {'fill':'red',   'size':4.0,  value:30},
                {'fill':'white', 'size':5.5,  value:40},
                {'fill':'red',   'size':9.0,  value:50},
                {'fill':'white', 'size':18.0, value:100}
            ],
            'score':[0]
        };
        this.width = 500;
        this.height = 500;

        var svg = select(this.refs.canvas2)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('overflow', 'visible') // uncomment to see when your objects are sitting right out of frame. 
            .style('border', '1px solid black');

        this.drawBullseye(svg, data)
    }
    drawBullseye(svg, data) {
       
        var score = svg.append("g")
            .attr("class", "scoretext")
            .attr('transform','translate('+20+','+20+')');

        score.append('text')
            .text('Score: '+data.score)
            .attr('stroke','black')

        var bullseye = svg.append('g')
            .attr('transform', 'translate('+this.width/2+','+this.height/2+')')
            .attr('class', 'bullseye')
            .attr('stroke', 'black')

        bullseye.selectAll('.circles')
            .data(data.rings).enter()
            .append("circle")
            .attr('class', 'circles')
            .attr("r", (d) => (Math.min(this.width, this.height) / d.size))
            .attr("fill", (d) => d.fill)
            .on("click", function(d){
                data.score[0] += d.value;
                score.select('text').text('Score: ' +data.score);
                //return tooltip.style("visibility", "visible");
            });

        bullseye.append('line')
            .attr('x1', -10).attr('y1',-10)
            .attr('x2',  10).attr('y2', 10)
            .attr('stroke-width', 2)
            .on("click", function(){
                data.score[0] += 150;
                score.select('text').text('Score: ' +data.score);
            });

        bullseye.append('line')
            .attr('x1', -10).attr('y1', 10)
            .attr('x2',  10).attr('y2',-10)
            .attr('stroke-width', 2)
            .on("click", function(){
                data.score[0] += 150;
                score.select('text').text('Score: ' +data.score);
            });
    }
    render() { return <div ref="canvas2"></div> }
}
export default TestGraph
