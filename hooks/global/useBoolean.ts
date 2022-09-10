import React, { useState } from 'react'

function useBoolean(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [boolean, setBoolean] = useState<boolean>(false)

  return [boolean, setBoolean]
}

export default useBoolean
