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
import { darkColor, lightColor, staticColor } from '@styles/palette'

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
  width: calc(100% - 32px);
  max-width: 648px;
  margin: 0 auto;

  * {
    transition: ${transition.fast} !important;
    &:not(code) {
      font-size: 1rem;
      line-height: 2rem;
    }
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: 2.5rem;
    font-size: 2.5rem;
  }

  h3 {
    margin-top: 2.25rem;
    font-size: 2.25rem;
  }

  h4 {
    margin-top: 2rem;
    font-size: 2rem;
  }

  h5 {
    margin-top: 1.175rem;
    font-size: 1.75rem;
  }

  h6 {
    margin-top: 1.5rem;
    font-size: 1.5rem;
  }

  ul {
    padding-left: 20px;
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

  blockquote {
    background-color: ${(props) =>
      getCodeBlockBackgroundColor(props.themeColor.type)};

    padding: 16px;
    padding-left: 24px;
    border-radius: 8px;
    margin: 1rem 0;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 6px;
      background-color: ${staticColor.primary_900};
    }

    blockquote {
      margin: 0.75rem 0;
      border-radius: 0;
    }
  }

  img {
    max-width: 100%;
    margin: 1rem auto;
    display: block;
  }

  a {
    text-decoration: none;
    color: ${staticColor.primary_800};
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
