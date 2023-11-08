import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const 실행_컨텍스트_4: Content = {
  title: '실행 컨텍스트 4',
  createdAt: '2023-11-05',
  url: createUrl('실행 컨텍스트 4'),
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
  [[GlobalThisValue]]: Window,
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

어제(전역 코드 평가)까지 정리된 내용을 요약한 코드이다.

## 전역 코드 실행

이제 본격적으로 코드가 실행되는 부분이다.

변수 할당문이 실행되어 x, y 에 값이 할당된다.

그리고 foo 함수가 호출된다.<br /><br />

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
  [[GlobalThisValue]]: Window,
  OuterLexicalEnvironmentReference: null
}

GlobalDeclarativeEnvironmentRecord {
  // 값 할당
  y: 2
}

GlobalObjectEnvironmentRecord {
  BindingObject: Window
}

Window {
  // 값 할당
  x: 1
  foo: <function object>
  ...window
}
\`\`\`

위와 같을 것 같다.

## foo 함수 코드 평가

전역 코드 실행 단계에서 foo 함수를 호출했으니, foo 함수 코드 역시 전역 코드와 같이

코드 평가 과정, 코드 실행 과정이 순차적으로 진행된다.<br /><br />

전역 코드 평가와 같이 아래 순서대로 진행된다.

- 함수 실행 컨텍스트 생성
- 함수 렉시컬 환경 생성
    - 함수 환경 레코드 생성
    - this 바인딩
    - 외부 렉시컬 환경에 대한 참조

<br />

현재까지 레코드들이 어떻게 구성되어 있는지 간단히 나타내보자면

\`\`\`tsx
ExecutionContextStack [
  GlobalExecutionContext,
  FooExecutionContext is RunningExcutionContext
]

// foo 함수 실행 컨텍스트 생성
FooExecutionContext {
  LexicalEnvironment: FooLexicalEnvironment
}

// foo 함수 렉시컬 환경 생성
FooLexicalEnvironment {
  FooEnvironmentRecord: {
    // foo 함수 환경 레코드 생성
    FooFunctionEnvironmentRecord
  }
  // Window 로 this 바인딩
  [[ThisValue]]: Window
  // 외부 렉시컬 환경에 대한 참조
  OuterLexicalEnvironmentReference: GlobalLexicalEnvironment
}

FooFunctionEnvironmentRecord {
  // 매개변수
  a: undefined,
  // arguments 객체
  arguments : {
    0: 20,
    length: 1,
    callee: foo
  },
  // 함수 내부 스코프에 선언된 식별자
  x: undefined,
  y: <uninitialized>
  bar: <function object>
}

// 나머지 생략
...
\`\`\`

위와 같을 것 같다.

### 1 함수 실행 콘텍스트 생성

foo 함수 실행 컨텍스트가 생성된다.

이 때 foo 함수 실행 컨텍스트는 foo 함수 렉시컬 환경이 생성되고 난 후 실행 컨텍스트 스택에 Push 된다.

즉 foo 함수 실행 컨텍스트가 실행 중인 실행 컨텍스트가 된다.

### 2 함수 렉시컬 환경 생성

foo 함수 렉시컬 환경을 생성하고 foo 함수 실행 컨텍스트에 바인딩 한다.

### 2-a 함수 환경 레코드 생성

함수 코드는 [해당 글](https://www.notion.so/1-Execution-Context-8c8fa29210aa4b33ba46697336732c1b?pvs=21)에 정리한 것처럼 지역 변수, 매개 변수, **\`arguments\`** 객체를 관리한다.

### 2-b this 바인딩

foo 함수는 함수 선언식으로 선언 되었기 때문에 **this** 로 **전역 객체**가 바인딩된다.

### 2-c 외부 렉시컬 환경에 대한 참조

foo 함수 코드는 전역 코드에서 평가되기 때문에 외부 렉시컬 환경으로 전역 렉시컬 환경을

참조한다.

## foo 함수 코드 실행

매개 변수에 arguments 객체가 할당되고,

변수 할당문이 실행되어 foo 함수 지역 스코프에 선언된 x, y 에 값이 할당된다.<br /><br />

이 때, 지역 스코프에 x, y 가 없었다면 외부 렉시컬 환경에서 식별자를 검색한다.

외부 렉시컬 환경에도 존재하지 않는다면 **\`Refernce Error\`** 를 발생시킬 것이다.

다행히 foo 함수 지역 스코프에 x,y 식별자가 존재하므로 값을 할당시킬 것이다.<br /><br />

그리고 bar 함수가 호출된다.<br /><br />

현재까지 레코드들이 어떻게 구성되어 있는지 간단히 나타내보자면

\`\`\`tsx
ExecutionContextStack [
  GlobalExecutionContext,
  FooExecutionContext is RunningExcutionContext
]

FooExecutionContext {
  LexicalEnvironment: FooLexicalEnvironment
}

FooLexicalEnvironment {
  FooEnvironmentRecord: {
    FooFunctionEnvironmentRecord
  }
  [[ThisValue]]: Window,
  // 외부 렉시컬 환경에 대한 참조
  OuterLexicalEnvironmentReference: GlobalLexicalEnvironment
}

FooFunctionEnvironmentRecord {
  // 매개변수 할당
  a: 20,
  arguments : {
    0: 20,
    length: 1,
    callee: foo
  },
  // 변수 값 할당
  x: 3,
  y: 4,
  bar: <function object>
}

// 나머지 생략
...
\`\`\`

위와 같을 것 같다.

## bar 함수 코드 평가

bar 함수 코드 또한 foo 함수 코드와 동일하게

- 함수 실행 컨텍스트 생성
- 함수 렉시컬 환경 생성
    - 함수 환경 레코드 생성
    - this 바인딩
    - 외부 렉시컬 환경에 대한 참조

위 순서를 걸친다.<br /><br />

현재까지 레코드들이 어떻게 구성되어 있는지 간단히 나타내보자면

\`\`\`tsx
ExecutionContextStack [
  GlobalExecutionContext,
  FooExecutionContext,
  BarExecutionContext is RunningExcutionContext
]

// bar 함수 실행 컨텍스트 생성
BarExecutionContext {
  LexicalEnvironment: BarLexicalEnvironment
}

// bar 함수 렉시컬 환경 생성
BarLexicalEnvironment {
  BarEnvironmentRecord: {
    // bar 함수 환경 레코드 생성
    BarFunctionEnvironmentRecord
  }
  // this 바인딩
  [[ThisValue]]: Window,
  // 외부 렉시컬 환경에 대한 참조
  OuterLexicalEnvironmentReference: FooLexicalEnvironment
}

BarFunctionEnvironmentRecord {
  b: undefined,
  arguments: {
    0: 10,
    length: 1,
    callee: bar
  },
  z: <uninitialized>
}

// 나머지 생략
...
\`\`\`

위와 같을 것 같다.

## bar 함수 코드 실행

매개 변수에 **\`arguments\`** 객체가 할당되고,

변수 할당문이 실행되어 **bar** 함수 지역 스코프에 선언된 z 에 값이 할당된다.

그리고 **\`console.log(a + b + x + y + z);\`** 를 실행한다.

위 **\`console.log\`** 메소드는 아래와 같은 순서를 통해 실행된다.

- console 식별자 검색
- log 메소드 검색
- 표현식 (a + b + x + y + z) 에 대한 평가
- console.log 메소드 실행

### 1 console 식별자 검색

현재 실행되고 있는 컨텍스트의 렉시컬 환경에서 **\`console\`** 식별자를 검색한다.

**bar** 함수 렉시컬 환경에서는 **\`console\`** 식별자가 존재하지 않으므로

**bar** 함수 지역 스코프의 상위 스코프(외부 스코프에 대한 참조)인 

**bar** 함수 렉시컬 환경에서 **\`console\`** 식별자를 검색한다.

**bar** 함수 렉시컬 환경에서도 **\`console\`** 식별자가 존재하지 않으므로

**bar** 함수 지역 스코프의 상위 스코프인 전역 렉시컬 환경에서 **\`console\`** 식별자를 검색한다.

전역 렉시컬 환경은 객체 환경 레코드와 선언적 환경 레코드가 존재한다.

**\`console\`** 식별자는 객체 환경 레코드의 **\`BindingObject\`** 를 통해 검색할 수 있다.

### 2 log 메소드 검색

**\`console\`** 식별자에 바인딩 된 **\`console\`** 객체에서 **\`log\`** 메소드를 검색한다.

이 때 **\`log\`** 메소드는 프로토타입 체인을 통해 검색한다.

**\`log\`** 메소드는 **상속받은** 프로퍼티가 아니라 **\`console\`** 객체가 **직접** 가지고 있는 프로퍼티이다.

\`\`\`tsx
console.hasOwnProperty('log'); // true
\`\`\`

### 3 표현식 (a + b + x + y + z) 에 대한 평가

console.log 메소드에 전달할 인수인 **\`a + b + x + y + z\`** 를 평가한다.

이 때 모든 식별자는 스코프 체인을 통해 현재 실행 중인 실행 컨텍스트부터 상위 스코프로 이동하며

검색한다.

- a: foo 함수 렉시컬 환경 → 20
- b: bar 함수 렉시컬 환경 → 10
- x: foo 함수 렉시컬 환경 → 3
- y: foo 함수 렉시컬 환경 → 4
- z: bar 함수 렉시컬 환경 → 5

### 4 console.log 메소드 실행

a + b + x + y + z 를 평가하여 만들어진 42 라는 값을 console.log 의 인수로 전달하여 실행한다.

## bar 함수 코드 실행 종료

console.log 를 실행한 후 bar 함수 내부에서는 더 이상 할 일이 없기 때문에

bar 함수 실행 컨텍스트가 실행 컨텍스트 스택에서 **pop** 되고

foo 함수 실행 컨텍스트가 실행 중인 실행 컨텍스트가 된다.

이 때 bar 함수 실행 컨텍스트가 종료되어서 bar 함수 렉시컬 환경은 독립적인 존재이기 때문에

즉시 소멸되지 않는다.

객체를 포함하여 모든 값은 누군가에 의해서 참조되지 않을 때, 가비지 컬렉터에 의해서

메모리 공간의 확보가 해제되어 소멸한다.

만약 bar 함수 실행 컨텍스트가 종료되어도 누군가의 의해서 bar 렉시컬 환경을 참조하고 있다면

bar 렉시컬 환경은 소멸되지 않는다. ( Closure )

## foo 함수 코드 실행 종료

foo 함수 또한 함수 내부에서 더 이상할 할 일이 없기 때문에 실행 컨텍스트 스택에서 **pop** 되어

전역 실행 컨텍스트가 실행 중인 실행 컨텍스트가 된다.

## 전역 코드 실행 종료

전역 코드에서도 더 이상 할 일이 없기 때문에 전역 실행 컨텍스트도 실행 컨텍스트 스택에서 **pop** 되어

실행 컨텍스트가 비워지게 된다.
    `,
  description:
    '실행 컨텍스트 생성 과정을 통해 코드가 실행되는 과정을 알아보자. 2',
  coverUrl: '/assets/execution-context-4/cover.webp',
  categorys: ['javascript'],
}
