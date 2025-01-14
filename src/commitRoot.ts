import { appState } from './appState';
import { updateDom } from './createDom';

export function commitRoot(): void {
  appState.deletions.forEach(commitWork);
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

  if (fiber.effectTag === 'PLACEMENT') {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE') {
    updateDom(fiber.dom, fiber.alternate?.props ?? {}, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
