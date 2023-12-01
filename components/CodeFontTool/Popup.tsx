import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { opacity, staticColor } from '@styles/palette'
import { useEffect, useState } from 'react'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isOpen: boolean
}

function Popup({ isOpen, ...props }: Props) {
  const { color } = useTheme()

  const [isRendering, setIsRendering] = useState(false)

  const [isVisible, setIsVisible] = useState(false)

  function show() {
    setIsRendering(true)
    setTimeout(() => {
      setIsVisible(true)
    }, 50)
  }

  function hide() {
    setIsVisible(false)
    setTimeout(() => {
      setIsRendering(false)
    }, 210)
  }

  useEffect(() => {
    if (isOpen) {
      show()
    } else {
      hide()
    }
  }, [isOpen])

  if (!isRendering) return null

  return (
    <section
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 44,
        right: 8,
        zIndex: 10,
        borderRadius: 8,
        padding: '12px 16px',
        backgroundColor: opacity({
          color: color.text_200,
          opacity: 0.24,
        }),
        backdropFilter: 'blur(2.5px)',
      }}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : -8}px)`,
      }}
      {...props}
    ></section>
  )
}

const Title = styled.p`
  font-size: 0.85rem !important;
  margin-bottom: 0.5rem;
`

const SelectButton = styled.button<{ isSelected?: boolean }>`
  cursor: pointer;
  padding: 0.05rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem !important;
  background-color: ${(props) =>
    props.isSelected ? staticColor.primary_800 : props.theme.color.text_200};
  font-weight: ${(props) => (props.isSelected ? 600 : 400)};
`

export default Object.assign(Popup, { Title, SelectButton })
