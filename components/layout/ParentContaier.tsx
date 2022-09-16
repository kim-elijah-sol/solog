interface Props {
  children: React.ReactNode
}

function ParentContainer({ children }: Props) {
  return <main id='__solog__'>{children}</main>
}

export default ParentContainer
