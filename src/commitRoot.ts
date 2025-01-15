import { appState } from './appState';
import { updateDom } from './updateDom';

/**
 * 렌더링 결과를 DOM에 바인딩함
 */
export function commitRoot(): void {
  appState.deletions.forEach(commitWork);
  commitWork(appState.workInProgressRootFiber?.child ?? null);
}

function commitWork(fiber: Fiber | null): void {
  if (!fiber) {
    return;
  }

  if (fiber.dom) {
    const parentDom = getParentDom(fiber);
    if (fiber.effectTag === 'PLACEMENT') {
      parentDom.appendChild(fiber.dom);
    } else if (fiber.effectTag === 'UPDATE') {
      updateDom(fiber.dom, fiber.alternate?.props ?? {}, fiber.props);
    } else if (fiber.effectTag === 'DELETION') {
      commitDeletion(fiber, parentDom);
    }
  }

  // 자식, 형제 파이버에게 재귀적으로 커밋 수행
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function getParentDom(fiber: Fiber): DomNode {
  let parent = fiber.parent;
  while (!parent?.dom) {
    parent = parent?.parent ?? null;
  }
  return parent.dom;
}

function commitDeletion(fiber: Fiber, parentDom: DomNode) {
  if (fiber.dom) {
    parentDom.removeChild(fiber.dom);
  } else {
    fiber.child && commitDeletion(fiber.child, parentDom);
  }
}
