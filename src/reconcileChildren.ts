import { appState } from './appState';

/**
 * 전달한 파이버의 직속 자식(didactElement)들을 재조정하여 새 UI 상태에 맞게 파이버 트리 업데이트
 * @param parent
 * @returns
 */
export function reconcileChildren(parent: Fiber): void {
  if (!parent.props.children) {
    return;
  }

  let index = 0;

  // 이전에 생성된 첫번째 자식을 가져옴
  let oldFiber = parent.alternate && parent.alternate.child;
  let prevSibling: Fiber | null = null;

  while (index < parent.props.children.length || oldFiber !== null) {
    const didactElement = parent.props.children[index];

    const newFiber = getNewFiber(parent, oldFiber, didactElement);

    // 제거됨
    const isDelete = !newFiber;
    if (isDelete && oldFiber) {
      oldFiber.effectTag = 'DELETION';
      appState.deletions.push(oldFiber);
    }

    // 새 파이버를 트리로 연결
    const isFirstChild = index === 0;
    if (isFirstChild) {
      // 첫번째 자식인 경우 부모의 child로 설정
      parent.child = newFiber;
    } else if (didactElement) {
      // 두번째 자식의 경우 형제로 연결
      prevSibling && (prevSibling.sibling = newFiber);
    }

    // 현재 파이버를 다음 반복에서 형제 관계로 이어주기 위해 prevSibling에 저장
    prevSibling = newFiber;

    // 다음 순회 대상 설정
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    index++;
  }
}

/**
 * 새 요소와 기존 파이버를 비교하여 변경사항 감지
 * @param parent
 * @param oldFiber 기존 파이버
 * @param didactElement 새 엘리먼트
 * @returns
 */
function getNewFiber(
  parent: Fiber,
  oldFiber: Fiber | null,
  didactElement?: DidactElement
): Fiber | null {
  const isSameType =
    oldFiber && didactElement && didactElement.type === oldFiber.type;

  if (isSameType) {
    return {
      type: didactElement.type,
      props: didactElement.props,

      dom: oldFiber.dom,

      parent,
      child: null,
      sibling: null,

      alternate: oldFiber,
      effectTag: 'UPDATE',
    };
  }

  if (didactElement) {
    return {
      type: didactElement.type,
      props: didactElement.props,

      dom: null,

      parent,
      child: null,
      sibling: null,

      alternate: null,
      effectTag: 'PLACEMENT',
    };
  }

  return null;
}
