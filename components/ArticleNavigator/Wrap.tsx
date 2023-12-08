import styled from '@emotion/styled'
import { opacity, staticColor } from '@styles/palette'

interface Props {
  type: 'prev' | 'next'
}

const Wrap = styled.div<Props>((props) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: opacity({
    color: staticColor.primary_800,
    opacity: 0.1,
  }),
  padding: '0.5rem 1.25rem',
  borderRadius: 12,
  alignItems: props.type === 'prev' ? undefined : 'flex-end',
  border: `1px solid ${opacity({
    color: staticColor.primary_800,
    opacity: 0.2,
  })}`,
  '@media screen and (min-width: 681px)': {
    transition: '0.21s',
    ':hover': {
      boxShadow: `0 0 30px 2px ${opacity({
        color: staticColor.primary_800,
        opacity: 0.55,
      })}`,
      backgroundColor: opacity({
        color: staticColor.primary_800,
        opacity: 0.12,
      }),
      border: `1px solid ${opacity({
        color: staticColor.primary_800,
        opacity: 0,
      })}`,
    },
  },
  '@media screen and (max-width: 680px)': {
    width: 'calc(100% - 64px)',
    marginLeft: props.type === 'next' ? 64 : 0,
  },
}))

export default Wrap
