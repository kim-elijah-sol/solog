import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const 렉시컬_스코프: Content = {
  title: '렉시컬 스코프',
  createdAt: '2023-11-16',
  url: createUrl('렉시컬 스코프'),
  content: `
\`\`\`tsx
var x = 1;

function foo() {
  var x = 2;
  bar();
}

function bar() {
  console.log(x);
} 

foo() // ?
bar() // ?
\`\`\`

위 코드의 결과를 예측해보자.<br/><br/>

- **\`foo()\`**
    - 내부에 x 변수를 2로 초기화 시키고, bar를 실행한다.
    - **\`bar()\`**
        - x 값을 출력한다.
- **\`bar()\`**
    - x 값을 출력한다.

<br/>

foo(지역) 에서 실행되는 bar와 전역에서 실행되는 bar는 같은 모두 **1**을 출력할까?
아니면 foo에서 실행되는 bar는 **2**를 전역에서 실행되는 **1**을 출력할까?<br/><br/>
이는 상위 스코프를 결정하는 2가지 패턴에 따라 결과가 다르게 나올 것 같다.<br/><br/>

- **함수가 호출된 시점**에 따라 상위 스코프를 결정
- **함수가 선언된 시점**에 따라 상위 스코프를 결정

<br/>

함수가 호출된 시점에 따라 상위 스코프를 결정하게 되면

foo 에서 실행되는 bar 함수의 상위 스코프는 foo 이기 때문에 **2**를 출력하고

전역에서 실행되는 bar 함수의 상위 스코프는 전역 스코프 이기 때문에 **1**을 출력할 것이다.<br/><br/>

이런 방식을 **동적 스코프**(Dynamic Scope)라 부른다.<br/><br/>

함수가 선언된 시점에 따라 상위 스코프를 결정하게 되면 실행하는 위치가 어디던 bar 함수의 상위 스코프는 전역 스코프 이기 때문에 항상 **1**을 출력할 것이다.<br/><br/>

이런 방식을 **렉시컬 스코프**(Lexical Scope) 또는 **정적 스코프**(Static Scope)라 부른다.<br/><br/>

**자바스크립트**는 **렉시컬 스코프**를 따라가기 때문에, 함수가 선언된 시점에 따라 

상위 스코프가 결정된다.
    `,
  description:
    '자바스크립트는 함수가 선언된 시점에 따라 상위 스코프가 결정된다.',
  coverUrl: '/assets/lexical-scope/cover.webp',
  categorys: ['javascript'],
}
