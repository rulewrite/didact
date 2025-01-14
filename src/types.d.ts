interface DidactElement {
  type: keyof HTMLElementTagNameMap | 'TEXT_ELEMENT';
  props: {
    [key: string]: any;
    children?: Array<DidactElement>;
  };
}

type DomNode = HTMLElement | Text;

interface Fiber {
  type: DidactElement['type'] | null;
  props: DidactElement['props'];
  dom: DomNode | null;

  parent: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;

  alternate: Fiber | null;
  effectTag: 'UPDATE' | 'PLACEMENT' | 'DELETION' | null;
}
