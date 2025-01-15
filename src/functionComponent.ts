export function updateFunctionComponent(fiber: FunctionFiber) {
  if (!fiber.type) {
    return;
  }

  fiber.props.children = [fiber.type(fiber.props)];
}

export function useState<T = unknown>(initial: T) {
  return [];
}
