import { css, Interpolation, Theme, useTheme } from '@emotion/react'
import transition from '@styles/transition'
import {
  Children,
  ClassAttributes,
  cloneElement,
  ComponentProps,
  HTMLAttributes,
  ReactElement,
  useEffect,
} from 'react'
import InputField from '@components/InputField'
import useBoolean from '@hooks/global/useBoolean'
import { staticColor } from '@styles/palette'
import { boxShadowBorder, ellipsis, thinScrollBar } from '@styles/common'
import Flex from './layout/Flex'
import FixedBackground from './FixedBackground'

interface CssProps {
  css?: Interpolation<Theme>
}

type ContainerProps = ClassAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement> &
  CssProps

type OptionElement = ReactElement<ComponentProps<typeof Option>>

interface Props extends Omit<ContainerProps, 'onChange' | 'onClick'> {
  onChange?: (id: any) => void
  value?: string
  placeholder?: string
  disabled?: boolean
  children: OptionElement | OptionElement[]
}

function Dropdown({
  onChange,
  value,
  placeholder,
  disabled,
  children,
  ...containerProps
}: Props) {
  const { color } = useTheme()

  const [isOpen, setIsOpen] = useBoolean()

  const isPlaceholderDisplayCondition = !value && !!placeholder

  const placeholderStyle = css`
    color: ${color.text_300};
  `

  function onClick() {
    if (!disabled) setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (disabled) {
      setIsOpen(false)
    }
  }, [disabled])

  return (
    <div
      {...containerProps}
      css={css`
        position: relative;
        width: ${InputField.palette.width}px;
        height: ${InputField.palette.height}px;
        padding: 0 ${InputField.palette.horizontalPadding}px;
        color: ${color.text_900};
        border-radius: ${InputField.palette.radius}px;
        transition: all ${transition.fast};
        cursor: pointer;
        ${boxShadowBorder({
          width: isOpen ? 2 : 1,
          color: isOpen ? staticColor.primary_900 : color.text_100,
          isImportant: isOpen,
        })}

        &:hover {
          ${boxShadowBorder({ width: 2, color: staticColor.primary_400 })}
        }
      `}
      onClick={onClick}
    >
      <Text css={isPlaceholderDisplayCondition ? placeholderStyle : undefined}>
        {isPlaceholderDisplayCondition ? placeholder : value}
      </Text>
      <Menu isOpen={isOpen}>
        {Children.map(children, (child) => {
          return cloneElement(child, {
            onChange,
          })
        })}
      </Menu>
      {isOpen && <FixedBackground zIndex={2} />}
    </div>
  )
}

function Text({
  children,
  ...props
}: {
  children?: React.ReactNode
  css?: Interpolation<Theme>
}) {
  const { color } = useTheme()

  return (
    <p
      {...props}
      css={[
        ellipsis,
        css`
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          max-width: calc(100% - ${InputField.palette.horizontalPadding * 2}px);
          color: ${color.text_900};
          transition: all ${transition.fast};
          user-select: none;
        `,
      ]}
    >
      {children}
    </p>
  )
}

function Menu({
  isOpen,
  children,
}: {
  isOpen: boolean
  children?: React.ReactNode
}) {
  const { color } = useTheme()

  if (!isOpen) return <></>

  return (
    <Flex
      column
      css={[
        thinScrollBar(color.text_400),
        css`
          position: absolute;
          left: 0;
          right: 0;
          top: calc(100% + 8px);
          max-height: 250px;
          overflow: hidden auto;
          padding: ${InputField.palette.horizontalPadding / 2}px;
          border-radius: ${InputField.palette.radius}px;
          background-color: ${color.background};
          ${boxShadowBorder({ color: color.text_100, width: 1 })}
          transition: all ${transition.fast};
          z-index: 3;
        `,
      ]}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Flex>
  )
}

interface OptionProps extends CssProps {
  children?: React.ReactNode
  value?: number | string
  checked?: boolean
  onChange?: (id: any) => void
}

function Option({ children, onChange, checked, value, ...rest }: OptionProps) {
  const { color } = useTheme()

  function onClick() {
    if (onChange && value) {
      onChange(value)
    }
  }

  return (
    <button
      {...rest}
      css={css`
        text-align: left;
        padding: ${InputField.palette.horizontalPadding}px;
        color: ${checked ? staticColor.primary_800 : color.text_900};
        border-radius: ${InputField.palette.radius}px;
        transition: all ${transition.fast};
        font-weight: 400;
        cursor: pointer;

        &:hover {
          background-color: ${color.text_50};
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Dropdown.Option = Option

export default Dropdown
