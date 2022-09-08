import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeProvider as EM_ThemeProvider } from '@emotion/react'

import { lightColor, darkColor } from '@styles/palette'
import $theme, { ThemeType } from '@atoms/global/theme'
import { setCookie } from 'cookies-next'

interface Props {
  defaultTheme: ThemeType
  children: React.ReactNode
}

const ThemeProvider = ({ defaultTheme, children }: Props) => {
  const [isMount, setIsMount] = useState(false)

  const [currentTheme, setCurrentTheme] = useRecoilState($theme)

  const themeType = !isMount ? defaultTheme : currentTheme

  const color = themeType === 'dark' ? darkColor : lightColor

  useEffect(() => {
    setIsMount(true)
    setCurrentTheme(defaultTheme)
  }, [])

  useEffect(() => {
    if (isMount) {
      setCookie('theme', currentTheme)
    }
  }, [isMount, currentTheme])

  return (
    <EM_ThemeProvider
      theme={{
        color,
      }}
    >
      {children}
    </EM_ThemeProvider>
  )
}

export default ThemeProvider
