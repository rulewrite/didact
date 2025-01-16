type Property = keyof Text | keyof HTMLElement;

function isEvent(key: string): boolean {
  return key.startsWith('on');
}

function isProperty(key: string): key is Property {
  return key !== 'children' && !isEvent(key);
}

function isNew(
  prev?: Fiber['props'],
  next?: Fiber['props']
): (key: string) => boolean {
  return (key: string) => prev?.[key] !== next?.[key];
}

function isGone(
  prev: Fiber['props'],
  next: Fiber['props']
): (key: string) => boolean {
  return (key: string) => !(key in next);
}

export function updateDom(
  dom: Fiber['dom'],
  prevProps: Fiber['props'],
  nextProps: Fiber['props']
) {
  if (!dom) {
    return;
  }

  // 변경되거나 제거된 이벤트 리스너 제거
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => {
      return !(key in nextProps) || isNew(prevProps, nextProps)(key);
    })
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);

      dom.removeEventListener(eventType, prevProps[name]);
    });

  // 이전 props 제거
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      (dom as any)[name] = '';
    });

  // 새, 변경된 props 업데이트
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      (dom as any)[name] = nextProps[name];
    });

  // 이벤트 리스너 바인딩
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}
