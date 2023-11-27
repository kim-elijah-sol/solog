import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const this_란_2: Content = {
  title: 'this 란 2',
  createdAt: '2023-11-27',
  url: createUrl('this 란 2'),
  content: `
  ### 생성자 함수 호출

생성자 함수 내부의 this 에는 미래에 생성될 인스턴스가 바인딩된다.

\`\`\`javascript
function Circle(radius: number) {
	this.radius = radius;

	this.getArea = function () {
    return radius ** 2 * Math.PI
  }
}

const circle = new Circle(3);

console.log(circle.getArea()); // 28.274333882308138...
\`\`\`

<br/>

만약 new 키워드를 사용하지 않으면 일반 함수 호출이 이루어진다.

\`\`\`javascript
const circle = Circle(3);

// Circle 함수는 아무것도 리턴하지 않으므로 circle 변수에 undefined 가 할당된다.
console.log(circle); // undefined

// 일반 함수로 호출되었기 때문에 this.radius = 3 문의 this 는 전역 객체를 가르키게 된다.
console.log(radius); // 3
\`\`\`

### Function.prototype.call/apply/bind 를 통한 간접적 호출

**\`.call\`**, **\`.apply\`**, **\`.bind\`** 메소드는 모든 함수가 상속받아 사용할 수 있다.

#### Function.prototype.call/apply

**\`.call\`**, **\`.apply\`** 메소드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아서, 즉시 함수를 호출한다.

<br/>

\`\`\`javascript
/**
 * thisArg - this 로 사용할 객체
 * argsArray - 함수에 인수로 전달할 리스트 혹은 유사 배열 객체
 * returns - 호출된 함수의 반환
 */
Function.prototype.apply(thisArg, argsArray)

/**
 * thisArg - this 로 사용할 객체
 * arg1, arg2, ... - 함수에 인수로 전달할 리스트
 * returns - 호출된 함수의 반환
 */
Function.prototype.call(thisArg, arg1, arg2, ...)

function fn() {
  console.log(arguments)
  return this
}

const thisArg = { x: 1 }
const args = [1,2,3]

console.log(fn.apply(thisArg, args))
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {x: 1}

console.log(fn.call(thisArg, args))
// Arguments [Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {x: 1}

console.log(fn.call(thisArg, ...args))
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {x: 1}
\`\`\`

#### Function.prototype.bind

**\`.bind\`** 메소드는 **\`.call\`**, **\`.apply\`** 메소드와 달리 함수를 실핼시키지 않고,

인수로 넘긴 this 객체를 this로 바인딩 시킨 새 함수를 반환한다.

인수 리스트는 **\`.call\`** 메소드와 동일하게 전달된다.

<br/>

\`\`\`javascript
/**
 * thisArg - this 로 사용할 객체
 * arg1, arg2, ... - 함수에 인수로 전달할 리스트
 * returns - 
 */
Function.prototype.bind(thisArg, arg1, arg2, ...)

function fn() {
  console.log(this)
}

const thisArg = { x: 1 }

console.log(fn.bind(thisArg)) // fn

console.log(fn.bind(thisArg)()) // {x: 1}
\`\`\`
    `,
  description:
    'this 는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가르키는 자기 참조 변수 이다.',
  coverUrl: '/assets/this_2/cover.webp',
  categorys: ['javascript'],
}
