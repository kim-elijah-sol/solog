import { markdown } from 'pages/palette'
import { 렉시컬_환경 } from './contents/렉시컬_환경'
import { 스코프_체인 } from './contents/스코프_체인'
import { 실행_컨텍스트_1 } from './contents/실행_컨텍스트_1'
import { 실행_컨텍스트_2 } from './contents/실행_컨텍스트_2'
import { 실행_컨텍스트_3 } from './contents/실행_컨텍스트_3'
import { 실행_컨텍스트_4 } from './contents/실행_컨텍스트_4'

export type Content = {
  title: string
  createdAt: string
  url: string
  content: string
  description: string
  coverUrl: string
  categorys: string[]
}

const contents: Content[] = [
  렉시컬_환경,
  스코프_체인,
  실행_컨텍스트_4,
  실행_컨텍스트_3,
  실행_컨텍스트_2,
  실행_컨텍스트_1,
]

export default contents
