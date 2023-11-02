import { markdown } from 'pages/palette'

export type Content = {
  title: string
  createdAt: string
  url: string
  content: string
  description: string
  coverUrl: string
  categorys: string[]
}

const createUrl = (title: string) => `/article/${title.replace(/ /g, '-')}`

const contents: Content[] = [
  {
    title: '실행 컨텍스트 1',
    createdAt: '2023-11-01',
    url: createUrl('실행 컨텍스트 1'),
    content: `
**실행 컨텍스트**는 “**실행할 코드에 제공할 환경 정보들을 모아 놓은 객체**” 이다.<br/><br/>

자바스크립트가 스코프를 기반으로 **식별자**와 **식별자에 담긴 값**을 관리하는 방법,

**호이스팅**이 일어나는 이유, **클로저**의 동작 방식, **태스크 큐** 와 함께 동작하는 **이벤트 핸들러,**

**비동기 처리**의 동작 방식을 이해하기 위해선 **실행 컨텍스트**를 정확히 이해해야 할 수 있다.<br/><br/>

일단 실행 컨텍스트를 생성하는 소스 코드 타입으로는

- 전역 코드 (Global code)
- 함수 코드 (Function code)
- eval 코드 (eval code)
- 모듈 코드 (module code)

이 4가지가 존재한다.<br/><br/>

소스 코드의 타입이 구분되는 이유는 각자의 타입마다 실행 컨텍스트를 생성하는 과정과 관리 내용이 다르기 때문이다.

#### 전역 코드

전역 코드는 전역 변수를 관리하기 위해 **최상위 스코프**인 **전역 스코프**를 생성해야 한다.

**var 키워드로 선언된 변수**와 **함수 선언식으로 정의된 함수**를 **전역 객체에 바인딩** 시키고,

**참조를 위해 전역 객체와 연결**되어야 한다.<br/><br/>

이를 위해 전역 코드가 평가되면 전역 실행 컨텍스트를 생성한다.

#### 함수 코드

함수 코드는 **지역 스코프**를 생성해야 하고 **지역 변수**, **매개 변수**, **\`arguments\`** **객체**를 관리해야 한다.

그리고 생성한 **지역 스코프**를 **전역 스코프로부터 시작되는 스코프 체인에 연결** 시켜야한다.

이를 위해 함수 코드가 평가되면 함수 실행 컨텍스트를 생성한다.

#### eval 코드

eval 코드는 **strict mode** 에서 **독자적인 스코프**를 생성한다.

이를 위해 eval 코드가 평가되면 eval 실행 컨텍스트를 생성한다.

#### 모듈 코드

모듈 코드는 **모듈별**로 **독자적인 모듈 스코프**를 생성한다.

이를 위해 모듈 코드가 평가되면 모듈 실행 컨텍스트를 생성한다.

#### 소스 코드의 평가와 실행

자바스크립트 엔진은 소스 코드를 **평가**와 **실행**의 과정으로 나누어 처리한다.<br/><br/>

**소스 코드 평가 과정**에서는 실행 컨텍스트를 생성하고 변수, 함수 등의 **선언문만 먼저 실행**하여

생성된 변수, 함수를 **렉시컬 환경**에 등록한다.<br/><br/>

**소스 코드 실행 과정**에서는 선언문을 제외한 나머지 소스 코드가 순차적으로 실행된다.

이 때 소스 코드 실행에 필요한 정보(변수나 함수의 참조)를 **실행 컨텍스트**가 관리하는 **스코프**에서

**검색**하여 **취득**한다.

그리고 **변수 값 변경 등의 소스 코드 실행 결과**는 다시 **실행 컨텍스트**가 관리하는 **스코프**에 **등록**한다.
    `,
    description:
      '실행 컨텍스트는 “실행할 코드에 제공할 환경 정보들을 모아 놓은 객체” 이다.',
    coverUrl: '/assets/execution-context-1/cover.png',
    categorys: ['javascript'],
  },
]

export default contents
