import { atom } from 'recoil'
import keys from 'states/keys'
import { v1 } from 'uuid'

export type ThemeType = 'light' | 'dark'

const $theme = atom<ThemeType>({
  key: `${keys.atoms.theme}__${v1()}`,
  default: 'light',
})

export default $theme
