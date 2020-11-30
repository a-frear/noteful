import React from 'react'
import './Button.css'

export default function Button(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

Button.defaultProps ={
  tag: 'a',
}
