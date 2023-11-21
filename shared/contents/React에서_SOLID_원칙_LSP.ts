import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const React에서_SOLID_원칙_LSP: Content = {
  title: 'React에서 SOLID 원칙 LSP',
  createdAt: '2023-11-21',
  url: createUrl('React에서 SOLID 원칙 LSP'),
  content: `
  ## Liskov Substitution Principle

  > 자식 클래스는 최소한 부모 클래스에서 가능한 행위를 수행할 수 있어야 한다.<br/>자식 클래스는 부모 클래스로 대체될 수 있어야 한다.
  
  \`\`\`tsx
  interface Props {
    name?: string
    value?: string
    onChange?: (value: string) => void
  }
  
  function Input({ value, onChange, name }: Props) {
    return (
      <input
        type='text'
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='design-input'
      />
    )
  }
  
  export default Input
  \`\`\`
  
  위 컴포넌트는 디자인 시스템에 명시된 **\`Input\`** 컴포넌트 이다.<br /><br />
  
  위 컴포넌트는 기존 html input 에 디자인 스타일만 입혀준 컴포넌트 이고,
  
  이는 즉 이 컴포넌트의 부모 컴포넌트는 **\`input\`** 이라 볼 수 있다.<br /><br />
  
  LSP 관점에서 몇 가지 문제점을 살펴보려한다.
  
  ### type 대체 불가능
  
  기존 **\`input\`** 은 type 을 \`text\` 뿐만 아니라 \`password\`, \`number\` 등 여러 가지로 선언이 가능하다.<br /><br />
  
  하지만 이 컴포넌트는 type 을 내부에서 text 로 지정하고 외부에서 변경되는 것을 막아두었기 때문에 부모 컴포넌트인 **\`input\`** 의 \`type\` 값을 대체할 수 없다.
  
  ### onChange 대체 불가능
  
  기존 **\`input\`** 은 onChange 함수에 \`value: string\` 를 인수로 넘기는 것이 아닌
  
  \`e: React.ChangeEvent<HTMLInputElement>\` 을 인수로 넘긴다.<br /><br />
  
  위 설계에 따라 value 값이 변하는 이벤트가 발생했을 때, 이벤트 객체에 접근이 불가능하기 때문에 부모 컴포넌트인 **\`input\`** 의 \`onChange\` 함수를 대체할 수 없다.
  
  ### className 대체 불가능
  
  기존 **\`input\`** 은 \`className\` 에 \`design-input\` 이 고정되어 있지 않다.<br /><br />
  
  하지만 이 컴포넌트는 \`className\` 을 내부에서 \`design-input\` 으로 지정하고 외부에서 변경되는 것을 막아두었기 때문에 부모 컴포넌트인 \`**input**\` 의 \`className\` 을 대체할 수 없다.
  
  ### 선언되지 않은 Props 사용 불가능
  
  만약 이 **\`Input\`** 컴포넌트에 \`id\` 값이 부여되어야 한다면? \`onFocus\`, \`onBlur\` 등 포커스 상태를 감지할 이벤트 함수가 필요하다면?<br /><br />
  
  현재 설계된 컴포넌트의 모습에서는 사용할 수 없어 보인다.<br /><br />
  
  즉 부모 컴포넌트인 **\`input\`** 을 대체할 수 없다.
  
  \`\`\`tsx
  interface Props
    extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {}
  
  function Input({ className, ...props }: Props) {
    return <input className={classNames('design-input', className)} {...props} />
  }
  
  export default Input
  \`\`\`
  
  LSP 관점에서 문제가 있던 컴포넌트를 위와 같이 리팩토링 해보았다.<br /><br />
  
  **\`Input\`** 컴포넌트의 \`Props\` 를 부모 컴포넌트인 **\`input\`** 의 \`Props\` 을 상속받아 설계하였다.
  
  이에 따라 모든 \`Prop\` 이 **\`input\`** 컴포넌트의 \`Prop\` 을 대체할 수 있다.<br /><br />
  
  디자인 시스템에 필요한 \`className\` 은 **\`classnames\`** 라이브러리를 사용하여 기본적으로 사용할 \`className\` 과 prop 으로 전달되는 \`className\` 을 합쳐주면 될 것 같다.
    `,
  description:
    '자식 클래스는 최소한 부모 클래스에서 가능한 행위를 수행할 수 있어야 한다.',
  coverUrl: '/assets/lsp/cover.webp',
  categorys: ['React', 'OOP'],
}
