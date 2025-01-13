import { appState } from './appState';
import { workLoop } from './workLoop';

export function render(
  didactElement: DidactElement,
  container: HTMLElement | Text | null
): void {
  if (!container) {
    return;
  }

  appState.wipRoot = {
    type: null,
    props: {
      children: [didactElement],
    },

    dom: container,

    parent: null,
    child: null,
    sibling: null,
  };
  appState.nextUnitOfWork = appState.wipRoot;
}

requestIdleCallback(workLoop);
