import { atom } from 'recoil'
import keys from 'states/keys'

export type ThemeType = 'light' | 'dark'

const $theme = atom<ThemeType>({
  key: keys.atoms.theme,
  default: 'light',
})

export default $theme
