import { appState } from './appState';

export function commitRoot(): void {
  commitWork(appState.wipRoot && appState.wipRoot.child);
  appState.currentRoot = appState.wipRoot;
  appState.wipRoot = null;
}

function commitWork(fiber: Fiber | null): void {
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
