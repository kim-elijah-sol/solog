import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeProvider as EM_ThemeProvider } from '@emotion/react'

import { setCookie } from 'cookies-next'
import $codeFontFamily, {
  CodeFontFamilyType,
} from '@atoms/global/codeFontFamily'

interface Props {
  defaultCodeFontFamily: CodeFontFamilyType
  children: React.ReactNode
}

const CodeFontFamilyProvider = ({ defaultCodeFontFamily, children }: Props) => {
  const [isMount, setIsMount] = useState(false)

  const [currentCodeFontFamily, setCurrentCodeFontFamily] =
    useRecoilState($codeFontFamily)

  const codeFontFamily = !isMount
    ? defaultCodeFontFamily
    : currentCodeFontFamily

  useEffect(() => {
    setIsMount(true)
    setCurrentCodeFontFamily(defaultCodeFontFamily)
  }, [])

  useEffect(() => {
    if (isMount) {
      setCookie('codeFontFamily', defaultCodeFontFamily, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      })
    }
  }, [isMount, currentCodeFontFamily])

  return (
    <EM_ThemeProvider
      theme={{
        codeFontFamily,
      }}
    >
      {children}
    </EM_ThemeProvider>
  )
}

export default CodeFontFamilyProvider
