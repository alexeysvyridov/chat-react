import styled from 'styled-components'

import { LogOut } from '@styled-icons/feather'

const LogOutIcon = styled(LogOut)`
  color: #fff;
  font-size: 20px;
  width: 40px;
  heigth: 40px;
  padding:3px;
    opacity: 0.8;
  &:hover{
      cursor:pointer;
      opacity: 1;
  }
`   
export default LogOutIcon 