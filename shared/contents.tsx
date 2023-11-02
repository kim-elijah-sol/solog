import { markdown } from 'pages/palette'
import { 실행_컨텍스트_1 } from './contents/실행_컨텍스트_1'
import { 실행_컨텍스트_2 } from './contents/실행_컨텍스트_2'

export type Content = {
  title: string
  createdAt: string
  url: string
  content: string
  description: string
  coverUrl: string
  categorys: string[]
}

const contents: Content[] = [실행_컨텍스트_2, 실행_컨텍스트_1]

export default contents
