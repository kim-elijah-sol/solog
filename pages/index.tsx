import $theme from '@atoms/global/theme'
import { css, useTheme } from '@emotion/react'
import useIsMount from '@hooks/global/useIsMount'
import { useSetRecoilState } from 'recoil'

function Home() {
  const { color } = useTheme()

  const { isMount } = useIsMount()

  const setTheme = useSetRecoilState($theme)

  function onClickToggleTheme() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        background-color: ${color.background};
      `}
    >
      {isMount && <button onClick={onClickToggleTheme}>테마 Toggle!</button>}
    </div>
  )
}

export default Home
