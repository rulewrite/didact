import { root } from './value';

export function render(element, container) {
  root.wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: root.currentRoot,
  };
  root.deletions = [];
  root.nextUnitOfWork = root.wipRoot;
}
