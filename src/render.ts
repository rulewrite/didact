import { appState } from './appState';

export function render(element, container) {
  appState.wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: appState.currentRoot,
  };
  appState.deletions = [];
  appState.nextUnitOfWork = appState.wipRoot;
}
