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

function render(element, container) {
  // TODO:
}

const Didact = {
  createElement,
  render,
};

// https://github.com/parcel-bundler/parcel/issues/7234#issuecomment-1130291538
/** @jsxRuntime classic @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
const container = document.getElementById('root');
Didact.render(element, container);
