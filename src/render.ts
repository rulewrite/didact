type Property = keyof Text | keyof HTMLElement;

function isProperty(key: string): key is Property {
  return key !== 'children';
}

export function render(
  element: DidactElement,
  container: HTMLElement | Text | null
): void {
  if (!container) {
    return;
  }

  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      (dom as any)[name] = element.props[name];
    });

  element.props.children.forEach((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}
