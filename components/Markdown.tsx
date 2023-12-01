import { css, useTheme } from '@emotion/react'
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
import { CodeFontFamilyType } from '@atoms/global/codeFontFamily'
import { relative } from '@styles/common'
import CodeFontTool from './CodeFontTool'

interface Props {
  children: string
}

interface MarkdownStyleProps {
  themeColor: ThemeColor
  codeFontFamily: CodeFontFamilyType
}

function getCodeBlockBackgroundColor(theme: ThemeType) {
  return theme === 'dark' ? darkColor.text_100 : lightColor.text_50
}

const MarkdownStyle = styled.div<MarkdownStyleProps>`
  width: 100%;

  * {
    transition: ${transition.fast} !important;
    &:not(code) {
      font-size: 1rem;
      line-height: 1.6;
      word-break: keep-all;
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
    > div > div {
      background-color: ${(props) =>
        getCodeBlockBackgroundColor(props.themeColor.type)} !important;
      border-radius: 8px;

      > code {
        * {
          font-family: '${(props) => props.codeFontFamily}', monospace !important;
          font-weight: 500;
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

  hr {
    border: none;
    width: 100%;
    height: 2px;
    background-color: ${(props) => props.themeColor.text_500};
    transition: ${transition.fast};
    margin: 1rem 0;
  }

  @media screen and (max-width: 680px) {
    * {
      &:not(code) {
        font-size: 0.875rem;
        line-height: 1.6rem;
      }
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0.75rem;
    }

    h2 {
      margin-top: 1.5rem;
      font-size: 1.5rem;
    }

    h3 {
      margin-top: 1.4rem;
      font-size: 1.4rem;
    }

    h4 {
      margin-top: 1.3rem;
      font-size: 1.3rem;
    }

    h5 {
      margin-top: 1.2rem;
      font-size: 1.2rem;
    }

    h6 {
      margin-top: 1.1rem;
      font-size: 1.1rem;
    }

    pre > div > div > code {
      * {
        line-height: 1rem;
      }
    }
  }
`

const codeBlock = (color: ThemeColor, codeFontFamily: CodeFontFamilyType) => {
  const style: any = color.type === 'light' ? materialLight : materialDark

  const inlineCodeStyle = css`
    font-family: '${codeFontFamily}', monospace !important;
    background-color: ${color.text_100};
    padding: 0.05rem 0.4rem;
    border-radius: 4px;
    color: ${color.text_800};
    font-size: 0.8rem;
  `

  return {
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <div css={relative}>
          <CodeFontTool.FontFamilySetting />
          <SyntaxHighlighter
            style={style}
            language={match[1]}
            PreTag='div'
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code css={inlineCodeStyle} className={className} {...props}>
          {children}
        </code>
      )
    },
  }
}

function Markdown({ children }: Props) {
  const { color, codeFontFamily } = useTheme()

  return (
    <MarkdownStyle themeColor={color} codeFontFamily={codeFontFamily}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={codeBlock(color, codeFontFamily)}
      >
        {children}
      </ReactMarkdown>
    </MarkdownStyle>
  )
}

export default Markdown
