import * as d3 from 'd3'

const buildGridData = (gridData, cellSize) => {
  const data = new Array()
  let xPos = 1
  let yPos = 1
  let width = cellSize
  let height = cellSize
	
  for (let row = 0; row < gridData.length; row++) {
    data.push(new Array())
		
    for (let column = 0; column < gridData[row].length; column++) {
      data[row].push({
        x: xPos,
        y: yPos,
        width,
        height,
        isAlive: gridData[row][column] === 1,
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
    .attr('width','100%')
    .attr('height','100%')
    
  const row = grid.selectAll('.row')
    .data(gridData)
    .enter().append('g')
    .attr('class', 'row')

  row.selectAll('.square')
    .data((d) => d)
    .enter().append('rect')
    .attr('class','square')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .style('stroke', '#c1c1c1') 
    .style('fill', ({ isAlive }) => {
      return isAlive ? '#000' : '#fff'
    })
}