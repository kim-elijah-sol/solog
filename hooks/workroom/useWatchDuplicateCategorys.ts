import { useRecoilValue } from 'recoil'
import { useEffect, useRef } from 'react'

import useNotification from '@hooks/global/useNotification'
import $duplicateCategorys from '@selectors/workroom/duplicateCategorys'

function useWatchDuplicateCategorys() {
  const { notice, update } = useNotification()

  const notSolvedCategorys = useRef<string[]>([])

  const duplicateCategorys = useRecoilValue($duplicateCategorys)

  function noticeDuplicateCategory(category: string) {
    if (!notSolvedCategorys.current.includes(category)) {
      notice({
        key: `@중복카테고리/${category}`,
        type: 'error',
        content: `"${category}" 카테고리가 중복 입력 되었습니다.`,
      })

      notSolvedCategorys.current.push(category)
    }
  }

  function solvingCategoryPop() {
    notSolvedCategorys.current = notSolvedCategorys.current.filter((category) =>
      duplicateCategorys.includes(category)
    )
  }

  useEffect(() => {
    for (const category of duplicateCategorys) {
      noticeDuplicateCategory(category)
    }
    solvingCategoryPop()
  }, [duplicateCategorys])
}

export default useWatchDuplicateCategorys
