import { useTheme } from '@emotion/react'
import Image from 'next/image'

interface Props extends React.ComponentProps<typeof Image> {}

function Icon(props: Props) {
  const {
    color: { type },
  } = useTheme()

  return (
    <Image
      width={14}
      height={14}
      css={{
        filter: type === 'dark' ? 'invert(1)' : undefined,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: '0 !important',
      }}
      {...props}
    />
  )
}

export default Icon
