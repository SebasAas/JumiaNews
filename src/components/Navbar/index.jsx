import React from 'react';
import { Link } from 'react-router-dom'
// Components
import NavLinks from './NavLinks';
import Searchbox from '../Searchbox';

// Styles
import styled from 'styled-components';

// Images
import JumiaLogo from '../../assets/Icons'

const Navbar = () => {
  return (
    <Nav>
      {/* Logo */}
      <Link to={'/'}>
        <JumiaLogo />
      </Link>
      {/* Nav Links */}
      <div className='flex justify-between'>
        <NavLinks />
      </div>
      {/* Searchbox */}
      <div className='dn db-l'>
        <Searchbox />
      </div>
    </Nav>
  )
}

const Nav = styled.nav`
  font-family: 'Poppins';
  width: auto;
  min-height: 40px;
  padding: 13px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`

export default Navbar