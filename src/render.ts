import { appState } from './appState';
import { workLoop } from './workLoop';

export function render(
  didactElement: DidactElement,
  container: DomNode | null
): void {
  if (!container) {
    return;
  }

  appState.workInProgressRootFiber = {
    type: null,
    props: {
      children: [didactElement],
    },

    dom: container,

    parent: null,
    child: null,
    sibling: null,

    alternate: appState.currentRootFiber,
    effectTag: null,
  };
  appState.currentFiber = appState.workInProgressRootFiber;
  appState.deletions = [];
}

requestIdleCallback(workLoop);
