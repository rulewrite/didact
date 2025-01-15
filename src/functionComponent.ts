import { appState } from './appState';
import { createFiber } from './createFiber';

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
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action: (typeof hook)['queue'][number]) => {
    hook.queue.push(action);

    // workLoop에서 렌더링을 수행할 수 있도록 값 설정
    appState.workInProgressRootFiber = createFiber({
      dom: appState.currentRootFiber?.dom,
      props: appState.currentRootFiber?.props,
      alternate: appState.currentRootFiber,
    });
    appState.currentFiber = appState.workInProgressRootFiber;
    appState.deletions = [];
  };

  currentFiber.hooks.push(hook as Hook<unknown>);
  hookIndex++;
  return [hook.state, setState] as const;
}
