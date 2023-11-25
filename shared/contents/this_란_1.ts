import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const this_란_1: Content = {
  title: 'this 란 1',
  createdAt: '2023-11-26',
  url: createUrl('this 란 1'),
  content: `
  **객체**는 상태를 나타내는 **프로퍼티**와 동작을 나타내는 **메소드**가 하나의 논리적 단위로 묶인 복합 자료구조이다.<br/><br/>

  이 때 메소드는 자신이 속한 객체의 프로퍼티를 참조하고 변경할 수 있어야하는데,
  
  일단 참조를 하기 위해선 메소드가 **자신이 속한 객체를 가르키는 식별자를 참조할 수 있어야 한다.** <br/><br/>
  
  **this** 는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가르키는 
  
  **자기 참조 변수(self-reference variable)** 이다.<br/><br/>
  
  자바 스크립트 엔진은 this 를 암묵적으로 생성해주며, 코드 어느 곳이던 참조할 수 있다.
  
  함수를 호출하면 **arguments** 객체와 **this** 가 암묵적으로 함수 내부에 전달된다.
  
  이 때 this 는 **함수 호출 방식**에 따라 동적으로 결정된다.
  
  또한 **엄격 모드(strict mode)** 유무에 대해서도 동적으로 결정된다.
  
  ### 일반 함수 호출
  
  일반 함수로 호출하게 되면 함수 내부의 **this** 는 **\`전역 객체(window)\`** 를 바라보게 된다.
  
  \`\`\`javascript
  function foo() {
    console.log(this); // window
  
    function bar() {
      console.log(this); // window
    }
  
    setTimeout(function () {
      console.log(this); // window
    }, 0)
  
    bar();
  }
  
  foo();
  \`\`\`
  
  <br/>

  만약 엄격 모드에 일반 함수로 호출하면 함수 내부의 **this** 는 **\`undefined\`** 가 된다.
  
  \`\`\`javascript
  function foo() {
    'use strict';
  
    console.log(this); // undefined
  
    function bar() {
      console.log(this); // undefined
    }
  
    setTimeout(function () {
      console.log(this); // undefined
    }, 0)
  
    bar();
  }
  
  foo();
  \`\`\`

  <br/>
  
  일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 모두 위와 같은 규칙을 따른다.
  
  단, 함수가 **화살표 함수**로 선언 되었다면 **상위 스코프의 this** 를 가르킨다.
  
  \`\`\`javascript
  const obj = {
    value: 100,
    foo() {
      console.log(this); // { value: 100, foo: *f* }
  
      function bar() {
        console.log(this); // window
      }
    
      setTimeout(function () {
        console.log(this); // window
      }, 0)
  
      const baz = () => console.log(this) // { value: 100, foo: *f* }
  
      setTimeout(() => console.log(this), 0) // { value: 100, foo: *f* }
  
      bar();
      baz();
    }
  }
  
  obj.foo();
  \`\`\`
  
  ### 메소드 호출
  
  메소드로 호출된 함수의 this는 메소드를 호출했을 때 **호출한 객체( 마침표(.) 연산자 앞에 기술된 객체 )** 다.
  
  주의할 부분은 **메소드를 소유한 객체가 아닌**, **메소드를 호출한 객체**다.
  
  \`\`\`javascript
  const person = {
    name: 'Sol',
    getName () {
      return this.name;
    }
  };
  
  console.log(person.getName()); // 'Sol'
  
  const newPerson = {
    name: 'Kim'
  };
  
  newPerson.getName = person.getName;
  
  // 호출한 객체가 newPerson 이므로 newPerson 를 this로 바인딩한다.
  console.log(newPerson.getName()); // 'Kim'
  
  const getName = newPerson.getName;
  
  // 일반 함수로 호출되었기 때문에 window.name 을 리턴하게 된다.
  console.log(getName()) // ''
  \`\`\`

  <br/>
  
  프로토타입 메소드 내부에서 사용되는 this 도 일반 메소드와 동일하게
  
  해당 메소드를 호출한 객체에 바인딩된다.
  
  \`\`\`javascript
  function Person(name) {
    this.name = name;
  }
  
  Person.prototype.getName = function() {
    return this.name;
  }
  
  const me = new Person('Sol')
  
  console.log(me.getName()) // 'Sol'
  
  Person.prototype.name = 'Kim'
  
  console.log(Person.prototype.getName()) // 'Kim'
  \`\`\`
    `,
  description:
    'this 는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가르키는 자기 참조 변수 이다.',
  coverUrl: '/assets/this_1/cover.webp',
  categorys: ['javascript'],
}
