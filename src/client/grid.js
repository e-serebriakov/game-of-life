import * as d3 from 'd3'

export class Grid {
  constructor(props) {
    const { data, cellSize } = props

    this.data = data
    this.cellSize = cellSize
    this._rows = []

    this._mount()
  }

  setProps(props) {
    Object.entries(props).forEach(([ propName, propValue ]) => {
      this[propName] = propValue
    })

    this._update()
  }

  _generateGridData(gridData, cellSize) {
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

  _mount() {
    const gridSvg = renderGridSvg()
    this.rowsElements = renderRows(gridSvg, this._generateGridData(this.data, this.cellSize))
    renderColumns()
  }

  _update() {
    this.rowsElements = this.rowsElements.data(this._generateGridData(this.data, this.cellSize))

    renderColumns()
  }
}

export const renderGridSvg = () => {
  return d3.select('#grid')
    .attr('class', 'grid')
    .html('')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
}

export const renderRows = (gridSvg, gridData) => {
  return gridSvg
    .html('')
    .selectAll('.grid__row')
    .data(gridData)
    .enter()
    .append('g')
    .attr('class', 'grid__row')
}

export const renderColumns = () => {
  const cellCollection = d3
    .selectAll('.grid__row')
    .selectAll('.grid__cell')
    .data((d) => d)

  const isFirstRender = cellCollection.empty()

  if (isFirstRender) {
    return cellCollection
      .enter()
      .append('rect')
      .attr('class', 'grid__cell')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .style('stroke', '#c1c1c1') 
      .style('fill', ({ isAlive }) => {
        return isAlive ? '#000' : '#fff'
      })
  }

  return cellCollection
    .style('fill', ({ isAlive }) => {
      return isAlive ? '#000' : '#fff'
    })
}