import { useRecoilState, useRecoilValue } from 'recoil'
import { css, Interpolation, Theme, useTheme } from '@emotion/react'
import React, { ClassAttributes, HTMLAttributes } from 'react'

import $title from '@atoms/workroom/title'
import $content from '@atoms/workroom/content'

import If from '@components/If'
import Seo from '@components/Seo'
import Flex from '@components/layout/Flex'
import Spacing from '@components/layout/Spacing'
import Markdown from '@components/Markdown'
import FixedBackground from '@components/FixedBackground'

import useDivisionPosition from '@hooks/workroom/useDivisionPosition'

import transition from '@styles/transition'
import { opacity } from '@styles/palette'
import { eResize, thinScrollBar } from '@styles/common'

function Workroom() {
  const content = useRecoilValue($content)

  const { divisionPosition, allowMove, moveAllow } = useDivisionPosition()

  const containerStyle = css`
    height: calc(100vh - 64px);
  `

  return (
    <>
      <Seo>
        <title>글 쓰기</title>
      </Seo>

      <Flex css={containerStyle}>
        <Left divisionPosition={divisionPosition}>
          <TopSpacing />
          <TitleInput />
          <BottomSpacing />
        </Left>

        <Division onMouseDown={allowMove} moveAllow={moveAllow} />

        <Right divisionPosition={divisionPosition}>
          <TopSpacing />
          <TitlePreview />
          <BottomSpacing />
          <Markdown>{content}</Markdown>
        </Right>
      </Flex>

      <If condition={moveAllow}>
        <If.Then>
          <FixedBackground zIndex={99} css={eResize} />
        </If.Then>
      </If>
    </>
  )
}

type DivisionProps = ClassAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement> & {
    css?: Interpolation<Theme>
  } & {
    moveAllow: boolean
  }

function Division({ moveAllow, ...props }: Omit<DivisionProps, 'children'>) {
  const { color } = useTheme()

  const style = css`
    width: 3px;
    height: 100%;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -2px;
      right: -2px;
      pointer-events: none;
      transition: ${transition.fast};

      ${moveAllow
        ? `
        background-color: ${opacity({
          color: color.text_300,
          opacity: 0.7,
        })};
      `
        : ''}
    }

    &:hover::after {
      background-color: ${opacity({
        color: color.text_300,
        opacity: 0.7,
      })};
    }
  `

  const moveAllowStyle = css`
    &::after {
      background-color: ${opacity({
        color: color.text_300,
        opacity: 0.7,
      })};
    }
  `

  return (
    <div
      {...props}
      css={[style, eResize, moveAllow ? moveAllowStyle : undefined]}
    />
  )
}

interface WrapperProps {
  divisionPosition: number
  children?: React.ReactNode
}

function Left({ divisionPosition, children }: WrapperProps) {
  const { color } = useTheme()

  const outerStyle = css`
    background-color: ${color.text_100};
    transition: background-color ${transition.fast};
  `

  const innerStyle = css`
    width: calc(100% - 48px);
    margin: 0 auto;
    height: 100%;
  `

  return (
    <div
      css={outerStyle}
      style={{
        flex: divisionPosition,
      }}
    >
      <Flex column css={innerStyle}>
        {children}
      </Flex>
    </div>
  )
}

function Right({ divisionPosition, children }: WrapperProps) {
  const { color } = useTheme()

  const style = css`
    max-height: 100%;
    overflow-y: auto;
    padding-bottom: 32px;
  `

  return (
    <Flex
      column
      css={[thinScrollBar(color.text_400), style]}
      style={{
        flex: 100 - divisionPosition,
      }}
    >
      {children}
    </Flex>
  )
}

function TopSpacing() {
  return <Spacing size='2.75rem' />
}

function BottomSpacing() {
  return <Spacing size='1rem' />
}

function TitlePreview() {
  const { color } = useTheme()

  const title = useRecoilValue($title)

  const style = css`
    color: ${color.text_900};
    font-size: 2.75rem;
    width: calc(100% - 32px);
    max-width: 648px;
    margin: 0 auto;
    transition: ${transition.fast};
  `

  return <h1 css={style}>{title}</h1>
}

function TitleInput() {
  const { color } = useTheme()

  const [title, setTitle] = useRecoilState($title)

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
  }

  const style = css`
    color: ${color.text_900};
    font-size: 2.75rem;
    font-weight: bold;
    transition: ${transition.fast};

    &::placeholder {
      color: ${color.text_200};
    }
  `

  return (
    <input
      type='text'
      value={title}
      onChange={onChangeTitle}
      css={style}
      placeholder='제목을 입력해주세요.'
    />
  )
}

export default Workroom
