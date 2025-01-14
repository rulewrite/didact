import { updateDom } from './updateDom';

export function createDom(fiber: Fiber): DomNode | null {
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
