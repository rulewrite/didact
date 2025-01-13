// 리액트 엘리먼트 정의
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

// DOM에서 노드 가져오기
const container = document.getElementById('root');

// 리액트 엘리먼트를 컨테이너에 렌더링
ReactDOM.render(element, container);
