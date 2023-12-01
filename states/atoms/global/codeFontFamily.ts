import { atom } from 'recoil'
import keys from 'states/keys'
import { v1 } from 'uuid'

export type CodeFontFamilyType = 'IBM Plex Mono' | 'Fira Code'

const $codeFontFamily = atom<CodeFontFamilyType>({
  key: `${keys.atoms.codeFontFamily}__${v1()}`,
  default: 'IBM Plex Mono',
})

export default $codeFontFamily
