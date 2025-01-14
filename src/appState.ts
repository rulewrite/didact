const appState: {
  nextUnitOfWork: null | Fiber;
  wipRoot: null | Fiber;
  currentRoot: null | Fiber;
  deletions: Array<Fiber>;
} = {
  nextUnitOfWork: null,
  wipRoot: null,
  currentRoot: null,
  deletions: [],
};

export { appState };
