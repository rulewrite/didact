interface DidactElement {
  type: keyof HTMLElementTagNameMap | 'TEXT_ELEMENT';
  props: {
    [key: string]: any;
    children?: Array<DidactElement>;
  };
}

interface Fiber {
  type: DidactElement['type'] | null;
  props: DidactElement['props'];
  dom: HTMLElement | Text | null;

  parent: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;

  alternate: Fiber | null;
  effectTag: 'UPDATE' | 'PLACEMENT' | 'DELETION' | null;
}
