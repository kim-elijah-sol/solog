import { useRecoilValue } from 'recoil'
import { useEffect, useRef } from 'react'

import $duplicateCategorys from '@selectors/workroom/duplicateCategorys'
import $notifications from '@atoms/global/notifications'
import useNotification from '@hooks/global/useNotification'

function useWatchDuplicateCategorys() {
  const notifications = useRecoilValue($notifications)

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
    }, 3000)
  }

  useEffect(() => {
    for (const category of duplicateCategorys) {
      noticeDuplicateCategory(category)
    }
  }, [duplicateCategorys])

  useEffect(() => {
    console.log(notifications)
  }, [notifications])
}

export default useWatchDuplicateCategorys
