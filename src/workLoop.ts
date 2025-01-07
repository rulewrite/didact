import { appState } from './appState';
import { commitRoot } from './commit';
import { updateFunctionComponent } from './updateFunctionComponent';
import { updateHostComponent } from './updateHostComponent';

export function workLoop(deadline) {
  let shouldYield = false;
  while (appState.nextUnitOfWork && !shouldYield) {
    appState.nextUnitOfWork = performUnitOfWork(appState.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 60;
  }

  if (!appState.nextUnitOfWork && appState.wipRoot) {
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
