import { appState } from './appState';
import { commitRoot } from './commitRoot';
import { createDom } from './createDom';
import { reconcileChildren } from './reconcileChildren';

export function workLoop(deadline: IdleDeadline) {
  let shouldYield = false;

  while (appState.nextUnitOfWork && !shouldYield) {
    appState.nextUnitOfWork = performUnitOfWork(appState.nextUnitOfWork);

    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!appState.nextUnitOfWork && appState.wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber: Fiber): Fiber | null {
  // DOM 노드 생성
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  reconcileChildren(fiber);

  // 다음 순회 대상
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber | null = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }

  return null;
}
