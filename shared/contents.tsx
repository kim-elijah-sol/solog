import { markdown } from 'pages/palette'
import { React에서_SOLID_원칙_ISP } from './contents/React에서_SOLID_원칙_ISP'
import { React에서_SOLID_원칙_LSP } from './contents/React에서_SOLID_원칙_LSP'
import { React에서_SOLID_원칙_OCP } from './contents/React에서_SOLID_원칙_OCP'
import { React에서_SOLID_원칙_SRP } from './contents/React에서_SOLID_원칙_SRP'
import { 렉시컬_스코프 } from './contents/렉시컬_스코프'
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
  React에서_SOLID_원칙_ISP,
  React에서_SOLID_원칙_LSP,
  React에서_SOLID_원칙_OCP,
  React에서_SOLID_원칙_SRP,
  렉시컬_스코프,
  렉시컬_환경,
  스코프_체인,
  실행_컨텍스트_4,
  실행_컨텍스트_3,
  실행_컨텍스트_2,
  실행_컨텍스트_1,
]

export default contents
