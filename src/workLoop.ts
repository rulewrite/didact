import { appState } from './appState';
import { commitRoot } from './commitRoot';
import { createDom } from './createDom';
import { reconcileChildren } from './reconcileChildren';

export function workLoop(idleDeadline: IdleDeadline): void {
  // 파이버 해석하며 DOM 생성
  while (appState.currentFiber) {
    appState.currentFiber = performFiber(appState.currentFiber);

    // 남은 유휴 시간 추정치
    const remaining = idleDeadline.timeRemaining();
    if (remaining < 1) {
      break;
    }
  }

  const isFinishPerformFiber = !appState.currentFiber;
  const hasCommitTarget = appState.workInProgressRootFiber;
  if (isFinishPerformFiber && hasCommitTarget) {
    commitRoot();
  }

  // 유휴 시간 루프
  requestIdleCallback(workLoop);
}

/**
 *
 * @param fiber
 * @returns 다음 작업의 대상이 될 파이버를 반환
 */
function performFiber(fiber: Fiber): Fiber | null {
  // 파이버에 대응하는 DOM 노드가 없다면 생성
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 파이버의 자식 요소들 재조정
  reconcileChildren(fiber);

  /**
   * 다음 순회 대상 반환 (DFS: 깊이 우선 탐색)
   * 자식 > 형제 > 부모
   */
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
  return nextFiber;
}
