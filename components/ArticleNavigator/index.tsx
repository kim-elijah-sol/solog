import styled from '@emotion/styled'
import Label from './Label'
import Title from './Title'
import Wrap from './Wrap'

const ArticleNavigator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 680px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    gap: 1rem;
  }
`

export default Object.assign(ArticleNavigator, {
  Wrap,
  Label,
  Title,
})
