import { reconcileChildren } from './reconcileChildren';
import { updateFunctionComponent } from './updateFunctionComponent';
import { updateHostComponent } from './updateHostComponent';

function isFunctionComponent(fiber: Fiber): fiber is FunctionFiber {
  return fiber.type instanceof Function;
}

/**
 *
 * @param fiber
 * @returns 다음 작업의 대상이 될 파이버를 반환
 */
export function performFiber(fiber: Fiber): Fiber | null {
  if (fiber.props.children) {
    fiber.props.children = fiber.props.children.filter(Boolean);
  }

  if (isFunctionComponent(fiber)) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
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
