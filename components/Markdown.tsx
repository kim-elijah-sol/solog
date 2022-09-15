import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ThemeColor } from 'emotion'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialLight,
  materialDark,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import transition from '@styles/transition'
import { ThemeType } from '@atoms/global/theme'
import { darkColor, lightColor } from '@styles/palette'

interface Props {
  children: string
}

interface MarkdownStyleProps {
  themeColor: ThemeColor
}

function getCodeBlockBackgroundColor(theme: ThemeType) {
  return theme === 'dark' ? darkColor.text_100 : lightColor.text_50
}

const MarkdownStyle = styled.div<MarkdownStyleProps>`
  width: 100%;
  max-width: 648px;

  * {
    transition: ${transition.fast} !important;
    &:not(code) {
      font-size: 1rem;
      line-height: 2.5rem;
    }
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

  ul {
    padding-left: 16px;
  }

  pre {
    > div {
      background-color: ${(props) =>
        getCodeBlockBackgroundColor(props.themeColor.type)} !important;
      border-radius: 8px;

      > code {
        * {
          line-height: 1.75rem;
          font-family: 'Fira Code', monospace !important;
          background-color: ${(props) =>
            getCodeBlockBackgroundColor(props.themeColor.type)} !important;
        }
      }
    }
  }

  li > ul {
    padding-left: 2.5rem;
  }
`

const codeBlock = (color: ThemeColor) => {
  const style: any = color.type === 'light' ? materialLight : materialDark

  return {
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={style}
          language={match[1]}
          PreTag='div'
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }
}

function Markdown({ children }: Props) {
  const { color } = useTheme()

  return (
    <MarkdownStyle themeColor={color}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={codeBlock(color)}>
        {children}
      </ReactMarkdown>
    </MarkdownStyle>
  )
}

export default Markdown
