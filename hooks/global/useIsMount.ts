import { useEffect, useState } from 'react'

function useIsMount() {
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  return {
    isMount,
  }
}

export default useIsMount
