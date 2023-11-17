import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const React에서_SOLID_원칙_SRP: Content = {
  title: 'React에서 SOLID 원칙 SRP',
  createdAt: '2023-11-17',
  url: createUrl('React에서 SOLID 원칙 SRP'),
  content: `
## Single Responsibility Principle

> 클래스는 단 하나의 책임만 가져야 한다.
함수는 단 하나의 기능만 수행해야 한다.
> 

\`\`\`tsx
function Page() {
  const [value, setValue] = useState('')

  const [data, setData] = useState()

  async function handleSubmit() {
    const nextData = await fetchData(value)

    setData(nextData)
  }

  return (
    <>
      <header>{/** header inner */}</header>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='button' onClick={handleSubmit}>
        제출
      </button>
      {data?.type === 'A' && <p>A Type: {data}</p>}
      {data?.type === 'B' && <p>B Type: {data}</p>}
    </>
  )
}
\`\`\`

위 코드에서는<br /><br />

- header 렌더링
- input 상태 관리
- data fetching
- data rendering

위 4가지 기능이 이 한 군데에 몰려있다.<br /><br />

이렇게 뭉쳐있는 기능들을 각자 역할에 충실할 수 있도록 컴포넌트로 분리해보려 한다.<br />

\`\`\`tsx
import { useState } from 'react'

function Page() {
  const [data, setData] = useState()

  async function handleSubmit(value: string) {
    const nextData = await fetchData(value)

    setData(nextData)
  }

  return (
    <>
      <Header />
      <Form handleSubmit={handleSubmit} />
      <Data data={data} />
    </>
  )
}

function Header() {
  return <header>{/** header inner */}</header>
}

function Form({ handleSubmit }) {
  const [value, setValue] = useState<string>('')

  return (
    <>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='button' onClick={() => handleSubmit(value)}>
        제출
      </button>
    </>
  )
}

function Data({data}) {
  return (
    <>
      {data?.type === 'A' && <p>A Type: {data}</p>}
      {data?.type === 'B' && <p>B Type: {data}</p>}
    </>
  )
}
\`\`\`

### header 렌더링 분리

첫 번째로는 header 렌더링을 **\`Header\`** 라는 컴포넌트 내부에 모두 몰아 넣음으로써

header 렌더링 부분에서 처리할 역할은 **\`Header\`** 컴포넌트가 전적으로 책임지게 된다.

### input 상태 관리 분리

두 번째로는 input 상태가 변경되고 **\`handleSubmit\`** 에 사용되는 부분을 **\`Form\`** 이라는 컴포넌트로 분리하였다.

이로 인해 input 의 상태 관리 및 사용되는 시점은 **\`Form\`** 컴포넌트가 전적으로 책임지게 된다.

### data rendering 분리

fetchData 함수로 얻어온 데이터를 렌더링 하는 부분은 **\`Data\`** 컴포넌트로 분리하였다.

이로 인해 data 값에 따른 렌더링 식은 **\`Data\`** 컴포넌트가 전적으로 책임지게 된다.

### data fetching 분리

사실 data fetching 은 분리되었다고 볼 수 는 없지만 위 3가지 역할 들이 분리됨에 따라

알아서 분리되었다.
    `,
  description:
    '클래스는 단 하나의 책임만 가져야 한다. 함수는 단 하나의 기능만 수행해야 한다.',
  coverUrl: '/assets/srp/cover.webp',
  categorys: ['React', 'OOP'],
}
