import { appState } from './appState';

export function reconcileChildren(wipFiber: Fiber): void {
  if (!wipFiber.props.children) {
    return;
  }

  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling: Fiber | null = null;

  while (index < wipFiber.props.children.length || oldFiber !== null) {
    const didactElement = wipFiber.props.children[index];

    const sameType = didactElement && didactElement.type === oldFiber?.type;
    let newFiber: Fiber | null = null;

    if (sameType) {
      newFiber = {
        type: didactElement.type,
        props: didactElement.props,

        dom: oldFiber?.dom ?? null,

        parent: wipFiber,
        child: null,
        sibling: null,

        alternate: oldFiber,
        effectTag: 'UPDATE',
      };
    }

    if (didactElement && !sameType) {
      newFiber = {
        type: didactElement.type,
        props: didactElement.props,

        dom: null,

        parent: wipFiber,
        child: null,
        sibling: null,

        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      appState.deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    const isFirstChild = index === 0;
    if (isFirstChild) {
      wipFiber.child = newFiber;
    } else if (didactElement && prevSibling) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}
