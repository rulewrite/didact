import { appState } from './appState';
import { createFiber } from './createFiber';
import { workLoop } from './workLoop';

export function render(
  didactElement: DidactElement,
  container: DomNode | null
): void {
  if (!container) {
    return;
  }

  appState.workInProgressRootFiber = createFiber({
    props: {
      children: [didactElement],
    },

    dom: container,

    alternate: appState.currentRootFiber,
  });
  appState.currentFiber = appState.workInProgressRootFiber;
  appState.deletions = [];
}

requestIdleCallback(workLoop);
