import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const React에서_SOLID_원칙_DIP: Content = {
  title: 'React에서 SOLID 원칙 DIP',
  createdAt: '2023-11-25',
  url: createUrl('React에서 SOLID 원칙 DIP'),
  content: `
  ### Dependency Inversion Principle

  > 고수준 모듈은 저수준 모듈에 의존해서는 안되고, 둘 다 추상화에 의존해야 한다.<br/>
  고수준 모듈은 모듈의 본질적인 기능을 나타내고<br/>
  저수준 모듈은 고수준 모듈의 기능을 수행하기 위한 각각의 동작을 나타낸다.
 
  <br/>
  
  \`\`\`tsx
  function LoginForm() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
  
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
  
      api.login({
        id,
        password,
      })
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input type='text' value={id} onChange={(e) => setId(e.target.value)} />
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>로그인</button>
      </form>
    )
  }
  
  export default LoginForm
  \`\`\`
  
  위 소스 코드는 고수준 모듈인 **\`LoginForm\`** 컴포넌트가 저수준 모듈인 **\`api.login\`** 함수에 의존하고 있다.<br/><br/>
  
  이러한 의존성이 생기면 코드 변경에 유연하게 대처하지 못하기 때문에 DIP 에 맞추어 리팩토링 해보겠다.
  
  \`\`\`tsx
  interface Props {
    onSubmit: (id: string, password: string) => void
  }
  
  function LoginForm({ onSubmit }: Props) {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
  
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
  
      onSubmit(id, password)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input type='text' value={id} onChange={(e) => setId(e.target.value)} />
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>로그인</button>
      </form>
    )
  }
  
  export default LoginForm
  \`\`\`
  
  위와 같이 \`Props\` 의 \`onSubmit\` 을 통해 **\`LoginForm\`** 의 기능(로그인 처리)을 수행하기 위한 동작을 외부에서 주입받을 수 있도록 설계했다.<br/><br/>
  
  \`\`\`tsx
  function Page() {
    function handleSubmit(id: string, password: string) {
      api.login({
        id,
        password,
      })
    }
  
    return <LoginForm onSubmit={handleSubmit} />
  }
  \`\`\`
  
  위 소스 코드와 같이 **\`LoginForm\`** 컴포넌트와 **\`api.login\`** 함수가 완전히 독립적으로 존재하여 의존성을 제거할 수 있게 되었다.
    `,
  description:
    '고수준 모듈은 저수준 모듈에 의존해서는 안되고, 둘 다 추상화에 의존해야 한다.',
  coverUrl: '/assets/dip/cover.webp',
  categorys: ['React', 'OOP'],
}
