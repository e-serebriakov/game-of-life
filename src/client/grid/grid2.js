import { createElement } from '../lib/lib'

const bindDataToMarkup = (data, cellSize) => {
  const gridData = new Array()
  let xPos = 1
  let yPos = 1
  let width = cellSize
  let height = cellSize
    
  for (let row = 0; row < data.length; row++) {
    gridData.push(new Array())
      
    for (let column = 0; column < data[row].length; column++) {
      gridData[row].push({
        x: xPos,
        y: yPos,
        width,
        height,
        isAlive: data[row][column] === 1,
      })

      xPos += width
    }

    xPos = 1
    yPos += height	
  }

  return gridData
}

const cellComponent = (cellData) => {
  return createElement(
    'rect',
    {
      class: 'grid__cell',
      x: cellData.x,
      y: cellData.y,
      height: cellData.height,
      width: cellData.width,
      style: {
        stroke: 'rgb(193, 193, 193)',
        fill: cellData.isAlive ? '#000' : '#fff',
      },
    },
  )
}

const rowComponent = (rowData) => {
  return createElement(
    'g',
    {
      class: 'grid__row',
    },
    ...rowData.map(cellComponent),
  )
}

export const gridComponent = ({ data, cellSize }) => {
  const gridData = bindDataToMarkup(data, cellSize)

  const svg = createElement(
    'svg',
    {
      height: '100%',
      width: '100%',
    },
    ...gridData.map(rowComponent),
  )

  return createElement(
    'div',
    {
      id: 'grid',
      class: 'grid',
    },
    svg,
  )
}

// export const Grid = ({ data, cellSize }) => {
//   const gridData = bindDataToMarkup(data, cellSize)

//   // let timerId = setTimeout(function tick() {
//   //   stateCopy = calculateState(stateCopy)

//   //   grid.setProps({ data: stateCopy })

//   //   timerId = setTimeout(tick, UPDATE_INTERVAL_SEC)
//   // }, UPDATE_INTERVAL_SEC)


//   const gridElement = document.createElement('div')
//   gridElement.setAttribute('id', 'grid')
//   gridElement.setAttribute('class', 'grid')

//   const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
//   svgElement.setAttribute('height', '100%')
//   svgElement.setAttribute('width', '100%')
  
//   const rows = svgElement.querySelectorAll('.grid__row')

//   if (rows.length === 0) {
//     gridData.forEach(rowData => {
//       const rowElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
//       rowElement.setAttribute('class', 'grid__row')

//       rowData.forEach((cellData) => {
//         const cellElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

//         cellElement.setAttribute('class', 'grid__cell')
//         cellElement.setAttribute('x', cellData.x)
//         cellElement.setAttribute('y', cellData.y)
//         cellElement.setAttribute('height', cellData.height)
//         cellElement.setAttribute('width', cellData.width)

//         cellElement.style.stroke = 'rgb(193, 193, 193)'
//         cellElement.style.fill = cellData.isAlive ? '#000' : '#fff'

//         rowElement.appendChild(cellElement)
//       })

//       svgElement.appendChild(rowElement)
//     })

//     console.log('rows', rows)

//     // svgElement.append(rows)
//   } else {
//     gridData.foreach(rowData => {
//       rowData.foreach((cellData) => {
//         cellData.setAttribute('fill', cellData.isAlive ? '#000' : '#fff')
//       })
//     })
//   }

//   gridElement.appendChild(svgElement)

//   console.log('gridElement', gridElement)

//   return gridElement
// }