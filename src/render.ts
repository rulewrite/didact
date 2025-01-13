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

  // DOM 생성
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  // 프로퍼티 바인딩
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      (dom as any)[name] = element.props[name];
    });

  // 자식 엘리먼트 렌더
  element.props.children.forEach((child) => {
    render(child, dom);
  });

  // 컨테이너에 바인딩
  container.appendChild(dom);
}
