let currentFiber: FunctionFiber | null = null;
let hookIndex = -1;

export function updateFunctionComponent(fiber: FunctionFiber) {
  if (!fiber.type) {
    return;
  }

  currentFiber = fiber;
  hookIndex = 0;
  currentFiber.hooks = [];

  fiber.props.children = [fiber.type(fiber.props)];
}

export function useState<T = unknown>(initial: T) {
  return [];
}
