import { createElement } from './src/createElement';
import { render } from './src/render';

const Didact = {
  createElement,
  render,
};

// 리액트 엘리먼트 정의
// https://github.com/parcel-bundler/parcel/issues/7234#issuecomment-1130291538
/** @jsxRuntime classic @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

// DOM에서 노드 가져오기
const container = document.getElementById('root');

// 리액트 엘리먼트를 컨테이너에 렌더링
const updateValue = (event: any) => {
  rerender(event.target.value);
};

let isShow = 0;
const removeItem = () => {
  ++isShow;

  rerender('delete');
};

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

const rerender = (value: any) => {
  const element = (
    <div>
      <Component name="티모시" />
      <ul>
        {isShow < 1 ? <li>삭제대상1</li> : null}
        <li>첫번째{isShow}</li>
        {isShow < 2 ? <li>삭제대상2</li> : null}
        <li>세번째{isShow}</li>
        {isShow < 3 ? <li>삭제대상3</li> : null}
      </ul>

      <button type="button" onClick={removeItem}>
        delete
      </button>

      <hr />

      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </div>
  );

  Didact.render(element, container);
};

rerender('World');
