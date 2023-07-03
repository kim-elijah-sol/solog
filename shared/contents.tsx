export type Content = {
  title: string
  createdAt: string
  url: string
  content: string
  description: string
  coverUrl: string
}

const contents: Content[] = [
  {
    title: 'React Native에서 한글 어절 단위 자연스럽게 개행 처리하기',
    createdAt: '2023-07-10',
    url: '/article/React-Native에서-한글-어절-단위-자연스럽게-개행-처리하기',
    content: 'Solog 시작',
    description:
      'React Native에서 문자 렌더링 시 사용되는 Text 컴포넌트에서 한글이 한 줄을 넘어갈 때, 어절 단위로 개행 처리하는 방법을 소개합니다.',
    coverUrl: '/assets/react-native-work-break/cover.png',
  },
]

export default contents
