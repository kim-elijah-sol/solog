import $theme from '@atoms/global/theme'
import useIsMount from '@hooks/global/useIsMount'
import { useSetRecoilState } from 'recoil'

function Home() {
  const { isMount } = useIsMount()

  const setTheme = useSetRecoilState($theme)

  function onClickToggleTheme() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>{isMount && <button onClick={onClickToggleTheme}>테마 Toggle!</button>}</>
  )
}

export default Home
