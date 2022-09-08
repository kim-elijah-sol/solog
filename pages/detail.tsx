import Seo from '@components/Seo'
import Link from 'next/link'

function Detail() {
  return (
    <>
      <Seo>
        <title>상세 페이지</title>
      </Seo>
      여긴 상세 페이지
      <Link href='/'>이전 페이지로</Link>
    </>
  )
}

export default Detail
