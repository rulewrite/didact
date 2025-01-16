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
  const oldState = oldHook ? oldHook.state : initial;
  const actions = oldHook ? oldHook.actionQueue : [];
  // setState에서 큐된 액션 수행하여 상태 갱신
  const state = actions.reduce((state, action) => {
    return action(state);
  }, oldState);

  const hook: Hook<T> = {
    state,
    actionQueue: [],
  };

  currentFiber.hooks.push(hook as Hook<unknown>);
  hookIndex++;

  /**
   * 상태 업데이트 호출 시 액션 큐잉 및 리렌더
   * @param action
   */
  const setState = (action: Action<T>) => {
    hook.actionQueue.push(action);
    rerender();
  };
  // 새 상태 및 업데이트 함수 반환
  return [hook.state, setState] as const;
}

/**
 * workLoop에서 렌더링을 수행할 수 있도록 값 설정
 */
function rerender(): void {
  appState.workInProgressRootFiber = createFiber({
    dom: appState.currentRootFiber?.dom,
    props: appState.currentRootFiber?.props,
    alternate: appState.currentRootFiber,
  });
  appState.currentFiber = appState.workInProgressRootFiber;
  appState.deletions = [];
}
