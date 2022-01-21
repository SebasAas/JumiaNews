import React from 'react'

import styled from 'styled-components';

// Components
import Navbar from '../components/Navbar'

function Header() {
  return (
    <HeaderContainer>
      <Navbar />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
`



export default Header
