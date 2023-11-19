import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const React에서_SOLID_원칙_OCP: Content = {
  title: 'React에서 SOLID 원칙 OCP',
  createdAt: '2023-11-19',
  url: createUrl('React에서 SOLID 원칙 OCP'),
  content: `
## Open Close Principle

> 확장에는 열려있어여 하고, 변경에는 닫혀있어야 한다.<br />즉, 기능이 추가되거나 변경될 때 기존 소스 코드를 변경하지 않아도 돼야 한다.

\`\`\`tsx
interface Props {
  leftIcon?: 'alert' | 'confirm' | 'error'
}

function Component({ leftIcon }: Props) {
  return (
    <div>
      <div>
        {leftIcon === 'alert' && <img src={...} />}
        {leftIcon === 'confirm' && <img src={...} />}
        {leftIcon === 'error' && <img src={...} />}
      </div>
			...
    </div>
  )
}

export default Component
\`\`\`

위 컴포넌트에서는 좌측에 렌더링 될 아이콘을 **\`'alert' | 'confirm' | 'error'\`** 타입으로 받아서 각 타입별로 분기문을 나누어 적절한 이미지를 렌더링 하는 모습이다.<br /><br />

만약 위 컴포넌트에 새로운 이미지 렌더링 조건이 생긴다면?

**\`leftIcon\`** 의 타입이 확장되고 새로운 렌더링 조건문을 작성해야한다.<br /><br />

만약 아이콘이 아니라 버튼, 인풋이 렌더링 되어야 한다면?

**\`leftIcon\`** 이라는 **prop** 의 이름은 적절하지 않기 때문에 새로운 **prop** 이 선언되거나, **\`leftIcon\`** 의 이름이 변경되어야 할 것이다.<br /><br />

이는 기능 추가에 대해 열려있지 않고, 일제히 닫혀있는 모습이다.

\`\`\`tsx
interface Props {
  left?: React.ReactNode
}

function Component({ left }: Props) {
  return (
    <div>
      <div>
        {left}
      </div>
      ...
    </div>
  )
}

export default Component
\`\`\`

만약 소스 코드가 위와 같이 작성되어 있다면?<br /><br />

컴포넌트를 사용하는 곳의 특성에 따라 이미지 컴포넌트를 prop 으로 사용하거나 버튼, 인풋 등을 선언해두면 될 것 같다.<br /><br />

이는 새로운 변경 사항이 있을 때, 기존 컴포넌트를 수정하지 않고, 열려있는 prop 의 특성에 따라 자유롭게 기능이 확장될 수 있음을 뜻 한다.
    `,
  description: '확장에는 열려있어여 하고, 변경에는 닫혀있어야 한다.',
  coverUrl: '/assets/ocp/cover.webp',
  categorys: ['React', 'OOP'],
}
