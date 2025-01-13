// 리액트 엘리먼트 정의
const element = <h1 title="foo">Hello</h1>;

// DOM에서 노드 가져오기
const container = document.getElementById('root');

// 리액트 엘리먼트를 컨테이너에 렌더링
ReactDOM.render(element, container);
