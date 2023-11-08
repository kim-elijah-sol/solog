import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const 스코프_체인: Content = {
  title: '스코프 체인',
  createdAt: '2023-11-08',
  url: createUrl('스코프 체인'),
  content: `
스코프는 크게 **전역 스코프**와 **지역 스코프** 이 2가지로 나뉜다.

### 전역 스코프

**전역 스코프**(global scope)는 코드의 가장 바깥 부분을 이야기하는데, 이 스코프에 변수를 선언하면 **전역 변수**(global variable)가 되어 **코드 어디서든지 참조**할 수 있다.

### 지역 스코프

**지역**(local)은 함수 몸체 내부를 의미하고, 

이 지역은 **지역 스코프**(local scope)를 만든다.

이 스코프에 변수를 선언하면 **지역 변수**(local variable)가 되어 **자신의 스코프와** 

**하위 지역 스코프에서만 참조**가 가능하다.

### 스코프 체인

함수는 전역에 선언될 수 있고, 지역에 선언될 수도 있다. 

그리고 지역에 함수가 정의된 것을 **함수의 중첩**이라 하고, 

지역에 선언된 함수를 중첩 함수(nested function), 

중첩 함수를 포함한 함수를 외부 함수(outer function) 라고 한다.<br /><br />

이처럼 함수가 중첩될 수 있다는 것은, 스코프 또한 중첩될 수 있다는 이야기이다.<br /><br />

이는 **스코프가 함수의 중첩에 의해 계층적 구조를 가진다**고 할 수 있고,

이처럼 스코프가 계층적으로 연결되어 있는 것을 **스코프 체인**(scope chain) 이라고 한다.<br /><br />

자바스크립트 엔진에서 변수를 참조할 때, 코드가 실행되는 스코프에서 상위 스코프 방향으로  이동하며 선언된 변수를 검색한다.<br /><br />

이를 통해서 상위 스코프에 선언된 변수를 하위 스코프에서도 참조할 수 있게 되는 것이다.
    `,
  description: '스코프는 크게 전역 스코프와 지역 스코프 이 2가지로 나뉜다.',
  coverUrl: '/assets/scope-chain/cover.webp',
  categorys: ['javascript'],
}
