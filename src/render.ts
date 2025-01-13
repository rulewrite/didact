import { appState } from './appState';
import { workLoop } from './workLoop';

export function render(
  didactElement: DidactElement,
  container: HTMLElement | Text | null
): void {
  if (!container) {
    return;
  }

  appState.nextUnitOfWork = {
    type: null,
    props: {
      children: [didactElement],
    },

    dom: container,

    parent: null,
    child: null,
    sibling: null,
  };
}

requestIdleCallback(workLoop);
