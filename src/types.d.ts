interface DidactElement {
  type: keyof HTMLElementTagNameMap | 'TEXT_ELEMENT';
  props: {
    [key: string]: unknown;
    children: Array<DidactElement>;
  };
}
