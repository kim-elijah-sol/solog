import Flex from '@components/layout/Flex'
import { css, useTheme } from '@emotion/react'
import { staticColor } from '@styles/palette'
import React from 'react'

function Box({
  color,
  textColor,
  children,
}: {
  color: string
  textColor?: string
  children?: React.ReactNode
}) {
  return (
    <div
      css={css`
        width: 100px;
        height: 100px;
        background-color: ${color};
        cursor: pointer;
        transition: 0.21s;
        color: ${textColor ?? '#fff'};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;

        ${!children
          ? `
          &:hover {
            transform: scale(0.95);
          }
          `
          : ''}
      `}
    >
      {children}
    </div>
  )
}

function Palette() {
  const { color } = useTheme()

  return (
    <>
      <Flex
        column
        css={css`
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 30px 0;
        `}
      >
        <Flex>
          <Box color={staticColor.primary_50} />
          <Box color={staticColor.primary_100} />
          <Box color={staticColor.primary_200} />
          <Box color={staticColor.primary_300} />
          <Box color={staticColor.primary_400} />
        </Flex>
        <Flex>
          <Box color={staticColor.primary_500} />
          <Box color={staticColor.primary_600} />
          <Box color={staticColor.primary_700} />
          <Box color={staticColor.primary_800} />
          <Box color={staticColor.primary_900} />
        </Flex>
      </Flex>

      <Flex
        column
        css={css`
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 30px 0;
        `}
      >
        <Flex>
          <Box color={staticColor.red_50} />
          <Box color={staticColor.red_100} />
          <Box color={staticColor.red_200} />
          <Box color={staticColor.red_300} />
          <Box color={staticColor.red_400} />
        </Flex>
        <Flex>
          <Box color={staticColor.red_500} />
          <Box color={staticColor.red_600} />
          <Box color={staticColor.red_700} />
          <Box color={staticColor.red_800} />
          <Box color={staticColor.red_900} />
        </Flex>
      </Flex>

      <Flex
        column
        css={css`
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 30px 0;
        `}
      >
        <Flex>
          <Box color='transparent' textColor={color.text_900}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_800}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_700}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_600}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_500}>
            Aa
          </Box>
        </Flex>
        <Flex>
          <Box color='transparent' textColor={color.text_400}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_300}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_200}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_100}>
            Aa
          </Box>
          <Box color='transparent' textColor={color.text_50}>
            Aa
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Palette
