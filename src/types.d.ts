interface DidactElement {
  type: keyof HTMLElementTagNameMap;
  props: {
    [key: string]: string;
  };
}
