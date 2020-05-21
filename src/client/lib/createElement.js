const createTextElement = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      directValues: {
        nodeValue: text,
      },
      children: [],
    },
  }
}

export const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'string' ? createTextElement(child) : child
      }),
    },
  }
}