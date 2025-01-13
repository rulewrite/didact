export function createElement(
  type: DidactElement['type'],
  props?: Omit<DidactElement['props'], 'children'> | null,
  ...children: DidactElement['props']['children']
): DidactElement {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child === 'object') {
          return child;
        }

        return createTextElement(child);
      }),
    },
  };
}

function createTextElement(text: string): DidactElement {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
