import { useRecoilValue } from 'recoil'
import { useEffect, useRef } from 'react'

import useNotification from '@hooks/global/useNotification'
import $duplicateCategorys from '@selectors/workroom/duplicateCategorys'
import { NOTIFICATION_AGE } from '@shared/constant'

function useWatchDuplicateCategorys() {
  const { notice, update } = useNotification()

  const notSolvedCategorys = useRef<string[]>([])

  const duplicateCategorys = useRecoilValue($duplicateCategorys)

  function noticeDuplicateCategory(category: string) {
    if (!notSolvedCategorys.current.includes(category)) {
      notice({
        key: `@중복카테고리/${category}`,
        content: category,
      })

      setTimeout(() => {
        update(`@중복카테고리/${category}`)
      }, 2500)

      notSolvedCategoryPushPop(category)
    }
  }

  function notSolvedCategoryPushPop(category: string) {
    notSolvedCategorys.current.push(category)

    setTimeout(() => {
      notSolvedCategorys.current = notSolvedCategorys.current.filter(
        (_category) => _category !== category
      )
    }, NOTIFICATION_AGE)
  }

  useEffect(() => {
    for (const category of duplicateCategorys) {
      noticeDuplicateCategory(category)
    }
  }, [duplicateCategorys])
}

export default useWatchDuplicateCategorys
