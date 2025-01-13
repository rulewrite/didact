export function reconcileChildren(wipFiber: Fiber) {
  // 자식 엘리먼트들 파이버로 전환
  let prevSibling: Fiber | null = null;
  wipFiber.props.children.forEach((didactElement, index) => {
    const newFiber: Fiber = {
      type: didactElement.type,
      props: didactElement.props,

      dom: null,

      parent: wipFiber,
      child: null,
      sibling: null,

      alternate: null,
    };

    const isFirstChild = index === 0;
    if (isFirstChild) {
      wipFiber.child = newFiber;
      prevSibling = newFiber;
      return;
    }

    if (!prevSibling) {
      return;
    }
    prevSibling.sibling = newFiber;
  });
}
