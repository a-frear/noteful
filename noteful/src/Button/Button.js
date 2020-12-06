import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

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
};

Button.defaultProps ={
  tag: 'a',
};

Button.propTypes = {
  tag: PropTypes.string,
  role: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};


