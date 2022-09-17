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
        <Left divisionPosition={divisionPosition}></Left>

        <Division onMouseDown={onClickDivision} moveAllow={moveAllow} />

        <Right divisionPosition={divisionPosition}>
          <Markdown>{content}</Markdown>
        </Right>
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

interface WrapperProps {
  divisionPosition: number
  children?: React.ReactNode
}

function Left({ divisionPosition, children }: WrapperProps) {
  const { color } = useTheme()

  return (
    <Flex
      column
      css={css`
        background-color: ${color.text_100};
        transition: background-color ${transition.fast};
      `}
      style={{
        flex: divisionPosition,
      }}
    >
      {children}
    </Flex>
  )
}

function Right({ divisionPosition, children }: WrapperProps) {
  const { color } = useTheme()

  return (
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
      {children}
    </Flex>
  )
}

export default Workroom
