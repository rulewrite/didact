import { reconcileChildren } from './reconcileChildren';
import { root } from './value';

// 현재 진행 중(work in progress)인 fiber
let wipFiber = null;
// 현재 훅 인덱스
let hookIndex = null;

export function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  // 여러개의 훅을 지원하기 위한 훅 배열 추가
  wipFiber.hooks = [];

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

export function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    root.wipRoot = {
      dom: root.currentRoot.dom,
      props: root.currentRoot.props,
      alternate: root.currentRoot,
    };
    root.nextUnitOfWork = root.wipRoot;
    root.deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}
