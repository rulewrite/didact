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

  if (!fiber.dom) {
    return;
  }

  const parentDom = fiber.parent?.dom;

  if (fiber.effectTag === 'PLACEMENT') {
    parentDom?.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE') {
    updateDom(fiber.dom, fiber.alternate?.props ?? {}, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    parentDom?.removeChild(fiber.dom);
  }

  // 자식, 형제 파이버에게 재귀적으로 커밋 수행
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
