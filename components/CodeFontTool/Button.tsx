import { useTheme } from '@emotion/react'
import { pointer, square } from '@styles/common'
import { opacity } from '@styles/palette'

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {}

function Button(props: Props) {
  const { color } = useTheme()

  return (
    <button
      type='button'
      css={[
        square(28),
        pointer,
        {
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          borderRadius: 8,
          backgroundColor: opacity({
            color: color.text_200,
            opacity: 0.24,
          }),
          ':hover': {
            backgroundColor: opacity({
              color: color.text_200,
              opacity: 0.48,
            }),
          },
          ':active': {
            backgroundColor: opacity({
              color: color.text_200,
              opacity: 0.72,
            }),
          },
        },
      ]}
      {...props}
    />
  )
}

export default Button
