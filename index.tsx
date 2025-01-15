import { createElement } from './src/createElement';
import { useState } from './src/functionComponent';
import { render } from './src/render';

const Didact = {
  createElement,
  render,
  useState,
};

// 리액트 엘리먼트 정의
// https://github.com/parcel-bundler/parcel/issues/7234#issuecomment-1130291538
/** @jsxRuntime classic @jsx Didact.createElement */

// 리액트 엘리먼트를 컨테이너에 렌더링
function Component(props: any) {
  /*
  jsx > js로 변환 시
  function App(props) {
    return Didact.createElement(
      "h1",
      null,
      "함수 컴포넌트 ",
      props.name
    )
  }
  const element = Didact.createElement(App, {
    name: "티모시",
  })
  */
  return <h1>함수 컴포넌트 {props.name}</h1>;
}

function Counter() {
  const [state, setState] = Didact.useState(1);

  return <h1 onClick={() => setState((count) => count + 1)}>Count: {state}</h1>;
}

function App() {
  const [text, setText] = Didact.useState('');
  const [deleteCount, setDeleteCount] = Didact.useState(0);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setDeleteCount((_deleteCount) => {
            return _deleteCount + 1;
          });
        }}
      >
        delete
      </button>

      <ul>
        {deleteCount < 1 ? <li>삭제대상1</li> : null}
        <li>첫번째{deleteCount}</li>
        {deleteCount < 2 ? <li>삭제대상2</li> : null}
        <li>세번째{deleteCount}</li>
        {deleteCount < 3 ? <li>삭제대상3</li> : null}
      </ul>

      <hr />

      <input
        onInput={(event: any) => {
          setText(() => {
            return event.target.value;
          });
        }}
        value={text}
      />
      <h2>Hello {text}</h2>
    </div>
  );
}

const element = (
  <div>
    Hello, Didact
    <Component name="티모시" />
    <Counter />
    <App />
  </div>
);

// DOM에서 노드 가져오기
const container = document.getElementById('root');

Didact.render(element, container);
