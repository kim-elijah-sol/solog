import $theme from '@atoms/global/theme'
import Link from 'next/link'
import { useSetRecoilState } from 'recoil'

function Home() {
  const setTheme = useSetRecoilState($theme)

  function onClickToggleTheme() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <Link href='/detail'>상세 페이지로</Link>
      <button onClick={onClickToggleTheme}>테마 Toggle!</button>
    </>
  )
}

export default Home
