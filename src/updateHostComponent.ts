import { updateDom } from './updateDom';

export function updateHostComponent(fiber: HostFiber) {
  // 파이버에 대응하는 DOM 노드가 없다면 생성
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
}

function createDom(fiber: HostFiber): DomNode | null {
  if (!fiber.type) {
    return null;
  }

  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}
