import { appState } from './appState';

export function commitRoot() {
  commitWork(appState.wipRoot && appState.wipRoot.child);
  appState.wipRoot = null;
}

function commitWork(fiber: Fiber | null) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent?.dom;

  if (!domParent || !fiber.dom) {
    return;
  }

  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
