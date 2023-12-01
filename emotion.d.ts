import '@emotion/react'
import { ThemeType } from '@atoms/global/theme'
import { lightColor, darkColor } from '@styles/palette'
import { CodeFontFamilyType } from '@atoms/global/codeFontFamily'

type ThemeColor = typeof lightColor | typeof darkColor

declare module '@emotion/react' {
  export interface Theme {
    color: ThemeColor
    codeFontFamily: CodeFontFamilyType
  }
}
