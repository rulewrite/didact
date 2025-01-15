const appState: {
  currentFiber: null | Fiber;
  /**
   * 현 작업 사이클의 루트 파이버
   */
  workInProgressRootFiber: null | Fiber;
  currentRootFiber: null | Fiber;
  deletions: Array<Fiber>;
} = {
  currentFiber: null,
  workInProgressRootFiber: null,
  currentRootFiber: null,
  deletions: [],
};

export { appState };
