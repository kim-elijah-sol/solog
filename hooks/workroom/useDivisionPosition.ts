import useIsMount from '@hooks/global/useIsMount'
import { useEffect, useState } from 'react'

function useDivisionPosition() {
  const { isMount } = useIsMount()

  const [divisionPosition, setDivisionPosition] = useState(50)

  const [moveAllow, setMoveAllow] = useState(false)

  function allowMove() {
    setMoveAllow(true)
  }

  function onMouseUp() {
    setMoveAllow(false)
  }

  function onMouseMove(event: MouseEvent) {
    if (moveAllow) {
      let position = (event.clientX / window.innerWidth) * 100

      if (position < 35) position = 35
      else if (position > 65) position = 65

      setDivisionPosition(position)
    }
  }

  useEffect(() => {
    if (isMount) {
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('mousemove', onMouseMove)

      return () => {
        window.removeEventListener('mouseup', onMouseUp)
        window.removeEventListener('mousemove', onMouseMove)
      }
    }
  }, [isMount, moveAllow])

  return {
    divisionPosition,
    allowMove,
    moveAllow,
  }
}

export default useDivisionPosition
