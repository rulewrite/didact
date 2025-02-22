interface DidactElement {
  type: keyof HTMLElementTagNameMap | 'TEXT_ELEMENT';
  props: {
    [key: string]: any;
    children?: Array<DidactElement>;
  };
}

type DomNode = HTMLElement | Text;

type Action<T = unknown> = (value: T) => T;

interface Hook<T = unknown> {
  state: T;
  actionQueue: Array<Action<T>>;
}

interface _OriginFiber<T> {
  type: T | null;
  props: DidactElement['props'];
  dom: DomNode | null;

  parent: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;

  alternate: Fiber | null;
  effectTag: 'UPDATE' | 'PLACEMENT' | 'DELETION' | null;

  hooks: Array<Hook>;
}

type FunctionFiber = _OriginFiber<Function>;
type HostFiber = _OriginFiber<DidactElement['type']>;
type Fiber = FunctionFiber | HostFiber;
