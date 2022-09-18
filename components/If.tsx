import { Children, cloneElement, ComponentProps, ReactElement } from 'react'

interface IfProps {
  condition: boolean
  children?: ThenElseElement | ThenElseElement[]
}

type ThenElseElement = ReactElement<ComponentProps<typeof Then | typeof Else>>

function If({ condition, children }: IfProps) {
  if (!children) return <></>

  return (
    <>
      {Children.map(children, (child: any) => {
        if (child.type.name === 'Then' && condition) return child

        if (child.type.name === 'Else' && !condition) return child

        return undefined
      })}
    </>
  )
}

interface ThenElseProps {
  children?: React.ReactNode
}

function Then({ children }: ThenElseProps) {
  return <>{children}</>
}

function Else({ children }: ThenElseProps) {
  return <>{children}</>
}

If.Then = Then
If.Else = Else

export default If
