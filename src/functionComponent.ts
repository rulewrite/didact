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
  if (!currentFiber) {
    return [];
  }

  // 이전 훅 가져와서 새 훅의 초기 상태 값으로 설정
  const oldHook =
    currentFiber.alternate &&
    currentFiber.alternate.hooks &&
    (currentFiber.alternate.hooks[hookIndex] as Hook<T>);
  const hook: Hook<T> = {
    state: oldHook ? oldHook.state : initial,
  };

  currentFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state];
}
