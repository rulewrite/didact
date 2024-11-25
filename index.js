import React from 'react';
import ReactDOM from 'react-dom';

function createElement(
  type,
  props,
  // rest 매개변수이므로 항시 배열
  ...children
) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'object' ? child : createTextElement(child);
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const element = React.createElement(
  'div',
  { id: 'foo' },
  React.createElement('a', null, 'bar'),
  React.createElement('b')
);
const container = document.getElementById('root');
ReactDOM.render(element, container);
