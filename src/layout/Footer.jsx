import React from 'react'

// Styles
import styled from 'styled-components';

// Images
import JumiaLogo from '../assets/Icons'

function Footer() {
  return (
    <FooterContainer>
      <JumiaLogo />
      <p>© Copyright. All rights reserved</p>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100;
  height: 200px;
  box-shadow: rgba(34, 34, 34, 0.35) 0px 5px 15px;
`

export default Footer
