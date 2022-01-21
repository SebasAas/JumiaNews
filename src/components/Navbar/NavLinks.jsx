import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Styles
import styled from 'styled-components';

// Components
import Searchbox from '../Searchbox';

const NavLinks = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <BurgerIcon open={open} onClick={() => setOpen(prev => !prev)}>
        <div />
        <div />
        <div />
      </BurgerIcon>
      <LinkList open={open}>
        <li className='mt4 mt0-l' onClick={() => setOpen(false)}><Link to="section/sports">Sports</Link></li>
        <li className='mt4 mt0-l' onClick={() => setOpen(false)}><Link to="section/politics">Politics</Link></li>
        <li className='mt4 mt0-l' onClick={() => setOpen(false)}><Link to="section/health">Health</Link></li>
        <li className='mt4 mt0-l' onClick={() => setOpen(false)}><Link to="section/technology">Technology</Link></li>
        <div className="db-m dn-l ma4" >
          <Searchbox setOpen={setOpen} />
        </div>
      </LinkList>
    </>
  )
}

const BurgerIcon = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 960px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#ccc' : '#333'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 0px 20px;
  }

  @media (max-width: 960px) {
    flex-flow: column nowrap;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    right: 0;
    margin: 0;
    padding-top: 3.5rem;
    background-color: #1b1b1b;
    transform: ${({ open }) => !open ? 'translateX(100%)' : 'translateX(0)'};
    opacity: ${({ open }) => !open ? 0 : 1};
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

export default NavLinks