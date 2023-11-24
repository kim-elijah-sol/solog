import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const React에서_SOLID_원칙_ISP: Content = {
  title: 'React에서 SOLID 원칙 ISP',
  createdAt: '2023-11-24',
  url: createUrl('React에서 SOLID 원칙 ISP'),
  content: `
  ## Interface Segregation Principle

  > 객체는 자신이 호출하지 않는 메소드에 의존하지 않아야 한다.

  <br/>

  \`\`\`tsx
  type Data = {
    name: string
    age: number
    thumbnail: string
    address: string
    company: string
  }
  \`\`\`
  
  위와 같은 데이터 응답 타입이 있고 이를 구현하고 사용하는 코드는 아래와 같다.<br/><br/>
  
  \`\`\`tsx
  interface Props extends Data {}
  
  function Component({ name, thumbnail }: Props) {
    return (
      <div>
        <img src={thumbnail} alt='' />
        <p>{name}</p>
      </div>
    )
  }
  
  export default Component
  \`\`\`
  
  \`\`\`tsx
  function Page() {
    const [data, setData] = useState<Data[]>([])
  
    return (
      <div>
        {data.map((item) => (
          <Component key={item.name} {...item} />
        ))}
      </div>
    )
  }
  
  export default Page
  \`\`\`

  <br/>

  **\`Component\`** 의 **\`Props\`** 는 **\`Data\`** 타입을 상속받았다.
  
  하지만 실제로 사용하는 값은 \`name\`, \`thumbnail\` 이 두 값 밖에 없다.<br/><br/>
  
  이와 같은 설계는 불필요한 의존성이 생기기 때문에, **\`Component\`** 를 사용하는 다른 페이지에서 실제로는 사용되지도 않을 \`age\`, \`address\`, \`company\` 값을 선언해야하는 문제가 생긴다.
  
  \`\`\`tsx
  interface Props extends Pick<Data, 'name' | 'thumbnail'> {}
  
  function Component({ name, thumbnail }: Props) {
    return (
      <div>
        <img src={thumbnail} alt='' />
        <p>{name}</p>
      </div>
    )
  }
  
  export default Component
  \`\`\`
  
  <br/>

  위 처럼 사용할 \`name\`, \`thumbnail\` 값만 Props 로 받게 된다면 불필요한 의존성이 사라지고, 다른 페이지에서 **\`Data\`** 타입의 데이터를 모두 구현하지 않고도 **\`Component\`** 를 사용할 수 있게 된다.
    `,
  description: '객체는 자신이 호출하지 않는 메소드에 의존하지 않아야 한다.',
  coverUrl: '/assets/isp/cover.webp',
  categorys: ['React', 'OOP'],
}
