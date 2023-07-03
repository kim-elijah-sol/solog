import InputField from '@components/InputField'
import Flex from '@components/layout/Flex'
import Spacing from '@components/layout/Spacing'
import Dropdown from '@components/Dropdown'

import { css, useTheme } from '@emotion/react'
import { staticColor } from '@styles/palette'
import transition from '@styles/transition'
import React, { useState } from 'react'
import Radio from '@components/Radio'
import Markdown from '@components/Markdown'
import Image from 'next/image'

const padding = 25

function Box({
  color,
  textColor,
  children,
}: {
  color: string
  textColor?: string
  children?: React.ReactNode
}) {
  return (
    <div
      css={css`
        width: 100px;
        height: 100px;
        background-color: ${color};
        cursor: pointer;
        transition: ${transition.fast};
        color: ${textColor ?? '#fff'};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;

        ${!children
          ? `
          &:hover {
            transform: scale(0.9);
          }
          `
          : ''}
      `}
    >
      {children}
    </div>
  )
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      column
      css={css`
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: ${padding}px 0;
      `}
    >
      {children}
    </Flex>
  )
}

const markdown = `
  ## 헤딩 h1
  ### 헤딩 h2
  #### 헤딩 h3
  ##### 헤딩 h4
  ###### 헤딩 h5

  기본 텍스트

  **굵은 텍스트**

  *랄로와 기울어진 마라탕*

  > 인용문
  >> 인용 2문
  >>> 인용 3문

  인용문 끝났어요

  _**[여긴 구글입니다.](https://www.google.com)**_

  <br/>

  - 리스트 1
  - 리스트 2
    - 리스트 2-1
  - 리스트 3
    - 리스트 3-1
    - 리스트 3-2
    - 리스트 3-3
      - 리스트 3-3-1

  \`\`\`tsx
  interface Props {
    value : number
  }

  function solution ({ value } : Props) {
    let answer : number = 1;

    answer = 2;

    answer += 1

    return (
      <div className="__sol__log__">
        {answer}
      </div>
    )
  }
  \`\`\`
`

function Palette() {
  const { color } = useTheme()

  const [selected, setSelected] = useState<number[]>([])

  const 라이브러리 = [
    {
      name: 'React.js',
      id: 1,
    },
    {
      name: 'Vue.js',
      id: 2,
    },
    {
      name: 'Svelte',
      id: 3,
    },
    {
      name: 'Solid.js',
      id: 4,
    },
    {
      name: 'Next.js',
      id: 5,
    },
    {
      name: 'Remix',
      id: 6,
    },
  ]

  function handleChange(id: number) {
    setSelected(
      selected.includes(id)
        ? selected.filter((_id) => _id !== id)
        : selected.concat(id)
    )
  }

  const value = 라이브러리
    .filter(({ id }) => selected.includes(id))
    .map(({ name }) => name)
    .join(', ')

  const [selectLib, setSelectLib] = useState('')

  return (
    <>
      <Container>
        <Markdown>{markdown}</Markdown>
      </Container>

      <Container>
        <Flex>
          <Box color={staticColor.primary_50} />
          <Box color={staticColor.primary_100} />
          <Box color={staticColor.primary_200} />
          <Box color={staticColor.primary_300} />
          <Box color={staticColor.primary_400} />
        </Flex>
        <Flex>
          <Box color={staticColor.primary_500} />
          <Box color={staticColor.primary_600} />
          <Box color={staticColor.primary_700} />
          <Box color={staticColor.primary_800} />
          <Box color={staticColor.primary_900} />
        </Flex>
      </Container>

      <Container>
        <Flex>
          <Box color={staticColor.red_50} />
          <Box color={staticColor.red_100} />
          <Box color={staticColor.red_200} />
          <Box color={staticColor.red_300} />
          <Box color={staticColor.red_400} />
        </Flex>
        <Flex>
          <Box color={staticColor.red_500} />
          <Box color={staticColor.red_600} />
          <Box color={staticColor.red_700} />
          <Box color={staticColor.red_800} />
          <Box color={staticColor.red_900} />
        </Flex>
      </Container>

      <Container>
        <Flex>
          <Box color='transparent' textColor={color.text_900}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_800}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_700}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_600}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_500}>
            Aa
          </Box>
        </Flex>
        <Flex>
          <Box color='transparent' textColor={color.text_400}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_300}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_200}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_100}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_50}>
            Aa
          </Box>
        </Flex>
      </Container>

      <Container>
        <Dropdown
          placeholder='라이브러리를 선택해주세요.'
          value={value}
          onChange={handleChange}
        >
          {라이브러리.map(({ id, name }) => (
            <Dropdown.Option
              key={id}
              value={id}
              checked={selected.includes(id)}
            >
              {name}
            </Dropdown.Option>
          ))}
        </Dropdown>
      </Container>

      <Container>
        <Flex
          css={css`
            gap: 16px;
          `}
        >
          {라이브러리.map(({ id, name }) => (
            <Radio
              key={id}
              id={id.toString()}
              name='lib'
              checked={selectLib === id.toString()}
              onChange={(e) => setSelectLib(e.target.id)}
              disabled={id === 5}
            >
              {name}
            </Radio>
          ))}
        </Flex>
      </Container>

      <Spacing size={64} />

      <Container>
        <InputField
          type='text'
          placeholder='값을 입력해주세요.'
          autoComplete='off'
        />
        <Spacing size={24} />
        <InputField
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          autoComplete='off'
        />
      </Container>

      <Spacing size={32} />
    </>
  )
}

export default Palette
