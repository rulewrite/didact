import { createElement } from './createElement';
import { render } from './render';
import { useState } from './render/updateFunctionComponent';
import { workLoop } from './workLoop';

requestIdleCallback(workLoop);

const Didact = {
  createElement,
  render,
  useState,
};

export { Didact };
