import Button from './Button'

import fontFamilyIcon from '@icons/font-family.png'
import Icon from './Icon'
import { useEffect, useState } from 'react'
import Popup from './Popup'
import { firaCode, ibmPlexMono } from '@styles/common'
import Spacing from '@components/layout/Spacing'
import { useRecoilState } from 'recoil'
import $codeFontFamily from '@atoms/global/codeFontFamily'

function FontFamilySetting() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const [codeFontFamily, setCodeFontFamily] = useRecoilState($codeFontFamily)

  useEffect(() => {
    setIsPopupOpen(false)
  }, [codeFontFamily])

  return (
    <>
      <Button onClick={() => setIsPopupOpen(!isPopupOpen)}>
        <Icon src={fontFamilyIcon} alt='' />
      </Button>
      <Popup isOpen={isPopupOpen}>
        <Popup.Title>글꼴</Popup.Title>
        <Popup.SelectButton
          isSelected={codeFontFamily === 'IBM Plex Mono'}
          onClick={() => setCodeFontFamily('IBM Plex Mono')}
          css={ibmPlexMono(400)}
        >
          IBM Plex Mono
        </Popup.SelectButton>
        <Spacing size={6} />
        <Popup.SelectButton
          isSelected={codeFontFamily === 'Fira Code'}
          onClick={() => setCodeFontFamily('Fira Code')}
          css={firaCode(400)}
        >
          Fira Code
        </Popup.SelectButton>
      </Popup>
    </>
  )
}

export default FontFamilySetting
