type Property = keyof Text | keyof HTMLElement;

function isProperty(key: string): key is Property {
  return key !== 'children';
}

export function createDom(fiber: Fiber): Fiber['dom'] {
  if (!fiber.type) {
    return null;
  }

  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      (dom as any)[name] = fiber.props[name];
    });

  return dom;
}
