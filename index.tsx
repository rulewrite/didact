// 리액트 엘리먼트 정의
const element: DidactElement = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'Hello',
  },
};

// DOM에서 노드 가져오기
const container = document.getElementById('root');

// 리액트 엘리먼트를 컨테이너에 렌더링
// 혼동을 피하기 위해 리액트 요소는 엘리먼트, DOM 요소는 node라 함.
const node = document.createElement(element.type);
node['title'] = element.props.title;

const text = document.createTextNode('');
text['nodeValue'] = element.props.children;

node.appendChild(text);
container?.appendChild(node);
