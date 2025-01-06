import { createElement } from './src/createElement';
import { render } from './src/render';
import { useState } from './src/updateFunctionComponent';

const Didact = {
  render,
  useState,
  createElement,
};

// https://github.com/parcel-bundler/parcel/issues/7234#issuecomment-1130291538
/** @jsxRuntime classic @jsx Didact.createElement */
function App(props) {
  return <h1>Hi {props.name}</h1>;
}

function Counter() {
  const [state, setState] = Didact.useState(1);
  return <h1 onClick={() => setState((c) => c + 1)}>Count: {state}</h1>;
}

const container = document.getElementById('root');

const updateValue = (e) => {
  rerender(e.target.value);
};

const rerender = (value) => {
  const element = (
    <div id="foo">
      <App name="timothy" />
      <Counter />

      <div>
        <input onInput={updateValue} value={value} />
        <h2>input value: {value}</h2>
      </div>

      <div>
        hello
        <div>
          hello
          <div>
            hello
            <div>
              hello
              <div>
                hello
                <div>hello</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  Didact.render(element, container);
};

rerender('World');
