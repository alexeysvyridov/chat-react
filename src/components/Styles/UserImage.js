import styled from 'styled-components'

export const UserImage = styled.img.attrs(
   props => ({
      src:props.src
   }))`

   height: 50px;
   heigth: 50px;
   border-radius:${props => props.borderRadius ? props.borderRadius : '50%'};
`