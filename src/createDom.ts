import { updateDom } from './updateDom';

export function createDom(fiber: HostFiber): DomNode | null {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}
