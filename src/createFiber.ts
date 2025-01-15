export function createFiber(fiber: Partial<Fiber>): Fiber {
  return {
    type: null,
    props: {},

    dom: null,

    parent: null,
    child: null,
    sibling: null,

    alternate: null,
    effectTag: null,

    ...fiber,
  };
}
