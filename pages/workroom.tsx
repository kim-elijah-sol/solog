import FixedBackground from '@components/FixedBackground'
import Flex from '@components/layout/Flex'
import Markdown from '@components/Markdown'
import Seo from '@components/Seo'
import { css, Interpolation, Theme, useTheme } from '@emotion/react'
import useIsMount from '@hooks/global/useIsMount'
import { thinScrollBar } from '@styles/common'
import { opacity } from '@styles/palette'
import transition from '@styles/transition'
import { ClassAttributes, HTMLAttributes, useEffect, useState } from 'react'

function Workroom() {
  const { color } = useTheme()

  const { isMount } = useIsMount()

  const [content, setContent] = useState('')

  const [divisionPosition, setDivisionPosition] = useState(50)

  const [moveAllow, setMoveAllow] = useState(false)

  function onClickDivision() {
    setMoveAllow(true)
  }

  function onMouseUp() {
    setMoveAllow(false)
  }

  function onMouseMove(event: MouseEvent) {
    if (moveAllow) {
      let position = (event.clientX / window.innerWidth) * 100

      if (position < 35) position = 35
      else if (position > 65) position = 65

      setDivisionPosition(position)
    }
  }

  useEffect(() => {
    if (isMount) {
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('mousemove', onMouseMove)

      return () => {
        window.removeEventListener('mouseup', onMouseUp)
        window.removeEventListener('mousemove', onMouseMove)
      }
    }
  }, [isMount, moveAllow])

  return (
    <>
      <Seo>
        <title>글 쓰기</title>
      </Seo>

      <Flex
        css={css`
          height: calc(100vh - 64px);
        `}
      >
        <Flex
          column
          css={css`
            background-color: ${color.text_100};
            transition: background-color ${transition.fast};
          `}
          style={{
            flex: divisionPosition,
          }}
        ></Flex>

        <Division onMouseDown={onClickDivision} moveAllow={moveAllow} />

        <Flex
          column
          css={[
            thinScrollBar(color.text_400),
            css`
              max-height: 100%;
              overflow-y: auto;
              padding-bottom: 32px;
            `,
          ]}
          style={{
            flex: 100 - divisionPosition,
          }}
        >
          <Markdown>{`
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
  <br/>
  <br/>
  <br/>

  ![](https://newevolutiondesigns.com/images/freebies/4k-space-wallpaper-1.jpg)

  ![](https://www.svgrepo.com/show/303600/typescript-logo.svg)

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
`}</Markdown>
        </Flex>
      </Flex>
      {moveAllow && (
        <FixedBackground
          zIndex={99}
          css={css`
            cursor: e-resize;
          `}
        />
      )}
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

  return (
    <div
      {...props}
      css={css`
        width: 3px;
        height: 100%;
        cursor: e-resize;
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
      `}
    />
  )
}

export default Workroom
