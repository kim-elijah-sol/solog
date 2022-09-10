import $theme from '@atoms/global/theme'
import InputField from '@components/InputField'
import Flex from '@components/layout/Flex'
import Spacing from '@components/layout/Spacing'
import Dropdown from '@components/Dropdown'

import { css, useTheme } from '@emotion/react'
import { staticColor } from '@styles/palette'
import transition from '@styles/transition'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'

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

function Palette() {
  const { color } = useTheme()

  const setTheme = useSetRecoilState($theme)

  function onClickThemeToggle() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
  }

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

  function onChange(id: number) {
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

  return (
    <>
      <Spacing size={30} />
      <Flex
        css={css`
          align-items: center;
          justify-content: center;
        `}
      >
        <button onClick={onClickThemeToggle}>테마 토글</button>
      </Flex>

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
          onChange={onChange}
        >
          {라이브러리.map(({ id, name }) => (
            <Dropdown.Option value={id} checked={selected.includes(id)}>
              {name}
            </Dropdown.Option>
          ))}
        </Dropdown>
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
