import { appState } from './appState';
import { commitRoot } from './commitRoot';
import { createDom } from './createDom';

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

  // 자식 엘리먼트들 파이버로 전환
  let prevSibling: Fiber | null = null;
  fiber.props.children.forEach((didactElement, index) => {
    const newFiber: Fiber = {
      type: didactElement.type,
      props: didactElement.props,

      dom: null,

      parent: fiber,
      child: null,
      sibling: null,
    };

    const isFirstChild = index === 0;
    if (isFirstChild) {
      fiber.child = newFiber;
      prevSibling = newFiber;
      return;
    }

    if (!prevSibling) {
      return;
    }
    prevSibling.sibling = newFiber;
  });

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
