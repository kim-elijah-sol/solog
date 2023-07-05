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
    title: 'React Native에서 한글 어절 단위로 자연스럽게 개행 처리하기',
    createdAt: '2023-07-10',
    url: createUrl(
      'React Native에서 한글 어절 단위로 자연스럽게 개행 처리하기'
    ),
    content: markdown,
    description:
      'React Native에서 문자 렌더링 시 사용되는 Text 컴포넌트에서 한글이 한 줄을 넘어갈 때, 어절 단위로 개행 처리하는 방법을 소개합니다.',
    coverUrl: '/assets/react-native-work-break/cover.png',
    categorys: ['react', 'react-native', 'typescript'],
  },
]

export default contents
