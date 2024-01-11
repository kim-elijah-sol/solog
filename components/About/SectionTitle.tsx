import styled from '@emotion/styled'

const SectionTitle = styled.h2((props) => ({
  fontSize: '2rem',
  marginBottom: '2.5rem',
  paddingBottom: '1.25rem',
  borderBottom: `1px solid ${props.theme.color.text_100}`,
  '@media (max-width: 680px)': {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    paddingBottom: '0.75rem',
  },
}))

export default SectionTitle
