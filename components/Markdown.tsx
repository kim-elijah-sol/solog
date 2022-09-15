import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ThemeColor } from 'emotion'
import ReactMarkdown from 'react-markdown'

interface Props {
  children: string
}

interface MarkdownStyleProps {
  themeColor: ThemeColor
}

const MarkdownStyle = styled.div<MarkdownStyleProps>`
  width: 100%;
  max-width: 648px;

  *:not(code) {
    font-size: 1rem;
    line-height: 2.5rem;
  }

  h2 {
    margin-bottom: 1rem;
    margin-top: 2.5rem;
    font-size: 2rem;
  }

  h3 {
    margin-bottom: 1rem;
    margin-top: 2.25rem;
    font-size: 1.75rem;
  }

  h4 {
    margin-bottom: 1rem;
    margin-top: 2rem;
    font-size: 1.5rem;
  }

  pre {
    line-height: 1.5;
    padding: 16px 8px;
    background-color: ${(props) => props.themeColor.text_100};
    border-radius: 8px;
  }
`

function Markdown({ children }: Props) {
  const { color } = useTheme()

  return (
    <MarkdownStyle themeColor={color}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </MarkdownStyle>
  )
}

export default Markdown
