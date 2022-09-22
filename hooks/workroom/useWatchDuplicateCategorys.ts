import { useRecoilValue } from 'recoil'
import { useEffect, useRef } from 'react'

import $duplicateCategorys from '@selectors/workroom/duplicateCategorys'

function useWatchDuplicateCategorys() {
  const notSolvedCategorys = useRef<string[]>([])

  const duplicateCategorys = useRecoilValue($duplicateCategorys)

  function notice(category: string) {
    if (!notSolvedCategorys.current.includes(category)) {
      console.log(category, new Date().valueOf())

      notSolvedCategoryPushPop(category)
    }
  }

  function notSolvedCategoryPushPop(category: string) {
    notSolvedCategorys.current.push(category)

    setTimeout(() => {
      notSolvedCategorys.current = notSolvedCategorys.current.filter(
        (_category) => _category !== category
      )
    }, 3000)
  }

  useEffect(() => {
    for (const category of duplicateCategorys) {
      notice(category)
    }
  }, [duplicateCategorys])
}

export default useWatchDuplicateCategorys
