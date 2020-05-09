import * as d3 from 'd3'

const buildGridData = (gridData, cellSize) => {
  const data = new Array()
  let xPos = 1
  let yPos = 1
  let width = cellSize
  let height = cellSize
	
  // iterate for rows	
  for (let row = 0; row < gridData.length; row++) {
    data.push(new Array())
		
    for (let column = 0; column < gridData[row].length; column++) {
      data[row].push({
        x: xPos,
        y: yPos,
        width,
        height,
        isAlive: gridData[row][column] === 1
      })

      xPos += width
    }

    xPos = 1
    yPos += height	
  }

  return data
}

export const renderGrid = (state, cellSize) => {
  const gridData = buildGridData(state, cellSize)

  const grid = d3.select('#grid')
    .html('')
    .append('svg')
    .attr('width','510px')
    .attr('height','510px')
    
  const row = grid.selectAll('.row')
    .data(gridData)
    .enter().append('g')
    .attr('class', 'row')
    
  row.selectAll('.square')
    .data((d) => d)
    .enter().append('rect')
    .attr('class','square')
    .attr('x', function(d) { return d.x })
    .attr('y', function(d) { return d.y })
    .attr('width', function(d) { return d.width })
    .attr('height', function(d) { return d.height })
    .style('fill', ({ isAlive }) => {
      return isAlive ? '#000' : '#fff'
    })
    .style('stroke', '#222') 
}