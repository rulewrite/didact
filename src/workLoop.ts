import { commitRoot } from './commit';
import { updateFunctionComponent } from './updateFunctionComponent';
import { updateHostComponent } from './updateHostComponent';
import { root } from './value';

export function workLoop(deadline) {
  let shouldYield = false;
  while (root.nextUnitOfWork && !shouldYield) {
    root.nextUnitOfWork = performUnitOfWork(root.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 60;
  }

  if (!root.nextUnitOfWork && root.wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}
