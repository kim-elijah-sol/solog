import { useRecoilState, useRecoilValue } from 'recoil'
import { css, Interpolation, Theme, useTheme } from '@emotion/react'
import React, { ClassAttributes, HTMLAttributes } from 'react'

import $title from '@atoms/workroom/title'
import $content from '@atoms/workroom/content'
import $category from '@atoms/workroom/category'
import $categorys from '@selectors/workroom/categorys'

import If from '@components/If'
import Seo from '@components/Seo'
import Flex from '@components/layout/Flex'
import Title from '@components/Title'
import Spacing from '@components/layout/Spacing'
import Markdown from '@components/Markdown'
import Categorys from '@components/Categorys'
import TitleInput from '@components/TitleInput'
import CategorysInput from '@components/CategorysInput'
import FixedBackground from '@components/FixedBackground'

import useDivisionPosition from '@hooks/workroom/useDivisionPosition'

import transition from '@styles/transition'
import { opacity } from '@styles/palette'
import { eResize, thinScrollBar } from '@styles/common'
import $duplicateCategorys from '@selectors/workroom/duplicateCategorys'
import useWatchDuplicateCategorys from '@hooks/workroom/useWatchDuplicateCategorys'
import Date from '@components/Date'

function Workroom() {
  const title = useRecoilValue($title)

  const content = useRecoilValue($content)

  const categorys = useRecoilValue($categorys)

  const duplicateCategorys = useRecoilValue($duplicateCategorys)

  const [category, setCategory] = useRecoilState($category)

  const { divisionPosition, allowMove, moveAllow } = useDivisionPosition()

  const containerStyle = css`
    height: calc(100vh - 64px);
  `

  function onClickCategory(index: number) {
    setCategory(
      category
        .split(',')
        .filter((_, _index) => index !== _index)
        .join(',')
    )
  }

  useWatchDuplicateCategorys()

  return (
    <>
      <Seo>
        <title>글 쓰기</title>
      </Seo>

      <Flex css={containerStyle}>
        <Left divisionPosition={divisionPosition}>
          <Spacing size='3rem' />
          <TitleInput />
          <Spacing size='2rem' />
          <CategorysInput />
        </Left>

        <Division onMouseDown={allowMove} moveAllow={moveAllow} />

        <Right divisionPosition={divisionPosition}>
          <Spacing size='3rem' />
          <Title>{title}</Title>
          <Spacing size='2rem' />
          <Date>2022년 09월 24일</Date>
          <Spacing size='1rem' />
          <Categorys>
            {categorys.map((category, index) => (
              <Categorys.Item
                key={index}
                isDuplicated={duplicateCategorys.includes(category)}
                onClick={() => onClickCategory(index)}
              >
                {category}
              </Categorys.Item>
            ))}
          </Categorys>
          <Spacing size='2rem' />
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
        width: `${divisionPosition}%`,
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
        width: `${100 - divisionPosition}%`,
      }}
    >
      {children}
    </Flex>
  )
}

export default Workroom
