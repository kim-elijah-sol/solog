import '@emotion/react'

interface ThemeColor {
  background: string
}

declare module '@emotion/react' {
  export interface Theme {
    color: ThemeColor
  }
}
