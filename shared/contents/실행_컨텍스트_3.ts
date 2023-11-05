import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const 실행_컨텍스트_3: Content = {
  title: '실행 컨텍스트 3',
  createdAt: '2023-11-04',
  url: createUrl('실행 컨텍스트 3'),
  content: `
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

오늘부터 **모던 자바스크립트 Deep Dive** 에 쓰여진 위 코드를 한 줄 한 줄 실행 컨텍스트 관점에서 살펴보려 한다.

## 전역 객체 생성

전역 객체는 전역 코드가 평가되기 전에 생성된다.

이 전역 객체에는 빌트인 전역 프로퍼티, 빌트인 전역 함수, 표준 필트인 객체가 추가되고,

자바스크립트가 동작하는 환경(Client Side, Server Side)에 따라 Web API 혹은

특정 환경을 위한 호스트 객체를 포함한다.

## 전역 코드 평가

전역 코드 평가는 아래와 같은 순서로 진행된다.<br /><br />

- 전역 실행 컨텍스트 생성
- 전역 렉시컬 환경 생성
    - 전역 환경 레코드 생성
        - 객체 환경 레코드 생성
        - 선언적 환경 레코드 생성
    - this 바인딩
    - 외부 렉시컬 환경에 대한 참조 결정

### **1 전역 실행 컨텍스트 생성**

비어있는 실행 컨텍스트 스택에 전역 실행 컨텍스트를 생성하여 Push 한다.

이 때 실행 **컨텍스트 스택 최상위** 즉, **실행 중인 실행 컨텍스트**는 **전역 실행 컨텍스트**가 된다.

### **2 전역 렉시컬 환경 생성**

전역 렉시컬 환경을 생성하고 전역 실행 컨텍스트에 **바인딩**한다.

이 때 전역 렉시컬 환경은 **환경 레코드**(**Environment Record)** 와 

**외부 렉시컬 환경에 대한 참조**(**OuterLexicalEnvironmentReference)** 로 구성된다.

### **2-a 전역 환경 레코드 생성**

전역 환경 레코드를 생성하고 전역 렉시컬 환경에 **바인딩**한다.

이 때 전역 환경 레코드는 **객체 환경 레코드**(**Object Environment Record**) 와 

**선언적 환경 레코드**(**Declarative Environment Record**) 로 구성된다.

### **2-a-i 객체 환경 레코드 생성**

기존에 전역 객체가 관리하던

- var 키워드로 선언된 전역 변수
- 함수 선언문으로 선언된 전역 함수
- 빌트인 전역 프로퍼티
- 빌트인 전역 함수
- 표준 빌트인 객체

를 관리한다.<br /><br />

객체 환경 레코드는 **\`BindingObject\`** 라 불리우는 객체와 연결된다.<br /><br />

전역 코드 평가 과정에서 var 키워드로 선언된 전역 변수와 함수 선언식으로 선언된 전역 함수는 **\`BindingObject\`** 를 통해서 전역 객체의 프로퍼티와 메소드가 된다.<br /><br />

이 때 등록된 식별자를 전역 환경 레코드의 객체 환경 레코드에서 검색하면 전역 객체의 프로퍼티를 검색하여 반환한다.<br /><br />

이 것이 var 키워드로 선언된 전역 변수와 함수 선언식으로 선언된 전역 함수가 

전역 객체를 가르키는 식별자 없이 전역 객체의 프로퍼티를 참조할 수 있는 매커니즘이다.<br /><br />

(window.alert 대신 alert 즉시 참조)<br /><br />

현재까지 레코드들이 어떻게 구성되어 있는지 간단히 나타내보자면

\`\`\`tsx
ExecutionContextStack [
  GlobalExecutionContext is RunningExcutionContext
]

GlobalExecutionContext {
  LexicalEnvironment: GlobalLexicalEnvironment
}

GlobalLexicalEnvironment {
  GlobalEnvironmentRecord: {
    GlobalObjectEnvironmentRecord
  }
}

GlobalObjectEnvironmentRecord {
  BindingObject: Window
}

Window {
  x: undefined
  foo: <function object>
  ...window
}
\`\`\`

위와 같을 것 같다.<br /><br />

위 **\`Window\`** 객체에 var로 선언한 **x** 가 **\`undefined\`** 로 초기화되어 있다.<br /><br />

전역 코드 평가 시점에 객체 환경 레코드에 바인딩된 **\`BindingObject\`** 를 통해 전역 객체에 변수 식별자를 키로 등록하고 값은 암묵적으로 **\`undefined\`** 로 바인딩 한다.<br /><br />

이를 통해 코드 실행 단계에서 x가 **선언되기 이전**에 값을 **\`undefined\`** 로 **참조할 수 있고** 이것이 **변수 호이스팅**이 발생하는 이유이다.<br /><br />

또한 함수 선언식으로 선언된 함수 **foo** 는 **\`undefined\`** 로 비어있지 않고 함수가 할당되어 있는데,

함수 선언식으로 선언된 함수는 함수 이름과 동일한 이름의 식별자를 **\`BindingObject\`** 를 통해 전역 객체에 키로 등록하고 함수 객체를 즉시 바인딩 한다.<br /><br />

이를 통해 코드 실행 단계에서 foo 함수가 **선언되기 이전**에 **호출할 수 있고**

이것이 **함수 호이스팅**이다.

### **2-a-ii 선언적 환경 레코드 생성**

**let, const 키워드로 선언된 전역 변수**를 관리한다.

let, const 키워드로 선언된 전역 변수는 전역 객체의 프로퍼티로 존재하지 않고,

개념적인 블록에 존재한다.<br /><br />

현재까지 레코드들이 어떻게 구성되어 있는지 간단히 나타내보자면

\`\`\`tsx
ExecutionContextStack [
  GlobalExecutionContext is RunningExcutionContext
]

GlobalExecutionContext {
  LexicalEnvironment: GlobalLexicalEnvironment
}

GlobalLexicalEnvironment {
  GlobalEnvironmentRecord: {
    GlobalObjectEnvironmentRecord,
    // 선언적 환경 레코드
    GlobalDeclarativeEnvironmentRecord
  }
}

// 선언적 환경 레코드
GlobalDeclarativeEnvironmentRecord {
  y: <uninitialized>
}

GlobalObjectEnvironmentRecord {
  BindingObject: Window
}

Window {
  x: undefined
  foo: <function object>
  ...window
}
\`\`\`

위와 같을 것 같다.<br /><br />

선언적 환경 레코드에서는 y에 **\`<uninitialized>\`** 라는 값이 들어가 있는데,

실제로 저 값이 바인딩 된 것은 아니고 **초기화가 진행되지 않았음**을 표시하는 용도이다.<br /><br />

let, const 키워드로 선언된 변수는 “**선언 단계**” 와 “**초기화 단계**”가 **분리**되어 진행되기 때문에 호이스팅 단계에서도 아무런 일이 일어나지 않는다.<br /><br />

이로 인해 코드 실행 단계에서 변수 참조가 불가능하고 이 때를 

**\`일시적 사각지대(TDZ : Temporary Dead Zone)\`** 라 한다.

### 2-b this 바인딩

전역 환경 레코드의 [[GlobalThisValue]] 슬롯에 this 가 바인딩 된다.

이 때 전역 코드에서 this 는 전역 객체이므로 [[GlobalThisValue]] 슬롯에 전역 객체가 바인딩 된다.<br /><br />

참고로 이때 this는 전역 환경 레코드의 컴포넌트인 객체 환경 레코드와 선언적 환경 레코드 중 객체 환경 레코드에만 바인딩 된다.<br /><br />

현재까지 레코드들이 어떻게 구성되어 있는지 간단히 나타내보자면

\`\`\`tsx
ExecutionContextStack [
  GlobalExecutionContext is RunningExcutionContext
]

GlobalExecutionContext {
  LexicalEnvironment: GlobalLexicalEnvironment
}

GlobalLexicalEnvironment {
  GlobalEnvironmentRecord: {
    GlobalObjectEnvironmentRecord,
    GlobalDeclarativeEnvironmentRecord
  }
  // 전역 객체 this 바인딩
  [[GlobalThisValue]]: Window
}

GlobalDeclarativeEnvironmentRecord {
  y: <uninitialized>
}

GlobalObjectEnvironmentRecord {
  BindingObject: Window
}

Window {
  x: undefined
  foo: <function object>
  ...window
}
\`\`\`

위와 같을 것 같다.

### 2-c 외부 렉시컬 환경에 대한 참조 결정

외부 렉시컬 환경에 대한 참조는 **현재 평가 중인 소스 코드를 포함하는 외부 소스코드**, 즉 **상위 스코프**를 가르킨다.

이를 통해 **단방향 링크드 리스트**인 **스코프 체인**을 구현한다.<br /><br />

전역 코드는 외부 소스코드가 존재하지 않으므로 외부 렉시컬 환경에 대한 참조에는 null 이 할당된다.<br /><br />

이는 즉 전역 렉시컬 환경이 스코프 체인의 마지막에 존재한다는 의미가 된다.<br /><br />

현재까지 레코드들이 어떻게 구성되어 있는지 간단히 나타내보자면

\`\`\`tsx
ExecutionContextStack [
  GlobalExecutionContext is RunningExcutionContext
]

GlobalExecutionContext {
  LexicalEnvironment: GlobalLexicalEnvironment
}

GlobalLexicalEnvironment {
  GlobalEnvironmentRecord: {
    GlobalObjectEnvironmentRecord,
    GlobalDeclarativeEnvironmentRecord
  }
  [[GlobalThisValue]]: Window
  // 외부 렉시컬 환경에 대한 참조
  OuterLexicalEnvironmentReference: null
}

GlobalDeclarativeEnvironmentRecord {
  y: <uninitialized>
}

GlobalObjectEnvironmentRecord {
  BindingObject: Window
}

Window {
  x: undefined
  foo: <function object>
  ...window
}
\`\`\`

위와 같을 것 같다.
    `,
  description:
    '실행 컨텍스트 생성 과정을 통해 코드가 실행되는 과정을 알아보자. 1',
  coverUrl: '/assets/execution-context-1/cover.png',
  categorys: ['javascript'],
}
