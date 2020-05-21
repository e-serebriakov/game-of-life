const createDomElement = (type) => {
  if (type === 'TEXT_ELEMENT') {
    return document.createTextNode('')
  }

  const svgElements = ['svg', 'g', 'rect']

  if (svgElements.includes(type)) {
    return document.createElementNS('http://www.w3.org/2000/svg', type)
  }

  return document.createElement(type)
}

export const render = (element, container) => {
  const dom = createDomElement(element.type)

  const isProperty = ([key, _]) => key !== 'children'
  const isStyleAttrs = (key) => key === 'style'
  const isDirectValues = (key) => key === 'directValues'

  Object.entries(element.props)
    .filter(isProperty)
    .forEach(([name, value]) => {
      if (isStyleAttrs(name)) {
        Object.entries(value).forEach(([styleKey, styleValue]) => {
          dom.style[styleKey] = styleValue
        })
      } else if (isDirectValues(name)) {
        Object.entries(value).forEach(([directValueKey, directValue]) => {
          dom.style[directValueKey] = directValue
        })
      } else {
        dom.setAttribute(name, value)
      }

      
    })

  element.props.children.forEach(child => {
    render(child, dom)
  })

  container.appendChild(dom)
}

// let nextUnitOfWork = null

// const workLoop = (deadline) => {
//   let shouldYield = false

//   while (nextUnitOfWork && !shouldYield) {
//     nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
//     shouldYield = deadline.timeRemaining() < 1
//   }

//   requestIdleCallback(workLoop)
// }

// requestIdleCallback(workLoop)

// const performUnitOfWork = (nextUnitOfWork) => {}
