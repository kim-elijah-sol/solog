import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const 실행_컨텍스트_2: Content = {
  title: '실행 컨텍스트 2',
  createdAt: '2023-11-03',
  url: createUrl('실행 컨텍스트 2'),
  content: `
#### 실행 컨텍스트 스택

실행 컨텍스트는 스택으로 관리되는데, 이를 **실행 컨텐스트 스택(Execution Context Stack)** 

이라 부른다.<br/><br/>

\`\`\`tsx
const x = 1;

function foo() {
  const y = 2;

  function bar() {
    const z = 3;

    console.log(x + y + z) 
  }

  bar()
}

foo() // 6
\`\`\`
<br/>

위와 같은 소스 코드가 존재한다면 실행 컨텍스트 스택에는 아래와 같이 실행 컨텍스트가 추가(push)되고 제거(pop)될 것이다.<br/><br/>

- Stack : []
- Stack : [ Global_Context ] ← **\`Global_Context Push\`**
- Stack : [ Global_Context, foo_Context ] ← **\`foo_Context Push\`**
- Stack : [ Global_Context, foo_Context, bar_Context ] ← **\`bar_Context Push\`**
- Stack : [ Global_Context, foo_Context ] ← **\`bar_Context Pop\`**
- Stack : [ Global_Context ] ← **\`foo_Context Pop\`**
- Stack : [] ← **\`Global_Context Pop\`**

<br/>

실행 컨텍스트는 위와 같이 현재 실행 중인 코드를 **실행 컨텍스트 스택** **최상위**에서 관리하는데,

이 때 **실행 컨텍스트 스택** **최상위**에 존재하는 실행 컨텍스트를 **실행 중인 컨텍스트**라 부른다.

#### 실행 컨텍스트와 렉시컬 환경

소스 코드의 **실행 순서**를 **실행 컨텍스트 스택**이 관리한다면, 

**스코프** 및 **식별자**는 **렉시컬 환경**이 관리한다.<br/><br/>

실행 컨텍스트는 **LexicalEnviroment 컴포넌트**와 **VariableEnviroment 컴포넌트**로 구성되는데,

생성 초기에는 두 컴포넌트가 **같은 렉시컬 환경**을 참조한다.

이후 소스 코드 실행 중 **몇 가지 상황**을 만나는 경우 **VariableEnviroment** **컴포넌트**를 위해 

**새로운 렉시컬 환경**을 **생성**한다.<br/><br/>

\`\`\`tsx
var x = 1;
const y = 2;

function foo(a: number) {
  var x = 3;
  const y = 4;
  
  function bar(b: number) {
    const z = 5;

    console.log(a + b + x + y + z);
  }

  bar(10);
}

foo(20); // 42
\`\`\`

<br/>

앞으로 차근차근 위 소스 코드가 어떻게 동작하는지 실행 컨텍스트와 렉시컬 환경 관점으로 살펴볼 예정이다.
    `,
  description:
    '실행 컨텍스트는 스택으로 관리되는데, 이를 실행 컨텐스트 스택(Execution Context Stack)이라 부른다.',
  coverUrl: '/assets/execution-context-1/cover.png',
  categorys: ['javascript'],
}
