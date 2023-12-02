import Button from './Button'
import Icon from './Icon'

import copyIcon from '@icons/copy.png'
import React from 'react'
import useNotification from '@hooks/global/useNotification'

function CopyButton() {
  const { notice } = useNotification()

  function handleClickCopy(e: React.MouseEvent<HTMLButtonElement>) {
    const code = e.currentTarget.nextSibling?.nextSibling?.textContent

    if (code) {
      copyCode(code)
    }
  }

  function copyCode(code: string) {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        notice({
          key: 'copyCode',
          type: 'notice',
          content: '코드가 복사되었어요.',
        })
      })
      .catch(() => {
        notice({
          key: 'copyCode',
          type: 'error',
          content: '코드 복사에 문제가 발생했어요.',
        })
      })
  }

  return (
    <Button
      css={{
        right: 44,
      }}
      onClick={handleClickCopy}
    >
      <Icon src={copyIcon} alt='' />
    </Button>
  )
}

export default CopyButton
