export const lightColor = {
  type: 'light',

  background: '#ffffff',

  text_50: '#f5f5f5',
  text_100: '#e0e0e0',
  text_200: '#c5c5c5',
  text_300: '#a0a0a0',
  text_400: '#909090',
  text_500: '#808080',
  text_600: '#656565',
  text_700: '#505050',
  text_800: '#353535',
  text_900: '#202020',
} as const

export const darkColor = {
  type: 'dark',

  background: '#212121',

  text_50: '#252525',
  text_100: '#303030',
  text_200: '#505050',
  text_300: '#656565',
  text_400: '#808080',
  text_500: '#959595',
  text_600: '#b0b0b0',
  text_700: '#c5c5c5',
  text_800: '#e0e0e0',
  text_900: '#f5f5f5',
} as const

export const staticColor = {
  primary_50: '#e7f2fd',
  primary_100: '#c6defb',
  primary_200: '#a5cbf8',
  primary_300: '#87b6f3',
  primary_400: '#76a6ef',
  primary_500: '#6c98eb',
  primary_600: '#668adc',
  primary_700: '#5e77c8',
  primary_800: '#5766b5',
  primary_900: '#5352ad',

  red_50: '#feebf0',
  red_100: '#fecdd7',
  red_200: '#ef9aa2',
  red_300: '#e6727e',
  red_400: '#f34f5f',
  red_500: '#fa3948',
  red_600: '#ea3046',
  red_700: '#d8263f',
  red_800: '#cb1e38',
  red_900: '#bc0c2c',
} as const

/**
 * hex 컬러 코드에 투명도를 조절한 rgba 값이 반환되는 함수
 * @param color : 컬러코드 ( HexCode )
 * @param opacity : 투명도 ( 0 ~ 1 )
 * @returns rgba(r , g , b , o)
 */
export function opacity({
  color,
  opacity,
}: {
  color: string
  opacity: number
}) {
  const hex = color.replace('#', '')
  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 4), 16)
  const blue = parseInt(hex.substring(4), 16)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}
