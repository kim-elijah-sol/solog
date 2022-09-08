import '@emotion/react'

type Level = '5' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90'

type LevelColor<T extends string> = {
  [key in `${T}_${Level}0`]: string
}

interface ThemeColor extends LevelColor<'text'> {
  background: string
}

declare module '@emotion/react' {
  export interface Theme {
    color: ThemeColor
  }
}
