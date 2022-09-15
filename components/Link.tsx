import { Interpolation, Theme } from '@emotion/react'
import NextLink from 'next/link'
import { ClassAttributes, AnchorHTMLAttributes } from 'react'

type AnchorProps = ClassAttributes<HTMLAnchorElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    css?: Interpolation<Theme>
  }

interface Props extends AnchorProps {
  href: string
}

function Link({ href, children, ...props }: Props) {
  return (
    <NextLink href={href}>
      <a href={href} {...props}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
